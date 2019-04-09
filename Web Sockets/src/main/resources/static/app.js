var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    // $("#greetings").html("");
}

function connect() {
    //Connecting to Stomp Endpoint
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        //Subscribing to a broadcast endpoint
        stompClient.subscribe('/topic/greetings', function (greeting) {
            //Once a new message is added a message response is sent
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
    //Function to get all messages in the database for a particular chat
    loadMessage();
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
    //Clear table
    $("#greetings").html("");
}

function sendName() {
    //Send to message handling controller
    if(!($("#name").val() == "")) {
        stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
    }
}

function showGreeting(message) {
    //Add new message to table on UI
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

function loadMessage(){
    //Get messages from backend database
    axios.get("http://localhost:8080/api/get").then(function(response){
        for(var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].content);
            $("#greetings").append("<tr><td>" + response.data[i].content + "</td></tr>");
        }
    });
}