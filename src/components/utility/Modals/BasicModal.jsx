import { Modal, Box } from "@mui/material";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #fea423",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};

const BasicModal = (props) => {
    const { open, handleClose, children } = props;

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
                <Box sx={modalStyle}>
                    <h2
                        style={{ position: "absolute", top: -10, right: 10, cursor: "pointer" }}
                        onClick={() => handleClose()}
                    >
                        x
                    </h2>
                    {children}
                </Box>
            </Modal>
        </div>
    );
};

export default BasicModal;
