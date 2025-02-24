import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";

import styles from "../../styles/pages/Person.module.css";

const Person = () => {
    const [personData, setPersonData] = useState({});

    const { id } = useParams();

    useEffect(() => {
        // Dylan Burnham
        makeApiCall(`${BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`).then((response) => {
            console.log(response);
            setPersonData(response);
        });
    }, []);

    return (
        <>
            <h1 className={styles.title}>{personData.name}</h1>
            <img src={`${BASE_IMAGE_URL}${personData.profile_path}`} />
            <h2>Stuff</h2>
        </>
    );
};

export default Person;
