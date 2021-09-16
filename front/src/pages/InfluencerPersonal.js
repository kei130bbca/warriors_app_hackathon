import React, { Component } from 'react';
import axios from 'axios';
import ReviewCard2 from './components/ReviewCard2';
import { Link } from 'react-router-dom';

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
            show_id: 0,
            done: false,
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
        let param = window.location.search;
        let user_id = param.split("=")[1];
        axios.get('http://localhost:8000/users/' + user_id)
        .then ((responce) =>{
            let temp_data = responce.data;
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
                temp_nickname = 'A lazy man with no nickname.';
            }
            if(temp_data.youtube_url){
                temp_youtuble = temp_data.youtube_url;
            }else{
                temp_youtuble = 'A lazy man who did not fill in his youtube url';
            }
            if(temp_data.twitter_screenname){
                temp_twitter = temp_data.twitter_screenname;
            }else{
                temp_twitter = 'A lazy man who did not fill in his twitter screenname.';
            }
            if(temp_data.description){
                temp_desc = temp_data.description;
            }else{
                temp_desc = 'A lazy man who has written no description about himself.';
            }
            if(temp_data.icon){
                temp_img = temp_data.icon;
            }else{
                temp_img = '';
            }
            axios.get('http://localhost:8000/purchases' ,
            {
                params:{
                    user_id: 1,
                }}
            ).then ( (response_review) => {
                let temp_data = response_review.data;
                let reviews = [];
                for(let i = 0; i < temp_data.length; i++){
                    let temp_url = 'http://localhost:8000/products/' + temp_data[i].products_id;
                    axios.get(temp_url)
                    .then((response_product) => {
                        temp_data[i].img = response_product.data.img;
                        reviews[i] = temp_data[i];
                        this.setState({
                            nickname: temp_nickname,
                            youtubleUrl: temp_youtuble,
                            twitter: temp_twitter,
                            desc: temp_desc,
                            img: temp_img,
                            ifShow: ifShow,
                            review: reviews,
                            show_id: user_id,
                        });
                    }).catch((e) => {
                        console.log(e);
                    });
                }
            }).catch( (error2) => {
                console.log(error2);
            })
        }).catch((error1) => {
            console.log(error1);
        });        
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
                <h1 style = {styles.title}>{this.state.nickname + "'s personial homepage"}</h1>
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