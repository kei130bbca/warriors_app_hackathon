import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { fetchUser } from './components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewCard2 from './components/ReviewCard2';
import LoginSystem from './components/LoginSystem';

class User {
  constructor(
    id,
    username,
    nickname,
    twitter_screenname,
    youtube_url,
    password,
    icon,
    desc
  ) {
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
  constructor(
    purchase_id,
    user_id,
    product_id,
    count,
    bouth_at,
    comment,
    stars,
    title
  ) {
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
    display: 'inline-block',
  },
  horizontalList: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    webkitOverflowScrolling: 'touch',
  },
  item: {
    display: 'inline-block',
    width: '90%',
    height: '400px',
    margin: '16px',
    fontSize: '48px',
    background: 'rgba(255, 0, 0, 0.4)',
  },
};

function Icon(props) {
  return (
    <div>
      <a href="/">
        <Image
          rounded
          src={props.src}
          width={props.width}
          height={props.height}
          alt=""
        />
      </a>
    </div>
  );
}

function InfluencerName(props) {
  return (
    <div className="bg-li">
      <div style={styles.inlineDisplay}>
        <Icon src={props.icon} height="100" />
      </div>
      <div style={styles.inlineDisplay}>
        <h3>{`${props.name}'s recommendations`}</h3>
        {props.desc}
      </div>
    </div>
    // <div className="media">
    //     <a href="/">
    //       <Image className="mr-3" src={props.icon} width="64" height="64" />
    //     </a>
    //   <div className="media-body">
    //     <h3 className="mt-0">
    //       {`${props.name}'s recommendations`}
    //     </h3>
    //     {props.desc}
    //   </div>
    // </div>
  );
}

function MainPage() {
  // const [users, setUsers] = useState(null);
  const [accessToken, setAcseesToken] = useState();

  useEffect(() => {
    fetchUser(1)
      .then((u) => {
        // setUsers(u);
        // console.log(u);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // useEffect(() => {
  //   postLogin('Yasoob', 'strongpassword')
  //     .then((data) => {
  //       setAcseesToken(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     })
  // }, []);

  const user1 = new User(
    1,
    'hikakin@gmail',
    'Hikakin',
    'hikakin_twitter',
    'https://www.youtube.com/user/HikakinTV',
    'aaabbb',
    'https://images.dog.ceo/breeds/shiba/shiba-8.jpg',
    'hi, im hikakin.'
  );
  const user2 = new User(
    2,
    'hikakin@gmail',
    'Masuo',
    'hikakin_twitter',
    'https://www.youtube.com/user/HikakinTV',
    'aaabbb',
    'https://images.dog.ceo/breeds/shiba/shiba-11.jpg',
    'hi, im hikakin.'
  );
  const purchase1 = new Purchase(
    1,
    1,
    11,
    5,
    2020 - 1 - 1,
    'This is my best book',
    3,
    'The greatest book'
  );
  const purchase2 = new Purchase(
    2,
    2,
    11,
    2,
    2020 - 1 - 1,
    'nice apple',
    4,
    'How nice apple!'
  );
  const purchase3 = new Purchase(
    3,
    2,
    12,
    10,
    2020 - 1 - 1,
    'nice orange',
    5,
    "I'v never seen like this orange!"
  );
  const purchase4 = new Purchase(
    3,
    2,
    13,
    10,
    2020 - 1 - 1,
    'nice orange',
    5,
    "I'v never seen like this orange!"
  );
  const product1 = new Product(
    11,
    'readable code',
    'https://images-na.ssl-images-amazon.com/images/I/51MgH8Jmr3L.jpg',
    2200,
    'https://books.rakuten.co.jp/rb/11753651/'
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

  const users = [user1, user2];
  const purchases = [purchase1, purchase2, purchase3, purchase4];
  const products = [product1, product2, product3];

  function getProduct(id) {
    const product = products.filter((product) => product.id === id);
    return product.length > 0 ? product[0] : null;
  }

  return (
    <div>
      <LoginSystem />
      {users.map((user) => {
        return (
          <div key={user.id}>
            <InfluencerName
              name={user.nickname}
              icon={user.icon}
              desc={user.desc}
            />
            <div className="container-fluid">
              <div className="row flex-row row flex-nowrap overflow-auto">
                {purchases
                  .filter((purchase) => purchase.user_id === user.id)
                  .map((purchase) => {
                    return (
                      <ReviewCard2
                        purchase={purchase}
                        product={getProduct(purchase.product_id)}
                        key={purchase.user_id + '' + purchase.product_id}
                      />
                    );
                  })}
              </div>
            </div>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
