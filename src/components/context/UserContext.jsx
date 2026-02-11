import Cookies from "js-cookie";
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
    const [userName, setUserName] = useState(Cookies.get("username"));
    const [accountId, setAccountId] = useState(Cookies.get("account_id"));

    const base = window.location.origin + process.env.PUBLIC_URL;
    const route =
        process.env.NODE_ENV === "production"
            ? "/#/verification" // HashRouter (GitHub Pages)
            : "/verification"; // BrowserRouter (local)

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
                const redirectString = `https://www.themoviedb.org/authenticate/${json.request_token}?redirect_to=${base}${route}`;
                window.open(redirectString);
            })
            .catch((err) => console.error(err));
    };

    const isAuthenticated = () => {
        let authenticated = false;

        if (Cookies.get("session_id")) authenticated = true;

        return authenticated;
    };

    const getSessionId = () => {
        return Cookies.get("session_id");
    };

    const logout = () => {
        console.log(getSessionId());
        const url = "https://api.themoviedb.org/3/authentication/session";
        const options = {
            method: "DELETE",
            body: JSON.stringify({ session_id: getSessionId() }),
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
                setUserName("");
                setUserId("");
                Object.keys(Cookies.get()).forEach((cookie) => {
                    Cookies.remove(cookie);
                });
                window.location = "/";
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
        getSessionId,
        accountId,
        setAccountId,
        isAuthenticated,
    };

    // We can now use this as a component to wrap anything
    // that needs our state
    return <userContext.Provider value={providerData}>{props.children}</userContext.Provider>;
};

export default UserProvider;
