var myMap = angular.module('myMap', []);

myMap.controller('CanvasCtrl', function($scope){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 20; // Sets the canvas width
    canvas.height = 20; // Sets the canvas height
    var W = canvas.width; // Shorten variable name
    var H = canvas.height; // Shorten variable name
    var tickets = [];
    var maxTickets = 10;

    $scope.data = [
       
    ];

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
        console.log(tickets);
    } // End func
    //userData
    //http://stackoverflow.com/questions/5836833/create-a-array-with-random-values-in-javascript
    function randomArray(length, max) {
        return Array.apply(null, Array(length)).map(function() {
            return Math.round(Math.random() * max);
        });
    }
    var userData = {
        x : 4,
        y: 6
    }
    //https://xlinux.nist.gov/dads/HTML/manhattanDistance.html
    $scope.calculateManhattonDist = function(userData){
        for(var i = 0; i < tickets.length; i++){
            var ticket = tickets[i];
            ticket.dist = ((userData.x - ticket.x) + (userData.y - ticket.y)); 
        }
        //https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        tickets.sort(function(a, b) {
            return parseFloat(a.dist) - parseFloat(b.dist);
        });
        console.log(tickets);
    }

     $scope.addData = function() {
        var id = 0;
        if($scope.data.length > 0) {
            id = $scope.data[$scope.data.length-1].id + 1;
        }
        var p = {id: id, x: $scope.x, y: $scope.y, amount: $scope.amount};
        $scope.data.push(p);
        $scope.x = '';
        $scope.y = '';
        $scope.amount = '';
        draw($scope.data);
    };
    
    $scope.removePoint = function(point) {
        console.log(point);
        for(var i=0; i<$scope.data.length; i++) {
            if($scope.data[i].id === point.id) {
                console.log("removing item at position: "+i);
                $scope.data.splice(i, 1);    
            }
        }
        
        context.clearRect(0,0,600,400);
        draw($scope.data);
        console.log($scope.data);
    }

     function draw(data) {
        for(var i=0; i<data.length; i++) {
            drawDot(data[i]);
            if(i > 0) {
                drawLine(data[i], data[i-1]);
            }
        }
    }
    
    function drawDot(data) {
        context.beginPath();
        context.arc(data.x, data.y, data.amount, 0, 2*Math.PI, false);
        context.fillStyle = "#ccddff";
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = "#666666";
        context.stroke();  
    }
    
   $scope.drawTicketObj = function (tickets){
       context.beginPath();
       for(var i = 0; i < tickets.length; i ++){
           var ticket = tickets[i];
           context.moveTo(ticket.x, ticket.y);
            context.arc(ticket.x, ticket.y, ticket.r, 0, 2*Math.PI, false);
       }
       context.fillStyle = "red";
       context.fill();
   }
    


    function drawLine(data1, data2) {
        context.beginPath();
        context.moveTo(data1.x, data1.y);
        context.lineTo(data2.x, data2.y);
        context.strokeStyle = "black";
        context.stroke();
    }
    
    //============= sort array based on x and y ===========
    //http://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
    function fieldSorter(fields) {
        return function (a, b) {
            return fields
                .map(function (o) {
                    var dir = 1;
                    if (o[0] === '-') {
                    dir = -1;
                    o=o.substring(1);
                    }
                    if (a[o] > b[o]) return dir;
                    if (a[o] < b[o]) return -(dir);
                    return 0;
                })
                .reduce(function firstNonZeroValue (p,n) {
                    return p ? p : n;
                }, 0);
        };
    }
   

    // setup
    // canvas.width = 600;
    // canvas.height = 400;
    
    context.globalAlpha = 1.0;
    context.beginPath();
    $scope.fillTicketsArray(tickets);
    $scope.drawTicketObj(tickets);
    $scope.calculateManhattonDist(userData);
    draw($scope.data);    

});