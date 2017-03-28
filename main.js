var questions =[
  {
    "question": "What is my name?", //the question
    "answer": ["Jeff", "Jack", "Joe"], //the options
    "correct": "Jeff" //the correct answer
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
var currentQuestion = 0; //users current score
var currentScore = 0; //what question the user is on

//this function only loads after the page is loaded
$(document).ready(function() {
  //when the user clicks start quiz!
  $("#start-quiz").click(function() {
    //made the intro fade out, and then show the question and answer boxes
    $('#intro').fadeOut(500,function() {
      $("#question, #answers").show();
      //load the question into the QA boxes
      loadQuestion();
    });
  });
  //the user wants to play again
  $("#play-again").click(function() {
    //reset the scores
    currentQuestion = 0;
    currentScore = 0;
    //fade the result out
    $('#result').fadeOut(500,function() {
      //show the QA boxes
      $("#question, #answers").show();
      //load a question
      loadQuestion();
    });
  })
});

/**
 * This function loads a question into the QA box
**/
function loadQuestion() {
  //load the question
  $("#question").text(questions[currentQuestion].question);
  //clear the old answers out
  $("#answers").empty();
  //for each answer, make a new answer box
  $.each(questions[currentQuestion].answer, function(index, answer) {
    var correct = ""; //we need to initilize our variable or it would show null in the code
      //this answer is correct, so give our application a way to know
      if (answer == questions[currentQuestion].correct) {
        //data is a special attribute to let us give our elements info we can use later
        correct = " data-correct='correct'"
      }
    //how add the answer to the list
    $("#answers").append("<li" + correct + ">" + answer + "</li>");
  });
  //next time we want the next question
  currentQuestion++;
  //we need to assign a click action again since these are brand new elements
  assignClick();
}

/**
 * This function adds a click action to our answers
**/
function assignClick() {
  //when an LI is clicked
  $("#answers LI").click(function() {
    //is this the correct answer? (check our data from before)
    if ($(this).data("correct") == "correct") {
      //it is correct! Add a class to style
      $(this).addClass("correct");
      //add 1 to our score
      currentScore++;
      //tell the user they are correct
      alert('Correct!');
    }
    //they have the wrong answer
    else {
      //add a class we can style
      $(this).addClass("wrong");
      //tell the user they were wrong
      alert('Ooops! Wrong Answer!');
    }
    //we've completed the quiz show the results!
    if(questions.length == currentQuestion) {
      loadResult();
    }
    //there are more questions keep em coming!
    else {
      loadQuestion();
    }
  });
}

/**
 * This function loads the results
 **/
function loadResult() {
  //hide the question and answer boxes
  $("#question, #answers").hide();
  //show the results!
  $("#result").show();
  //show the user their score, and how many questions there were
  $("#right").text(currentScore);
  $("#total").text(questions.length);
}
