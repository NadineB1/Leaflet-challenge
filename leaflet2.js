let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


;
let myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 3

});


let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
street.addTo(myMap);
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

d3.json(queryUrl).then(function (data) {
    console.log(data);
    function selectColor(x) {
        switch (true) {
            case x > 90:
                return "red";
            case x > 70:
                return "orangered";
            case x > 50:
                return "orange";
            case x > 30:
                return "yellow";
            case x > 10:
                return "yellowgreen";

            default:
                return "green";
        }

    }



    L.geoJson(data, {
        pointToLayer: function (feature, latlong) {
            return L.circleMarker(latlong);
        },
        style: function (feature) {
            return {
                fillOpacity: 0.7,
                color: "black",
                radius: feature.properties.mag * 3,
                fillColor: selectColor(feature.geometry.coordinates[2]),
                weight: .3

            }
        }
    }).addTo(myMap);
    /*Legend specific*/
    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend");
        
        div.innerHTML += '<i style="background: #red"></i><span>>90</span><br>';
        div.innerHTML += '<i style="background: #orangered"></i><span>>70</span><br>';
        div.innerHTML += '<i style="background: #orange"></i><span>>50</span><br>';
        div.innerHTML += '<i style="background: #yellow"></i><span>>30</span><br>';
        div.innerHTML += '<i style="background: #yellowgreen"></i><span>>10</span><br>';
        


        return div;
    };

    legend.addTo(myMap);


});


// let baseMaps = {
//     "Street Map": street,
//     "Topographic Map": topo
// };
// let overlayMaps = {
//     Earthquakes: earthquakes
// };


// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(myMap);



