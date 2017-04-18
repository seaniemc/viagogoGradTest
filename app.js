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

    var W = 20; // Shorten variable name
    var H = 20; // Shorten variable name
    var tickets = [];
    var maxTickets = 10;
    $scope.answerArr = [];
    
    var userData = $state.params.coor;
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
            //creates a random array of between 1 and 30 with random values between 
            //0 and 150
			ticksPrice: randomArray(Math.floor(Math.random()*30 + 1), 150), 
            dist: 0
		    });
	    }
        
    } // End func

    //http://stackoverflow.com/questions/5836833/create-a-array-with-random-values-in-javascript
    //Creates an array of random length with random values
    function randomArray(length, max) {
        return Array.apply(null, Array(length)).map(function() {
            return Math.round(Math.random() * max);
        });
    }

    //https://xlinux.nist.gov/dads/HTML/manhattanDistance.html
    //This function calculates the Manhattan distance for each ticket event
    $scope.calculateManhattonDist = function(userData){
        console.log(userData);
        for(var i = 0; i < tickets.length; i++){
            var ticket = tickets[i];
            ticket.dist = ((userData.x - ticket.x) + (userData.y - ticket.y)); 
        }
        minAbs(tickets);
        //console.log(tickets);
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

    $scope.answer = function (){
        var asnwerArr = []
        for (var i = 0; i <= 4; i++){
            var ticket = tickets[i];
            //sorts the prices array from low to high
            ticket.ticksPrice.sort(function(a, b){return a-b});
            asnwerArr.push(ticket);
        }
        $scope.answerArr = asnwerArr;
        console.log($scope.answerArr);

    }
    
    $scope.fillTicketsArray(tickets);
    $scope.calculateManhattonDist(obj);
    $scope.answer();
}]);


myMap.controller('EnterCtrl',['$scope', '$state', function EnterCtrl($scope,$state){
    $scope.formData = {
        x: '',
        y: ''
    };
    var userData = $scope.formData;
   
   //passes the x and y coordinates to the canvas ctrl
    $scope.goToAnswer = function(){
        $state.go('answer', {'coor': JSON.stringify(userData)});
    };

        	

}]); 
