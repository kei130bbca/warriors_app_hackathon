import React from 'react';
import { Container, Form, Row, Col, Button} from 'react-bootstrap';

function LoginSystem(props) {
    const loginState = props.loginState;
    // const loginState = true;
    // if (loginState === true) {
    //   return (
    //     <div>
    //       <a href="/influencerparsonal">
    //         go to personal page
    //       </a>
    //     </div>
    //   );
    // }
  
    // postLogin('Yasoob', 'strongpassword')
    //   .then((data) => {
    //     setAcseesToken(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
  
    function handleSubmit(event) {
      event.preventDefault();
      console.log(event);
    }
  
    return (
      <div className="container">
        <Container>
          {/* <Toast>
            <Toast.Header>
              <strong className="me-auto">You wanna be a influencer? </strong>
            </Toast.Header>
            <Toast.Body>
              <a href="/influencer-registration-form"> Get registerd!</a>
            </Toast.Body>
          </Toast> */}
          <Form onSubmit={handleSubmit}>
            <Row className="align-itme-center">
              <Col xs="auto">
                <h2>You wanna be a influencer? &rarr;
                  <a href="/influencer-registration-form"> get registerd!</a>
                </h2>
              </Col>
            </Row>
            <Row className="align-itme-center">
              <Col xs>
                <Form.Group>
                  {/* <Form.Label>username: </Form.Label> */}
                  {/* <input type="text"></input> */}
                  <Form.Control type="text" placeholder="username" />
                </Form.Group>
              </Col>
              <Col xs>
                <Form.Group>
                  {/* <Form.Label>password: </Form.Label> */}
                  {/* <input type="text"></input> */}
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
              </Col>
              <Col xs="auto">
                <Button variant="primary" type="submit" >
                  Log in
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }

  export default LoginSystem;