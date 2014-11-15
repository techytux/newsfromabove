'use strict';

angular.module('myApp.video', ['ngRoute', 'ngVideo', 'ui.bootstrap', 'youtube-embed'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/video', {
    templateUrl: 'view2/view2.html',
    controller: 'ArticleController'
  });
}])

.controller('ArticleController', ['$scope', '$http', '$routeParams', 'video', '$rootScope', function($scope, $http, $routeParams, video, $rootScope) {
        var searchParam = $routeParams.search;

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
                console.log('Request sucess ' + query);
                $scope.articles = data['documents'];

            }).error(function(data, status, headers, config) {
                $scope.result = "An error occured: " + data;
            });
        };
        var m = 'videos/Altstadt_Potsdam_UAV.webm'

        
        var video_list = [{
            'name': 'video1',
            'src': 'videos/Glienicker_Bruecke_Potsdam_UAV_2.webmhd.webm',
            'keyword': 'Glienicker',
            'relatedVideos': [{
                    title: 'Tausche Ostagent gegen Westagent',
                    id: 'hDwvDHnFWI0'
                },
                {
                    title: 'Potsdam Glienicker Brücke',
                    id: 'IBN418lPt4M'
                }
            ]
        }, {
            'name': 'video2',
            'src': 'videos/Altstadt_Potsdam_UAV_2.webmhd.webm',
            'keyword': 'Altstadt Potsdam',
            'relatedVideos': [{
                    title: 'Reichsarchiv POTSDAM Kriegsschule Landtag',
                    id: 'cpBFFPWUlsc'
                }
            ]
        }, {
            'name': 'video3',
            'src': 'videos/Alter_Landtag_Potsdam_UAV_2.webm',
            'keyword': 'Alter Landtag',
            'relatedVideos': [{
                title: 'Reichsarchiv POTSDAM Kriegsschule Landtag',
                id: 'cpBFFPWUlsc'
            }

            ]

        }, {
            'name': 'video4',
            'src': 'videos/Sanssoucis_2_UAV.webmhd.webm',
            'keyword': 'schloss sanssouci',
            'relatedVideos': [
            ]

        }, {
            'name': 'video5',
            'src': 'videos/Villa_Schoeningen_UAV_2.webmhd.webm',
            'keyword': 'Villa Schoeningen',
            'relatedVideos': [
            ]

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

        $rootScope.videoCallback = function (index) {
            new makeRequest(video_list[index].keyword);
            $scope.relatedVideos = video_list[index].relatedVideos;
        }
        // Add some video sources for the player!
        video.addSource('webm', video_list[0].src);
        $rootScope.videoCallback(0);
        video.addSource('webm', video_list[1].src);
        video.addSource('webm', video_list[2].src);
        video.addSource('webm', video_list[3].src);
        video.addSource('webm', video_list[4].src);

        $scope.$watch(function() {
          return video;
        }, function(newValue, oldValue) {
          console.log(newValue)
        });

        // Accordian

      $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
      };
 }]);
