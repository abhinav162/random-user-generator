import './Home.css'
import { useState } from 'react';
import { useEffect } from "react"; // useEffect is a hook that allows you to perform side effects in function components (e.g. fetching data from an API, manipulating the DOM, etc.). It is a close replacement for componentDidMount, componentDidUpdate, and componentWillUnmount.
import axios from "axios";  // Axios is a promise-based HTTP client that works both in the browser and in a node.js environment. It basically provides a single API for dealing with XMLHttpRequests and node's http interface. Besides that, it wraps the requests using a polyfill for ES6 new's promise syntax.


const SwitchBtn = ({ btnLabel, event }) => {
    const mEnter = () => {
        const btn = document.getElementById(btnLabel);
        btn.style.backgroundColor = "var(--tertiary-color)";
    }

    const mLeave = () => {
        const btn = document.getElementById(btnLabel);
        btn.style.backgroundColor = "";
    }

    return (
        <button id={btnLabel} className="switch-btn" onClick={event} onMouseEnter={mEnter} onMouseLeave={mLeave} >{btnLabel}</button>
    );
}

const RandomUser = () => {

    // an api call function
    const apiCall = () => {
        axios.get("https://randomuser.me/api/").then((resp) => {
            setApiResponse(resp.data);
            setVisibleData(resp.data.results[0].name.title + " " + resp.data.results[0].name.first + " " + resp.data.results[0].name.last);
        })
    }

    const [apiResponse, setApiResponse] = useState(null);

    // using useEffect to call api on component mount(or on page load)
    useEffect(() => {
        apiCall();
    }, []);  // passing empty array as second argument to useEffect will make it run only once on component mount if we pass any variable in array then it will run on component mount and whenever that variable changes (ie if we pass 'apiResponse' in array then it will run on component mount and whenever 'apiResponse' changes)

    const userInfo = apiResponse?.results[0];

    const [visibleData, setVisibleData] = useState(null);

    return (
        <>
            {apiResponse ?
                (
                    <>
                        <div className="random-user">
                            <img src={userInfo?.picture.large} ></img>
                            <h1>{visibleData}</h1>

                            <div className="btns">
                                <SwitchBtn btnLabel={"Name"} event={() => setVisibleData(userInfo.name.title + " " + userInfo.name.first + " " + userInfo.name.last)} />
                                <SwitchBtn btnLabel={"Email"} event={() => setVisibleData(userInfo?.email)} />
                                <SwitchBtn btnLabel={"Phone"} event={() => setVisibleData(userInfo?.phone)} />
                                <SwitchBtn btnLabel={"Cell"} event={() => setVisibleData(userInfo?.cell)} />
                                <SwitchBtn btnLabel={"Location"} event={() => setVisibleData(userInfo?.location.street.number + " " + userInfo?.location.street.name + " " + userInfo?.location.city + " " + userInfo?.location.state + " " + userInfo?.location.country + " " + userInfo?.location.postcode)} />
                            </div>
                        </div>
                    </>
                ) : null}

            <div className="random-user btns">
                <SwitchBtn btnLabel={"Get Random User"} event={apiCall} />
            </div>
        </>
    );
}

export default RandomUser;