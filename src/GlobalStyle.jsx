import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    //font-size: 1rem;
    font-weight: 700;
  }
  
  a {
  &:link { color: inherit; text-decoration: none;}
  &:visited { color: inherit; text-decoration: none;}
  &:hover { color: inherit; text-decoration: none;}
}

`;

export default GlobalStyle;
