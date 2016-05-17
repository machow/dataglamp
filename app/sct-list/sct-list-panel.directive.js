require('angular')

angular.module('dataglamp')
       .directive('dgSctListPanel', sctListPanel);

function sctListPanel(){
    return {
        restrict: 'E',
        scope: {
            title: "@"
        },
        templateUrl: 'app/sct-list/sct-list-panel.html',
        transclude: true
    }
}
