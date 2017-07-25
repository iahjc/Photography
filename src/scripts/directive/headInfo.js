'use strict';

angular.module('app').directive('appHeadInfo',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/headInfo.html'
	}
}]);