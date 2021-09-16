import React from 'react'
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
    }

    generatorData = async(state) =>{
        let temp_data = [];
        let temp_url_product = 'http://localhost:8000/products/' + 'AAAAA';
        let response_product = await axios.get(temp_url_product);
        let temp_url_review = 'http://localhost:8000/purchases/' + 'AAAAA';
        let response_review = await axios.get(temp_url_review, {
            params:{
                product_id: 'AAAAA',
            }}
        );
        this.setState({
            review: response_review.data,
            item_img: response_product.data.img,
            item_name: response_product.data.name,
            item_price: response_product.data.price,
        })
    };

    render() {
        let reviewData = this.state.review.map((item, index) =>{
            return (
                <ReviewCard img = {item.img} title = {item.title} content = {item.content} />
            )
        })
        return (
            <div>
                <h1 style = {styles.title} >Product Detail Page</h1>
                <div>
                    <div style = {styles.inlineDisplay}>
                        <img src = {testUrl}></img>
                        <div style = {styles.inlineDisplay}>
                            <div>
                                <h2>{this.state.item_name}</h2>
                            </div>
                        <div>
                            {this.state.item_price}
                        </div>
                    </div>
                </div>
                </div>
                <div style = {styles.reviewLength}>
                    {reviewData}
                </div>
            </div>
        );
    }
};

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
    inlineDisplay:{
        display: 'inline-block'
    },
}
 
export default ProductDetail