import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import { func } from 'prop-types';
import debounce from 'lodash/debounce';
import history from '../../history';

export default class SearchGifs extends Component {
  static propTypes = {
    fetch: func.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    // https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
    this.fetchDebounced = debounce(this.fetchDebounced, 300);
  }
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => history.push(`gif/${result.id}`);

  async handleSearchChange(e, { value }) {
    this.setState({ isLoading: true, value });
    if (value.length < 1) {
      return this.resetComponent();
    }
    await this.fetchDebounced(value);
    return undefined;
  }

  async fetchDebounced(value) {
    const resp = await this.props.fetch('/graphql', {
      body: JSON.stringify({
        query: `{
          gifs(filter: "${value}") {
            id,
            title,
            description
          }
        }`,
      }),
    });
    const { data } = await resp.json();
    this.setState({
      isLoading: false,
      results: data.gifs,
    });
  }

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <Search
        placeholder="Search a gif"
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
      />
    );
  }
}
