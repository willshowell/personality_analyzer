var React = require('react');
var ReactDOM = require('react-dom');

var SearchBox = require('./search/SearchBox');
var TopBar = require('./top/TopBar');
var Loader = require('./loader/Loader');

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
      results: false
    }
  },
  
  formSubmit: function(endpoint, username, blurb) {
    //alert(endpoint+" - " + username+"-" + blurb);
    
    //set username and blurb in top
    mostRecentSearch.username = "@" + username;
    mostRecentSearch.blurb = blurb;
    
    this.setState({
      top: true,
      search: false,
      loading: true
    });
    
    //perform ajax
    //
    //
    //change loading to false and results to true
    
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
    return <p>results</p>;    
  }
  
});

ReactDOM.render(
  <App />,
  document.getElementById('react-container')             
);