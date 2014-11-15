'use strict';

angular.module('myApp.video', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/video', {
    templateUrl: 'view2/view2.html',
    controller: 'ArticleController'
  });
}])

.controller('ArticleController', ['$scope', '$http', function($scope, $http) {
        $scope.query ="Sanssouci";

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

        var requestUrl = "https://ipool.s.asideas.de/api/v3/search?limit=5&sources=\"escenic\"&types=\"article\"&q=" + $scope.query;

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
 }]);
