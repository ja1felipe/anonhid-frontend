import styled from 'styled-components'

export const Container = styled.div<React.HTMLAttributes<HTMLElement>>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.colors.background};
  font-family: 'Montserrat';
  form {
    background: ${(props) => props.theme.colors.contrast};
    display: flex;
    width: 400px;
    flex-direction: column;
    padding: 25px;

    p {
      font-size: 12px;
      color: red;
    }
  }
`

export const Title = styled.h1`
  font-family: 'Lobster';
  color: ${(props) => props.theme.colors.contrast};
  font-size: 75px;
  margin-left: 15px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export const Button = styled.button<React.HTMLAttributes<HTMLElement>>`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.contrast};
  text-transform: uppercase;
  width: 150px;
  border-radius: 0%;
  font-weight: 600;

  &:disabled {
    color: ${(props) => props.theme.colors.background};
  }
`

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const Input = styled.input<React.HTMLAttributes<HTMLElement>>`
  background: ${(props) => props.theme.colors.contrast};
  border: 2px solid ${(props) => props.theme.colors.primary};
  padding: 5px;
  margin-bottom: 15px;
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.secondary};
    outline: none;
  }
`
export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;

  label {
    font-size: 13px;
    margin-left: 5px;
  }
`
