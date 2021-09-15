import React, { Component } from 'react';
import testUrl from './test.png';
import axios from 'axios';
import Qs from 'qs';
// import Review from './Review'


class InfluencerPersonal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : 1,
            nickname : 'YOUBO',
            youtubleUrl : 'qqqqqqq',
            twitter : 'qwwererr',
            desc : 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
            img : './test.png',
            ifShow : true,
            review : [],
        };
        // this.generatorData = this.generatorData.bind(this);
        // this.generatorData(this.state)
        this.manageOnClick = this.manageOnClick.bind(this);
        this.modifyOnClick = this.modifyOnClick.bind(this);
    }

    manageOnClick(){
        alert('You click manage!');
    }

    modifyOnClick(){
        alert('You click modify!');
    }

    generatorData = (state) =>{
        let temp_data = [];
        axios.post('',
            Qs.stringify({
                id: this.state.id
            }),
            {headers:{'Content-Type':'application/x-www-form-urlencode'}}
        ).then( (response) => {
            temp_data = response.data
            let temp_id = 0
            let temp_nickname = '';
            let temp_twitter = '';
            let temp_youtuble = '';
            let temp_desc = '';
            let temp_img = '';
            let ifShow = false
            if(temp_data.logged_in == true){
                if(temp_data.id == temp_id){
                    ifShow = true;
                }
                if(temp_data.nickname){
                    temp_nickname = temp_data.nickname;
                }else{
                    temp_nickname = '???';
                }
                if(temp_data.youtuble){
                    temp_youtuble = temp_data.youtuble;
                }else{
                    temp_youtuble = '???';
                }
                if(temp_data.twitter){
                    temp_twitter = temp_data.twitter;
                }else{
                    temp_twitter = '???';
                }
                if(temp_data.desc){
                    temp_desc = temp_data.desc;
                }else{
                    temp_desc = '???';
                }
                if(temp_data.img){
                    temp_img = temp_data.img;
                }else{
                    temp_img = '???';
                }
                this.setState({
                    nickname: temp_nickname,
                    youtubleUrl: temp_youtuble,
                    twitter: temp_twitter,
                    desc: temp_desc,
                    img: temp_img,
                    ifShow: ifShow,
                });
            }
        }).catch(function (error){
            console.log(error);
        }); 
    };

    render() {
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
                {/* <div>
                    <Review />
                </div> */}
                <div>
                    {
                        this.state.ifShow?(
                            <button style = {styles.modiButton} onClick = {this.modifyOnClick} >modify your information</button>
                        ):null
                    }
                </div>
                <div>
                    <img src = {testUrl} />
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
    }
}

export default InfluencerPersonal