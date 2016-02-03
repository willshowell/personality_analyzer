
$(document).ready(function() {
  $("#twitter-form-submit").click(function(event){
    $('#twitter-form').hide();
    $.ajax( {
      url:'_twitter',
      data: {
        'handle': $("#twitter-form-handle").val(),
        'count': $("input[name=count]:checked").val()
      },
      success:function(data) {
        console.log(data)
        generateCharts(data);
      },
      error: function() {
        console.log("an error occurred");
      }
    });
  });
});

function generateCharts(json) {
  $("#caption").append(json.tweet_count + " tweets scanned since " + 
                                      json.oldest_timestamp);
  
  chartSentiment(json.data.sentiment);
  chartPolitical(json.data.political);
  chartPersonality(json.data.personality);
  chartPersonas(json.data.personas);
  chartTags(json.data.tags);
  
}

function chartSentiment(sentiment) {
  var canvas = document.getElementById('sentiment');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.font = "14px Arial";
  ctx.fillText("Sentiment: " + sentiment,10,50);
}

function chartPolitical(political) {
  var data = [
    {
      value: political.Conservative,
      color: "#ff0000",
      label: "Conservative"
    },
    {
      value: political.Green,
      color: "#00ff00",
      label: "Green"
    },
    {
      value: political.Liberal,
      color: "#0000ff",
      label: "Liberal"
    },
    {
      value: political.Liberal,
      color: "#555555",
      label: "Independent"
    }  
  ]
  
  
  var canvas = document.getElementById('political');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  chart = new Chart(ctx).Pie(data,{
    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : false,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : true,
    animation: false
  });
  
}

function chartPersonality(personality) {
  var blah = {
    labels: ['Agreeable', 'Conscientious', 'Extraverted', 'Open'],
    datasets: [{
      label: "Personality",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,0)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      data: [personality.agreeableness,
             personality.conscientiousness,
             personality.extraversion,
             personality.openness]
    }]
  }
  
  var canvas = document.getElementById('personality');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  chart = new Chart(ctx).Radar(blah,{
    scaleOverride: true,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: 4,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: 0.25,
    // Number - The scale starting value
    scaleStartValue: 0,

  });
}

function chartPersonas(personas) {
  var canvas = document.getElementById('personas');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, ctx.width, ctx.height);
  ctx.font = "14px Arial";
  ctx.fillText(personas[0].type.toUpperCase() + ": " + personas[0].name + ": " + personas[0].value, 10, 10);
  ctx.fillText(personas[1].type.toUpperCase() + ": " + personas[1].name + ": " + personas[1].value, 10, 30);
  ctx.fillText(personas[2].type.toUpperCase() + ": " + personas[2].name + ": " + personas[2].value, 10, 50); 
}

function chartTags(tags) {
  var canvas = document.getElementById('tags');
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,ctx.width, ctx.height);
  ctx.font = "14px Arial";
  tag_array = Object.keys(tags)
  ctx.fillText(tag_array[0], 10, 10);
  ctx.fillText(tag_array[1], 10, 30);
  ctx.fillText(tag_array[2], 10, 50);  
}








