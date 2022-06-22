import Button from "./common/Button";
import {Link} from "react-router-dom";

const styles = {
    div: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: "20px",
        marginTop: "20px",
    },

    button: {
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        backgroundColor: "gray"
    },

    title: {
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "auto",
        width: "24em"
    }
}

function SearchBookItem({imageUrl, title}) {
    return (
        <div style={styles.div}>
            <img src={imageUrl} alt={"hi"}/>
            <p style={styles.title}>
                <div
                    dangerouslySetInnerHTML={{__html: title}}
                />
            </p>
            <Link
                to={"/books/register"}
                state={{imageUrl: imageUrl, title: title}}
            >
                <Button
                    style={styles.button}
                >선택하기</Button>
            </Link>
        </div>
    )
}

export default SearchBookItem;