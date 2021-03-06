import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Star from './Star';
import axios from 'axios';

function ReviewCard2(props) {
  const purchase = props.purchase;
  const show_edit = props.show_edit ?? false;
  const [img, setImg] = useState('');

  useEffect(() => {
    if (props.show_user) {
      console.log(purchase);
      axios
        .get('http://localhost:8000/users/' + purchase.users_id)
        .then((res) => {
          setImg(res.data.icon);
        });
    } else {
      axios
        .get('http://localhost:8000/products/' + purchase.products_id)
        .then((res) => {
          setImg(res.data.img);
        });
    }
  }, []);

  return (
    <Card style={{ width: '18rem' }} className="bg-light text-dark">
      <Link to={'/productDetail/' + purchase.products_id}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{purchase.title}</Card.Title>
          <Card.Text>
            {purchase.comment}
            <Star stars={purchase.stars} />
          </Card.Text>
        </Card.Body>
      </Link>
      <Link to={'/review-posting/' + purchase.purchase_id}>
        <Button className={show_edit ? 'd-block' : 'd-none'}>Edit</Button>
      </Link>
    </Card>
  );
}

export default ReviewCard2;
