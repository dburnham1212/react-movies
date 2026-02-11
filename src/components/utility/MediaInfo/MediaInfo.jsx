import { BASE_IMAGE_URL } from "../../../constants/constants";

import { IconButton, Tooltip } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { FavoriteOutlined } from "@mui/icons-material";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import TvIcon from "@mui/icons-material/Tv";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddIcon from "@mui/icons-material/Add";

// Style sheet
import styles from "../../../styles/utility/MediaInfo/MediaInfo.module.css";
import AlertMessage from "../Alerts/AlertMessage";
import RatingModal from "../Modals/RatingModal";
import ListsModal from "../Modals/ListsModal";

import { Link } from "react-router-dom";

const MediaInfo = (props) => {
    const {
        mediaData,
        mediaSeasonData, // Only used if mediaType == season or mediaType == episode
        mediaEpisodeData, // Only used if mediaType == episode
        mediaType,
        showAuthOptions = false,
        accountStates,
        isAuthenticated,
        toggleFavourite,
        toggleWatchlist,
        accountStateChangeAlert,
        // Rating fields used in multiple components
        ratingModalOpen,
        openRatingModal,
        closeRatingModal,
        ratingValue,
        setRatingValue,
        deleteRating,
        saveRating,
        // Lists fields only used for movies right now to add movies to lists
        listsModalOpen,
        openListsModal,
        closeListsModal,
        accountLists,
        currentCustomList,
        handleListChange,
        addItemToCurrentList,
    } = props;

    const isMovie = mediaType === "movie";
    const isTvShow = mediaType === "TVShow";
    const isSeason = mediaType === "season";
    const isEpisode = mediaType === "episode";

    const formatRuntime = (minutes) => {
        if (!minutes || minutes <= 0) return "N/A";

        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    return (
        <>
            <div className={styles.heading_container}>
                <div className={styles.heading_title_info}>
                    {isMovie && (
                        <div className={styles.heading}>
                            <h1>{mediaData.title}</h1>
                            {mediaData.original_title !== mediaData.title && <h3>{mediaData.original_title}</h3>}
                        </div>
                    )}
                    {isTvShow && (mediaData.name ? <h1>{mediaData.name}</h1> : <h1>{mediaData.original_name}</h1>)}
                    {isSeason && (
                        <>
                            <h1>{mediaSeasonData?.name}</h1>
                            <Link to={`/tv/${mediaData.id}`}>
                                {mediaData.name ? <h3>{mediaData.name}</h3> : <h3>{mediaData.original_name}</h3>}
                            </Link>
                        </>
                    )}
                    {isEpisode && (
                        <>
                            <h1>{mediaEpisodeData?.name}</h1>
                            <Link to={`/tv/${mediaData.id}`}>
                                {mediaData.name ? <h3>{mediaData.name}</h3> : <h3>{mediaData.original_name}</h3>}
                            </Link>
                            <Link to={`/tv/${mediaData.id}/season/${mediaSeasonData.season_number}`}>
                                <h4>{mediaSeasonData?.name}</h4>
                            </Link>
                        </>
                    )}
                </div>
                <div className={styles.movie_ratings}>
                    {/* Overall movie rating */}
                    {(isMovie || isTvShow) && (
                        <div className={styles.rating_container}>
                            <h5>TMDB Rating</h5>
                            <div className={styles.star_rating}>
                                <StarIcon color="warning" />
                                <p>
                                    <span>
                                        {mediaData.vote_average ? (mediaData.vote_average / 2).toFixed(1) : "0"}
                                    </span>
                                    /5
                                </p>
                            </div>
                            <p id={styles.num_votes}>Votes: {mediaData.vote_count}</p>
                        </div>
                    )}
                    {isSeason && (
                        <div className={styles.rating_container}>
                            <h5>TMDB Rating</h5>
                            <div className={styles.star_rating}>
                                <StarIcon color="warning" />
                                <p>
                                    <span>
                                        {mediaSeasonData.vote_average
                                            ? (mediaSeasonData.vote_average / 2).toFixed(1)
                                            : "0"}
                                    </span>
                                    /5
                                </p>
                            </div>
                        </div>
                    )}
                    {isEpisode && (
                        <div className={styles.rating_container}>
                            <h5>TMDB Rating</h5>
                            <div className={styles.star_rating}>
                                <StarIcon color="warning" />
                                <p>
                                    <span>
                                        {mediaEpisodeData.vote_average
                                            ? (mediaEpisodeData.vote_average / 2).toFixed(1)
                                            : "0"}
                                    </span>
                                    /5
                                </p>
                            </div>
                            <p id={styles.num_votes}>Votes: {mediaEpisodeData.vote_count}</p>
                        </div>
                    )}
                    {/* Personal rating if user has logged in */}
                    {showAuthOptions && isAuthenticated() && (
                        <div className={styles.rating_container}>
                            <h5>My Rating</h5>
                            <div className={styles.star_rating}>
                                <StarIcon color="warning" />
                                {accountStates?.rated?.value ? (
                                    <p>
                                        <span>
                                            {accountStates.rated.value
                                                ? (accountStates.rated.value / 2).toFixed(1)
                                                : "0"}
                                        </span>
                                        /5
                                    </p>
                                ) : (
                                    <p>N/A</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.content_left}>
                    {(isMovie || isTvShow) && (
                        <img
                            src={
                                mediaData.poster_path
                                    ? `${BASE_IMAGE_URL}${mediaData.poster_path}`
                                    : "/images/NO_IMAGE_FOUND.jpg"
                            }
                            alt={`${mediaData.title} poster`}
                        />
                    )}
                    {isSeason && (
                        <img
                            src={
                                mediaSeasonData.poster_path
                                    ? `${BASE_IMAGE_URL}${mediaSeasonData.poster_path}`
                                    : "/images/NO_IMAGE_FOUND.jpg"
                            }
                            alt={`${mediaData.title} poster`}
                        />
                    )}
                    {isEpisode && (
                        <img
                            src={
                                mediaEpisodeData.still_path
                                    ? `${BASE_IMAGE_URL}${mediaEpisodeData.still_path}`
                                    : "/images/NO_IMAGE_FOUND_WIDE.jpg"
                            }
                            alt={`${mediaData.title} poster`}
                        />
                    )}
                </div>
                <div className={styles.content_right}>
                    <div id={styles.right_upper_content}>
                        {(isMovie || isTvShow) && (
                            <>
                                {mediaData.tagline && <p id={styles.tagline}>{mediaData.tagline}</p>}
                                <p id={styles.overview}>{mediaData.overview}</p>
                            </>
                        )}
                        {isSeason && (
                            <>
                                {mediaSeasonData.tagline && <p id={styles.tagline}>{mediaSeasonData.tagline}</p>}
                                <p id={styles.overview}>{mediaSeasonData.overview}</p>
                            </>
                        )}
                        {isEpisode && (
                            <>
                                <p id={styles.tagline}>Episode: {mediaEpisodeData.episode_number}</p>
                                <p id={styles.overview}>{mediaEpisodeData.overview}</p>
                            </>
                        )}
                        {/* Genres */}
                        <div className={styles.genre_container}>
                            {mediaData?.genres?.length === 1 ? <h3>Genre:</h3> : <h3>Genres:</h3>}
                            {mediaData?.genres?.length > 0 ? (
                                <p id={styles.genres}>{mediaData?.genres?.map((genre) => genre.name).join(", ")}</p>
                            ) : (
                                <p id={styles.genre}>No Genres Found</p>
                            )}
                        </div>
                        {mediaData.adult && <p>Adults Only</p>}
                    </div>
                    {/* Buttons for favourite, watchlist and rating */}
                    {showAuthOptions && isAuthenticated() && (
                        <div className={styles.movie_option_buttons}>
                            {(isMovie || isTvShow) && (
                                <>
                                    <Tooltip title={accountStates.favorite ? "Remove favourite" : "Add to favourites"}>
                                        <IconButton
                                            sx={{ backgroundColor: "#555555" }}
                                            size="large"
                                            color="warning"
                                            onClick={toggleFavourite}
                                        >
                                            {accountStates.favorite ? <FavoriteOutlined /> : <FavoriteBorderIcon />}
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip
                                        title={accountStates.watchlist ? "Remove from watch list" : "Add to watch list"}
                                    >
                                        <IconButton
                                            sx={{ backgroundColor: "#555555" }}
                                            size="large"
                                            color="warning"
                                            onClick={toggleWatchlist}
                                        >
                                            {accountStates.watchlist ? <DesktopWindowsIcon /> : <TvIcon />}
                                        </IconButton>
                                    </Tooltip>
                                </>
                            )}
                            <Tooltip title="Update rating">
                                <IconButton
                                    sx={{ backgroundColor: "#555555" }}
                                    size="large"
                                    color="warning"
                                    onClick={openRatingModal}
                                >
                                    {accountStates?.rated?.value ? <StarIcon /> : <StarBorderIcon />}
                                </IconButton>
                            </Tooltip>

                            {isMovie && (
                                <Tooltip title="Add to custom list">
                                    <IconButton
                                        sx={{ backgroundColor: "#555555" }}
                                        size="large"
                                        color="warning"
                                        onClick={openListsModal}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                            <RatingModal
                                open={ratingModalOpen}
                                handleClose={closeRatingModal}
                                title={mediaData.title}
                                ratingValue={ratingValue}
                                setRatingValue={setRatingValue}
                                deleteRating={deleteRating}
                                saveRating={saveRating}
                            />
                            {isMovie && (
                                <ListsModal
                                    open={listsModalOpen}
                                    handleClose={closeListsModal}
                                    currentCustomList={currentCustomList}
                                    handleListChange={handleListChange}
                                    accountLists={accountLists}
                                    addItemToCurrentList={addItemToCurrentList}
                                />
                            )}
                            <AlertMessage controlState={accountStates} alertMessage={accountStateChangeAlert} />
                        </div>
                    )}

                    <div id={styles.right_lower_content}>
                        <div className={styles.lower_content_line}>
                            {isMovie &&
                                mediaData?.production_countries?.length === 0 &&
                                !mediaData?.release_date &&
                                !mediaData?.runtime &&
                                !mediaData?.homepage && <span>No Additional Info Found</span>}
                            {/*Display country(s) of origin */}
                            {mediaData?.production_countries?.length > 0 && (
                                <div className={styles.movie_info_item}>
                                    {mediaData?.production_countries?.map((country, index) => (
                                        <img
                                            key={index}
                                            className={styles.flag}
                                            src={`https://flagsapi.com/${country.iso_3166_1}/flat/64.png`}
                                            alt={country.name}
                                        />
                                    ))}
                                </div>
                            )}
                            {/*Release Date */}
                            {isMovie && mediaData?.release_date && (
                                <span className={styles.movie_info_item}>{mediaData?.release_date}</span>
                            )}

                            {/*RunTime */}
                            {isMovie && mediaData.runtime && (
                                <span className={styles.movie_info_item}>{formatRuntime(mediaData.runtime)}</span>
                            )}

                            {isSeason && mediaSeasonData?.air_date && (
                                <span className={styles.movie_info_item}>{mediaSeasonData?.air_date}</span>
                            )}

                            {isSeason && (
                                <span className={styles.movie_info_item}>
                                    Episodes:{" "}
                                    {mediaSeasonData?.episodes?.length > 0 ? mediaSeasonData?.episodes?.length : "0"}
                                </span>
                            )}

                            {isEpisode && mediaEpisodeData?.air_date && (
                                <span className={styles.movie_info_item}>{mediaEpisodeData?.air_date}</span>
                            )}

                            {isEpisode && mediaEpisodeData.runtime && (
                                <span className={styles.movie_info_item}>
                                    {formatRuntime(mediaEpisodeData.runtime)}
                                </span>
                            )}

                            {/* Website */}
                            {mediaData.homepage && (
                                <p className={styles.movie_info_item}>
                                    <a
                                        href={mediaData.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={mediaData.homepage} // shows full URL on hover
                                    >
                                        Visit Website
                                    </a>
                                </p>
                            )}
                        </div>

                        {isTvShow && (
                            <div className={styles.lower_content_line}>
                                <h4>Additional Info: </h4>
                                {isTvShow && (
                                    <span className={styles.movie_info_item}>
                                        Seasons: {mediaData?.number_of_seasons}, Episodes:{" "}
                                        {mediaData?.number_of_episodes}
                                    </span>
                                )}

                                {isTvShow && mediaData?.first_air_date && mediaData?.last_air_date && (
                                    <span className={styles.movie_info_item}>
                                        Aired: {mediaData?.first_air_date} to {mediaData?.last_air_date}
                                    </span>
                                )}

                                {isTvShow && (
                                    <span className={styles.movie_info_item}>Status: {mediaData?.status}</span>
                                )}
                            </div>
                        )}

                        {/*Display available languages */}
                        <div className={styles.lower_content_line}>
                            <h4>
                                Available languages:
                                {mediaData?.spoken_languages?.length > 0 ? (
                                    <span id={styles.lang_font}>
                                        {" "}
                                        {mediaData?.spoken_languages
                                            ?.map((lang) =>
                                                lang.name !== lang.english_name
                                                    ? lang.name + "/" + lang.english_name
                                                    : lang.english_name,
                                            )
                                            .join(", ")}
                                    </span>
                                ) : (
                                    <span id={styles.lang_font}> No Spoken Languages Found</span>
                                )}
                            </h4>
                        </div>

                        {/*Produced by */}

                        <div className={styles.lower_content_line}>
                            <h4>
                                Produced by:
                                {mediaData?.production_companies?.length > 0 ? (
                                    <span id={styles.prod_font}>
                                        {" "}
                                        {mediaData?.production_companies?.map((prod) => prod.name).join(", ")}
                                    </span>
                                ) : (
                                    <span id={styles.prod_font}> No Production Companies Found</span>
                                )}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MediaInfo;
