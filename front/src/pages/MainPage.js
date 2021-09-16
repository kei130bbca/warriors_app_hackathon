import React, { useState, useEffect } from 'react';
import { fetchUsers } from './components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewCard2 from './components/ReviewCard2';
import LoginSystem from './components/LoginSystem';
import Icon from './components/Icon';
import User from '../classes/User';
import Purchase from '../classes/Purchase';
import Product from '../classes/Product';

const styles = {
  inlineDisplay: {
    display: 'inline-block',
  },
  horizontalList: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    webkitOverflowScrolling: 'touch',
  },
  item: {
    display: 'inline-block',
    width: '90%',
    height: '400px',
    margin: '16px',
    fontSize: '48px',
    background: 'rgba(255, 0, 0, 0.4)',
  },
};

function InfluencerName(props) {
  return (
    <div className="bg-li">
      <div style={styles.inlineDisplay}>
        <Icon src={props.icon} height="100" />
      </div>
      <div style={styles.inlineDisplay}>
        <h3>{`${props.name}'s recommendations`}</h3>
        {props.desc}
      </div>
    </div>
  );
}

function MainPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers(1)
      .then((u) => {
        // setUsers(u);
        console.log(JSON.stringify(...u));
        // setUsers(JSON.stringify(...u));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // const users = [user1, user2];
  // const purchases = [purchase1, purchase2, purchase3, purchase4];
  // const products = [product1, product2, product3];

  // function getProduct(id) {
  //   const product = products.filter((product) => product.id === id);
  //   return product.length > 0 ? product[0] : null;
  // }

  return (
    <div>
      <LoginSystem />
      {users.map((user) => {
        return (
          <div key={user.id}>
            <InfluencerName
              name={user.nickname}
              icon={user.icon}
              desc={user.desc}
            />
            <div className="container-fluid">
              <div className="row flex-row row flex-nowrap overflow-auto">
                {/* {
                  const purchases  
                  purchases
                    .filter((purchase) => purchase.user_id === user.id)
                    .map((purchase) => {
                      return (
                        <ReviewCard2
                          purchase={purchase}
                          product={getProduct(purchase.product_id)}
                          key={purchase.user_id + '' + purchase.product_id}
                        />
                      );
                    })} */}
              </div>
            </div>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
