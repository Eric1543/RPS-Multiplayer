var config = {
  apiKey: "AIzaSyDdQE1BrxJN4wzLeDg8Ch6jmnvWBfY6mwY",
  authDomain: "rps-grand-master.firebaseapp.com",
  databaseURL: "https://rps-grand-master.firebaseio.com",
  projectId: "rps-grand-master",
  storageBucket: "",
  messagingSenderId: "363190879659"
};
firebase.initializeApp(config);

var database = firebase.database();

//*** Real Time chat setup ***//
var chatLogArray = [];

$('#chatLine').keyup(function (e) {
		// if(chatLogArray.length==7){
		// 	chatLogArray.shift();
		// }
    if (e.keyCode === 13) {
    	var lineVal=$('#chatLine').val();
    	database.ref('chat').push({
    		newLine: lineVal
    	})
    }
	});

database.ref('chat').on('child_added', function(snapshot){
  $('#chatLog').empty();
  chatLogArray.push(snapshot.val().newLine);
  $('#chatLine').val('');
  for(var i in chatLogArray){
    var line = chatLogArray[i];
    var a = $('<div>');
    a.append(line);
    $('#chatLog').append(a);
    $('#chatLog').stop ().animate ({
    scrollTop: $('#chatLog')[0].scrollHeight
    });
  }
});
//*** End of Real Time chat setup ***//

// Player Logins
var p1 = false;
var p2 = false;

database.ref('player/player1').on('value', function(snapshot){
  $('#player1').html(snapshot.val().Player1);
  console.log(snapshot.val());
  p1 = true;
})

database.ref('player/player2').on('value', function(snapshot){
  $('#player2').html(snapshot.val().Player2);
  console.log(snapshot.val().Player2);
  p2 = true;
})

$('#enterName').keyup(function(e){
  if(e.keyCode == 13 && p1 === false){
    p1 = true;
    var player1Name = $('#enterName').val();
    $('#enterName').val('');
    database.ref('player/player1').set({
      Player1: player1Name,
      Wins: 0,
      Losses: 0,
      Ties: 0
    })
  }
  else if(e.keyCode == 13 && p2 === false){
    p2 = true;
    var player2Name = $('#enterName').val();
    $('#enterName').val('');
    database.ref('player/player2').set({
      Player2: player2Name,
      Wins: 0,
      Losses: 0,
      Ties: 0
    })
  }
  else if(e.keyCode == 13)
  {
    $('#enterName').val('');
    $('#enterName').attr('placeholder', 'Match in progress.');
  }
})

// Gameplay

// Assign choices and choice status
var p1Choice;
var p2Choice;
var p1chosen = false;
var p2chosen = false;
var ties = 0;
var p1wins = 0;
var p1losses = 0;
var p2wins = 0;
var p2losses = 0;

// Detect choices and game win/loss state
$('#rock1').on('click', function(){
  if(p1chosen == false){
    p1chosen = true;
    $('#player1Choice').html('');
    $('#player1Choice').append('Player 1: ');
    $('#player1Choice').append('Rock');
    p1Choice = 'rock';    
  }
  if(p2Choice == 'rock'){
    $('#winLoss').html('');
    $('#winLoss').html('Tie');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    ties++;
  }
    if(p2Choice == 'paper'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 2 Wins!');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p1losses++;
    p2wins++;
  }
  if(p2Choice == 'scissors'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 1 Wins!');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p1wins++;
    p2losses++;
  }
})

$('#paper1').on('click', function(){
  if(p1chosen == false){
    p1chosen = true;
    $('#player1Choice').html('');
    $('#player1Choice').append('Player 1: ');
    $('#player1Choice').append('Paper');
    p1Choice = 'paper';
  }
  if(p2Choice == 'paper'){
    $('#winLoss').html('');
    $('#winLoss').html('Tie');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
  }
  if(p2Choice == 'rock'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 1 Wins!');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2losses++;
    p1wins++;
  }
  if(p2Choice == 'scissors'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 2 Wins!');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2wins++;
    p1losses++;
  }
})

$('#scissors1').on('click', function(){
  if(p1chosen == false){
    p1chosen = true;
    $('#player1Choice').html('');
    $('#player1Choice').append('Player 1: ');
    $('#player1Choice').append('Scissors');
    p1Choice = 'scissors'; 
  }
  if(p2Choice == 'scissors'){
    $('#winLoss').html('');
    $('#winLoss').html('Tie');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
  }
  if(p2Choice == 'paper'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 1 Wins!');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2losses++;
    p1wins++;
  }
  if(p2Choice == 'rock'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 2 Wins!');
    p1chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2wins++;
    p1losses++;
  }
})

$('#rock2').on('click', function(){
  if(p2chosen == false){
    p2chosen = true;
    $('#player2Choice').html('');
    $('#player2Choice').append('Player 2: ');
    $('#player2Choice').append('Rock');
    p2Choice = 'rock';
  }
  if(p1Choice == 'rock'){
    $('#winLoss').html('');
    $('#winLoss').html('Tie');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
  }
  if(p1Choice == 'paper'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 1 Wins!');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2losses++;
    p1wins++;
  }
  if(p1Choice == 'scissors'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 2 Wins!');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2wins++;
    p1losses++;
  }
})

$('#paper2').on('click', function(){
  if(p2chosen == false){
    p2chosen = true;
    $('#player2Choice').html('');
    $('#player2Choice').append('Player 2: ');
    $('#player2Choice').append('Paper');
    p2Choice = 'paper';
    $('#player2Choice').html('');
  }
  if(p1Choice == 'paper'){
    $('#winLoss').html('');
    $('#winLoss').html('Tie');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
  }
  if(p1Choice == 'scissors'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 1 Wins!');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2losses++;
    p1wins++;
  }
  if(p1Choice == 'rock'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 2 Wins!');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2wins++;
    p1losses++;
  }
})

$('#scissors2').on('click', function(){
  if(p2chosen == false){
    p2chosen = true;
    $('#player2Choice').html('');
    $('#player2Choice').append('Player 2: ');
    $('#player2Choice').append('Scissors');
    p2Choice = 'scissors'; 
  }
  if(p1Choice == 'scissors'){
    $('#winLoss').html('');
    $('#winLoss').html('Tie');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
  }
  if(p1Choice == 'rock'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 1 Wins!');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2losses++;
    p1wins++;
  }
  if(p1Choice == 'paper'){
    $('#winLoss').html('');
    $('#winLoss').html('Player 2 Wins!');
    p2chosen = false;
    $('#player1Choice').html('');
    $('#player2Choice').html('');
    p2wins++;
    p1losses++;
  }
})