import { Link, useLocation } from "react-router-dom";

const PageNotFound = () => {
    //displaying error codes
    const location = useLocation();
    const errorMsg = location.state?.msg || "404 Page Not Found";

    return (
        <>
            <div>
                <h1>{errorMsg}</h1>
                <Link to="/">Back to Home</Link>
            </div>
        </>
    );
};

export default PageNotFound;
