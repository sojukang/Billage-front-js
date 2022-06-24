import styled from "styled-components";
import {Button, withStyles} from "@material-ui/core";

export const StyledButton = withStyles({
    root: {
        width: "40rem",
        backgroundColor: "#efd7d7",
        color: "#494848",
        fontWeight: "bold"
    },
})(Button);

export const RegisterPageContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

export const RegisterInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 620px;
  align-items: center;
`;

export const RegisterButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
