import { Button, TextField } from "@mui/material";
import styles from "../../styles/pages/ListCreations.module.css";
import { useContext, useEffect, useState } from "react";
import { makePostApiCall } from "../../helper/helperFunctions";
import { userContext } from "../context/UserContext";
import { BASE_URL } from "../../constants/constants";

const ListCreation = () => {
    const { getSessionId } = useContext(userContext);
    const [listCreated, setListCreated] = useState(false);

    const [listData, setListData] = useState({
        name: "",
        description: "",
        language: "en",
    });

    useEffect(() => {});

    const handleSubmit = (e) => {
        e.preventDefault();
        makePostApiCall(
            `${BASE_URL}/list?api_key=${process.env.REACT_APP_API_KEY}&session_id=${getSessionId()}`,
            listData
        );
        setListCreated(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setListData({ ...listData, [name]: value });
    };

    const resetListFields = () => {
        setListData({
            name: "",
            description: "",
            language: "en",
        });
        setListCreated(false);
    };

    const goToLists = () => {
        window.location = "/lists";
    };

    return (
        <>
            <div className={styles.container}>
                <h1>List Creation</h1>
                {listCreated ? (
                    <div className={styles.confirmed_container}>
                        <h1>List Created Successfully!</h1>
                        <h2>{listData.name}</h2>
                        <h3>To view your newly created list please navigate to the lists page</h3>
                        <div className={styles.confirmed_button_container}>
                            <Button variant="contained" color="warning" onClick={resetListFields}>
                                Create Another List
                            </Button>
                            <Button variant="contained" color="warning" onClick={goToLists}>
                                View Lists
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        {" "}
                        <TextField
                            className={styles.form_field}
                            label="List Title"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={listData.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            className={styles.form_field}
                            label="List Description"
                            variant="outlined"
                            fullWidth
                            name="description"
                            value={listData.description}
                            onChange={handleChange}
                            multiline
                            rows={6}
                            required
                        />
                        <Button type="submit" variant="contained" color="warning">
                            Create List
                        </Button>
                    </form>
                )}
            </div>
        </>
    );
};

export default ListCreation;
