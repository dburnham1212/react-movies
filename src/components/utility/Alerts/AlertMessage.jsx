import { Alert } from "@mui/material";
import { useEffect, useState } from "react";

const AlertMessage = (props) => {
    const { controlState, alertMessage } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            setShow(false);
        }, 3000);

        return () => {
            clearTimeout(timeId);
        };
    }, [controlState]);

    return (
        <>
            {show && alertMessage && (
                <Alert icon={false} severity="warning">
                    {alertMessage}
                </Alert>
            )}
        </>
    );
};

export default AlertMessage;
