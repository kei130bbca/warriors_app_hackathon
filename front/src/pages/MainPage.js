import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { fetchUser, fetchUsers } from './components/api';
import { Form, Button, Row, Col, Card, Image, Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class User {
  constructor(id,
    username,
    nickname,
    twitter_screenname,
    youtube_url,
    password,
    icon,
    desc) {
    this.id = id;
    this.username = username;
    this.nickname = nickname;
    this.twitter_screenname = twitter_screenname;
    this.youtube_url = youtube_url;
    this.password = password;
    this.icon = icon;
    this.desc = desc;
  }
}

class Purchase {
  constructor(purchase_id,
    user_id,
    product_id,
    count,
    bouth_at,
    comment,
    stars,
    title) {
    this.purchase_id = purchase_id;
    this.user_id = user_id;
    this.product_id = product_id;
    this.count = count;
    this.bouth_at = bouth_at;
    this.comment = comment;
    this.stars = stars;
    this.title = title;
  }
}

class Product {
  constructor(id, name, img, price, url) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.url = url;
  }
}

const styles = {
  inlineDisplay: {
    display: 'inline-block'
  },
  horizontalList: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    webkitOverflowScrolling: 'touch'
  },
  item: {
    display: 'inline-block',
    width: '90%',
    height: '400px',
    margin: '16px',
    fontSize: '48px',
    background: 'rgba(255, 0, 0, 0.4)'
  }
};


function Icon(props) {
  return (
    <div>
      <a href="/">
        <Image rounded src={props.src} width={props.width} height={props.height} alt="" />
      </a>
    </div>
  );
}

function InfluencerName(props) {
  return (
    <div>
      <div style={styles.inlineDisplay}>
        <Icon src={props.icon} height="200" />
      </div>
      <div style={styles.inlineDisplay}>
        <h3>
          {`${props.name}'s recommendations`}
        </h3>
      </div>
    </div>
  );
}

function Star(props) {
  return (
    <div>
      <span>★{props.stars}</span>
    </div>
  );
}



function ReviewCard(props) {
  const purchase = props.purchase;
  const product = props.product;

  return (
    <div>
      {/* <img src={product.img} height="200" alt="" />
        <h2>{purchase.title}</h2>
        <p>{purchase.comment}</p>
        <Star stars={purchase.stars} /> */}
      <Card style={{ width: '18rem' }}>
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

function LoginSystem(props) {
  const loginState = props.loginState;
  // const loginState = true;
  // if (loginState === true) {
  //   return (
  //     <div>
  //       <a href="/influencerparsonal">
  //         go to personal page
  //       </a>
  //     </div>
  //   );
  // }
  return (
    <div>
      <Form >
        <p>
          <font>You wanna be a influencer? &rarr;  </font>
          <a href="/influencer-registration-form"> get registerd!</a>
        </p>
        <Row className="align-itme-center">
          <Col xs="auto">
            <Form.Group>
              {/* <Form.Label>username: </Form.Label> */}
              {/* <input type="text"></input> */}
              <Form.Control type="email" placeholder="username" />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Form.Group>
              {/* <Form.Label>password: </Form.Label> */}
              {/* <input type="text"></input> */}
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

function Main() {
  // const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUser(1).then((u) => {
      // setUsers(u);
      console.log(u);
    })
      .catch((e) => {
        console.log(e);
      })
  }, []);

  const user1 = new User(
    1,
    'hikakin@gmail',
    'Hikakin',
    'hikakin_twitter',
    'https://www.youtube.com/user/HikakinTV',
    'aaabbb',
    'https://images.dog.ceo/breeds/shiba/shiba-8.jpg',
    'hi, im hikakin.');
  const user2 = new User(
    2,
    'hikakin@gmail',
    'Masuo',
    'hikakin_twitter',
    'https://www.youtube.com/user/HikakinTV',
    'aaabbb',
    'https://images.dog.ceo/breeds/shiba/shiba-11.jpg',
    'hi, im hikakin.')
  const purchase1 = new Purchase(1, 1, 11, 5, 2020 - 1 - 1, 'This is my best book', 3, 'The greatest book');
  const purchase2 = new Purchase(2, 2, 12, 2, 2020 - 1 - 1, 'nice apple', 4, 'How nice apple!');
  const purchase3 = new Purchase(3, 2, 13, 10, 2020 - 1 - 1, 'nice orange', 5, "I'v never seen like this orange!");
  const purchase4 = new Purchase(3, 2, 13, 10, 2020 - 1 - 1, 'nice orange', 5, "I'v never seen like this orange!");
  const product1 = new Product(11, 'readable code', 'https://images-na.ssl-images-amazon.com/images/I/51MgH8Jmr3L.jpg', 2200, 'https://books.rakuten.co.jp/rb/11753651/');
  const product2 = new Product(12, 'apple', 'https://tshop.r10s.jp/ultra-taste/cabinet/daiiti/daiiti_143.jpg?fitin=275:275', 100, 'https://search.rakuten.co.jp/search/mall/%E3%82%8A%E3%82%93%E3%81%94/');
  const product3 = new Product(13, 'orange', 'https://tshop.r10s.jp/benikou/cabinet/orenge/imgrc0084994537.jpg?fitin=275:275', 200, 'https://item.rakuten.co.jp/benikou/10000723/?iasid=07rpp_10095___et-ktjubpdf-zqv-23e8ef5b-f7a1-4739-8075-3f19a787f7c7');

  const users = [user1, user2];
  const purchases = [purchase1, purchase2, purchase3, purchase4];
  const products = [product1, product2, product3];

  return (
    <div>
      {
        users.map((user) => {
          let ReviewElementArray = [];
          return (
            <div>
              <InfluencerName name={user.nickname} icon={user.icon} />
              {purchases.map((purchase) => {
                if (purchase.user_id === user.id) {
                  products.map((product) => {
                    if (purchase.product_id === product.id) {
                      ReviewElementArray.push(
                        <div className="col">
                          <ReviewCard purchase={purchase} product={product} />
                        </div>
                      );
                    }
                  })
                }
              })}
              <div className="container-fluid">
                <div className="row flex-row row flex-nowrap overflow-auto">
                  {ReviewElementArray}
                </div>
              </div>
              <br>
              </br>
            </div>
          );
        })
      }
    </div>
  );
}

function MainPage() {
  return (
    <div>
      <Header title="Influencer's Recommendations" path="/" auth={true} />
      <LoginSystem />
      <Main />
      <Footer />
    </div>
  );
}

export default MainPage;
