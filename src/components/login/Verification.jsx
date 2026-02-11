import Cookies from "js-cookie";
import { useContext, useEffect } from "react";
import { BASE_URL } from "../../constants/constants";
import { userContext } from "../context/UserContext";

const Verification = () => {
    const { setUserName, setSessionId, setAccountId } = useContext(userContext);

    useEffect(() => {
        //const searchParams = new URLSearchParams(document.location.search);
        const searchParams = new URLSearchParams(
            window.location.hash.includes("?")
                ? window.location.hash.split("?")[1] // take everything after "?" in the hash
                : window.location.search,
        );

        const request_token = searchParams.get("request_token");

        const url = `${BASE_URL}/authentication/session/new?api_key=${process.env.REACT_APP_API_KEY}`;
        const options = {
            method: "POST",
            body: JSON.stringify({ request_token: request_token }),
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
                Cookies.set("session_id", json.session_id);

                fetch(`${BASE_URL}/account?api_key=${process.env.REACT_APP_API_KEY}&session_id=${json.session_id}`)
                    .then((res) => res.json())
                    .then((json) => {
                        console.log(json);
                        setUserName(json.username);
                        Cookies.set("username", json.username);
                        setAccountId(json.id);
                        Cookies.set("account_id", json.id);
                        // Redirect to home (handle HashRouter in production)
                        window.location.href =
                            process.env.NODE_ENV === "production"
                                ? `${window.location.origin + process.env.PUBLIC_URL}/#/`
                                : "/";
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
    }, []);
};

export default Verification;
