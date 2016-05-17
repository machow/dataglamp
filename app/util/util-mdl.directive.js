require('angular');
componentHandler = require("material-design-lite");

angular.module('dataglamp')
       .directive('dgUtilMdl', utilMdl);

function utilMdl(){
    return {
        restrict: 'A',
        scope: {
        },
        link: link
    }

    function link(scope, ele, attr){
        console.log(componentHandler);
        componentHandler.upgradeElement(ele[0]);
    }
}

