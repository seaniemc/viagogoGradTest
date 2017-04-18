var myMap = angular.module('myMap', ['ui.router']);

myMap.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);

myMap.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: 'partials/welcome.html',
        controller: 'EnterCtrl'
    };
    var answerState = {
        name: 'answer',
        url: '/answer/:coor',
        templateUrl: 'partials/answer.html',
        controller: 'CanvasCtrl',
        params: {coor: null}
    };

    $stateProvider
        .state(homeState)
        .state(answerState);

    $urlRouterProvider.otherwise('/');
 
});
myMap.controller('CanvasCtrl', ['$scope','$state','$stateParams',function CanvasCtrl($scope,$state,$stateParams){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 20; // Sets the canvas width
    canvas.height = 20; // Sets the canvas height
    var W = canvas.width; // Shorten variable name
    var H = canvas.height; // Shorten variable name
    var tickets = [];
    var maxTickets = 10;
    //var userData;

    var userData = $state.params.coor;
    // var userDataY = $stateParams.y;
   var obj = JSON.parse(userData);
   
   console.log(obj);
   console.log("canvas");

    $scope.fillTicketsArray = function (tickets)
    {
	    for(var i = 0; i < maxTickets; i++)
	    {
		    tickets.push({
            _id: "00"+ i,
			x: Math.floor(Math.random()*W), //x-coordinate
			y: Math.floor(Math.random()*H), //y-coordinate
			r: + Math.floor(Math.random()*2) , // radius
			ticksPrice: randomArray(Math.floor(Math.random()*30), 150),
            dist: 0
		    });
	    }
        //console.log(tickets);
    } // End func
    //userData
    //http://stackoverflow.com/questions/5836833/create-a-array-with-random-values-in-javascript
    function randomArray(length, max) {
        return Array.apply(null, Array(length)).map(function() {
            return Math.round(Math.random() * max);
        });
    }

    //https://xlinux.nist.gov/dads/HTML/manhattanDistance.html
    $scope.calculateManhattonDist = function(userData){
        console.log(userData);
        for(var i = 0; i < tickets.length; i++){
            var ticket = tickets[i];
            ticket.dist = ((userData.x - ticket.x) + (userData.y - ticket.y)); 
        }
        minAbs(tickets);
        console.log(tickets);
    }
        
    //http://stackoverflow.com/questions/20431453/provide-number-close-to-zero-in-js
    //this method re-orders the ticket array based on the distance variable 
    //It returns them closest to zero, as the distance is returned in most cases as a minus value
    //sorting normally will not do. 
     function minAbs (x) {
        return x.sort(function (a, b) {
            return Math.abs(a.dist) > Math.abs(b.dist) ? 1 : -1;
        })[0];
         
    }

    
    
    context.globalAlpha = 1.0;
    context.beginPath();
    $scope.fillTicketsArray(tickets);
    $scope.calculateManhattonDist(obj);
    //draw($scope.data);    

}]);


myMap.controller('EnterCtrl',['$scope', '$state', function EnterCtrl($scope,$state){
    $scope.formData = {
        x: 0,
        y: 0
    };
    var userData = $scope.formData;
   // console.log(userData);

    $scope.goToAnswer = function(){
//console.log(userData);
            $state.go('answer', {'coor': JSON.stringify(userData)});
        };

        	
// //I'm assuming that by empty you mean "has no properties of its own".

// // Speed up calls to hasOwnProperty
// var hasOwnProperty = Object.prototype.hasOwnProperty;

// function isEmpty(obj) {

//     // null and undefined are "empty"
//     if (obj == null) return true;

//     // Assume if it has a length property with a non-zero value
//     // that that property is correct.
//     if (obj.length > 0)    return false;
//     if (obj.length === 0)  return true;

//     // If it isn't an object at this point
//     // it is empty, but it can't be anything *but* empty
//     // Is it empty?  Depends on your application.
//     if (typeof obj !== "object") return true;

//     // Otherwise, does it have any properties of its own?
//     // Note that this doesn't handle
//     // toString and valueOf enumeration bugs in IE < 9
//     for (var key in obj) {
//         if (hasOwnProperty.call(obj, key)) return false;
//     }

//     return true;
// }
}]); 
