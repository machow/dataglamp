// taken from http://ngmodules.org/modules/angular-directive-implementing-float-label-pattern
angular.module('dataglamp')
	   .directive('dgFloatingLabel', function () {
  return {
    restrict: 'A',
	scope: {
        placeholder: '='
	},
    transclude: true,
    template: '<ng-transclude><div class="floating-label">{{placeholder}}</div></ng-transclude>',
    link: function ($scope, $element, attrs) {
      //var template = '<div class="floating-label">' + $scope.placeholder +'</div>';
      
	  var $input = $element.find('input')
      //append floating label template
      //$input.after(template);
      
      //remove placeholder  
      $input.removeAttr('placeholder');
      
      //hide label tag assotiated with given input
	  $element.find('label')[0].style.display = 'none';
     
      $scope.$watch(function () {
        if($input.val().toString().length < 1) {
          $input.addClass('empty');
        } else {
          $input.removeClass('empty');
        }
      });

      //$scope.$watch($scope.place
    }
  };
});
