import styled from 'styled-components';


const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`

const Button = styled.button`
  border: solid 2px var(--color-2);
  color: var(--color-2);
  background-color: var(--color-5);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
`

export { Container, Button };
