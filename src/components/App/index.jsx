import { Container } from 'reactstrap';

import Calculator from '../Calculator';
function App(props) {

  return (
    <div>
      <Container className="calcContainer">
        <Calculator />
        <Container className="footer">
          <br></br>
          <div className="line"></div>
          <br></br>
          <h6 className="copy">&copy; {new Date().getFullYear()} Griffin Davis. All Rights Reserved. <i className="mx-2 fas fa-space-shuttle"></i> <a className="footerLink" href="https://gcd.dev">gcd.dev</a></h6>
        </Container>
      </Container>
    </div>
  );
}

export default App;
