import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function Star(props) {
  return (
    <div>
      <span>★{props.stars}</span>
    </div>
  );
}

function ReviewCard2(props) {
  const purchase = props.purchase;
  const product = props.product;

  return (
    <Card style={{ width: '18rem' }} className="bg-light text-dark">
      <Link to={'productDetail/' + product.id}>
        <Card.Img variant="top" src={product.img} />
        <Card.Body>
          <Card.Title>{purchase.title}</Card.Title>
          <Card.Text>
            {purchase.comment}
            <Star stars={purchase.stars} />
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}

export default ReviewCard2;
