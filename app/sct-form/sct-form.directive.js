require('angular');

angular.module('dataglamp')
       .directive('dgSctForm', sctForm);

function sctForm(){
    return {
        restrict: 'E',
        scope: {
            spec: "="
        },
        templateUrl: 'app/sct-form/sct-form.html',
        bindToController: true,
        controller: SctFormController,
        controllerAs: 'vm',
    }

}

function SctFormController(){
    var vm = this;
    vm.args = vm.spec.slice(1);
    vm.setPlaceholder = (entry) => {
        entry.placeholder = !entry.content ? entry.default : "";
    }

    vm.args.forEach(vm.setPlaceholder);
}


