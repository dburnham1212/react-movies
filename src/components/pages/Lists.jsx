import { useContext, useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { BASE_URL } from "../../constants/constants";
import { userContext } from "../context/UserContext";
import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from "@mui/material";
import MediaCard from "../utility/Cards/MediaCard";
import styles from "../../styles/pages/Lists.module.css";

const Lists = () => {
    const { accountId, getSessionId } = useContext(userContext);

    const [typeFilter, setTypeFilter] = useState("Movies");
    const [listFilter, setListFilter] = useState("Favourites");

    const [currentPage, setCurrentPage] = useState(1);

    const [mediaListData, setMediaListData] = useState({});

    const setMediaListDataWithPage = (mediaType, listType, pageNumber) => {
        if (mediaType === "Movies") {
            if (listType === "Favourites") {
                makeApiCall(
                    `${BASE_URL}/account/${accountId}/favorite/movies?api_key=${
                        process.env.REACT_APP_API_KEY
                    }&session_id=${getSessionId()}&page=${pageNumber}`
                ).then((response) => {
                    console.log(response);
                    setMediaListData(response);
                });
            } else if (listType === "Rated") {
                makeApiCall(
                    `${BASE_URL}/account/${accountId}/rated/movies?api_key=${
                        process.env.REACT_APP_API_KEY
                    }&session_id=${getSessionId()}&page=${pageNumber}`
                ).then((response) => {
                    console.log(response);
                    setMediaListData(response);
                });
            } else if (listType === "Watchlist") {
                makeApiCall(
                    `${BASE_URL}/account/${accountId}/watchlist/movies?api_key=${
                        process.env.REACT_APP_API_KEY
                    }&session_id=${getSessionId()}&page=${pageNumber}`
                ).then((response) => {
                    console.log(response);
                    setMediaListData(response);
                });
            }
        } else if (mediaType === "TV") {
            if (listType === "Favourites") {
                makeApiCall(
                    `${BASE_URL}/account/${accountId}/favorite/tv?api_key=${
                        process.env.REACT_APP_API_KEY
                    }&session_id=${getSessionId()}&page=${pageNumber}`
                ).then((response) => {
                    console.log(response);
                    setMediaListData(response);
                });
            } else if (listType === "Rated") {
                makeApiCall(
                    `${BASE_URL}/account/${accountId}/rated/tv?api_key=${
                        process.env.REACT_APP_API_KEY
                    }&session_id=${getSessionId()}&page=${pageNumber}`
                ).then((response) => {
                    console.log(response);
                    setMediaListData(response);
                });
            } else if (listType === "Watchlist") {
                makeApiCall(
                    `${BASE_URL}/account/${accountId}/watchlist/tv?api_key=${
                        process.env.REACT_APP_API_KEY
                    }&session_id=${getSessionId()}&page=${pageNumber}`
                ).then((response) => {
                    console.log(response);
                    setMediaListData(response);
                });
            }
        }
    };

    useEffect(() => {
        setMediaListDataWithPage(typeFilter, listFilter, 1);
    }, []);

    const handleTypeFilterChange = (e) => {
        setTypeFilter(e.target.value);
        setListFilter("Favourites");
        setMediaListDataWithPage(e.target.value, "Favourites", 1);
    };

    const handleListFilterChange = (e) => {
        setListFilter(e.target.value);
        setMediaListDataWithPage(typeFilter, e.target.value, 1);
    };

    const handleMediaPageChange = (e, value) => {
        setCurrentPage(value);
        setMediaListDataWithPage(typeFilter, listFilter, value);
    };

    return (
        <>
            <div className="wrapper">
                <div className={styles.page_container}>
                    <FormControl sx={{ minWidth: "25%", paddingRight: "1.25rem" }}>
                        <InputLabel id="select-media-label">Media Type</InputLabel>
                        <Select
                            labelId="select-media-label"
                            id="select-media"
                            value={typeFilter}
                            label="Media Type"
                            onChange={handleTypeFilterChange}
                        >
                            <MenuItem value={"Movies"}>Movies</MenuItem>
                            <MenuItem value={"TV"}>TV</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: "25%" }}>
                        <InputLabel id="select-media-label">List Type</InputLabel>
                        <Select
                            labelId="select-media-label"
                            id="select-media"
                            value={listFilter}
                            label="List Type"
                            onChange={handleListFilterChange}
                        >
                            <MenuItem value={"Favourites"}>Favourites</MenuItem>
                            <MenuItem value={"Rated"}>Rated</MenuItem>
                            <MenuItem value={"Watchlist"}>Watch List</MenuItem>
                        </Select>
                    </FormControl>
                    {!mediaListData?.results?.length && (
                        <>
                            <h1>You have nothing added to </h1>
                            <h2>
                                {typeFilter} {listFilter}
                            </h2>
                        </>
                    )}
                    {typeFilter === "Movies" && (
                        <>
                            <div className={styles.card_container}>
                                {/* Get Movies By Selected Genre*/}
                                {mediaListData?.results?.length &&
                                    mediaListData?.results?.map((movie, index) => {
                                        return (
                                            <MediaCard
                                                key={index}
                                                media={movie}
                                                displayType={false}
                                                mediaType={"movie"}
                                            />
                                        );
                                    })}
                            </div>
                            <div className={styles.pagination_box}>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={mediaListData.total_pages > 500 ? 500 : mediaListData.total_pages}
                                        page={currentPage}
                                        onChange={handleMediaPageChange}
                                        variant="outlined"
                                        shape="rounded"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Stack>
                            </div>
                        </>
                    )}
                    {typeFilter === "TV" && (
                        <>
                            <div className={styles.card_container}>
                                {/* Get Movies By Selected Genre*/}
                                {mediaListData?.results?.length &&
                                    mediaListData?.results?.map((show, index) => {
                                        return (
                                            <MediaCard key={index} media={show} displayType={false} mediaType={"tv"} />
                                        );
                                    })}
                            </div>
                            <div className={styles.pagination_box}>
                                <Stack spacing={2}>
                                    <Pagination
                                        count={mediaListData.total_pages > 500 ? 500 : mediaListData.total_pages}
                                        page={currentPage}
                                        onChange={handleMediaPageChange}
                                        variant="outlined"
                                        shape="rounded"
                                        showFirstButton
                                        showLastButton
                                    />
                                </Stack>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Lists;
