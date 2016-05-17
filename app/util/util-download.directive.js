require('angular')

angular.module('dataglamp')
       .directive('dgUtilDownload', utilDownload);

utilDownload.$inject = ['$compile'];

function utilDownload($compile) {
    return {
      restrict:'E',
      scope:{ 
          data: '=',
          getUrlData:'&getData'
      },
      controller: UtilDownloadController,
      controllerAs: "vm",
      bindToController: true,
      link: link     
    }
    function link(scope, elm, attrs) {
        var url = URL.createObjectURL(scope.getUrlData());
        elm.append(
            $compile(
            '<a class="btn" download="backup.json"' +
                'href="' + url + '">' +
                'Download' +
                '</a>')(scope)
        );
    };
});

UtilDownloadController.$inject = ['$scope']

function UtilDownloadController($scope){
    vm = this;
    vm.getBlob = function(){
        return new Blob([JSON.stringify(vm.data)], {type: "application/json"});
    }
});
