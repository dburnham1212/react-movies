import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import BasicModal from "./BasicModal";
import { Link } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../../constants/constants";

const ListsModal = (props) => {
    const { open, handleClose, currentCustomList, handleListChange, accountLists, addItemToCurrentList } = props;

    return (
        <BasicModal
            open={open}
            handleClose={handleClose}
            children={
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                            justifyContent: "space-between",
                            height: "100%",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "1rem",
                            }}
                        >
                            <h1>Select Custom List</h1>
                            <FormControl sx={{ minWidth: "25%" }}>
                                <InputLabel id="select-media-label">List Name</InputLabel>
                                <Select
                                    labelId="select-media-label"
                                    id="select-media"
                                    value={currentCustomList}
                                    label="List Type"
                                    onChange={handleListChange}
                                >
                                    {accountLists?.map((list, index) => (
                                        <MenuItem key={index} value={list.id}>
                                            {list.name}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value={0} component={Link} to="/lists/create">
                                        Create New List
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        {currentCustomList && (
                            <Button variant="contained" color="warning" size="large" onClick={addItemToCurrentList}>
                                Add
                            </Button>
                        )}
                    </Box>
                </>
            }
        />
    );
};

export default ListsModal;
