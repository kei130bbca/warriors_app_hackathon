import React from 'react';
import { Row, Button, Container, Col } from 'react-bootstrap';
import Purchase from '../classes/Purchase';
import ReviewCard2 from './components/ReviewCard2';

function ReviewManagementPage() {
  const purchase2 = new Purchase(
    2,
    2,
    12,
    2,
    2020 - 1 - 1,
    'nice apple',
    4,
    'How nice apple!'
  );
  const purchase3 = new Purchase(
    3,
    2,
    13,
    10,
    2020 - 1 - 1,
    'nice orange',
    5,
    "I'v never seen like this orange!"
  );

  const purchases = [purchase2, purchase3];

  return (
    <Container className="text-center">
      <h1 className="my-3">Review management page</h1>
      <Row xs={1} md={2} gutter={4} className="my-5">
        {purchases.map((purchase) => (
          <ReviewCard2 purchase={purchase} show_edit={true} />
        ))}
      </Row>
      <Col className="my-5">
        <Button
          size="lg"
          onClick={() => {
            // history.push(`/influencerpersonal/?user_id=${data.id}`);
          }}
        >
          Add new review
        </Button>
      </Col>
    </Container>
  );
}

export default ReviewManagementPage;
