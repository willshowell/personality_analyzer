var React = require('react');

module.exports = React.createClass({
   
  render: function() {
    return (
      <div className="ui fixed fluid three item borderless menu">
        <div className="item">{this.props.username}</div>
        <div className="item">{this.props.blurb}</div>
        <div className="item">
          <div className="ui primary button" onClick={this.props.newSearch}>
            New Analysis
          </div>
        </div>
      </div>
    );
  }
});