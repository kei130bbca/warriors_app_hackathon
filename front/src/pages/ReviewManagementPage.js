import React, { useEffect, useState } from 'react';
import { Row, Button, Container, Col } from 'react-bootstrap';
import Purchase from '../classes/Purchase';
import ReviewCard2 from './components/ReviewCard2';
import { fetchPurchases } from './components/api';
import { useHistory } from 'react-router-dom';

function ReviewManagementPage() {
  const [purchases, setPurchases] = useState([]);
  const [userId, setUserId] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:8000/auth_user', {
        headers: {
          'Content-Type': 'application/json;',
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        if (res.ok === true) {
          return res.json();
        } else { throw ('token is expired.') }
      }).then((data) => {
        // console.log(data);
          localStorage.setItem('user_id', data.id);
          setUserId(data.id);
          console.log(data.id);
        
      })
        .catch((e) => {
          console.log(e);
          localStorage.removeItem('token');
          localStorage.removeItem('user_id');
          history.push({ pathname: "/"});
        })
    }
  }, []);

  useEffect(() => {
    fetchPurchases(userId)
    .then((data) => {
      console.log(data);
      setPurchases(data);
    })
  }, [userId]);

  return (
    <Container className="text-center">
      <h1 className="my-3">Review management page</h1>
      <Row xs={1} md={2} gutter={4} className="my-5">
        {purchases.map((purchase) => (
          <ReviewCard2 purchase={purchase} show_edit={true} />
        ))}
      </Row>
      <Col className="my-5">
        {/* <Button
          size="lg"
          onClick={() => {
            // history.push(`/influencerpersonal/?user_id=${userId}`);
          }}
        >
          Add new review
        </Button> */}
      </Col>
    </Container>
  );
}

export default ReviewManagementPage;
