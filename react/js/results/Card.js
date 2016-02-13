var React = require('react');
var Chart = require('./Chart');

module.exports = React.createClass({
   
  render: function() {
    
    // Generate contents based on card type
    var contents;
    
    switch(this.props.title) {
      case "Info":
        contents = getInfoContents(this.props.data);
        break;
      case "Sentiment":
        contents = getSentimentContents(this.props.data);
        break;
      case "Political":
        contents = getPoliticalContents(this.props.data);
        break;
      case "Personality":
        contents = getPersonalityContents(this.props.data);
        break;
      case "Personas":
        contents = getPersonasContents(this.props.data);
        break;
      case "Tags":
        contents = getTagsContents(this.props.data);
        break;
    }
    
    return (
      <div className="ui results raised segment">
        <h2>{this.props.title}</h2>
        {contents}
      </div>
    );
  }  
  
});

function getInfoContents(data) {
  return (<div>{data.tweet_count}: {data.newest_timestamp}-{data.oldest_timestamp}</div>);
}

function getSentimentContents(data) {
  return (<div>{data}</div>);
}

function getPoliticalContents(data) {
  return (<div>political</div>); 
}

function getPersonalityContents(data) {
  return (<div>personality</div>); 
}

function getPersonasContents(data) {
  return (<div>political</div>); 
}

function getTagsContents(data) {
  return (<div>tags</div>);
}

