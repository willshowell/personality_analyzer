var React = require('react');
var Card = require('./Card');

module.exports = React.createClass({
  
  
   
  render: function() {
    
    // Split up the data
    var infoAnalysis = {
      tweet_count: this.props.data.tweet_count,
      oldest_timestamp: this.props.data.oldest_timestamp,
      newest_timestamp: this.props.data.newest_timestamp
    }
    var sentimentAnalysis = this.props.data.data.sentiment;
    var politicalAnalysis = this.props.data.data.political;
    var personalityAnalysis = this.props.data.data.personality;
    var personasAnalysis = this.props.data.data.personas;
    var tagsAnalysis = this.props.data.data.tags;
    
    return (
      <div className="ui center aligned results text container">
          <Card title="Info" 
                canvasID="canvas-info" 
                type="text"
                data={infoAnalysis}/>
          <Card title="Sentiment" 
                canvasID="canvas-sentiment" 
                type="chart"
                data={sentimentAnalysis}/>
          <Card title="Political" 
                canvasID="canvas-political" 
                type="chart"
                data={politicalAnalysis}/>
          <Card title="Personality" 
                canvasID="canvas-personality" 
                type="chart"
                data={personalityAnalysis}/>
          <Card title="Personas"
                canvasID="canvas-personas" 
                type="text"
                data={personasAnalysis}/>
          <Card title="Tags" 
                canvasID="canvas-tags" 
                type="text"
                data={tagsAnalysis}/>
      </div>
    );
  }
});