import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

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
    const purchase2 = new Purchase(2, 2, 12, 2, 2020 - 1 - 1, 'nice apple', 4, 'How nice apple!');
    const purchase3 = new Purchase(3, 2, 13, 10, 2020 - 1 - 1, 'nice orange', 5, "I'v never seen like this orange!");
    const product2 = new Product(12, 'apple', 'https://tshop.r10s.jp/ultra-taste/cabinet/daiiti/daiiti_143.jpg?fitin=275:275', 100, 'https://search.rakuten.co.jp/search/mall/%E3%82%8A%E3%82%93%E3%81%94/');
    const product3 = new Product(13, 'orange', 'https://tshop.r10s.jp/benikou/cabinet/orenge/imgrc0084994537.jpg?fitin=275:275', 200, 'https://item.rakuten.co.jp/benikou/10000723/?iasid=07rpp_10095___et-ktjubpdf-zqv-23e8ef5b-f7a1-4739-8075-3f19a787f7c7');

    const purchases = [purchase2, purchase3];
    const products = [product2, product3];

    let ReviewElementArray = [];
    return (
        <div>
            {
                purchases.map((purchase) => {
                    products.map((product) => {
                        if (purchase.product_id === product.id) {
                            ReviewElementArray.push(<ReviewCard purchase={purchase} product={product} />)
                        }
                    })
                })
            }
            {ReviewElementArray}
            <button type="submit"> Add new review </button>
        </div>
    );
}

function ReviewManagementPage() {
    return (
        <div>
            <Header title="Review Management" />
            <Main />
            <Footer />
        </div>

    );
}

export default ReviewManagementPage;