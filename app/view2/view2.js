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


        $scope.videosBrucke = [
            {
                title: 'Tausche Ostagent gegen Westagent',
                id: 'hDwvDHnFWI0'
            },
            {
                title: 'Potsdam Glienicker Brücke',
                id: 'IBN418lPt4M'
            }
        ];

        $scope.parkBabelsbergs = [
            {
                title: 'Park Babelsberg, flying over the Kindermann See (Potsdam, Germany)',
                id: 'v_upHLPHUP0'
            }
        ];

        $scope.alterLandtags = [
            {
                title: 'Reichsarchiv POTSDAM Kriegsschule Landtag',
                id: 'cpBFFPWUlsc'
            }
        ];

        $scope.alterLandtags = [
            {
                title: 'Der neue Brandenburger Landtag in Potsdam',
                id: 'u40Dx82N3OI'
            },
            {
                title: 'Am 18.01.2014 fand die feierliche Einweihung des neuen Landtages in Potsdam statt.',
                id: 'A1jOcHwOnuM'
            }
        ];

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

        new makeRequest(video_list[0].keyword);

        $rootScope.videoCallback = function (index) {
            new makeRequest(video_list[index].keyword);
        }
        // Add some video sources for the player!
        video.addSource('webm', video_list[0].src);
        new makeRequest(video_list[0].keyword);

        video.addSource('webm', video_list[1].src);

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
