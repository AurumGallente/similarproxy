'use strict';
var app = angular.module('app', ['ui.router', 'ngResource'])
        .constant('backend', {
            url: backendUrl
        })
        .config(function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        })
        .factory('siteService', function(backend, $resource){
            return $resource(backend.url + '/site/:site', {site:'@site'}, {'update': {method: 'PUT'}});
        })
        .controller('singleSiteController', function($scope, siteService){
            //$scope.searchResult = [];
            $scope.search = function(site){
                siteService.query({site:site}, function(entries){
                    var result = [];
                    entries.forEach(function(e){
                        if(!e.data){
                            e.data = {};
                            e.data["overview"] = {};
                            e.data["overview"]["Icon"]="http://www.iconsearch.ru/uploads/icons/oxygen/16x16/mail-delete.png";
                            e.data["overview"]["Category"]="";
                            e.data["noData"] = true;
                            e.data["overview"]["IsVerifiedData"]=false;
                        }
                        else {
                            console.log(JSON.parse(e.data));
                            e.data = JSON.parse(e.data);
                        }
                        
                        result.push(e);
                    });
                    $scope.searchResult = result;
                    
                });
            };
        })
        ;
        
        
