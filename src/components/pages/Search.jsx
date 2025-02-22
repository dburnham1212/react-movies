import { TextField } from "@mui/material";
import styles from "../../styles/pages/Search.module.css";

const Search = () => {
  return (
    <>
      <h1 className={styles.title}>This is the search page</h1>
      <TextField id="outlined-basic" label="Search" variant="outlined" />
    </>
  );
};

export default Search;
