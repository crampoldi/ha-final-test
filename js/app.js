// Mi código JavaScript:
$('.carousel').carousel()

$('#myModal').on('shown.bs.modal', function() {
    $('#myInput').focus()
})
////////////////////traigo tipo de cambio/////////////////////////////////////
$.ajax({
    method: 'GET',
    url: "https://ha.edu.uy/api/rates",
    dataType: "json",
    success: function(data) {
        console.log(data);
        $("#exchange-price").append(data.uyu);
    },
    error: function(xhr, status, e) {
        alert(e);
    }
});
////////////////////// traigo años desde 2000 a 2017 ///////////////////////////
for (var i = 2000; i < 2018; i++) {
    $("#year").append("<option>" + i + "</option>");
}
///////////////////traigo los modelos////////////////////////////////
$.ajax({
    method: 'GET',
    url: "https://ha.edu.uy/api/brands",
    dataType: "json",
    success: function(data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            $("#brands").append("<option>" + data[i] + "</option>");
        }
    },
    error: function(xhr, status, e) {
        alert(e);
    }
});
/////////////////////////traigo el modelo segun la marca////////////
$("#brands").on("change", function() {
    var brandSelection = $("#brands").val();
    $("#models").html("");
    $.ajax({
        method: 'GET',
        url: "https://ha.edu.uy/api/models?brand=" + brandSelection,
        dataType: "json",
        success: function(data) {
            console.log(data.length);
            for (var i = 0; i < data.length; i++) {
                $("#models").append("<option>" + data[i] + "</option>");

            }
            if (data.lenght == undefined) {
                $("#models").append("<option>No Models</option>");
            }
        },
        error: function(xhr, status, e) {
            alert(e);
        }
    });

})

//////////////////////////traigo los autos//////////////////////////
var cars = [];
var cars_filtered = [];

$.ajax({
    method: 'GET',
    url: "https://ha.edu.uy/api/cars",
    dataType: "json",
    success: function(data) {
        console.log(data);
        app.cars = data;
        cars = data;
    },
    error: function(xhr, status, e) {
        alert(e);
    }
});

/////////////////////////////////////traigo los autos filtrados////////////////////////////////////////

var app = new Vue({
    el: "#car-list",
    data: {
        cars: []

    }

})
$("#apply-filter").on("click", function() {
    cars_filtered = [];
    cars.forEach(function(item) {
        if (item.year == $("#year").val()) {
            if (item.brand == $("#brands").val()) {
                if (item.model == $("#models").val()) {
                    cars_filtered.push(item);
                }
            }
        }
    });
    app.cars = cars_filtered;


})
