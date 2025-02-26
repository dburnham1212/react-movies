import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import ImageCarousel from "../Carousels/ImageCarousel";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
};

const BasicModal = (props) => {
    const { open, handleClose, children } = props;

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
                <Box sx={modalStyle}>{children}</Box>
            </Modal>
        </div>
    );
};

export default BasicModal;
