 // Initial array of animals
 var animals = ["Dog", "Cat", "Horse", "Mouse"];



 // Function for displaying animal data
 function renderButtons() {

     // Deleting the data prior to adding new so we don't have repeat buttons
     $("#buttons-view").empty();

     // Looping through the array of animals
     for (var i = 0; i < animals.length; i++) {

         // Then dynamicaly generating buttons for each animal in the array
         var a = $("<button>");
         // Adding a class of animal to our button
         a.addClass("animal");
         // Adding a data-attribute
         a.attr("data-name", animals[i]);
         // Providing the initial button text
         a.text(animals[i]);
         // Adding the button to the HTML
         $("#buttons-view").append(a);
     }
 }

 // This function handles events where the submit button is clicked
 $("#add-animal").on("click", function (event) {
     // Preventing the buttons default behavior when clicked (which is submitting a form)
     event.preventDefault();
     // This line grabs the input from the textbox
     var animal = $("#animal-input").val().trim();

     // Adding the animal from the textbox to our array
     animals.push(animal);
     console.log(animals)
     renderButtons();

 });
 // Calling renderButtons which handles the processing of our animal array
 //  renderButtons();

 // Adding click event  listener to all buttons
 $("button").on("click", function () {
     // Grabbing and storing the data-animal property value from the button
     var animal = $(this).attr("data-name");

     // Constructing a queryURL using the animal name
     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
         animal + "&api_key=dc6zaTOxFJmzC&limit=10";

     // Performing an AJAX request with the queryURL
     $.ajax({
             url: queryURL,
             method: "GET"
         })
         // After data comes back from the request
         .then(function (response) {
             console.log(queryURL);

             console.log(response);
             // storing the data from the AJAX request in the results variable
             var results = response.data;
             $("#gifs-appear-here").empty()

             // Looping through each result item
             for (var i = 0; i < results.length; i++) {

                 // Creating and storing a div tag
                 var animalDiv = $("<div>");

                 // Creating a paragraph tag with the result item's rating
                 var p = $("<p>").text("Rating: " + results[i].rating);

                 // Creating and storing an image tag
                 var animalImage = $("<img>");
                 // Setting the src attribute of the image to a property pulled off the result item
                 animalImage.attr("src", results[i].images.fixed_height.url);
                 animalImage.attr("image-state", "still")
                 animalImage.attr("data-animate", results[i].images.fixed_height.url)
                 animalImage.attr("data-still", results[i].images.fixed_height_still.url)
                 animalImage.addClass("gif")

                 // Appending the paragraph and image tag to the animalDiv
                 animalDiv.append(p);
                 animalDiv.append(animalImage);

                 // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                 $("#gifs-appear-here").prepend(animalDiv);
             }

         });

 });
 // $(document).on("click", ".gifButton", displayGifInfo);

 //On click function to animate the gif and still the gif
 $(document).on("click", ".gif", function () {



     var state = $(this).attr("image-state")
     console.log(state)


     if (state == "still") {
         var dataAnimate = $(this).attr("data-animate")
         console.log(dataAnimate)
         $(this).attr("src", dataAnimate)
         $(this).attr("image-state", "animate")


     }

     if (state == "animate") {
         var dataStill = $(this).attr("data-still")
         console.log(dataAnimate)
         $(this).attr("src", dataStill)
         $(this).attr("image-state", "still")


     }

 });