import React, {useEffect} from 'react';
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
function Review(props) {
    const stars = String(props.stars);
    // function handleChange(event) {
    //     event.preventDefault();
    // }
    useEffect(() => {
        if (props.title !== null) {
            document.getElementById('title').value = props.title;
        }
        if (props.comment !== null) {
            document.getElementById('comment').value = props.comment;
        }
    }, []);
    return (
        <form>
            <p>Title:<br></br>
            <input type="text" id="title"/></p>
            <p>Comment:<br></br>
            <textarea name="comment" id="comment" cols="30" rows="10" /></p>
            <p>Stars:<br></br>
            <select name="star" defaultValue={stars} >
                <option value="1">1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
            </select></p>
        </form>
    );
}

function Main() {
    const purchase3 = new Purchase(3, 2, 13, 10, 2020 - 1 - 1, 'nice orange', 4, "I'v never seen like this orange!");
    const product3 = new Product(13, 'orange', 'https://tshop.r10s.jp/benikou/cabinet/orenge/imgrc0084994537.jpg?fitin=275:275', 200, 'https://item.rakuten.co.jp/benikou/10000723/?iasid=07rpp_10095___et-ktjubpdf-zqv-23e8ef5b-f7a1-4739-8075-3f19a787f7c7');

    return (
        <div>
            <img src={product3.img} height="250" alt="" />
            <Review title={purchase3.title} comment={purchase3.comment} stars={purchase3.stars} />
            <button type="submit"> Submit </button>
        </div>
    );
}

function ReviewPostingPage() {
    return (
        <div>
            <Header title="Review Posting Page" />
            <Main />
            <Footer />
        </div>
    );
}

export default ReviewPostingPage;