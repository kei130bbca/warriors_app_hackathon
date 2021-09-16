import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { fetchAuthUser, postLogin } from './api';
import { useHistory } from 'react-router-dom';

function LoginSystem(props) {
    const loginState = localStorage.getItem('token');
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const history = useHistory()
    let data = {
        username: '',
        password: ''
    };
    const [userData, setUserData] = useState(data);
    if (loginState) {
      return (
        <div>
        </div>
      );
    }

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
        setUserData(data);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const request = {
            username: userData.username,
            password: userData.password,
        };
        fetch(`http://localhost:8000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify(request)
        })
            .then((res) => {
                console.log(res.ok);
                if (res.ok === true) {
                    return res.json();
                } else {
                    throw ("sss");
                }
            }).then((data) => {
                // console.log(data);
                const token = data.access_token;
                localStorage.setItem('token', token);
                
                fetch('http://localhost:8000/auth_user', {
                    headers: {
                        'Content-Type': 'application/json;',
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((res) => {
                        if (res.ok === true) {
                            return res.json();
                        }
                    })
                    .then((data) => {
                        // console.log(data);
                        history.push({
                            pathname: `/influencerpersonal/?user_id=${data.id}`,
                            state: { user_id: data.id }
                        }
                        )
                    })
            });

    }

    return (
        <div className="container">
            <Container>
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
                            <Button variant="primary" type="submit" id="loginButton">
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