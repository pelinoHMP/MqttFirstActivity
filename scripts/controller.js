var client;
var address = $("#broker").val();
$(document).ready(function () {

  $("#btnConnect").click(function () {
    client = mqtt.connect(address);
    connected = true;
    $("#status").text("Connecting....")
    client.on("connect", function () {
      console.log("Connected")
      $("#status").text("Connected!!!!!")
    })

    client.on("message", function (topic, payload) {
      console.log([topic, payload].join(": "));
      $('#brokerBody').append('<tr><td>' + topic + '<td>' + payload + '<td>'+moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
    })

    $("#btnPublish").click(function () {
      console.log("Publish button clicked");
      var topic = $("input[name=topic]").val();
      var payload = $("input[name=payload]").val();
      client.publish(topic, payload)
      $('#publishBody').append('<tr><td>' + topic + '<td>' + payload + '<td>'+moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
      console.log(topic, payload)
    })

    $("#btnSubscribe").click(function () {
      console.log("Subscribe button clicked");
      var subTopic = $("input[name=subTopic]").val();
      console.log(subTopic);
      $('#subscribeBody').append('<tr><td>' + subTopic + '<td>'+moment().format('MMMM Do YYYY, h:mm:ss a') + '</td></tr>');
      client.subscribe(subTopic);
    });
  })

});




// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })