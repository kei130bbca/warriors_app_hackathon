//import React from 'react';
import React, { useState } from 'react';
import './registrationform.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

// Please change as needed
function InfluencerRegistrationForm() {
  const history = useHistory()
  const [fileUrl, setFileUrl] = useState(null);
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    const youtube = document.getElementById('youtube').value;
    const twitter = document.getElementById('twitter').value;
    const desc = document.getElementById('desc').value;
    const img = document.getElementById('img').value;
    axios.post('http://localhost:8000/users', {
      username: username,
      nickname: nickname,
      password: password,
      youtube: youtube,
      twitter: twitter,
      desc: desc,
      img: fileUrl
    }).then((res) => {
      console.log(res);
    }).catch((e) => {
      console.log(e);
    });
    history.push({
      pathname: "/"
    })
  }
  //必須事項が入力されているかどうか確認
  function check() {
    console.log(document.getElementById);
    if (document.getElementById('registrationform').value === "") {
      alert('Please fill in the required fields.');
      return false;
    } else {
      return true;
    }
  }

  const handleFile = async (event) => {
    let files = event.target.files;
    files = Array.from(files).filter((file) => {
      return [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/bmp',
        'image/svg+xml',
      ].includes(file.type);
    });
    if (files.length === 0) return;
    // setFiles(files);
    const file = files[0];
    const image = URL.createObjectURL(file);
    console.log(image);
    // setImageUrl(image);

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
      setHasUploadedImage(true);
      setImageUrl(base64data);
    };
  };

  return (
    <div>
      <h1>Influencer Registration Form</h1>
      <form method="get" onSubmit={handleSubmit} id="registrationform">
        <p className="registrationtext">User name *required</p>
        <input
          type="text"
          placeholder="Rakuten Taro"
          name="username"
          className="registrationforms"
          id="username"
        ></input>
        <p className="registrationtext">Nick name *required</p>
        <input
          type="text"
          placeholder="Taro"
          name="nickname"
          className="registrationforms"
          id="nickname"
        ></input>
        <p className="registrationtext">Password *required</p>
        <input
          type="text"
          placeholder="1234abcd"
          name="password"
          className="registrationforms"
          id="password"
        ></input>
        <p className="registrationtext">Icon image *required</p>
        <img src={fileUrl} />
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          className="registrationforms"
          onChange={handleFile}
          id="img"
        ></input>
        <p className="registrationtext">Twitter</p>
        <input
          type="text"
          placeholder="@xxx_xxx"
          name="twitter_screenname"
          className="registrationforms"
          id="twitter"
        ></input>
        <p className="registrationtext">YouTube</p>
        <input
          type="text"
          placeholder="https://www.youtube.com/user/xxx"
          name="youtube_url"
          className="registrationforms"
          id="youtube"
        ></input>
        <p className="registrationtext">Your Description</p>
        <textarea
          type="text"
          placeholder="Age, Hobby, Nationality..."
          name="desc"
          className="registrationforms"
          id="desc"
        ></textarea>
        <br />
        <br />
        <input type="submit" className="button" onClick={check} />
      </form>
    </div>
  );
}

export default InfluencerRegistrationForm;
