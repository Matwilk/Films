import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-virtualized-select';
import ReactPlaceholder from 'react-placeholder';
import { Segment, Grid, Divider } from 'semantic-ui-react';

import stringHash from 'string-hash';

import { fetchFilms, computePath } from '../../actions';

import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import 'react-placeholder/lib/reactPlaceholder.css';

import './Home.scss';
import down from './angle-down.svg';

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
      destination: ''
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { films, queries } = this.props;
    const { source, destination } = this.state;

    if (
      source &&
      destination &&
      (source !== prevState.source || destination !== prevState.destination) &&
      !queries[stringHash(`${source.value}:${destination.value}`)]
    ) {
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
        <h1>Degrees of separation</h1>
        <p>
          Find how movies are related to one another by members of the cast.
          Simply select a source and destination movie and see how the movies
          are related
        </p>
        <ReactPlaceholder
          showLoadingAnimation
          type="text"
          rows={5}
          ready={status === 'SUCCESS' || status === 'FAILED'}
        >
          {status === 'FAILED' && (
            <p>Failed to load films. Check connection and trying again.</p>
          )}
          {films.indexes && (
            <Segment>
              <Grid columns={2} stackable>
                <Grid.Column>
                  <h3>Source</h3>
                  <Select
                    searchable
                    onChange={source =>
                      this.setState({ source, destination: '' })
                    }
                    value={source || ''}
                    options={Object.keys(films.indexes.byTitle).map(film => {
                      return { label: film, value: film };
                    })}
                  />
                </Grid.Column>
                <Grid.Column>
                  <h3>Destination</h3>
                  <Select
                    searchable
                    onChange={destination => this.setState({ destination })}
                    value={destination || ''}
                    options={Object.keys(films.indexes.byTitle).map(film => {
                      return { label: film, value: film };
                    })}
                  />
                </Grid.Column>
              </Grid>
              <Divider vertical>To</Divider>
            </Segment>
          )}
          {source &&
            destination &&
            queries[stringHash(`${source.value}:${destination.value}`)] && (
              <Fragment>
                {queries[stringHash(`${source.value}:${destination.value}`)]
                  .length ? (
                  <Fragment>
                    <h4>
                      Your movie relationship path is given below starting with
                      the source movie and ending with the destination
                    </h4>
                    {queries[
                      stringHash(`${source.value}:${destination.value}`)
                    ].map(vertex => (
                      <Fragment key={vertex}>
                        <Segment>{vertex}</Segment>
                        <img className={'down'} src={down} alt="down" />
                      </Fragment>
                    ))}
                    <Segment>{destination.value}</Segment>
                  </Fragment>
                ) : (
                  <h4>No path could be found :(</h4>
                )}
              </Fragment>
            )}
        </ReactPlaceholder>
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
