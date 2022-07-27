import styled from 'styled-components';


const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 90vh;
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

const styleButton = {
  border: 'solid 2px var(--color-2)',
  color: 'var(--color-2)',
  backgroundColor: 'var(--color-5)',
  padding: '2px 10px',
  borderRadius: '6px',
  fontSize: '16px',
  marginLeft: '10px',
  cursor: 'pointer',
}

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const styleTextField = {
  color: 'var(--color-2)',
  borderRadius: '6px',
  fontSize: '16px',
};

const styleTableContainer = {
  padding: '20px',
  width: '80%',
}

export { Container, Button };
export { styleModal, styleButton, styleTextField, styleTableContainer };
