import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  cursor: pointer;
`

export const InfosBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.contrast};
  font-size: 14px;
  padding: 3px 0;
  align-items: center;

  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
  }

  & > span > span {
    margin-left: 3px;
  }
`

export const CardBox = styled.div`
  background: ${(props) => props.theme.colors.contrast};
  padding: 5px;
  width: 300px;
  height: 320px;
`

interface IPicture {
  url: string
}
export const Picture = styled.div<IPicture>`
  box-shadow: inset 0px 0px 2px 1px rgba(0, 0, 0, 0.25);
  background: url(${(props) => props.url});
  height: 100%;
  background-size: cover;
`
