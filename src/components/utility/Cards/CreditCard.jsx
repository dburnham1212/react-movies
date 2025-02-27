import { Card } from "@mui/material";
import { BASE_IMAGE_URL } from "../../../constants/constants";
import styles from "../../../styles/utility/Cards/CreditCard.module.css";

const CreditCard = (props) => {
    const { media } = props;

    return (
        <>
            <Card sx={{ padding: "2rem" }}>
                <img src={`${BASE_IMAGE_URL}${media.poster_path}`} alt={"This is an alt tag"} />
            </Card>
        </>
    );
};

export default CreditCard;
