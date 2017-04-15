var myMap = angular.module('myMap', []);

myMap.controller('CanvasCtrl', function($scope){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    canvas.width = 600; // Sets the canvas width
    canvas.height = 400; // Sets the canvas height
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
			x: Math.floor(Math.random()*W), //x-coordinate
			y: Math.floor(Math.random()*H), //y-coordinate
			r: Math.floor((Math.random()*5) + 2), // radius
			numOfTickets: Math.floor(Math.random()* 10), // number of tickets
            price: Math.floor(Math.random()*100)
		    });
	    }
        console.log(tickets);
    } // End func
   

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
    
    // setup
    // canvas.width = 600;
    // canvas.height = 400;
    
    context.globalAlpha = 1.0;
    context.beginPath();
    $scope.fillTicketsArray(tickets);
    $scope.drawTicketObj(tickets);
    //draw($scope.data);    

});