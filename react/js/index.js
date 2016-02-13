var React = require('react');
var ReactDOM = require('react-dom');

var SearchBox = require('./search/SearchBox');
var TopBar = require('./top/TopBar');
var Loader = require('./loader/Loader');
var Results = require('./results/Results');

var mostRecentSearch = {
  username: '',
  blurb: ''
};

var App = React.createClass({
  
  getInitialState: function() {
    return {
      top: false,
      search: true,
      loading: false,
      results: false,
      mostRecentResults: null
    }
  },
  
  formSubmit: function(endpoint, username, blurb) {
    //set username and blurb in top
    mostRecentSearch.username = "@" + username;
    mostRecentSearch.blurb = blurb;
    
    this.setState({
      top: true,
      search: false,
      loading: true
    });

    $.ajax({
      url: endpoint,
      dataType: 'json',
      success: function(data) {
        this.setState({
          loading: false,
          results: true,
          mostRecentResults: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(endpoint, status, err.toString());
      }.bind(this)
    });
  },
  
  newSearch: function() {
    this.setState({
      top: false,
      search: true,
      loading: false,
      results: false
    })
  },
  
  render: function() {
    return (
      <div className='container'>
        { this.state.top ? this.renderTop() : null }
        { this.state.search ? this.renderSearch() : null }
        { this.state.loading ? this.renderLoading() : null }
        { this.state.results ? this.renderResults(): null }
      </div> 
    );
  },
  
  renderTop: function() {
    return <TopBar username={mostRecentSearch.username} 
            blurb={mostRecentSearch.blurb} 
            newSearch={this.newSearch}/>
  },
  
  renderSearch: function() {
    return <SearchBox 
            formSubmit={this.formSubmit} />;
  },
  
  renderLoading: function() {
    return <Loader />;
  },
  
  renderResults: function() {
    return <Results data={this.state.mostRecentResults}/>;    
  }
  
});

ReactDOM.render(
  <App />,
  document.getElementById('react-container')             
);