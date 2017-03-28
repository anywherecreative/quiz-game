var questions =[
{
  "question": "What is my name?",
  "answer": ["Jeff", "Jack", "Joe"],
  "correct": "Jeff"
},
{
  "question": "What color are my eyes?",
  "answer": ["Green", "Brown", "Blue"],
  "correct": "Brown"
},
{
  "question": "What city do I live in?",
  "answer": ["Narnia", "Toronto", "Barrie"],
  "correct": "Barrie"
},
{
  "question": "Do I own a computer?",
  "answer": ["Yes", "No"],
  "correct": "Yes"
},
];
var currentQuestion = 0;
var currentScore = 0;
$(document).ready(function() {
  $("#start-quiz").click(function() {
    $('#intro').fadeOut(500,function() {
      $("#question, #answers").show();
      loadQuestion();
    });
  });
  $("#play-again").click(function() {
    currentQuestion = 0;
    currentScore = 0;
    $('#result').fadeOut(500,function() {
      $("#question, #answers").show();
      loadQuestion();
    });
  })
});

function loadQuestion() {
  $("#question").text(questions[currentQuestion].question);
  $("#answers").empty();
  $.each(questions[currentQuestion].answer, function(index, answer) {
    var correct = "";
      if (answer == questions[currentQuestion].correct) {
        correct = " data-correct='correct'"
      }
    $("#answers").append("<li" + correct + ">" + answer + "</li>");
  });
  currentQuestion++;
  assignClick();
}

function assignClick() {
  $("#answers LI").click(function() {
    if ($(this).data("correct") == "correct") {
      $(this).addClass("correct");
      currentScore++;
      alert('Correct!');
    }
    else {
      $(this).addClass("wrong");
      alert('Ooops! Wrong Answer!');
    }
    if(questions.length == currentQuestion) {
      loadResult();
    }
    else {
      loadQuestion();
    }
  });
}

function loadResult() {
  $("#question, #answers").hide();
  $("#result").show();
  $("#right").text(currentScore);
  $("#total").text(questions.length);
}
