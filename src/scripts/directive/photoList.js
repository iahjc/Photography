'use strict';

angular.module('app').directive('appPhotoList',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/photoList.html'
	};
}]);