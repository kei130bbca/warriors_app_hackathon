import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { fetchUser, fetchUsers } from './components/api';
// import { Button } from 'react-bulma-components';

class User {
  id = 1;
  username = 'hikakin@gmail';
  nickname = 'Hikakin';
  twitter_screenname = 'hikakin_twitter';
  youtube_url = 'https://www.youtube.com/user/HikakinTV';
  password = 'aaabbb';
  icon = 'https://images.dog.ceo/breeds/shiba/shiba-8.jpg';
  desc = 'hi, im hikakin.';

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

function Icon(props) {
  return (
    <div>
      <a href="/">
        <img src={props.src} width={props.width} height={props.height} alt="" />
      </a>
    </div>
  );
}

function InfluencerName(props) {
  return (
    <div>
      <Icon src={props.icon} height="200" />
      <font>{`${props.name}'s recommendations`}</font>
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
      <a href="/">
        <img src={product.img} height="200" alt="" />
        <h2>{purchase.title}</h2>
        <p>{purchase.comment}</p>
        <Star stars={purchase.stars} />
      </a>
    </div>
  );
}

function Main() {
  const [userss, setUserss] = useState(null);
  // useEffect(() => {
  //   fetchUser(0).then((u) => {
  //     setUserss(u);
  //     console.log(u);
  //   }
  //   }, []);
  useEffect(() => {
    fetchUser(0).then((u) => {
      console.log(u);
    })
  });

  // fetch('https:8000/users/1')
  //   .then((response) => {
  //     if (response.ok) { // ステータスがokならば
  //       return response.text(); // レスポンスをテキストとして変換する
  //     } else {
  //       throw new Error();
  //     }
  //   })
  //   .then((text) => console.log(text))
  //   .catch((error) => console.log(error));

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
  const product1 = new Product(11, 'readable code', 'https://images-na.ssl-images-amazon.com/images/I/51MgH8Jmr3L.jpg', 2200, 'https://books.rakuten.co.jp/rb/11753651/');
  const product2 = new Product(12, 'apple', 'https://tshop.r10s.jp/ultra-taste/cabinet/daiiti/daiiti_143.jpg?fitin=275:275', 100, 'https://search.rakuten.co.jp/search/mall/%E3%82%8A%E3%82%93%E3%81%94/');
  const product3 = new Product(13, 'orange', 'https://tshop.r10s.jp/benikou/cabinet/orenge/imgrc0084994537.jpg?fitin=275:275', 200, 'https://item.rakuten.co.jp/benikou/10000723/?iasid=07rpp_10095___et-ktjubpdf-zqv-23e8ef5b-f7a1-4739-8075-3f19a787f7c7');

  const users = [user1, user2];
  const purchases = [purchase1, purchase2, purchase3];
  const products = [product1, product2, product3];

  return (
    <div>
      <p>TESTSTSTTTTTTTTTTTTTTTTTT</p>
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
                      ReviewElementArray.push(<ReviewCard purchase={purchase} product={product} />);
                    }
                  })
                }
              })}
              {ReviewElementArray}
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
      <Header title="Influencer's Recommendations" />
      <Main />
      <Footer />
    </div>
  );
}

export default MainPage;
