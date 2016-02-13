var React = require('react');


module.exports = React.createClass({
  
  handleTextChange: function(e) {
    this.props.onTextChange(
      this.refs.usernameInput.value                      
    );
  },
  
  handleKeyPress: function(e) {
    if(e.key.toLowerCase() == "enter") {
      this.handleGo();
    }
  },
  
  handleGo: function() {
    this.props.onGo();
  },
  
  render: function() {
    
    var inputAlert = (this.props.showInputLabel ? 
                      <div className="ui right pointing red  label">!</div> :
                      null);
    
    return (
      <div className="inline field">
        {inputAlert}
        <div className="ui left icon action inline input">
          <input type="text" 
            value={this.props.username} 
            onChange={this.handleTextChange}
            onKeyPress={this.handleKeyPress}
            placeholder="username" 
            ref="usernameInput" />
          <i className="at icon"></i>
          <button className="ui blue button" onClick={this.handleGo}>Go</button>
        </div>
      </div>
    );
  }	
	
});