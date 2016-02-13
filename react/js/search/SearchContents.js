var React = require('react');

var SearchContentsTwitter = require('./SearchContentsTwitter');
var SearchContentsMedium = require('./SearchContentsMedium');

module.exports = React.createClass({

  render: function() {
    
  	var divShow = {};
  	var divHide = {display: 'none'};
    
    return (
      <div className="ui bottom attached segment">
      	<div style={this.props.menuItem == 'twitter' ? divShow : divHide}>
        	<SearchContentsTwitter formSubmit={this.props.formSubmit} />
        </div>
        <div style={this.props.menuItem == 'medium' ? divShow : divHide}>
        	<SearchContentsMedium formSubmit={this.props.formSubmit} />
        </div>
      </div>
    );
  }	
	
});