import Button from "./common/Button";

const styles = {
    div: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom:"20px",
        marginTop:"20px"
    },
    button: {
        marginTop: "auto",
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom: "auto",
        backgroundColor: "gray"
    },

    title: {
        marginTop: "auto",
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom: "auto",
    }
}

function SearchBookItem({imageUrl, title}) {
    return (
        <div style={styles.div} >
            <img src={imageUrl} alt={"hi"}/>
            <p style={styles.title}>{title}</p>
            <Button style={styles.button}>선택하기</Button>
        </div>
    )
}

export default SearchBookItem;