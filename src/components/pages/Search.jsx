import { TextField } from "@mui/material";
import styles from "../../styles/pages/Search.module.css";
import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { API_KEY, BASE_URL } from "../../constants/constants";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        makeApiCall(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchTerm}`).then((response) => {
            setSearchData(response.results);
            console.log(response.results);
        });
    }, [searchTerm]);

    const handleSeachTermChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(e.target.value);
    };

    return (
        <>
            <h1 className={styles.title}>This is the search page</h1>
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSeachTermChange}
            />
        </>
    );
};

export default Search;
