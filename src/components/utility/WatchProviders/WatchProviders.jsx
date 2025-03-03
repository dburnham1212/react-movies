import { useEffect, useState } from "react";
import { BASE_IMAGE_URL, BASE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/WatchProviders/WatchProviders.module.css";
import { makeApiCall } from "../../../helper/helperFunctions";

const { zones } = require("moment-timezone/data/meta/latest.json");

const WatchProviders = (props) => {
    const [region, setRegion] = useState({});

    const { watchProviders, title } = props;

    useEffect(() => {
        const timeZonesCountry = [];
        Object.keys(zones).forEach((timeZoneName) => {
            timeZonesCountry.push({
                regionCode: zones[timeZoneName].countries[0],
                timeZone: timeZoneName,
            });
        });

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const regionCode = timeZonesCountry.find((item) => item.timeZone === timeZone)?.regionCode;

        makeApiCall(
            `https://api.themoviedb.org/3/watch/providers/regions?api_key=${process.env.REACT_APP_API_KEY}`
        ).then((response) => {
            setRegion(response.results.find((item) => item.iso_3166_1 === regionCode));
        });
    }, []);

    return (
        <>
            {(watchProviders[region.iso_3166_1]?.flatrate ||
                watchProviders[region.iso_3166_1]?.rent ||
                watchProviders[region.iso_3166_1]?.buy) && (
                <div className={styles.container}>
                    <h3>JustWatch</h3>
                    <p>
                        {title} is currently available in {region.english_name}. JustWatch makes it easy to find out
                        where you can legally watch your favourite movies & TV shows online. Visit{" "}
                        <a href="https://www.justwatch.com/" target="_blank" rel="noopener noreferrer">
                            JustWatch
                        </a>{" "}
                        for more information.
                    </p>
                    {watchProviders[region.iso_3166_1]?.flatrate?.length && (
                        <>
                            <h4 className={styles.underline}>Stream</h4>
                            <div className={styles.icon_container}>
                                {watchProviders[region.iso_3166_1].flatrate.map((option, index) => (
                                    <a
                                        key={index}
                                        href={watchProviders?.CA?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className={styles.image_icon}
                                            src={`${BASE_IMAGE_URL}${option.logo_path}`}
                                            alt={option.provider_name}
                                        />
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                    {watchProviders[region.iso_3166_1]?.rent?.length && (
                        <>
                            <h4 className={styles.underline}>Rent</h4>
                            <div className={styles.icon_container}>
                                {watchProviders[region.iso_3166_1].rent.map((option, index) => (
                                    <a
                                        key={index}
                                        href={watchProviders?.CA?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className={styles.image_icon}
                                            src={`${BASE_IMAGE_URL}${option.logo_path}`}
                                            alt={option.provider_name}
                                        />
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                    {watchProviders[region.iso_3166_1]?.buy?.length && (
                        <>
                            <h4 className={styles.underline}>Buy</h4>
                            <div className={styles.icon_container}>
                                {watchProviders[region.iso_3166_1].buy.map((option, index) => (
                                    <a
                                        key={index}
                                        href={watchProviders?.CA?.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img
                                            className={styles.image_icon}
                                            src={`${BASE_IMAGE_URL}${option.logo_path}`}
                                            alt={option.provider_name}
                                        />
                                    </a>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default WatchProviders;
