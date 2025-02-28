import {
    Autocomplete,
    Box,
    Divider,
    FormControl,
    IconButton,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@mui/material";
import styles from "../../styles/pages/Search.module.css";
import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL } from "../../constants/constants";
import MediaCard from "../utility/Cards/MediaCard";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchFilter, setSearchFilter] = useState("All");
    const [searchData, setSearchData] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [availableLanguages, setAvailableLanguages] = useState({});

    useEffect(() => {
        makeApiCall(
            `${BASE_URL}/configuration/languages?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
        ).then((response) => {
            console.log(response);
            setAvailableLanguages(response.sort((a, b) => a.english_name.localeCompare(b.english_name)));
        });
    }, []);

    const searchUsingTerm = () => {
        setHasSearched(true);
        if (searchFilter === "All") {
            makeApiCall(`${BASE_URL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`).then(
                (response) => {
                    setSearchData(response.results);
                    console.log(response.results);
                }
            );
        } else if (searchFilter === "Movies") {
            makeApiCall(`${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`).then(
                (response) => {
                    setSearchData(
                        response.results.map((item) => {
                            return { ...item, media_type: "movie" };
                        })
                    );
                    console.log(response.results);
                }
            );
        } else if (searchFilter === "TV") {
            makeApiCall(`${BASE_URL}/search/tv?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`).then(
                (response) => {
                    setSearchData(
                        response.results.map((item) => {
                            return { ...item, media_type: "tv" };
                        })
                    );
                    console.log(response.results);
                }
            );
        } else {
            makeApiCall(`${BASE_URL}/search/person?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`).then(
                (response) => {
                    setSearchData(
                        response.results.map((item) => {
                            return { ...item, media_type: "person" };
                        })
                    );
                    console.log(response.results);
                }
            );
        }
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        console.log(e.target.value);
    };

    const handleSearchFilterChange = (e) => {
        setSearchFilter(e.target.value);
    };

    return (
        <div className={styles.page_container}>
            <div className={styles.input_options}>
                <FormControl sx={{ minWidth: "25%" }}>
                    <InputLabel id="select-media-label">Type</InputLabel>
                    <Select
                        labelId="select-media-label"
                        id="select-media"
                        value={searchFilter}
                        label="Type"
                        onChange={handleSearchFilterChange}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Movies"}>Movies</MenuItem>
                        <MenuItem value={"TV"}>TV</MenuItem>
                        <MenuItem value={"People"}>People</MenuItem>
                    </Select>
                </FormControl>
                <Paper
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        border: "1px solid grey",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        value={searchTerm}
                        inputProps={{ "aria-label": "search google maps" }}
                        onChange={handleSearchTermChange}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                        <SearchIcon onClick={() => searchUsingTerm()} />
                    </IconButton>
                </Paper>
            </div>

            {hasSearched && !searchData?.length && (
                <div className={styles.empty_search_box}>
                    <h2>No Items Found</h2>
                </div>
            )}
            {!hasSearched && !searchData?.length && (
                <div className={styles.empty_search_box}>
                    <h2>Please enter a search term and press search</h2>
                </div>
            )}
            <div className={styles.card_container}>
                {/* If there is a search term and data is found */}
                {hasSearched &&
                    searchData?.length &&
                    searchData?.map((searchItem, index) => {
                        return <MediaCard key={index} media={searchItem} />;
                    })}
            </div>
        </div>
    );
};

export default Search;
