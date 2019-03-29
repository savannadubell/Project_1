$(document).ready(function () {
    //var feedMe = $(".feed-me");

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
        var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=1213&entity_type=city&cuisines=" + cuisine;
        // //%20%2B%20random
        // var cuisine = ($(this).attr("id"));
        $.ajax({
            url: queryURL,
            method: "GET",
            headers: {
                "user-key": "c2f8ca36527489e90ec9ce18254ed96e",
            }
        }).then(function (response) {
            console.log(response)
            $('.cusine-cards').empty()
            //display restaurant that was chosen
            //display buttons of "go here" and "choose a different option for me"

            var startDiv = $('<div>');
            startDiv.addClass("card");

            var img = $('<img>');
            img.addClass("card-img-top");
            img.attr("src", response.restaurants[0].restaurant.featured_image);

            var divTwo = $('<div>');
            divTwo.addClass("card-body");

            var pClass = $('<p>');
            pClass.addClass("card-text");
            pClass.text(response.restaurants[0].restaurant.name);

            //connecting all elements together
            startDiv.append(img).append(divTwo).append(pClass);

            //print to page
            $('.cusine-cards').append(startDiv);


            /*
            
                    <div class="card" id="italian" style="width: 18rem;">
                        <img class="card-img-top" src="https://cdn.cnn.com/cnnnext/dam/assets/190107114340-pizza-slice.jpg"
                            alt="italian-food">
                        <div class="card-body">
                            <p class="card-text">ITALIAN FOOD</p>
                        </div>
                    </div>
            
            */










        }).fail(function (jqXHR, textStatus) {
            console.log(JSON.stringify(jqXHR))
        })


    });
});

//empty page after user chooses cuisine type
$('.cusine-cards').empty()

//displaying on-click functions to page



//append