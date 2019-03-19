import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.css';
import { addPoint } from '../../actions';

class SearchBar extends Component {
  state = {
    map: null,
  };

  initSearch = () => {
    const suggest = new window.ymaps.SuggestView('suggest');
    suggest.events.add(`select`, this.chekPointHandler);
  };

  chekPointHandler = event => {
    event.preventDefault();
    this.props.addPoint(event.get('item').value);
    this._inputAddress.value = ``;
  };

  render() {
    return (
      <div>
        <p className="header">Введите адрес точки:</p>
        <input
          name="address"
          type="text"
          id="suggest"
          className="suggest"
          ref={node => (this._inputAddress = node)}
        />
      </div>
    );
  }

  componentDidMount() {
    window.ymaps.ready(this.initSearch);
  }
}

const mapDispatch = ({ mPoints: { searchPoint } }) => ({
  addPoint: text => searchPoint(text),
});

export default connect(
  null,
  mapDispatch,
)(SearchBar);
