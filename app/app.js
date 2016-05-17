require('angular')

var app = angular.module('dataglamp', ['dg.exercise', 'dg.code', 'dndLists']);

require('angular-drag-and-drop-lists')

require('./exercise/exercise.directive.js')
require('./code/code.directive.js')
require('./sct-list/sct-list.directive.js')
require('./sct-form/sct-form.directive.js')
require('./util/util-mdl.directive.js')
require('./util/util-floating-label.js')

// whitelist blobs for downloading JSON 
app.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);
