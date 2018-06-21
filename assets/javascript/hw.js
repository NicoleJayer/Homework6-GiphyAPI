
// variable that holds all the pre-set Buttons

     var shows = ["Gilmore girls" , "Rick and Morty" , "Inuyasha" , "The Office"]


//this function goes through the shows array and displays the buttons and gives them properties.
     function renderButtons() {

        // deletes old buttons so that they do not repeat and re-posts them each time function called
           $("#buttons-view").empty();

           // Looping through the array of shows
           for (var i = 0; i < shows.length; i++) {

             // Then dynamicaly generating buttons for each show in the array
             // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
             var a = $("<button>");
             // Adding a class of show-btn to our button
             a.addClass("show-btn");
             // Adding a data-attribute
             a.attr("data-name", shows[i]);
             // Providing the initial button text
             a.text(shows[i]);
             // Adding the button to the buttons-view div
             $("#buttons-view").append(a);
           }
         }

         // This function handles events where a show button is clicked
         $("#add-show").on("click", function(event) {
           event.preventDefault();
           // This line grabs the input from the textbox
           var show = $("#show-input").val().trim();

           // Adding show from the textbox to our array
           shows.push(show);

           // Calling renderButtons which handles the processing of our movie array
           renderButtons();
           newButton();
         });

         // Adding a click event listener to all ements with a class of "movie-btn"
         // $(document).on("click", ".show-btn", showDiv);

         // Calling the renderButtons function to display the intial buttons
         renderButtons();
         newButton();


function newButton() {
  $("button").on("click", function() {
  // clears out previous gifs
  $("#gifsappear").empty();
  var show = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    show + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
      console.log(queryURL);

      console.log(response);

      var results = response.data;
      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing div and p tags
        var showDiv = $("<div>");
        showDiv.addClass("newDiv");

        var p = $("<p>").text("Rating: " + results[i].rating);
        // Creating and storing an image tag
        var showImage = $("<img>");
        // Setting the src attribute of the image to a property pulled off the result item
        showImage.attr("src", results[i].images.fixed_height.url);
        showImage.attr("data-still", results[i].images.fixed_height_still.url);
        showImage.attr("data-animate", results[i].images.fixed_height.url);
        showImage.attr("data-state", "animate");
        // Appending the paragraph and image tag to the foodDiv
        showDiv.append(p);
        showDiv.append(showImage);
        // Prependng the foodDiv to the HTML page in the "#foodGifs" div
        $("#gifsappear").prepend(showDiv);
      }

      // Clicking gifs to pause and animate
      $("img").on("click", function() {
          var state = $(this).attr("data-state");
          if (state === "animate") {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
          }
          else {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
          }

      });
    });
});
}

newButton();
   //   $("button").on("click", function() {
   //    // Grabbing and storing the data-animal property value from the button
   //    var show = $(this).attr("data-name");
   //
   //    // Constructing a queryURL using the animal name
   //    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   //    show + "&api_key=dc6zaTOxFJmzC&limit=10";
   //
   //  $.ajax({
   //    url: queryURL,
   //    method: "GET"
   //  })
   //
   //      // After data comes back from the request
   //      .then(function(response) {
   //        console.log(queryURL);
   //
   //        console.log(response);
   //        // storing the data from the AJAX request in the results variable
   //        var results = response.data;
   //
   //        // Looping through each result item
   //        for (var i = 0; i < results.length; i++) {
   //
   //          // Creating and storing a div tag
   //          var showDiv = $("<div>");
   //          showDiv.addClass("newDiv");
   //
   //          // Creating a paragraph tag with the result item's rating
   //          var p = $("<p>").text("Rating: " + results[i].rating);
   //
   //          // Creating and storing an image tag
   //          var showImage = $("<img>");
   //
   //        showImage.attr("src", results[i].images.fixed_height.url);
   //        showImage.attr("data-still", results[i].images.fixed_height_still.url);
   //        showImage.attr("data-animate", results[i].images.fixed_height.url);
   //        showImage.attr("data-state", "animate");
   //          // Setting the src attribute of the image to a property pulled off the result item
   //
   //          // Appending the paragraph and image tag to the animalDiv
   //          showDiv.append(p);
   //          showDiv.append(showImage);
   //
   //          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
   //          $("#gifsappear").append(showDiv);
   //        }
   //      });
   //  });
   //
   // //
   // // $(".gif").on("click", function() {
   // //    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
   // //    var state = $(this).attr("data-state");
   // //    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
   // //    // Then, set the image's data-state to animate
   // //    // Else set src to the data-still value
   // //    if (state === "still") {
   // //      $(this).attr("src", $(this).attr("data-animate"));
   // //      $(this).attr("data-state", "animate");
   // //    } else {
   // //      $(this).attr("src", $(this).attr("data-still"));
   // //      $(this).attr("data-state", "still");
   // //    }
   // //  });
