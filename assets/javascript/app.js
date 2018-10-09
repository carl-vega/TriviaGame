$(document).ready(function() {
  // variables
  {
    ("trivia_categories");
    [
      {
        id: 9,
        name: "General Knowledge"
      },
      {
        id: 10,
        name: "Entertainment: Books"
      },
      {
        id: 11,
        name: "Entertainment: Film"
      },
      {
        id: 12,
        name: "Entertainment: Music"
      },
      {
        id: 13,
        name: "Entertainment: Musicals & Theatres"
      },
      {
        id: 14,
        name: "Entertainment: Television"
      },
      {
        id: 15,
        name: "Entertainment: Video Games"
      },
      {
        id: 16,
        name: "Entertainment: Board Games"
      },
      {
        id: 17,
        name: "Science & Nature"
      },
      {
        id: 18,
        name: "Science: Computers"
      },
      {
        id: 19,
        name: "Science: Mathematics"
      },
      {
        id: 20,
        name: "Mythology"
      },
      {
        id: 21,
        name: "Sports"
      },
      {
        id: 22,
        name: "Geography"
      },
      {
        id: 23,
        name: "History"
      },
      {
        id: 24,
        name: "Politics"
      },
      {
        id: 25,
        name: "Art"
      },
      {
        id: 26,
        name: "Celebrities"
      },
      {
        id: 27,
        name: "Animals"
      },
      {
        id: 28,
        name: "Vehicles"
      },
      {
        id: 29,
        name: "Entertainment: Comics"
      },
      {
        id: 30,
        name: "Science: Gadgets"
      },
      {
        id: 31,
        name: "Entertainment: Japanese Anime & Manga"
      },
      {
        id: 32,
        name: "Entertainment: Cartoon & Animations"
      }
    ];
  }

  var param = {
    cat: "",
    diff: "",
    type: "",
    num: 10
  };
  $("#categories").on("click", function(event) {
    param.cat = $("#categories").val();
    console.log($("#categories").val());
  });
  $("#difficulty").on("click", function(event) {
    param.diff = $("#difficulty").val();
    console.log($("#difficulty").val());
  });
  $("#type").on("click", function(event) {
    param.type = $("#type").val();
    console.log($("#type").val());
  });
  $("#").on("click", function(event) {
    param.num = $("#number").val();
    console.log($("#number").val());
  });

  var response;
  var url = "https://opentdb.com/api_count.php";
  var query = "";

  /*
  var query = [];
  if(cat) query.push("category=" + cat);
  if()
  if(type) query.push("type=" + type);
  if(query.length) url += '?' + query.join('&');
// gives https://opentdb.com/api_count.php?category=sports&type=multiple


*/
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
    url += "?" + query.join("&");
  }

  $.ajax({
    url: url,
    method: "GET"
  })
    .done(function(response) {})
    .fail(function(err) {
      throw err;
    });

  // functions
  function start() {
    var startDiv;

    for (i = 0; i < trivia_categories.length; i++) {
      startDiv = $("<button class='category'>");
      var catID = trivia_categories[i].id();
      var catName = trivia_categories[i].name();
      startDiv.attr("id", catID);
      startDiv.append(catName);
      $("#start").append(startDiv);
    }
  }
  // $("#categories").on("click", function()) {}
  // function pickTrivia() {}

  // function triviaAnswers() {}

  // function timer() {}

  // expressions
  //   $(".dropdown").on("click", dropdown(event));
  // start();
});
