import React from 'react';
import ReviewCard from './components/ReviewCard';
import axios from 'axios';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item_id: '',
      item_img: '',
      item_name: '',
      item_price: 0,
      review: [],
    };
    this.generatorData = this.generatorData.bind(this);
    this.generatorData(this.state);
    console.log(this.state);
  }

    generatorData = async(state) =>{
        let temp_data = [];
        let temp_url_product = 'http://localhost:8000/products/' + 'belluna-gourmet:10023396';
        let response_product = await axios.get(temp_url_product);
        temp_data = response_product.data
        let temp_name = '';
        temp_name = response_product.data.name;
        let temp_img = response_product.data.img;
        let temp_price = response_product.data.price;

        let temp_url_review = 'http://localhost:8000/purchases';
        let response_review = await axios.get(temp_url_review, {
            params:{
                product_id: '946kitchen:10004398',
            }}
        );
        temp_data = response_review.data;
        for(let i = 0; i < temp_data.length; i++){
            let temp_user_icon = 'http://localhost:8000/users/' + temp_data[i].users_id;
            let response_user = await axios.get(temp_user_icon);
            console.log(response_user.data);
            temp_data[i].img = response_user.data.icon;
        }
        this.setState({
            review: temp_data,
            item_img: temp_img,
            item_name: temp_name,
            item_price: temp_price,
        })
    };

  render() {
    let reviewData = this.state.review.map((item, index) => {
      return (
        <ReviewCard img={item.img} title={item.title} content={item.content} />
      );
    });
    return (
      <div>
        <h1 style={styles.title}>Product Detail Page</h1>
        <div>
          <div style={styles.inlineDisplay}>
            <img src={this.state.item_img}></img>
            <div style={styles.inlineDisplay}>
              <div>
                <h2>{this.state.item_name}</h2>
              </div>
              <div>{this.state.item_price}</div>
            </div>
          </div>
        </div>
        <div style={styles.reviewLength}>{reviewData}</div>
      </div>
    );
  }
}

const styles = {
  title: {
    textAlign: 'center',
  },
  modiButton: {
    maxWidth: '150px',
  },
  manageButton: {
    maxWidth: '150px',
  },
  reviewLength: {
    maxWidth: '1000px',
  },
  inlineDisplay: {
    display: 'inline-block',
  },
};
export default ProductDetail;
