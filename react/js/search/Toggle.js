var React = require('react');


module.exports = React.createClass({
  
  handleSelectionChange: function(e) {
    this.props.onNewSelection(e.target.checked);
  },
  
  render: function() { 
    
    return (
      <div className="grouped fields">
        <label htmlFor={this.props.groupId}>{this.props.groupLabel}</label>
        <div className="field">
          <div className="ui toggle checkbox">
            <input type="checkbox"
              id={this.props.groupId}
              checked={this.props.selectedOption}
              onChange={this.handleSelectionChange} />
            <label></label>
          </div>
        </div>
      </div>    
    );
  }	
	
});