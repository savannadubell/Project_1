$(document).ready(function () {

    // Preloader dissapears after 2 seconds
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 2000);

    //Location variables
    var lat
    var long

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

    //When user clicks on cuisine they want
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

            $(".change-heading").text("Pick Somewhere to Eat!");

            var resList = [];
            var resAddress = [];

            //Grabs name and address of restaurants from zomato api
            for (i = 0; i < response.restaurants.length; i++) {
                resList.push(response.restaurants[i].restaurant.name);
                resAddress.push(response.restaurants[i].restaurant.location.address + " " + response.restaurants[i].restaurant.location.locality);
            }

            //Prints new restaurant
            function newRestaurant() {

                $('.cusine-cards').empty();


                //Variables and function for google places library
                var map;
                var service;
                var id
                var photoSearch = resList[counter] + " " + resAddress[counter];
                var photoSource
                var image

                function initMap() {

                    map = new google.maps.Map(
                        document.getElementById("map"));

                    var request = {
                        query: photoSearch,
                        fields: ["place_id"]
                    };

                    var service = new google.maps.places.PlacesService(map);

                    service.findPlaceFromQuery(request, function (results, status) {

                        id = results[0].place_id;

                        request = {
                            placeId: id,
                            fields: ["name", "photo"]
                        }

                        service.getDetails(request, callback);

                        function callback(place, status) {
                            if (status == google.maps.places.PlacesServiceStatus.OK) {

                                photoSource = place.photos[0].getUrl();

                                img = $('<img>');
                                img.attr("src", photoSource);
                                img.addClass("card-img-top resImg");
                                startDiv.prepend(img);

                            } else {
                                console.log("no photo");
                            }
                        }
                    });
                }

                //Creates restaurant card
                var startDiv = $('<div>');
                startDiv.addClass("card");
                startDiv.attr("id", "chosen-restaurant");

                //Call google places function to get picture
                initMap();

                var url = response.restaurants[counter].restaurant.url;

                var divTwo = $('<div>');
                divTwo.addClass("card-body");

                var pClass = $('<p>');
                pClass.addClass("card-text");
                pClass.text(response.restaurants[counter].restaurant.name);

                var pClass2 = $('<p>');
                pClass2.addClass("card-text");
                pClass2.text(response.restaurants[counter].restaurant.location.address);

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
                startDiv.append(divTwo);

                //print to page
                $('.cusine-cards').append(startDiv);
            };

            newRestaurant();

            //Chooses next restaurant when clicked
            $(document).on("click", "#next", function () {

                if (counter === 19) {
                    return
                };

                counter++;
                newRestaurant();
            });

            //Chooses previous restaurant when clicked
            $(document).on("click", "#back", function () {

                if (counter === 0) {
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