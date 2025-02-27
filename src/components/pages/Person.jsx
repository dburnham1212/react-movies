import { useEffect, useState } from "react";
import { makeApiCall } from "../../helper/helperFunctions";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, BASE_URL } from "../../constants/constants";

import styles from "../../styles/pages/Person.module.css";

const Person = () => {
  const [personData, setPersonData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    // Tania H
    makeApiCall(
      `${BASE_URL}/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    ).then((response) => {
      console.log(response);
      setPersonData(response);
    });
  }, [id]);

  return (
    <>
      <div className={styles.flex_info_container}>
        <div className={styles.info_left}>
          <img
            src={`${BASE_IMAGE_URL}${personData.profile_path}`}
            alt={`${personData.name} profile`}
            width={"360"}
          />
        </div>
        <div className={styles.info_right}>
          <h1>{personData.name}</h1>
          {!personData.name && <h1>{personData.original_name}</h1>}

          {/* Known Aliases */}
          {personData.also_known_as && personData.also_known_as.length > 0 && (
            <div className={styles.aliases}>
              <h3>Also Known As:</h3>
              <ul>
                {personData.also_known_as.map((alias, index) => (
                  <li key={index}>{alias}</li>
                ))}
              </ul>
            </div>
          )}

          {/*Biography */}
          {personData.biography && (
            <p id={styles.biography}>{personData.biography}</p>
          )}

          {/*Birthday*/}
          <div className={styles.details}>
            <p>Born On: {personData.birthday}</p>
            <p>Place of Birth: {personData.place_of_birth}</p>
          </div>
          {/* Death */}
          {personData.deathday && (
            <div className={styles.death_info}>
              <p>Died on: {personData.deathday}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Person;
