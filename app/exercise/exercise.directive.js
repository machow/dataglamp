require('angular')
require('./exercise.js')

angular.module('dg.exercise', ['ui.bootstrap'])
       .directive('dgExercise', exercise);

function exercise(){
    return {
        restrict: 'E',
        templateUrl: 'app/exercise/exercise.html',
        transclude: true,
        controller: 'ExerciseController',
        controllerAs: 'vm',
        link: link
    }

    function link(scope, ele, attr, vm){
        var prevEl = ele[0].querySelector('#preview-screen');
        
        vm.prevEl = prevEl;
    }
}
