$(document).ready(function() {
  // default time is 30 seconds per question
  var DEFAULT_TIME = 5 * 1000;
  var DISPLAY_ANSWER_TIME = 2 * 1000;
  var questions;
  var currentQuestion;
  var timeOption;

  function buildUrl() {
    // variables
    // options object
    var queryUrl = "https://opentdb.com/api.php";
    var param = {
      cat: $("#categories").val(),
      type: $("#type").val(),
      diff: $("#difficulty").val(),
      num: $("#quantity").val() || 10
    };

    var query = [];
    // building api url
    if (param.cat) {
      query.push("category=" + param.cat);
    }
    if (param.diff) {
      query.push("difficulty=" + param.diff);
    }
    if (param.type) {
      query.push("type=" + param.type);
    }
    if (param.num) {
      query.push("amount=" + param.num);
    }
    if (query.length) {
      queryUrl += "?" + query.join("&");
    }
    return queryUrl;
  }

  // fills out html - handles asking the next question the questions array
  function askQuestion() {
    // get the current question
    var question = questions[currentQuestion];
    var answers = [].concat(question.incorrect_answers);

    // randomly insert the right answer into the list of answers
    var insert = Math.random(0, answers.length);
    answers.splice(insert, 0, question.correct_answer);

    // display the question and answers
    $("#question").html(question.question);
    $("#answers").empty();
    for (var i = 0; i < answers.length; i++) {
      $("#answers").append(
        $("<button>")
          .addClass("list-group-item list-group-item-action")
          .html(answers[i])
      );
    }
    $(".list-group-item").on("click", pickAnswer);
    timer = startTimer();
  }

  function startTimer() {
    return setTimeout(function() {
      ranOutOfTime();
    }, timeOption || DEFAULT_TIME);
  }

  function pickAnswer(event) {
    clearTimeout(timer);
    var answer = $(event.target).html();
    var rightAnswer = questions[currentQuestion].correct_answer;
    if (answer === rightAnswer) correct();
    else incorrect();
  }

  function ranOutOfTime() {
    $("#answers").html("Ran out of time!");
    nextQuestion();
  }

  function correct() {
    $("#answers").html("Correct!");
    nextQuestion();
  }

  function incorrect() {
    $("#answers").html(
      "Incorrect! Answer was " + questions[currentQuestion].correct_answer
    );
    nextQuestion();
  }

  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      return gameOver();
    }

    // show right/wrong for a couple seconds before moving on
    setTimeout(function() {
      askQuestion();
    }, DISPLAY_ANSWER_TIME);
  }

  function gameOver() {
    $("#question").html("Game over!");
    $("#answers").empty();
  }

  function start() {
    // api url query input
    var url = buildUrl();
    console.log("Requesting URL " + url);

    $.ajax({
      url: url,
      method: "GET"
    }).done(function(response) {
      questions = response.results;
      currentQuestion = 0;
      timeOption = $("#timer").val();
      askQuestion();
      $("#trivia").addClass("d-none");
      $("#q-a").removeClass("d-none");
    });
  }

  $("#start").on("click", start);
});
