import React from 'react'
import axios from 'axios';
import ReviewCard2 from './components/ReviewCard2';
import { withRouter, useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item_id: '',
            item_img: '',
            item_name: '',
            item_price: 0,
            item_url: '',
            review: [],
        };
        this.generatorData = this.generatorData.bind(this);
        this.generatorData(this.state);
    }

    generatorData = async(state) =>{
        let temp_data = [];
        let product_id = this.props.match.params.id;
        let temp_url_product = 'http://localhost:8000/products/' + product_id;
        let response_product = await axios.get(temp_url_product);
        let temp_name = response_product.data.name;
        let temp_img = response_product.data.img;
        let temp_price = response_product.data.price;
        let temp_url = response_product.data.url;

        let temp_url_review = 'http://localhost:8000/purchases';
        let response_review = await axios.get(temp_url_review, {
            params:{
                product_id: product_id,
            }}
        );
        temp_data = response_review.data;
        for(let i = 0; i < temp_data.length; i++){
            let temp_user_icon = 'http://localhost:8000/users/' + temp_data[i].users_id;
            let response_user = await axios.get(temp_user_icon);
            temp_data[i].img = response_user.data.icon;
        }        
        this.setState({
            review: temp_data,
            item_img: temp_img,
            item_name: temp_name,
            item_price: temp_price,
            item_url: temp_url,
        })
        console.log(this.state.review);
    };

    render() {
            let reviewData = this.state.review.map((item, index) =>{
                return (
                    <ReviewCard2
                        purchase={item}
                        product={item}
                        key={item.user_id + '' + this.state.item_id}
                    />
                )
            })  
        return (
            <div>
                <div>
                    <h1 style = {styles.title}>product detail page</h1>
                    <div style ={styles.products}>
                        <img src = {this.state.item_img} style = {styles.displayPic}></img>
                        <div style = {styles.displayTitle}>
                            <div >
                                <span>{this.state.item_name}</span>
                            </div>
                            <div style = {styles.price}>
                                {'$:  ' + this.state.item_price}
                            </div>
                            <div style = {styles.link}>
                                <span>Buy it in Rakuten Ichiba:</span>
                                <a href = {this.state.item_url}>{this.state.item_url}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style = {styles.reviewLength}>
                    <div className="container-fluid">
                        <div className="row flex-row row flex-nowrap overflow-auto">
                            {reviewData}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const styles = {
    title: {
        textAlign: 'center',
        padding: '50px',
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
    displayTitle:{
        display: 'inline-block',
        maxWidth: '600px',
        marginTop: '30px',
    },
    displayPic:{
        Width: '400px',
        height: '400px',
        verticalAlign: 'top',
        padding: '10px',
    },
    products:{
        textAlign: 'center',
        Height: '750px',
    },
    inlineDisplay:{
        display: 'inline-block',
    },
    price:{
        marginTop: '30px',
    },
    link: {
        marginTop: '30px',
    },
}
 
export default withRouter(ProductDetail)