import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    background: none;
  }
  body {
    margin: 0;
    padding: 0;
    background: ${(props) => props.theme.colors.background} !important;
  }
`
export default GlobalStyle
