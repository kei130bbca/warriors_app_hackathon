import React from 'react';
import { Link } from 'react-router-dom';
class ReviewCard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={styles.inlineDisplay}>
        <img src={this.props.img}></img>
        <div style={styles.inlineDisplay}>
          <div>
            <h2>{this.props.title}</h2>
          </div>
          <div>{this.props.content}</div>
        </div>
      </div>
    );
  }
}

const styles = {
  inlineDisplay: {
    display: 'inline-block',
  },
};
export default ReviewCard;
