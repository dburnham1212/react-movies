import { Alert } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../../styles/utility/Alerts/AlertMessage.module.css";

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
                <div className={styles.alert_popup}>
                    <Alert icon={false} severity="warning">
                        {alertMessage}
                    </Alert>
                </div>
            )}
        </>
    );
};

export default AlertMessage;
