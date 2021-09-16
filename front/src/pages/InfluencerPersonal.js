import React, { Component } from 'react';
import axios from 'axios';
import ReviewCard from './components/ReviewCard';

class InfluencerPersonal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : 0,
            nickname : '',
            youtubleUrl : '',
            twitter : '',
            desc : '',
            img : '',
            ifShow : false,
            review : [],
        };
        this.generatorData = this.generatorData.bind(this);
        this.generatorData(this.state);
        this.manageOnClick = this.manageOnClick.bind(this);
        this.modifyOnClick = this.modifyOnClick.bind(this);
    }

    manageOnClick(){
        alert('You click manage!');
    };

    modifyOnClick(){
        alert('You click modify!');
    };

    generatorData = async(state) =>{        
        let response_user = await axios.get('http://localhost:8000/users/1');        
        let temp_data = response_user.data;
        console.log(temp_data);
        let temp_id = 0
        let temp_nickname = '';
        let temp_twitter = '';
        let temp_youtuble = '';
        let temp_desc = '';
        let temp_img = '';
        let ifShow = false
        if(temp_data.id == temp_id){
            ifShow = true;
        }
        if(temp_data.nickname){
            temp_nickname = temp_data.nickname;
        }else{
            temp_nickname = 'A Lazy man with no nickname';
         }
        if(temp_data.youtube_url){
            temp_youtuble = temp_data.youtube_url;
        }else{
            temp_youtuble = 'A Lazy man who did not fill in his youtuble url.';
        }
        if(temp_data.twitter_screenname){
            temp_twitter = temp_data.twitter_screenname;
        }else{
            temp_twitter = 'A Lazy man who did not fill in his twitter screenname.';
        }
        if(temp_data.description){
            temp_desc = temp_data.description;
        }else{
            temp_desc = 'A lazy man with no description.';
        }
        if(temp_data.icon){
            temp_img = temp_data.icon;
        }else{
            temp_img = 'A lazy man who did not upload his icon.';
        }

        let response_review = await axios.get('http://localhost:8000/purchases', {
            params:{
                user_id: 1
            }},
            {headers:{'Content-Type':'application/x-www-form-urlencode'}}
        );       
        temp_data = [];
        temp_data = response_review.data
        for(let i = 0; i < temp_data.length; i++){
            let temp_url = 'http://localhost:8000/products/' + temp_data[i].products_id;
            let response_product = await axios.get(temp_url);
            temp_data[i].img = response_product.data.img
        }
        this.setState({
            review: temp_data,
            nickname: temp_nickname,
            youtubleUrl: temp_youtuble,
            twitter: temp_twitter,
            desc: temp_desc,
            img: temp_img,
            ifShow: ifShow,
        })
    };

    render() {
    console.log(this.state.review);
        let reviewData = this.state.review.map((item, index) =>{
            return (
                <ReviewCard img = {item.img} title = {item.title} content = {item.comment} />
            )
        })
        return (
            <div>
                <h1 style = {styles.title} > {this.state.nickname}'s personal page</h1>
                <div>
                    {
                        this.state.ifShow?(
                            <button style = {styles.manageButton} onClick = {this.manageOnClick}>Review management</button>
                        ):null
                    }
                </div>
                <div style = {styles.reviewLength}>
                    {reviewData}
                </div>
                <div>
                    {
                        this.state.ifShow?(
                            <button style = {styles.modiButton} onClick = {this.modifyOnClick} >modify your information</button>
                        ):null
                    }
                </div>
                <div>
                    <img src = {this.state.img} />
                    <div>
                        <span>nickname:</span>
                        <span>{this.state.nickname}</span>
                    </div>
                    <div>
                        <span>Youtuble:</span>
                        <span>{this.state.youtubleUrl}</span>
                    </div>
                    <div>
                        <span>Twitter:</span>
                        <span>{this.state.twitter}</span>
                    </div>
                    <div>
                        <span>Description:</span>
                        <span>{this.state.desc}</span>
                    </div>                    
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
}

export default InfluencerPersonal