import { Button, TextField } from "@mui/material";
import styles from "../../styles/pages/Search.module.css";
import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL } from "../../constants/constants";
import MediaCard from "../utility/Cards/MediaCard";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        makeApiCall(`${BASE_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`).then(
            (response) => {
                setSearchData(response.results);
                console.log(response.results);
            }
        );
    }, [searchTerm]);

    const handleSeachTermChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div className={styles.page_container}>
            <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSeachTermChange}
            />
            <Button variant="contained" color="warning">
                Search
            </Button>
            <div className={styles.card_container}>
                {searchData?.map((searchItem) => {
                    return <MediaCard media={searchItem} />;
                })}
            </div>
        </div>
    );
};

export default Search;
