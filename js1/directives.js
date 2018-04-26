
// ImaxGame游戏社区
//支持正版，授权冲突，格式化系统，后果自负。
//iMax游戏爱好者全网独家提供 盗版必究 本代码仅限学习和研究使用 禁止非法用途 责任自负 与本站无关 禁止任何形式的转卖和再分发 监控自动删除
// 定制化或者二次开发 联系qq：2035450966
//
angular.module('starter.directives', [])
    .directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, element, attributes) {
                $scope.$on('$ionicView.beforeEnter', function () {
                    $scope.$watch(attributes.hideTabs, function (value) {
                        $rootScope.hideTabs = value;
                    });
                });

                $scope.$on('$ionicView.beforeLeave', function () {
                    $rootScope.hideTabs = false;
                });
            }
        };
    })

    .directive('needLogin', function ($rootScope, $state, Auth) {
        return {
            restrict: 'A',
            link: function ($scope) {
                $scope.$on('$ionicView.beforeEnter', function () {
                    Auth.isSignIn(function (user) {
                        if (user) {
                            return;
                        }
                        $state.go('login');
                    });
                });
            }
        };
    })

    .directive('tabAnimation', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope) {
                $scope.$on('$ionicView.beforeLeave', function () {
                    delete $rootScope.tabAnimation;
                });
            }
        };
    })

    .directive('backButton', ['$ionicConfig', '$document', function ($ionicConfig, $document) {
        return {
            restrict: 'C',
            require: '^ionNavBar',
            compile: function(tElement) {
                var hasIcon = /ion-|icon/.test(tElement[0].className) || /ion-|icon/.test(tElement[0].firstChild.className);

                var iconEle = $document[0].createElement('i');
                var defaultIcon = $ionicConfig.backButton.icon();
                if (!hasIcon && defaultIcon && defaultIcon !== 'none') {
                    iconEle.setAttribute('class', 'icon ' + defaultIcon);
                    tElement[0].insertBefore(iconEle, tElement[0].firstChild);
                }
            }
        };
    }])
;