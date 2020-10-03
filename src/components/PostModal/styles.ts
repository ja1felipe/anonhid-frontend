import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px !important;
  background: ${(props) => props.theme.colors.background};

  & > p {
    color: ${(props) => props.theme.colors.contrast};
  }

  & > div > button {
    background: ${(props) => props.theme.colors.primary};
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

interface IPicture {
  url: string
}
export const Picture = styled.div<IPicture>`
  box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.25);
  background: url(${(props) => props.url});
  height: 100%;
  background-size: cover;
  width: 300px;
  height: 320px;
`

export const InfosBox = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`

export const Description = styled.div`
  height: 120px;
  min-width: 280px;
  overflow-wrap: anywhere;
  display: -webkit-box;
  overflow: hidden;
  font-size: 13px;
  text-overflow: ellipsis;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 5px;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  & > textarea {
    height: 100%;
    width: 100%;
    resize: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  & > textarea:focus {
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`
export const ComentaryBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  width: 280px;
  max-height: 165px;
  overflow-y: auto;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.primary};
    border: solid 1px ${(props) => props.theme.colors.contrast};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  & p {
    overflow-wrap: anywhere;
    font-size: 12px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 4px 0;
    padding: 5px;
    border-radius: 5px;
  }
`

export const Input = styled.div`
  margin-top: 5px;

  input::placeholder {
    color: ${(props) => props.theme.colors.primary};
  }
`

export const SendIcon = styled.span`
  cursor: pointer;
  pointer-events: all !important;
`
interface IBtn extends HTMLAttributes<HTMLElement> {
  btnColor: string
}
export const Button = styled.button<IBtn>`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  border: none;
  margin-right: 10px;
  background: ${(props) => props.btnColor} !important;
  cursor: pointer;

  &:hover {
    background: darkgrey !important;
  }

  &:focus {
    outline: none;
    border: none;
  }
`

export const Label = styled.label`
  border: 1px dashed #ddd;
  cursor: pointer;
  height: 320px;
  background-size: cover;
  display: flex;
  justify-content: center;
  justify-items: center;
  width: 300px;
  & > input {
    display: none;
  }

  & .hasThumb {
    border: none;
  }

  & .hasThumb img {
    display: none;
  }
`
