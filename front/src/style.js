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
  textDecoration: 'none',
}

const smallButton = {
  border: 'solid 2px var(--color-2)',
  color: 'var(--color-2)',
  backgroundColor: 'var(--color-5)',
  padding: '2px 10px',
  borderRadius: '6px',
  fontSize: '16px',
  marginLeft: '10px',
  cursor: 'pointer',
  textDecoration: 'none',
  width : '80px',
  height : '40px'
}

const middleButton = {
  border: 'solid 2px var(--color-2)',
  color: 'var(--color-2)',
  backgroundColor: 'var(--color-5)',
  margin: '20px 10px',
  padding: '2px 10px',
  borderRadius: '6px',
  fontSize: '16px',
  marginLeft: '10px',
  cursor: 'pointer',
  textDecoration: 'none',
  width : '100px',
  height : '40px'
}

const checkStyleButton = {
  border: 'solid 2px var(--color-2)',
  color: 'var(--color-2)',
  backgroundColor: 'var(--color-5)',
  margin: '20px 10px',
  padding: '15px 15px',
  borderRadius: '6px',
  fontSize: '15px',
  marginLeft: '10px',
  cursor: 'pointer',
  textDecoration: 'none',
  width:'80px',
  height:'60px',
}

const checkButton = {
  border: 'solid 2px var(--color-2)',
  color: 'var(--color-2)',
  margin: '20px 10px',
  borderRadius: '6px',
  fontSize: '40px',
  textDecoration: 'none',
  width : "180px",
  height : "60px",
  
}

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color:'white',
  bgcolor: 'rgba(0,0,0,0.7)',  
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '15px'
};

const styleTextField = {
  color: 'var(--color-2)',
  borderRadius: '6px',
  fontSize: '16px',
};

const EmailValidationstyleTextField = {
  color: 'var(--color-2)',
  borderRadius: '6px',
  fontSize: '16px',
  width : '200px'
}

const styleTableContainer = {
  padding: '20px',
  width: '75%',
  backgroundColor: "rgba(0,0,0,0.3)",
  borderRadius: '15px'
  
}
const styleContainer = {
  padding: '20px',
  width: '75%',
  backgroundColor: "rgba(0,0,0,0.3)",
  borderRadius: '15px'
}

const styleModalkContainer = {
  padding : "20px",
  width : '38%',
  height : '35%',
  backgroundColor : 'rgba(0,0,0,0.3)',
  borderRadius: '15px'
}

const stylePagination = {
  backgroundColor: 'var(--color-2)',
}

const styleModalmiddleContainer = {
  padding : "20px",
  width : '38%',
  height : '55%',
  backgroundColor : 'rgba(0,0,0,0.3)',
  borderRadius: '15px'
}



export { Container, Button };
export { styleModal, styleButton, styleTextField, styleTableContainer, stylePagination, styleModalkContainer,
  EmailValidationstyleTextField, checkButton, checkStyleButton, smallButton, middleButton, styleContainer, styleModalmiddleContainer };
