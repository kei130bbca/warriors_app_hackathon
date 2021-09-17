import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginSystem(props) {
  const token = localStorage.getItem('token');
  const history = useHistory();
  let data = {
    username: '',
    password: '',
  };
  const [userData, setUserData] = useState(data);
  if (token) {
    return <div></div>;
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
      default:
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
        'Content-Type': 'application/json;',
      },
      body: JSON.stringify(request),
    })
      .then((res) => {
        console.log(res.ok);
        if (res.ok === true) {
          return res.json();
        } else {
          throw new Error('sss');
        }
      })
      .then((data) => {
        // console.log(data);
        const token = data.access_token;
        localStorage.setItem('token', token);

        fetch('http://localhost:8000/auth_user', {
          headers: {
            'Content-Type': 'application/json;',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok === true) {
              return res.json();
            } else {
              throw new Error('token is expired.');
            }
          })
          .then((data) => {
            // console.log(data);
            localStorage.setItem('user_id', data.id);
            history.push({
              pathname: `/influencerpersonal/${data.id}`,
            });
          })
          .catch((e) => {
            console.log(e);
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
          });
      });
  }

  return (
    <Container fluid className={props.className}>
      <Row>
        <h2>
          You wanna be a influencer? &rarr;
          <Link to="/influencer-registration-form">get registerd!</Link>
        </h2>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
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
  );
}

export default LoginSystem;
