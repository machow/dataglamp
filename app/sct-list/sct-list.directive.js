require('angular')
require('angular-ui-bootstrap')
require('../exercise/exercise.service.js')

angular.module('dataglamp')
       .directive('dgSctList', sctList);

require('./sct-list-panel.directive.js')

function sctList(){
    return {
        restrict: 'E',
        scope: {
            specs: "="
        },
        templateUrl: 'app/sct-list/sct-list.html',
        bindToController: true,
        controller: SctListController,
        controllerAs: 'vm'
    }
}

SctListController.$inject = ['exerciseService']

function SctListController(exerciseService){
    var vm = this;
    vm.tools = exerciseService.availSpecs();
    vm.searchbar = "";
	vm.maxTools = 3;
    vm.toggleMaxTool = () => vm.maxTools = vm.maxTools == 3? 20 : 3;
    vm.matchTool = (tool) => tool.indexOf(vm.searchbar) > -1;
    vm.move = move;
    vm.remove = remove;
    vm.addSpec = addSpec;
	vm.isVisible = isVisible;

    function addSpec(name){
        console.log('pushing spec');
        vm.specs.push(exerciseService.createSpec(name));
        console.log(vm.specs);
    }

	function isVisible(indx){
        var tool = vm.tools[indx];
        var empty = vm.searchbar === "";
        return (empty && indx < vm.maxTools) || (!empty && vm.matchTool(tool))
	}

    function move($event, from, to){
        vm.specs.splice(to, 0, vm.specs.splice(from, 1)[0]); // I'm so sorry
        // consider a directive to handle this view-specific action!
        $event.preventDefault();
        $event.stopPropagation();
    }

    function remove($event, indx) {
        $event.preventDefault();
        $event.stopPropagation();
        vm.specs.splice(indx, 1);
    }
}

