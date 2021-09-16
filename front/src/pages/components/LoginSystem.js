import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { fetchAuthUser, postLogin } from './api';

function LoginSystem(props) {
    const loginState = props.loginState;
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    let data = {
        username: '',
        password: ''
    };
    const [userData, setUserData] = useState(data);
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

    function handleChange(event) {
        let data = userData;
        switch (event.target.name) {
            case 'username':
                // setUsername(event.target.value);
                data.username = event.target.value;
                break;
            case 'password':
                // setPassword(event.target.value);
                data.password = event.target.value;
                break;
        }
        // console.log(data);
        setUserData(data);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // console.log(userData);

        postLogin(userData.username, userData.password)
            .then((data) => {
                fetchAuthUser().then((token) => {
                    if (data.access_token === token) {
                        console.log('your auth.');
                    }
                }
                );
            })
            .catch((e) => {
                console.log(e);
            })
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
                                <Form.Control type="text" placeholder="username" name="username" onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col xs>
                            <Form.Group>
                                {/* <Form.Label>password: </Form.Label> */}
                                {/* <input type="text"></input> */}
                                <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} />
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