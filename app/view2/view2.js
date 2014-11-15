'use strict';

angular.module('myApp.video', ['ngRoute', 'ngVideo'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/video', {
    templateUrl: 'view2/view2.html',
    controller: 'ArticleController'
  });
}])

.controller('ArticleController', ['$scope', '$http', '$routeParams', 'video', '$window', function($scope, $http, $routeParams, video, window) {

		
		var searchParam = $routeParams.search;

        this.oauth = new OAuth({
            consumer: {
                public: "hackathon",
                secret: "33f3fb11-59b4-4a38-a549-27bb4628d1af"
            }
        });

        //If we need to retrieve the article images
//        var imageUrl="https://ipool.s.asideas.de:443/api/v3/object/" + identifier + "?encodeBase64=true";

        //If we need video
//        var video_content = "https://ipool.s.asideas.de/api/v3/search?limit=5&sources=\"escenic\"&types=\"video\"&q=" + $scope.query;

        var requestUrl = "https://ipool.s.asideas.de/api/v3/search?limit=3&sources=\"escenic\"&types=\"article\"&publisher=\"www.welt.de\"&q=" + searchParam;

        var request_data = {
            url: requestUrl,
            method: 'GET',
            data: {}
        };

        var oauthData = this.oauth.authorize(request_data);

        var authorization = this.oauth.toHeader(oauthData);

        $http.get(requestUrl, {
            headers: { Authorization : authorization['Authorization'] }
        }).success(function(data, status, headers, config) {

        	$scope.articles = data['documents'];

        }).error(function(data, status, headers, config) {
            $scope.result = "An error occured: " + data;
        })

        /*video.addSource('mp4', 'http://www.w3schools.com/html/mov_bbb.mp4', true);

        window.myvideo = video;
        console.log(video);
*/
        /**
         * @property playlistOpen
         * @type {Boolean}
         * @default false
         */
        $scope.playlistOpen = false;

        /**
         * @property videos
         * @type {Object}
         */
        $scope.videos = {
            first:  'videos/Altstadt_Potsdam_UAV.webm',
            second: 'videos/Glienicker_Bruecke_Potsdam_UAV.webm'
        };

        /**
         * @method playVideo
         * @param sourceUrl {String}
         * @return {void}
         */
        $scope.playVideo = function playVideo(sourceUrl) {
            video.addSource('mp4', sourceUrl, true);
        };

        /**
         * @method getVideoName
         * @param videoModel {Object}
         * @return {String}
         */
        $scope.getVideoName = function getVideoName(videoModel) {

            switch (videoModel.src) {
                case ($scope.videos.first): return "Big Buck Bunny";
                case ($scope.videos.second): return "The Bear";
                default: return "Unknown Video";
            }

        };

        // Add some video sources for the player!
        video.addSource('mp4', $scope.videos.first);
        video.addSource('mp4', $scope.videos.second);
 }]);
