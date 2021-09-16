import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { useParams } from 'react-router';
import { Row, Button, Container, Col, Form } from 'react-bootstrap';
import axios from 'axios';

class Product {
  constructor(id, name, img, price, url) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.url = url;
  }
}

function Main() {
  const product3 = new Product(
    13,
    'orange',
    'https://tshop.r10s.jp/benikou/cabinet/orenge/imgrc0084994537.jpg?fitin=275:275',
    200,
    'https://item.rakuten.co.jp/benikou/10000723/?iasid=07rpp_10095___et-ktjubpdf-zqv-23e8ef5b-f7a1-4739-8075-3f19a787f7c7'
  );

  let { id } = useParams();
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [star, setStar] = useState(3);

  useEffect(() => {
    axios
      .get('http://localhost:8000/purchases/' + id)
      .then((response) => {
        const data = response.data;
        setTitle(data.title);
        setComment(data.comment);
        setStar(data.star);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container className="text-center pt-5 px-xl-5">
      <img src={product3.img} height="250" alt="" />
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
function ReviewPostingPage() {
  return (
    <div>
      <Header title="Review Posting Page" />
      <Main />
      <Footer />
    </div>
  );
}

export default ReviewPostingPage;
