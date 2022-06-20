const styles = {
    div: {
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "20px 20px 20px grey",
    },
    img: {
        width: "23rem"
    }
}

function BookItem() {
    return(
        <div>
            <img src={"https://velog.velcdn.com/images%2Fnzlk112%2Fpost%2Ff66ec130-89e2-4ec2-97ea-b3bf55d28ecd%2Fimage.png"} style={styles.img}/>
            <p>책 이름</p>
            <p>닉네임</p>
            <p>빌림 상태 여부</p>
            <p>책의 위치</p>
        </div>
    )
}

export default BookItem;