/**
 * Created by bernhard on 9/01/15.
 */
var app = angular.module('app', ['ngAnimate','ngRoute']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'home.html',
                controller: "HomeController"
            }).
            when('/catalog', {
                templateUrl: 'map.html',
                controller: "MapController"
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

app.controller("MainController", function($scope, $http) {
    $scope.parkins = [];
    getParkings($http).then(function(data){
        $scope.parkings = data;
        $scope.vrij = $.grep(data, function(e){return e.full == false});
        $scope.vol = $.grep(data, function(e){return e.full == true});
    });
});
app.controller("HomeController", function($scope) {



});
app.controller("MapController", function($scope) {

});
function getParkings($http){
    def = $.Deferred();

    list = [];

    $http.get("http://datatank.gent.be/Mobiliteitsbedrijf/Parkings11.json").
        success(function(data, status, headers, config) {
            angular.forEach(data.Parkings11.parkings, function(value, key){
                value.address = value.address.replace("<br>", " ");
                var p = $.extend(new Parking(), value);
                list.push(p);
            });
            return def.resolve(list);
        }).
        error(function(data, status, headers, config) {
            return def.reject(data);
        });

    return def.promise();
}

function Parking(timestamp, name, description, address, contactInfo, openingHours, open, full, suggestedRGB, totalCapacity, availableCapacity, latitude, longitude, covered, activeRoute){
    this.timestamp = timestamp;
    this.name = name;
    this.description = description;
    this.address = address;
    this.contactInfo = contactInfo;
    this.openingHours = openingHours;
    this.open = open;
    this.full = full;
    this.suggestedRGB = suggestedRGB;
    this.totalCapacity = totalCapacity;
    this.availableCapacity = availableCapacity;
    this.latitude = latitude;
    this.longitude = longitude;
    this.covered = covered;
    this.activeRoute = activeRoute;
}