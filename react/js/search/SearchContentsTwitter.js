var React = require('react');

var UsernameField = require('./UsernameField');
var RadioGroup = require('./RadioGroup');
var Toggle = require('./Toggle');

var tweetCountOptions = [10,100,1000];

module.exports = React.createClass({
  
  getInitialState: function() {
    return {
      username: '',
      tweetCount: tweetCountOptions[0],
      includeRetweets: false,
      showInputLabel: false
    };
  },
  
  handleUsernameInput: function(newUsername) {
    this.setState({
      username: newUsername,
      showInputLabel: false
    });
  },
  
  handleGo: function() {
  
    if (this.state.username == '') {
      this.setState({
        showInputLabel: true
      });
    } 
    else {
      var request = "_twitter?handle="+this.state.username
                    +"&count="+this.state.tweetCount
                    +"&include_retweets="+(this.state.includeRetweets?1:0);
      var blurb = this.state.tweetCount + " tweets with" + 
                  (this.state.includeRetweets ? " " : "out ") + 
                  "retweets";
      this.props.formSubmit(request, this.state.username, blurb);
    }
    
  },
  
  handleTweetCountInput: function(newTweetCount) {
    this.setState({
      tweetCount: newTweetCount
    });
  },
  
  handleIncludeRetweetsUpdate: function(newIncludeRetweets) {
    this.setState({
      includeRetweets: newIncludeRetweets
    });
  },

  render: function() {
    return (
      <div className="ui two column middle aligned very relaxed stackable grid">
        <div className="column">
          <div className="ui form">
            <UsernameField 
              username={this.state.username}
              showInputLabel={this.state.showInputLabel}
              onTextChange={this.handleUsernameInput}
              onGo={this.handleGo} />
          </div>
        </div>
        <div className="ui vertical divider">
          <i className="twitter icon"></i>
        </div>
        <div className="left aligned column">
          <div className="ui form">
            <RadioGroup 
              options={tweetCountOptions} 
              groupLabel="Tweets to parse"
              selectedOption={this.state.tweetCount} 
              onNewSelection={this.handleTweetCountInput} />
          </div>
          <div className="ui form">
            <Toggle
              groupLabel="Include retweets?"
              groupId="retweets"
              selectedOption={this.state.includeRetweets}
              onNewSelection={this.handleIncludeRetweetsUpdate} />            
          </div>
        </div>
      </div>
    );
  }	
	
});