import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPurchases } from './components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewCard2 from './components/ReviewCard2';
import LoginSystem from './components/LoginSystem';
import Icon from './components/Icon';

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
  const [users, setUsers] = useState([]);
  const [purchases, setPurchases] = useState([]); // {user_id:object}

  useEffect(() => {
    const f = async () => {
      const res_users = await fetchUsers(0);
      setUsers(res_users);
      let res_purchases = await Promise.all(
        res_users.map(async (user) => {
          return await fetchPurchases(user.user_id);
        })
      );
      res_purchases = Array.prototype.concat(...res_purchases);
      console.log(res_purchases);
      setPurchases(res_purchases);
    };
    f();
  }, []);

  console.log(purchases);

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
                {purchases
                  .filter((purchase) => purchase.users_id === user.user_id)
                  .map((purchase) => {
                    return (
                      <ReviewCard2
                        purchase={purchase}
                        key={purchase.user_id + '' + purchase.product_id}
                      />
                    );
                  })}
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
