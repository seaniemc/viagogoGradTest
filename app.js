var myMap = angular.module('myMap', []);

myMap.controller('CanvasCtrl', function($scope){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    
    $scope.data = [
       
    ];
});