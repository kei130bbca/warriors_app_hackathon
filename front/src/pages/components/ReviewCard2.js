import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Star from './Star';

function ReviewCard2(props) {
  const purchase = props.purchase;
  const product = props.product;
  const show_edit = props.show_edit ?? false;

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
      <Link to={'/review-posting/' + product.id}>
        <Button className={show_edit ? 'd-block' : 'd-none'}>Edit</Button>
      </Link>
    </Card>
  );
}

export default ReviewCard2;
