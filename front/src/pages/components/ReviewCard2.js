import React from 'react';
import { Card } from 'react-bootstrap';

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
        <div>
            <Card style={{ width: '18rem' }} className="bg-light text-dark">
                <a href="/" >
                    <Card.Img variant="top" src={product.img} />
                </a>
                <Card.Body>
                    <Card.Title>{purchase.title}</Card.Title>
                    <Card.Text>
                        {purchase.comment}
                        <Star stars={purchase.stars} />
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ReviewCard2;