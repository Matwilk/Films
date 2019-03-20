import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-virtualized-select';
import ReactPlaceholder from 'react-placeholder';
import { Segment, Grid, Message, Divider } from 'semantic-ui-react';

import stringHash from 'string-hash';

import { fetchFilms, computePath } from '../../actions';

import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import 'react-placeholder/lib/reactPlaceholder.css';

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

    if ((!source || !destination) && pathRequested) {
      this.setState({ pathRequested: false });
    }
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
      <ReactPlaceholder
        showLoadingAnimation
        type="text"
        rows={3}
        ready={status === 'SUCCESS'}
      >
        {films.indexes && (
          <Segment>
            <Grid columns={2} stackable>
              <Grid.Column>
                <h3>Source movie</h3>
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
                <h3>Destination movie</h3>
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
            <Segment>
              {queries[stringHash(`${source.value}:${destination.value}`)].map(
                vertex => (
                  <Message.Header>{vertex}</Message.Header>
                )
              )}
              <Message.Header>{destination.value}</Message.Header>
            </Segment>
          )}
      </ReactPlaceholder>
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