import { createContext, useState } from "react";
import { BASE_URL } from "../../constants/constants";
// Create a Context
export const userContext = createContext();

// Create a Component wrapper from Context.Provider
const UserProvider = (props) => {
    // Here is our Shared State Object
    //------------------------STATES------------------------------------------///
    const [authenticated, setAuthenticated] = useState("");
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState(window.sessionStorage.getItem("username"));
    const [sessionId, setSessionId] = useState(window.sessionStorage.getItem("session_id"));

    const login = () => {
        const url = `${BASE_URL}/authentication/token/new?api_key=${process.env.REACT_APP_API_KEY}`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjczNGVlZDYzODNhNDRlNjc2NzdkYjNkNDgwMmZlZSIsIm5iZiI6MTcwOTY3NTM5OC4zOTYsInN1YiI6IjY1ZTc5Mzg2Y2U5ZTkxMDE2MjNlMDU5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N78N6TjYyMSSA_4JSxlSr0KEMRHYG7U8oOjeVm3GPOM",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                const redirectString = `https://www.themoviedb.org/authenticate/${json.request_token}?redirect_to=http://localhost:3000/verification`;
                window.open(redirectString);
            })
            .catch((err) => console.error(err));
    };
 
    const logout = () => {
        const url = "https://api.themoviedb.org/3/authentication/session";
        const options = {
            method: "DELETE",
            body: JSON.stringify({ session_id: sessionId }),
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjczNGVlZDYzODNhNDRlNjc2NzdkYjNkNDgwMmZlZSIsIm5iZiI6MTcwOTY3NTM5OC4zOTYsInN1YiI6IjY1ZTc5Mzg2Y2U5ZTkxMDE2MjNlMDU5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N78N6TjYyMSSA_4JSxlSr0KEMRHYG7U8oOjeVm3GPOM",
            },
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setSessionId("");
                setUserName("");
            })
            .catch((err) => console.error(err));
    };

    const providerData = {
        authenticated,
        setAuthenticated,
        userId,
        setUserId,
        login,
        logout,
        userName,
        setUserName,
        sessionId,
        setSessionId,
    };

    // We can now use this as a component to wrap anything
    // that needs our state
    return <userContext.Provider value={providerData}>{props.children}</userContext.Provider>;
};

export default UserProvider;
