require('angular');
require('angular-ui-bootstrap');
require('angular-ui-ace');
var Range = require('ace').require('ace/range').Range;
var jsdiff = require('diff');

angular.module('dg.code', ['ui.bootstrap', 'ui.ace'])
       .directive('dgCode', code);

function code(){
    return {
        restrict: 'E',
        templateUrl: 'app/code/code.html',
        bindToController: true,
        controller: CodeController,
        controllerAs: 'vm',
        scope: {
            code: "=",
            sctPrefix: "="
        }
    }
}

CodeController.$inject = ['exerciseService'];

function CodeController(exerciseService){
    var vm = this;
    vm.activeIndx = 0;
    vm.activeEntry = {};
    vm.sctPreview = ""
    vm.activate = activate;
    vm.compileExercise = () => vm.compiled = exerciseService.compile().outerHTML;
    vm.updateSct = updateSct;
    vm.diffAceSample =   (editor) => diffAce(vm.code[1], editor);
    vm.diffAceSolution = (editor) => diffAce(vm.code[2], editor);
    vm.jsdiffOpts = { newlineIsToken: false }
    // logic for diffing should be moved to service
    var _markers = {};
    var _splitEditors = {};
    var _re = /^\n*/


    vm.activate(vm.activeIndx);

    function activate(tabIndx){
        vm.activeIndx = tabIndx;
        vm.activeEntry = vm.code[tabIndx];
    }

	function updateSct(){
        var compiled = exerciseService.compileSctStr(); 
        vm.sctPreview = `# Read Only!\n${compiled}`
	}

    function diffAce(code, [obj, editor]){
        // get this session, add to vm
        _splitEditors[code.name] = editor;

        var sample =   _splitEditors['sample-code'],
            solution = _splitEditors['solution'];

        // make sure both sessions have loaded at some point
        if (sample && solution) {
            // remove previous markers
            // list of line diffs for added, removed, or shared code
            var parts = jsdiff.diffLines(sample.getValue(), 
                                         solution.getValue(),
                                         vm.jsdiffOpts);
            // remove old markers and add new ones
            updateMarkers('added', parts, 'sample-code');
            updateMarkers('removed', parts, 'solution');
            
            // set focus to same line
            var alt_editor = code.name == 'solution' ? sample : solution;
            alt_editor.gotoLine(editor.getSelectionRange().start.row + 1);
        }
    }

    function getDiffRanges(dropKey, parts){
        return parts
             .filter((v) => v[dropKey] !== true)
             .reduce((acc, part) => {
                 // note that with a trailing linebreak, it counts both rows
                 //if (part.value === "\n") return acc;
                 //var nl = part.value.slice(-1) === "\n" ? 1 : 0;
                 var entry = {}; 
                 entry.from = acc[acc.length-1] ? acc[acc.length-1].to + 1: 0; 
                 entry.to = entry.from + part.count - 1;
                 entry.cssClass = 
                     part.added ? 'dg-ace-line-add' : 
                     part.removed ? 'dg-ace-line-rm' : 'dg-ace-line-share';
                 acc.push(entry);
                 return acc; 
              }, [])
    }

    function markDiffCss({from, to, cssClass}, session){
        // returns marker id, which can be passed to session.removeMarker
        return session.addMarker(new Range(from, 0, to, 1), cssClass, "fullLine");
    }

    function updateMarkers(dropKey, parts, name){
        var session = _splitEditors[name].getSession(),
            oldMarkers = _markers[name] || [],
            markRanges = getDiffRanges(dropKey, parts);

        for (let id of oldMarkers) session.removeMarker(id);
        _markers[name] = markRanges.map((v) => markDiffCss(v, session));

    }

    function fixDiffCount(entry){
        var firstNl = entry.value.match(_re)[0].length;
        return ((entry.count - firstNl) / 2) + firstNl
    }

}
