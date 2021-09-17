import Icon from './Icon';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function InfluencerName(props) {
  return (
    <Link to={'/influencerpersonal/' + props.id}>
      <div className="bg-li">
        <div style={styles.inlineDisplay}>
          <Icon src={props.icon} height="100" />
        </div>
        <div style={styles.inlineDisplay}>
          <h3>{`${props.name}'s recommendations`}</h3>
          {props.desc}
        </div>
      </div>
    </Link>
  );
}

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
