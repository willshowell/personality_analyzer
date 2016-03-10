var React = require('react');

var DoughnutChart = require('react-chartjs').Doughnut;
var BarChart = require('react-chartjs').Bar;

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
  
  var color = data >= 0.5 ? "rgba(33,133,208,1)" : "rgba(219,40,40,1)";
  
  var chartData = {
    labels: [""],
    datasets: [
      {
        label: "",
        fillColor: color,
        strokeColor: color,
        highlightFill: color,
        highlightStrokeFill: color,
        data: [Math.round(100*data)]
      }
    ]
    
  };
  
  var chartOptions = {
    scaleOverride: true,
    scaleSteps: 2,
    scaleStepWidth: 50,
    scaleStartValue: 0
  };
  
  return (
    <BarChart data={chartData} options={chartOptions} />
  );
}

function getPoliticalContents(data) {
  var chartData = [
      {
        value: Math.round(100*data.Conservative),
        color: "#db2828",
        highlight: "#db2828",
        label: "Conservative"
      },
      {
        value: Math.round(100*data.Green),
        color: "#21ba45",
        highlight: "#21ba45",
        label: "Green"
      },
      {
        value: Math.round(100*data.Liberal),
        color: "#2185d0",
        highlight: "#2185d0",
        label: "Liberal"
      },
      {
        value: Math.round(100*data.Libertarian),
        color: "#fbbd08",
        highlight: "#fbbd08",
        label: "Libertarian"
      }
    ];
    
    var chartOptions = {
      animateRotate: false,
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%",
    };
  return (
    <DoughnutChart data={chartData} options={chartOptions} />
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

