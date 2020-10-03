import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

export const LogoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.h1`
  font-family: 'Lobster';
  color: ${(props) => props.theme.colors.contrast};
  font-size: 50px;
  margin-left: 15px;
  @media (max-width: 700px) {
    font-size: 30px;
  }
`
export const Button = styled.button<HTMLAttributes<HTMLElement>>`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.contrast};
  text-transform: uppercase;
  width: 150px;
  border-radius: 0%;
  font-weight: 600;
  border: none;

  @media (max-width: 700px) {
    width: 120px;
    font-size: 13px;
  }

  &:last-child {
    margin-left: 25px;
  }
`
