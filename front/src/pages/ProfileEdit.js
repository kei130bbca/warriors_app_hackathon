import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Row, Button, Container, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router';
function Main() {
  let { token } = useParams();
  token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzE3NjUxODksImV4cCI6MTYzMTg1MTU4OSwianRpIjoiOWVjNmQ4YjEtMjQ0Ny00MzhmLWIwOGYtZTEyNTE0NjJhZjYxIiwiaWQiOjEsInJscyI6InZpZXdlciIsInJmX2V4cCI6MTYzNDM1NzE4OX0.s0Arc8FYByNWHL2JC3nHRjdOZjbNWfQzYniarmJCwVc';
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [youtube, setYoutube] = useState('');
  const [twitter, setTwitter] = useState('');
  const [desc, setDesc] = useState('');
  const [hasUploadedImage, setHasUploadedImage] = useState(false);

  useEffect(() => {
    console.log(token);
    axios
      .get('http://localhost:8000/auth_user', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        const data = response.data;
        setId(data.id);
        setNickname(data.nickname);
        setYoutube(data.youtube_url);
        setTwitter(data.twitter_screenname);
        setDesc(data.desc);
        setImageUrl(data.icon);
      })
      .catch((e) => console.error(e));
  }, []);

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
      setHasUploadedImage(true);
      setImageUrl(base64data);
    };
  };

  return (
    <Container className="text-center pt-5">
      <Row>
        <Col xs={4}>
          <img src={imageUrl} alt="icon shows up here" />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Icon</Form.Label>
            <Form.Control type="file" onChange={handleFile} accept="image/*" />
          </Form.Group>
        </Col>
        <Col xs={8}>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Nickname
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="Enter your nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Youtube URL
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="Enter your youtube url"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Twitter (without @)
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  placeholder="Enter your twitter screen name"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
              <Form.Label column xs={3}>
                Description
              </Form.Label>
              <Col xs={9}>
                <Form.Control
                  as="textarea"
                  placeholder="Enter your self introduction"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Button
        onClick={() => {
          // console.log(title, comment, star);
          let body = {
            nickname,
            youtube,
            twitter,
            desc,
          };
          if (hasUploadedImage) {
            body.img = imageUrl.split('data:image/png;base64,')[1];
          }
          axios
            .put('http://localhost:8000/users/' + id, body)
            .catch((e) => console.error(e));
        }}
      >
        Submit
      </Button>
    </Container>
  );
}
function ProfileEdit() {
  return (
    <div>
      <Header title="Profile Edit" />
      <Main />
      <Footer />
    </div>
  );
}

export default ProfileEdit;
