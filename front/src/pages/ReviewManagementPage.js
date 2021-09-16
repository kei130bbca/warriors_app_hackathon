import React from 'react';
import { Row, Button, Container, Col } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import Purchase from '../classes/Purchase';
import Product from '../classes/Product';
import Star from './components/Star';
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
  const product2 = new Product(
    12,
    'apple',
    'https://tshop.r10s.jp/ultra-taste/cabinet/daiiti/daiiti_143.jpg?fitin=275:275',
    100,
    'https://search.rakuten.co.jp/search/mall/%E3%82%8A%E3%82%93%E3%81%94/'
  );
  const product3 = new Product(
    13,
    'orange',
    'https://tshop.r10s.jp/benikou/cabinet/orenge/imgrc0084994537.jpg?fitin=275:275',
    200,
    'https://item.rakuten.co.jp/benikou/10000723/?iasid=07rpp_10095___et-ktjubpdf-zqv-23e8ef5b-f7a1-4739-8075-3f19a787f7c7'
  );

  const purchases = [purchase2, purchase3];
  const products = [product2, product3];

  return (
    <Container className="text-center">
      <h1 className="my-3">Review management page</h1>
      <Row xs={1} md={2} gutter={4} className="my-5">
        {purchases.map((purchase) =>
          products
            .filter((product) => purchase.product_id === product.id)
            .map((product) => (
              <ReviewCard2
                purchase={purchase}
                product={product}
                show_edit={true}
              />
            ))
        )}
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
