var React = require('react');

var SearchMenu = require('./SearchMenu');
var SearchContents = require('./SearchContents');

module.exports = React.createClass({
  
  getInitialState: function() {
    return {
      menuItem: 'twitter', 
    }
  },
  
  handleMenuItemChange: function(newMenuItem) {
    this.setState({
      menuItem: newMenuItem
    })
  },

  render: function() {
    return (
      <div className="ui center aligned main text container">
        <h1 className="ui header">
          Personality Analyzer
          <div className="sub header">profile your profile</div>
        </h1>
        <SearchMenu 
          menuItem={this.state.menuItem} 
          onMenuItemChange={this.handleMenuItemChange} />
        <SearchContents
          menuItem={this.state.menuItem} 
          {...this.props} />
      </div>
    );
  }	
	
});