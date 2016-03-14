var React = require('react');

module.exports = React.createClass({
   
  render: function() {
    return (
      <div className="ui vertical floated footer segment">
        <span className="footer-text">Developed by <a href="http://github.com/willshowell">@willshowell</a> using the <a href="http://dev.twitter.com">Twitter</a> and <a href="http://indico.io">Indico</a> APIs //</span>
      </div>
    );
  }
});