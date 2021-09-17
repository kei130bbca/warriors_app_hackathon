//import React from 'react';
import React, { useState } from 'react';
import './registrationform.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import {
  Container,
  CardGroup,
  Row,
  Col,
  InputGroup,
  Button,
} from 'react-bootstrap';
// Please change as needed
function InfluencerRegistrationForm() {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const youtube = document.getElementById('youtube').value;
    const twitter = document.getElementById('twitter').value;
    const desc = document.getElementById('desc').value;
    const img = imageUrl.split(',')[1];
    console.log(img);
    console.log('send');
    axios
      .post('http://localhost:8000/users', {
        username: username,
        nickname: nickname,
        password: password,
        youtube: youtube,
        twitter: twitter,
        desc: desc,
        img: img,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
    // history.push({
    //   pathname: '/',
    // });
  }
  //必須事項が入力されているかどうか確認
  function check() {
    console.log(document.getElementById);
    if (document.getElementById('registrationform').value === ' ') {
      alert('Please fill in the required fields.');
      return false;
    } else {
      return true;
    }
  }

  const handleFile = async (event) => {
    let files = event.target.files;
    files = Array.from(files).filter((file) => {
      return [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/bmp',
        'image/svg+xml',
      ].includes(file.type);
    });
    if (files.length === 0) return;
    // setFiles(files);
    const file = files[0];
    const image = URL.createObjectURL(file);
    console.log(image);
    // setImageUrl(image);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
      setImageUrl(base64data);
    };
  };

  return (
    <Container className="px-xl-5">
      <Row>
        <Col xl={2} xs={0}></Col>
        <Col>
          <h1>Influencer Registration Form</h1>
          <Form method="get" onSubmit={handleSubmit} id="registrationform">
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                User name *required
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="Rakuten Taro"
                  name="username"
                  id="username"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Nick name *required
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="Taro"
                  name="nickname"
                  id="nickname"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Password *required
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="1234abcd"
                  name="password"
                  id="password"
                />
              </Col>
            </Form.Group>
            <Row>
              <Col auto>
                <img src={imageUrl} alt="icon shows up here" />
              </Col>
              <Col auto>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Upload Icon</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFile}
                    accept="image/*"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Twitter
              </Form.Label>
              <Col xs={9}>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Form.Control
                    placeholder="xxx_xxx"
                    name="twitter_screenname"
                    id="twitter"
                  />
                </InputGroup>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                YouTube
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="https://www.youtube.com/user/xxx"
                  name="youtube_url"
                  id="youtube"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Your Description
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="Age, Hobby, Nationality..."
                  name="desc"
                  id="desc"
                  as="textarea"
                />
              </Col>
            </Form.Group>
            <div className="text-center">
              {' '}
              <Button onClick={check} type="submit">
                Submit
              </Button>
            </div>

            {/* <input type="submit" className="button" onClick={check} /> */}
          </Form>
        </Col>
        <Col xl={2} xs={0}></Col>
      </Row>
    </Container>
  );
}

export default InfluencerRegistrationForm;
