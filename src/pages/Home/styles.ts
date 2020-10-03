import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => props.theme.colors.background};
  height: 100%;
  justify-content: space-evenly;
  padding: 30px;
  flex-wrap: wrap;
`

export const Picker = styled.h1`
  display: flex;
  flex-direction: row;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    padding: 5px;
  }
  & > div > span {
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    margin-right: 5px;
    color: ${(props) => props.theme.colors.contrast};
  }

  &::before,
  &::after {
    content: '';
    flex: 1 1;
    border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
    margin: auto;
  }
`

export const PickerSelect = styled.select<HTMLAttributes<HTMLElement>>`
  background: none;
  color: ${(props) => props.theme.colors.contrast};
  border: none;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  outline: none;
  padding: 10px;

  &:focus {
    border: none;
    outline: none;
  }

  & option {
    background: ${(props) => props.theme.colors.background};
    outline: 0px !important;
    border: 0px;
    box-shadow: none;
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
`

export const ButtonBox = styled.div`
  width: 100;
  display: flex;
  flex: row;
  justify-content: center;
`
