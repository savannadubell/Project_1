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
            $(".change-heading").text("Time to Pick Your Cusine Type");

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

        zip = parseInt($("#zip").val().trim());
        state = $("#state").val().trim();

        //On form submit clear the form and show cuisine cards
        $(".cusine-cards").css("display", "flex");
        $(".location-form").css("display", "none");
        $(".change-heading").text("Time to Pick Your Cusine Type");

        console.log(zip);
        console.log(state);
    });


    $(".card").on("click", function () {
        var cuisine = ($(this).attr("id"));
        var queryURL = "https://developers.zomato.com/api/v2.1/search?start=0&count=10&lat=" + lat + "&lon=" + long + "&radius=5000&cuisines=" + cuisine + "&sort=real_distance&order=asc&apikey=0ce7b31696dc922375b5bd5b125d26af";

        console.log(cuisine);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var name = response.restaurants[0].restaurant.name;
            console.log(name);
            console.log(response)
        });


    })
});
