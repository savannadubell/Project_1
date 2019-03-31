$(document).ready(function () {

    // Preloader dissapears after 2 seconds
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 2000);

    //Location variables
    var lat
    var long
    var zip
    var state

    //Ask user for their location
    function getLocation() {
        var error = $(".geoError");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            error.text("Geolocation is not supported by this browser.");
        }
    }
    //Store user location in lat & long variables
    function showPosition(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;

        //If user clicks allow position, clear form and show cuisine cards
        if (lat !== undefined) {
            $(".cusine-cards").css("display", "flex");
            $(".location-form").css("display", "none");
            $(".change-heading").text("Pick Your Cuisine Below!");

            console.log(lat);
            console.log(long);
        }
    }

    //Get user location when the <body> has an id of "userLocation" (secondpage.html)
    if ($('body#userLocation').length > 0) {
        getLocation();
    }

    //Get values from location form
    $("#submit").on("click", function (event) {

        event.preventDefault();

        var street = $("#street").val().trim();
        var city = $("#city").val().trim();
        var state = $("#state").val().trim();

        var apiKey = "AIzaSyASIXS_BduVFQvDTnhbYSGXVnsKUS6uRyI";
        var queryURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${street},${city},${state}&key=${apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {

            lat = (response.results[0].geometry.location.lat);
            long = (response.results[0].geometry.location.lng);

            console.log(lat);
            console.log(long);

            // On form submit clear the form and show cuisine cards
            $(".cusine-cards").css("display", "flex");
            $(".location-form").css("display", "none");
            $(".change-heading").text("Time to Pick Your Cuisine Type!");

        }).fail(function (jqXHR, textStatus) {
            console.log(JSON.stringify(jqXHR));
        });
    });


    $(".card").on("click", function () {
        var cuisine = ($(this).attr("id"));
        var queryURL = "https://developers.zomato.com/api/v2.1/search?start=0&count=20&lat=" + lat + "&lon=" + long + "&radius=5000&cuisines=" + cuisine + "&sort=real_distance&order=asc";

        //Counter for choosing another restaurant
        var counter = 0;

        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "user-key": "c2f8ca36527489e90ec9ce18254ed96e",
            }
        }).then(function (response) {

            console.log(response);

            $(".change-heading").text("Pick Your Cuisine Below!");

            //Prints new restaurant
            function newRestaurant() {

                $('.cusine-cards').empty();

                var url = response.restaurants[counter].restaurant.url;

                var startDiv = $('<div>');
                startDiv.addClass("card response");
                startDiv.attr("id", "chosen-restaurant");

                var img = $('<img>');
                img.addClass("card-img-top");
                img.attr("src", response.restaurants[counter].restaurant.featured_image);

                var divTwo = $('<div>');
                divTwo.addClass("card-body");

                var pClass = $('<p>');
                pClass.addClass("card-text");
                pClass.text(response.restaurants[counter].restaurant.name);

                var pClass2 = $('<p>');
                pClass2.addClass("card-text");
                pClass2.text(response.restaurants[counter].restaurant.location.address);

                var pClass3 = $('<p>');
                pClass3.addClass("card-text");
                pClass3.text(response.restaurants[counter].restaurant.location.address);

                var link = $('<a>');
                link.attr('href', url);

                var selectButton = $('<button>');
                selectButton.addClass('btn buttons select-button text-center');
                selectButton.attr('id', 'select');
                selectButton.text('Go Here');

                var nextButton = $('<button>');
                nextButton.addClass('btn buttons next-button text-center');
                nextButton.attr('id', 'next');
                nextButton.text('Next Option');

                var backButton = $('<button>');
                backButton.addClass('btn btn-secondary back-button text-center');
                backButton.attr('id', 'back');
                backButton.text('Previous Option');

                //connecting all elements together
                link.append(selectButton);
                divTwo.append(pClass, pClass2, link, backButton, nextButton);
                startDiv.append(img, divTwo);

                //print to page
                $('.cusine-cards').append(startDiv);
            };

            newRestaurant();

            //Chooses next restaurant when clicked
            $(document).on("click", "#next", function () {

                if (counter === 19) {
                    //Bring back to cuisine types page?
                    console.log("out of choices");
                    return
                };

                counter++;
                newRestaurant();
            });

            //Chooses previous restaurant when clicked
            $(document).on("click", "#back", function () {

                if (counter === 0) {
                    console.log("first choice");
                    return
                };

                counter--;
                newRestaurant();
            });


        }).fail(function (jqXHR, textStatus) {
            console.log(JSON.stringify(jqXHR));
        });
    });


});