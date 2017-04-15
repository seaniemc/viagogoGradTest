var myMap = angular.module('myMap', []);

myMap.controller('CanvasCtrl', function($scope){

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    
    $scope.data = [
       
    ];

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
});