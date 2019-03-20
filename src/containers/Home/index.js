import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import Select from 'react-select';
import Select from 'react-virtualized-select';

import stringHash from 'string-hash';

import { fetchFilms, computePath } from '../../actions';

import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import './Home.scss';

export class Home extends Component {
  static propTypes = {
    films: PropTypes.object,
    status: PropTypes.string,
    queries: PropTypes.object,
    fetchFilms: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      source: '',
      destination: '',
      pathRequested: false
    };
  }

  componentDidUpdate() {
    const { films } = this.props;
    const { source, destination, pathRequested } = this.state;

    if (source && destination && !pathRequested) {
      this.setState({ pathRequested: true });
      this.props.computePath(films.indexes, source.value, destination.value);
    }
  }

  componentDidMount() {
    if (!this.props.films.length) {
      this.props.fetchFilms();
    }
  }

  render() {
    const { films, status, queries } = this.props;
    const { source, destination } = this.state;

    return (
      <Fragment>
        {status}
        {films.indexes && source && (
          <div>{`You have selected source = ${source.value}`}</div>
        )}
        {films.indexes && destination && (
          <div>{`You have selected destination = ${destination.value}`}</div>
        )}
        {films.indexes &&
          queries[stringHash(`${source.value}:${destination.value}`)] && (
            <div>{`Path = ${
              queries[stringHash(`${source.value}:${destination.value}`)]
            }, ${destination.value}`}</div>
          )}
        {films.indexes && !source && (
          <Fragment>
            <h3>Source</h3>
            <Select
              searchable
              onChange={source => this.setState({ source, destination: '' })}
              value={source}
              options={Object.keys(films.indexes.byTitle).map(film => {
                return { label: film, value: film };
              })}
            />
          </Fragment>
        )}
        {films.indexes && source && !destination && (
          <Fragment>
            <h3>Destination</h3>
            <Select
              searchable
              onChange={destination => this.setState({ destination })}
              value={destination}
              options={Object.keys(films.indexes.byTitle).map(film => {
                return { label: film, value: film };
              })}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }

  static defaultProps = {
    films: []
  };
}

const mapStateToProps = state => ({
  films: state.films,
  queries: state.queries,
  status: state.status
});

const mapDispatchToProps = dispatch => {
  return {
    fetchFilms: () => dispatch(fetchFilms()),
    computePath: (index, source, destination) =>
      dispatch(computePath(index, source, destination))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
