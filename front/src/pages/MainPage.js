import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPurchases } from './components/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewCard2 from './components/ReviewCard2';
import LoginSystem from './components/LoginSystem';
import InfluencerName from './components/InfluencerName';

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
          <div key={user.user_id}>
            <InfluencerName
              name={user.nickname}
              icon={user.icon}
              desc={user.desc}
              id={user.user_id}
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
