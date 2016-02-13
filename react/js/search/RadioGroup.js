var React = require('react');


module.exports = React.createClass({
  
  handleSelectionChange: function(e) {
    this.props.onNewSelection(e.target.id);
  },
  
  render: function() {
    
    var optionFields = this.props.options.map( function(option) {      
      var isChecked = (option == this.props.selectedOption) ? "checked" : null;
      return (
        <div className="field" key={option}>
          <div className="ui radio checkbox">
            <input type="radio" 
              name="options"
              value={option}
              defaultChecked={isChecked}
              onClick = {this.handleSelectionChange}
              id = {option}
              className="hidden" />
            <label htmlFor={option}>{option}</label>
          </div>
        </div>     
      );
    }, this);    
    
    return (
      <div className="grouped fields">
        <label htmlFor="options">{this.props.groupLabel}</label>
        {optionFields}      
      </div> 
    );
  }	
	
});