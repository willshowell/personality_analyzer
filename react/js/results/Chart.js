var React = require('react');

module.exports = React.createClass({
   
  render: function() {
    console.log(this.props.data);
    return (
      <div>        
        <canvas id={this.props.canvasID} 
        				width={this.props.width} 
        				height={this.props.height}>
        </canvas>
      </div>
    );
  }
});