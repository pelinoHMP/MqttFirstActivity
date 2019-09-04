//broker
var btnConnect = document.getElementById('btnConnect');
var btnDisConnect = document.getElementById('btnDisconnect');
var broker = document.getElementById('broker');
var status = document.getElementById('statusCheck');

//publisher
var btnPublish = document.getElementById('btnPublish');
var pubTopic = document.getElementById('pubTopic');
var pubPayload = document.getElementById('pubPayload');

//subscriber
var subTopic = document.getElementById('subTopic');
var btnSubscribe = document.getElementById('btnSubscribe');
var btnUnsubscribe = document.getElementById('btnUnsubscribe');


//btnConnect
btnConnect.addEventListener('click', function (e) {
  e.preventDefault();
  //client
  $("#statusCheck").text('Connecting....');
  var client = mqtt.connect(broker.value)
  // client.subscribe("mqtt/demox")

  btnSubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    console.log("mqtt/" + subTopic.value)
    client.subscribe("mqtt/" + subTopic.value);
    btnUnsubscribe.disabled = false;
    btnSubscribe.disabled = true;
  })

  btnUnsubscribe.addEventListener('click', function (e) {
    e.preventDefault();
    client.unsubscribe("mqtt/" + subTopic.value);
    btnUnsubscribe.disabled = true;
    btnSubscribe.disabled = false;
    console.log("Unsubscribe to mqtt/" + subTopic.value)
  })

  client.on("connect", function () {
    console.log("Successfully connected");
    btnDisConnect.disabled = false;
    btnConnect.disabled = true;
    $("#statusCheck").text('Connected!');
  });


  //btnDisconnect
  btnDisConnect.addEventListener('click', function () {
    client.end();
    btnDisConnect.disabled = true;
    btnConnect.disabled = false;
    console.log('Disconnected');
    $("#statusCheck").text('Disconnected!');
  });


  client.on("message", function (topic, payload) {
    let finalTopic = topic.slice(5);
    console.log([finalTopic, payload].join(": "));
    let tbl = document.getElementById('receiver');
    let tbody = document.getElementById('msg');
    let tr = document.createElement('tr');
    let msgTopic = document.createElement('td');
    let msgPayload = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(finalTopic));
    msgPayload.appendChild(document.createTextNode(payload));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
    tr.appendChild(msgPayload);
    tr.appendChild(msgTime);
    tbody.appendChild(tr);
    tbl.appendChild(tbody);
    // $('.broker tbody').append("<tr><td>" + finalTopic + "</td><td>" + payload + "</td><td>" + moment().format('llll') + "</td></tr>");
  })

  // client.publish("mqtt/demox", "hello world!")

  btnPublish.addEventListener('click', function (e) {
    e.preventDefault();
    client.publish("mqtt/" + pubTopic.value, pubPayload.value)
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
