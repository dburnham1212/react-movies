import { Modal, Box, Rating, Button } from "@mui/material";
import styles from "../../../styles/utility/Modals/RatingModal.module.css";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    height: "22.5rem",
    bgcolor: "background.paper",
    border: "2px solid #fea423",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const RatingModal = (props) => {
    const { open, handleClose, title, ratingValue, setRatingValue, deleteRating, saveRating } = props;

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
                <Box sx={modalStyle}>
                    <h2
                        style={{ position: "absolute", top: -5, right: 12.5, cursor: "pointer" }}
                        onClick={() => handleClose()}
                    >
                        x
                    </h2>
                    <div id={styles.container}>
                        <div>
                            <h1>Add Rating For:</h1>
                            <h2>{title}</h2>
                        </div>
                        <Rating
                            sx={{ fontSize: "4rem" }}
                            color="warning"
                            value={ratingValue}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setRatingValue(newValue);
                            }}
                        />

                        <div style={{ display: "flex", gap: "1.5rem", margin: "1rem" }}>
                            <Button variant="contained" color="warning" size="large" onClick={deleteRating}>
                                Delete Rating
                            </Button>
                            <Button variant="contained" color="warning" size="large" onClick={saveRating}>
                                Update Rating
                            </Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default RatingModal;
