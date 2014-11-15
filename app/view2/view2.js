'use strict';

angular.module('myApp.video', ['ngRoute', 'ngVideo', 'ui.bootstrap'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/video', {
    templateUrl: 'view2/view2.html',
    controller: 'ArticleController'
  });
}])

.controller('ArticleController', ['$scope', '$http', '$routeParams', 'video', '$window', function($scope, $http, $routeParams, video, window) {

        
        var searchParam = $routeParams.search;

        

        //If we need to retrieve the article images
//        var imageUrl="https://ipool.s.asideas.de:443/api/v3/object/" + identifier + "?encodeBase64=true";

        //If we need video
//        var video_content = "https://ipool.s.asideas.de/api/v3/search?limit=5&sources=\"escenic\"&types=\"video\"&q=" + $scope.query;

        

        

        var makeRequest = function (query) {
            var _self = this;
            var requestUrl = "https://ipool.s.asideas.de/api/v3/search?limit=3&sources=\"escenic\"&types=\"article\"&publisher=\"www.welt.de\"&q=" + query;
            var request_data = {
                url: requestUrl,
                method: 'GET',
                data: {}
            };

            _self.oauth = new OAuth({
                consumer: {
                    public: "hackathon",
                    secret: "33f3fb11-59b4-4a38-a549-27bb4628d1af"
                }
            });
            var oauthData = _self.oauth.authorize(request_data);

            var authorization = _self.oauth.toHeader(oauthData);
            

            $http.get(requestUrl, {
                headers: { Authorization : authorization['Authorization'] }
            }).success(function(data, status, headers, config) {

                $scope.articles = data['documents'];

            }).error(function(data, status, headers, config) {
                $scope.result = "An error occured: " + data;
            });
        };
        


        var video_list = [{
            'name': 'video1',
            'src': 'videos/Altstadt_Potsdam_UAV.webm',
            'keyword': 'potsdam'
        }, {
            'name': 'video2',
            'src': 'videos/Glienicker_Bruecke_Potsdam_UAV.webm',
            'keyword': 'Glienicker'
        }];

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
            first:  video_list[0].src,
            second: video_list[1].src
        };

        var videoCallback = function (index) {
            new makeRequest(video_list[index].keyword);
        }
        // Add some video sources for the player!
        video.addSource('webm', video_list[0].src);

        video.addSource('webm', video_list[1].src);

        window.myvideo = video;

        $scope.$watch('$scope.playing', function(newValue, oldValue) {
            console.log($scope.playing);
        });

        // Accordian

      $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
      };
 }]);
