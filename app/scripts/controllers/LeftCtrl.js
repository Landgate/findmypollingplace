'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:LeftCtrl
 * @description
 * # LeftCtrl
 * Controller of the appApp
 */
module.controller('LeftCtrl', function ($scope, $http, GMESchoolLookup, GMEElectorateLookup) {
  $scope.data = {
    "querying": false,
    "queried": false,
    "school": "",
    "electorate": "",
    "show_warning": false
  };

  var map = document.querySelector('google-map');
  map.addEventListener('google-map-ready', function(e) {
    $scope.gPlace = new google.maps.places.Autocomplete(document.getElementById("address_search"), {
      bounds: new google.maps.LatLngBounds(new google.maps.LatLng(-35, 114), new google.maps.LatLng(-12, 129))
    });
    google.maps.event.addListener($scope.gPlace, 'place_changed', function() {
      $scope.$apply(function() {
        var place = $scope.gPlace.getPlace();
        if(place && place.formatted_address) {
          $scope.choose(place)
        }
      });
    })
  });

  $scope.choose = function(search_result) {
    $scope.data.querying = true;

    $scope.searchToken = search_result.formatted_address;
    // console.log(search_result);

    var marker = new google.maps.Marker({
        map: map.map,
        position: search_result.geometry.location
    });

    // Step 1 - Find the closest school
    GMESchoolLookup.run(search_result.geometry.location.lat(), search_result.geometry.location.lng())
      .then(function(response) {
        var feature = response.data.features[0];
        $scope.data.school = feature.properties.SchoolName;

        // Create school marker
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]),
            map: map.map,
            title: feature.properties.SchoolName
        });

        // Fit map to search result + school location
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(search_result.geometry.location);
        bounds.extend(marker.getPosition());
        map.map.fitBounds(bounds);

        return GMEElectorateLookup.run(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
      })

      // Step 2 - Find the state electorate the user's address resides in
      .then(function(response) {
        var feature = response.data.features[0];
        $scope.data.electorate = feature.properties.name;

        return GMEElectorateLookup.run(search_result.geometry.location.lat(), search_result.geometry.location.lng())
      })

      // Step 3 - Find the state electorate their closest school resides in
      .then(function(response) {
        // Step 4 - If the state electorates retrieved from Step 2 and Step 3 differ, warn the user.
        if($scope.data.electorate == response.data.features[0].properties.name) {
          $scope.data.show_warning = false;
        }

        $scope.data.querying = false;
        $scope.data.queried = true;
      });
  }
});
