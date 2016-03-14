var React = require('react');

var DoughnutChart = require('react-chartjs').Doughnut;
var BarChart = require('react-chartjs').Bar;
var RadarChart = require('react-chartjs').Radar;

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
    scaleStartValue: 0,
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>%"
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
  var chartData = {
    labels: ["Agreeable", "Conscientious", "Extraverted", "Open"],
    datasets: [
      {
        label: "",
        fillColor: "rgba(33,133,208,0.8)",
        strokeColor: "rgba(33,133,208,0.8)",
        pointColor: "rgba(33,133,208,0.8)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(33,133,208,1)",
        data: [Math.round(100*data.agreeableness), 
               Math.round(100*data.conscientiousness),
               Math.round(100*data.extraversion),
               Math.round(100*data.openness)]
      }
    ]
  };
  var chartOptions = {
    scaleOverride: true,
    scaleSteps: 4,
    scaleStepWidth: 25,
    scaleStartValue: 0,
    datasetStrokeWidth: 0,
    pointLabelFontSize : 14,
    pointDot: false,
    tooltipTemplate: "<%= value %>%"
  };
  return (
    <RadarChart data={chartData} options={chartOptions} height="180"/>
  );
}

function getPersonasContents(data) {
  
  var personas = data.map(function(value, index) {
    return (
      <div key={index}>{capitalizeWords(value.name)} ({value.type.toUpperCase()})</div>
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

