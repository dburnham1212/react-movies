import { Card, Rating } from "@mui/material";
import { BASE_IMAGE_URL } from "../../../constants/constants";

import styles from "../../../styles/utility/Reviews/Reviews.module.css";

const Reviews = (props) => {
    const { reviews } = props;

    return (
        <>
            {reviews?.results?.length && (
                <div className={styles.container}>
                    <h4 className={styles.title}>Reviews</h4>
                    {reviews?.results?.map((review) => (
                        <>
                            <Card className={styles.review_container}>
                                <div className={styles.profile_container}>
                                    {review.author_details.avatar_path ? (
                                        <img
                                            className={styles.avatar_image}
                                            src={`${BASE_IMAGE_URL}${review.author_details.avatar_path}`}
                                            alt={`${review.author_details.username}'s profile`}
                                        />
                                    ) : (
                                        <img
                                            className={styles.avatar_image}
                                            src={"/images/NO_IMAGE_FOUND.jpg"}
                                            alt={`${review.author_details.username} has no profile`}
                                        />
                                    )}
                                    <h4>{review.author_details.username}</h4>
                                </div>
                                <div className={styles.review_content}>
                                    <div className={styles.rating_container}>
                                        <h4>Rating:</h4>
                                        {review.author_details.rating ? (
                                            <Rating value={review.author_details.rating / 2} precision={0.1} readOnly />
                                        ) : (
                                            <p>None</p>
                                        )}
                                    </div>
                                    <p dangerouslySetInnerHTML={{ __html: review.content }}></p>
                                </div>
                            </Card>
                        </>
                    ))}
                </div>
            )}
        </>
    );
};

export default Reviews;
