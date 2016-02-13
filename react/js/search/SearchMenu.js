var React = require('react');

module.exports = React.createClass({

  handleChange: function(item) {
    this.props.onMenuItemChange(item);
  },

  render: function() {
    return <div className="ui top attached tabular menu">
        <a className={this.props.menuItem == 'twitter' ? 'active item' : 'item'} 
          onClick={this.handleChange.bind(this, 'twitter')} >
          Twitter
        </a>
        <a className={this.props.menuItem == 'medium' ? 'active item' : 'item'} 
          onClick={this.handleChange.bind(this, 'medium')} >
          Medium
        </a>  
      </div>
  }	
});