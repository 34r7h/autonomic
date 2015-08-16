/**
 * Created by i on 15-08-15.
 */
angular.module('starter').service('API', function($window, $q){
	var api = {};
	api.camera = {};
	api.camera.getPicture = function(options) {
		var q = $q.defer();
		console.log('navigator', navigator);

		navigator.camera.getPicture(function(result) {
			// Do any magic you need
			q.resolve(result);
		}, function(err) {
			q.reject(err);
		}, options);

		return q.promise;
	};
	api.camera.upload = function() {
		var options = {
			quality : 75,
			destinationType : Camera.DestinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.CAMERA,
			allowEdit : true,
			encodingType: Camera.EncodingType.JPEG,
			popoverOptions: CameraPopoverOptions,
			targetWidth: 500,
			targetHeight: 500,
			saveToPhotoAlbum: false
		};
		$cordovaCamera.getPicture(options).then(function(imageData) {
			syncArray.$add({image: imageData}).then(function() {
				alert("Image has been uploaded");
			});
		}, function(error) {
			console.error(error);
		});
	};

	api.camera.startCamera = function() {
		function initCam(){
			CanvasCamera.initialize(canvasMain);
			var options = {
				quality: 75,
				destinationType: CanvasCamera.DestinationType.DATA_URL,
				encodingType: CanvasCamera.EncodingType.JPEG,
				width: 640,
				height: 480
			};
			$window.plugin.CanvasCamera.start(options);
		}
		canvasMain = document.getElementById("camera");
		CanvasCamera === true ? initCam() : CanvasCamera = {};

	};

	return api;

});