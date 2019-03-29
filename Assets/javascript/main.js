$(document).ready(function () {

    setTimeout(function () {
        $('body').addClass('loaded');
    }, 2000);

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

    }).fail(function (jqXHR, textStatus) {
        console.log(JSON.stringify(jqXHR))
    })


})

