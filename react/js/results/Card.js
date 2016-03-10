var React = require('react');

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
      case "Error":
        contents = this.props.data;
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
  var oldest = new Date(Date.parse(data.oldest_timestamp));
  var newest = new Date(Date.parse(data.newest_timestamp));
  
  return (
    <div>
      {data.tweet_count} tweets <br />
      Begin: {oldest.toDateString()} <br />
      End: {newest.toDateString()}</div>
  );
}

function getSentimentContents(data) {
  return (
    <div>
      {data}
    </div>
  );
}

function getPoliticalContents(data) {
  return (
    <div>
      Conservative: {data.Conservative} <br />
      Green: {data.Green} <br />
      Liberal: {data.Liberal} <br />
      Libertarian: {data.Libertarian}
    </div>
  ); 
}

function getPersonalityContents(data) {
  return (
    <div>
      Agreeable: {data.agreeableness} <br />
      Conscientious: {data.conscientiousness} <br />
      Extraverted: {data.extraversion} <br />
      Open: {data.openness}
    </div>
  ); 
}

function getPersonasContents(data) {
  
  var personas = data.map(function(value, index) {
    return (
      <div key={index}>{value.type.toUpperCase()}: {value.name}</div>
    );
  })
  
  return (
    <div>
      {personas}
    </div>
  ); 
}

function capitalizeWords(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function getTagsContents(data) {
  var tags = Object.keys(data).map(function(value, index) {
    return (
      <div key={index}>{capitalizeWords(value.replace(/_/g, ' '))}</div>
    );  
  });
  
  return (
    <div>
      {tags}
    </div>
  );
}

