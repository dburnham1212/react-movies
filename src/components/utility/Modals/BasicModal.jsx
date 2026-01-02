import { Modal, Box } from "@mui/material";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", sm: "85%", md: "70%" },
    height: { xs: "50%", sm: "70%", md: "90%" },
    bgcolor: "background.paper",
    border: "2px solid #fea423",
    borderRadius: "10px",
    boxShadow: 24,
};

const videoModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "95%", sm: "85%", md: "70%" },
    bgcolor: "background.paper",
    border: "2px solid #fea423",
    borderRadius: "10px",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
};

const BasicModal = (props) => {
    const { open, handleClose, children, mediaType } = props;

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
                <Box sx={mediaType === "video" ? videoModalStyle : modalStyle}>
                    <h2
                        style={{ position: "absolute", top: -10, right: 10, cursor: "pointer" }}
                        onClick={() => handleClose()}
                    >
                        x
                    </h2>
                    <Box
                        sx={{
                            p: 4,
                            boxSizing: "border-box",
                            ...(mediaType !== "video" && { height: "100%" }),
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default BasicModal;
