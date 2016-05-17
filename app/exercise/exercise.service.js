require('angular');
var dataglamp = require('../../src/dataglamp.js');
var replaceDataCampExercises = require('datacamp-light'); 

angular.module('dataglamp') 
       .service('exerciseService', exerciseService);

exerciseService.$inject = ['$http']

function exerciseService($http){
    var service = {
        code: dataglamp.BLOCKNAMES.slice(0,3)
                                  .map( v => { return {name: v, content: ""} }),
        sctPrefix: {name: "sct", content: ""},
        specs: [],
        availSpecs: () => Object.keys(dataglamp.SPEC),
        createSpec: (name) => dataglamp.createSpec(name),
        preProcExercise: preProcExercise,
        compile,
        compileSctStr,
        runPreview,
        loadExercise
    };
    return service;
    
    function compile(code, specs, dstEl){
        if (!code) code = angular.copy(this.code).concat(this.sctPrefix);
        if (!specs) specs = angular.copy(this.specs);

        console.log(this.sctPrefix);

        var codeBlock = code.reduce( 
            (acc, v) => Object.assign(acc,  {[v.name]: v.content})
            , {})
        console.log(codeBlock)
        console.log(specs)

        var div = dataglamp.createExerciseHtml(codeBlock, specs, dstEl);
        return div
    }

    function compileSctStr(specs){
        // parse sct specs and string together
        if (!specs) specs = this.specs;
        var cpy = angular.copy(specs);
        console.log(cpy);
        var out = cpy.map((v) => dataglamp.parseSpec(v)).join("\n\n");
        return out
    }

    function runPreview(dstEl, code, specs){
        // First, clear the preview container.
        // there may be memory leaks, if datacamp-light stores
        // references to the child nodes.
        dstEl.innerHTML = ""

        // rebuild exercise and put in DOM
        this.compile(code, specs, dstEl)
        replaceDataCampExercises()
    }

    function loadExercise(url){
        // returns promise
        return $http({ method: 'GET', url: url })
            .then( response => {
                // update code and specs on service
                this.code = response.data.code.slice(0,3);
                this.sctPrefix = response.data.code[3];
                this.specs = response.data.specs;
                return response
            })
    }

    function preProcExercise(data){
        data.code = dataglamp.BLOCKNAMES
            .map( v => { return {name: v, content: data.code[v] } })

        return data
    }
}
