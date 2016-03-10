var React = require('react');
var Card = require('./Card');

module.exports = React.createClass({
  
  
   
  render: function() {
    
    var errorMessage = this.props.data;
    
    return (
      <div className="ui center aligned results text container">
          <Card title="Error" 
                canvasID="canvas-error" 
                type="text"
                data={errorMessage}/>
      </div>
    );
  }
});