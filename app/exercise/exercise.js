require('angular');
require('./exercise.service.js')

angular.module('dataglamp')
       .controller('ExerciseController', ExerciseController)

ExerciseController.$inject = ['exerciseService'];

function ExerciseController(exerciseService){
    var vm = this;
    vm.code = exerciseService.code;
    vm.specs = exerciseService.specs;
    vm.sctPrefix = exerciseService.sctPrefix;
	vm.jsonUrl = "";
    vm.jsonUrlNum = 0;
    vm.loadData = loadData;
	vm.makeJsonUrl = makeJsonUrl;


    vm.runPreview = function(){
		vm.makeJsonUrl();
        exerciseService.runPreview(vm.prevEl);
    }

    function loadData(url){
        exerciseService.loadExercise(url)
                       .then(({data}) => {
                           // TODO: this is duplicating the service..
                           vm.code = exerciseService.code;
                           vm.specs = exerciseService.specs;
                           vm.sctPrefix = exerciseService.sctPrefix

                           vm.makeJsonUrl();
                       })
    }

	function makeJsonUrl(){
        var content = angular.copy({code: vm.code.concat(vm.sctPrefix), specs: vm.specs})
        var blob = new Blob([ JSON.stringify(content) ], { type : 'text/plain' });
        vm.jsonUrlNum += 1;
        vm.jsonUrl = (window.URL || window.webkitURL).createObjectURL( blob );
	}

    vm.ex = exerciseService;
}

