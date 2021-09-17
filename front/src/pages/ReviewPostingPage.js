import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Row, Button, Container, Col, Form } from 'react-bootstrap';
import axios from 'axios';

function ReviewPostingPage() {
  let { id } = useParams();
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [star, setStar] = useState(3);
  const [img, setImg] = useState('');

  useEffect(() => {
    console.log(id);
    axios
      .get('http://localhost:8000/purchases?product_id=' + id)
      .then((response) => {
        let data = response.data;
        if (data.length === 0) {
          return;
        }
        data = data[0];
        setTitle(data.title);
        setComment(data.comment);
        setStar(data.star);
        return data.products_id;
      })
      .then((product_id) =>
        axios
          .get('http://localhost:8000/products/' + product_id)
          .then((response) => setImg(response.data.img))
      )
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container className="text-center pt-5 px-xl-5">
      <img src={img} height="250" alt="" />
      <Form className="mt-5 mx-xl-5 px-xl-5">
        <Form.Group as={Row} className="mb-3" controlId="title">
          <Form.Label column xs={2}>
            Title
          </Form.Label>
          <Col xs={10}>
            <Form.Control
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="comment">
          <Form.Label column xs={2}>
            Comment
          </Form.Label>
          <Col xs={10}>
            <Form.Control
              as="textarea"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="comment">
          <Form.Label column xs={2}>
            Star
          </Form.Label>
          <Col>
            <Form.Select
              value={star}
              onChange={(e) => setStar(parseInt(e.target.value))}
            >
              {[...Array(5).keys()]
                .map((i) => ++i)
                .map((i) => (
                  <option value={i}>{i}</option>
                ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </Form>
      <Button
        onClick={() => {
          console.log(title, comment, star);
          axios.put('http://localhost:8000/purchases/' + id, {
            title,
            comment,
            star,
          });
        }}
      >
        Submit
      </Button>
    </Container>
  );
}

export default ReviewPostingPage;
