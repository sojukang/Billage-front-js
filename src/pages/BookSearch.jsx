import React, {useState} from "react";
import {getNaverBookSearch} from "../BookApi";
import SearchBookItem from "../components/SearchBookItem";
import Header from "../components/Header";
import UserInput from "../components/common/userinput/UserInput";
import styled from "styled-components";
import {Button, withStyles} from "@material-ui/core";
import {Default, Mobile} from "../components/common/Mobile";

const SearchBox = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  margin: 0.3rem auto 1rem auto;
  padding-top: 2rem;
  border-top: 1px solid #dddddd;
`;

export const SearchButton = withStyles({
    root: {
        marginLeft: "2rem",
        width: "7rem",
        height: "3rem",
        backgroundColor: "#efd7d7",
    },
})(Button);

export const SelectButton = withStyles({
    root: {
        width: "5rem",
        height: "3rem",
        backgroundColor: "#efd7d7",
    },
})(Button);

const styles = {
    div: {
        height: "5rem",
    },

    bookItems: {
        display: "table",
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    button: {
        backgroundColor: 'gray'
    },

    input: {
        width: "30em",
    }
}

function BookSearch() {
    const [searchTitle, setSearchTitle] = useState("");
    const [bookItems, setBookItems] = useState([]);

    const onChangeSearchTitle = (e) => {
        setSearchTitle(e.target.value);
    }

    const fetchSearchBooks = async () => {
        const data = await getNaverBookSearch(searchTitle);
        setBookItems(data.items);
    }

    return (
        <>
            <Header/>
            <Default>
                <SearchBox>
                    <UserInput
                        type="title"
                        minLength="2"
                        width="23rem"
                        placeholder="책 제목을 입력해주세요👍"
                        name="title"
                        required
                        onChange={onChangeSearchTitle}
                    />
                    <div style={styles.div}>
                        <SearchButton
                            onClick={fetchSearchBooks}>
                            검색하기🔍
                        </SearchButton>
                    </div>
                </SearchBox>
            </Default>
            <Mobile>

                <SearchBox>
                    <UserInput
                        type="title"
                        minLength="2"
                        width="12rem"
                        placeholder="책 제목을 입력해주세요👍"
                        name="title"
                        required
                        onChange={onChangeSearchTitle}
                    />
                    <div style={styles.div}>
                        <SearchButton
                            onClick={fetchSearchBooks}>
                            검색하기🔍
                        </SearchButton>
                    </div>
                </SearchBox>
            </Mobile>
            <div style={styles.bookItems}>
                {bookItems.map((book) => (
                    <SearchBookItem imageUrl={book.image} title={book.title}/>
                ))}
            </div>
        </>
    )
}

export default BookSearch;