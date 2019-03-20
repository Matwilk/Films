import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchFilms } from '../../actions';

import './Home.scss';

export class Home extends Component {
  static propTypes = {
    films: PropTypes.array,
    status: PropTypes.string,
    fetchFilms: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.films.length) {
      this.props.fetchFilms();
    }
  }

  render() {
    const { films, status } = this.props;

    return <div>{status}</div>;
  }

  static defaultProps = {
    films: []
  };
}

const mapStateToProps = state => ({
  films: state.films,
  seaches: state.seaches,
  status: state.status
});

const mapDispatchToProps = dispatch => {
  return {
    fetchFilms: () => dispatch(fetchFilms())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
