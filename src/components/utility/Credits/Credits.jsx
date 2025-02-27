import { useEffect } from "react";

const Credits = (props) => {
    const { credits } = props;

    useEffect(() => {
        console.log("=== printing tv show credits from credits component");
        console.log(credits);
    }, []);

    return (
        <>
            <h1>This is the credits component</h1>
        </>
    );
};

export default Credits;
