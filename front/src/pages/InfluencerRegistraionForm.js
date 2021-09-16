//import React from 'react';
import React, { useState } from 'react';
import './registrationform.css';

// Please change as needed
function InfluencerRegistrationForm() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  //必須事項が入力されているかどうか確認
  function check() {
    console.log(document.getElementById);
    if (document.getElementById('registrationform').value === '') {
      alert('Please fill in the required fields.');
      return false;
    } else {
      return true;
    }
  }

  const [fileUrl, setFileUrl] = useState(null);

  const previewImage = (event) => {
    const imageFile = event.target.files.item(0);
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  };

  return (
    <div>
      <h1>Influencer Registration Form</h1>
      <form method="get" onSubmit={handleSubmit}>
        <p className="registrationtext">User name *required</p>
        <input
          type="text"
          placeholder="Rakuten Taro"
          name="username"
          className="registrationform"
          id="registrationform"
        ></input>
        <p className="registrationtext">Nick name *required</p>
        <input
          type="text"
          placeholder="Taro"
          name="nickname"
          className="registrationform"
          id="registrationform"
        ></input>
        <p className="registrationtext">Password *required</p>
        <input
          type="text"
          placeholder="1234abcd"
          name="password"
          className="registrationform"
          id="registrationform"
        ></input>
        <p className="registrationtext">Icon image *required</p>
        <img src={fileUrl} />
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          className="registrationform"
          onChange={previewImage}
          id="registrationform"
        ></input>
        <p className="registrationtext">Twitter</p>
        <input
          type="text"
          placeholder="@xxx_xxx"
          name="twitter_screenname"
          className="registrationform"
        ></input>
        <p className="registrationtext">YouTube</p>
        <input
          type="text"
          placeholder="https://www.youtube.com/user/xxx"
          name="youtube_url"
          className="registrationform"
        ></input>
        <p className="registrationtext">Your Description</p>
        <textarea
          type="text"
          placeholder="Age, Hobby, Nationality..."
          name="desc"
          className="registrationform"
        ></textarea>
        <br />
        <br />
        <input type="submit" className="button" onClick={check} />
      </form>
    </div>
  );
}

export default InfluencerRegistrationForm;
