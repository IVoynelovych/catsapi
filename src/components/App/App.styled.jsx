import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html * {
    
    box-sizing:border-box;
    margin:0;
    padding:0;
}
    body{
    font-family: Roboto;
    }
    img{
    display:block;
    max-width:100%;
    height:auto;
    margin: 0 auto;
    }
    ul,ol{
    list-style:none;}`