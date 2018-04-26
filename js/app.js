// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//
// ImaxGame游戏社区
//支持正版，授权冲突，格式化系统，后果自负。
//iMax游戏爱好者全网独家提供 盗版必究 本代码仅限学习和研究使用 禁止非法用途 责任自负 与本站无关 禁止任何形式的转卖和再分发 监控自动删除
// 定制化或者二次开发 联系qq：2035450966
//

var qr_lx 	= 1									// 二维码类型 1=图联 2=百度
		var qr_img 	= [{img: '1.png', qrsize: '50', x: '27', y: '0'},
                      {img: '2.jpg', qrsize: '25', x: '35', y: '0'},
                      {img: '3.jpg', qrsize: '42', x: '35', y: '0'},
                      {img: '4.jpg', qrsize: '45', x: '42', y: '0'},
                      {img: '5.jpg', qrsize: '50', x: '50', y: '0'},
                      {img: '6.jpg', qrsize: '40', x: '52', y: '0'},
                      {img: '7.jpg', qrsize: '40', x: '52', y: '0'},
                      {img: '8.jpg', qrsize: '40', x: '52', y: '0'},
                      {img: '9.jpg', qrsize: '50', x: '57', y: '0'}]

var lotteryDescription = '恭喜发财,大吉大利!';
var appTitle = "2018幸运之旅";
var hometitle="2018幸运之旅";
var lotteryMaxNumber = 100;
var lotteryMaxMoney = 500;
var lotteryUnit = "金币";
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives','ngFileUpload'])

//此处为全局的变量
    .constant('myConstants', {
        'availablePayType': ['suda', 'mobao', "yinbang", "koudai"],
        ENABLED_PAY: 1,
        'IS_APP': false,
        'BASE_URL': '',
        WS_HOST: 'localhost',
        vcodeTimeout: 120 // @@ 短信验证码发送间隔
    })

	
    .run(function ($ionicPlatform, $rootScope, Auth, $state, webSocketService, Rooms, $ionicPopup, $timeout) {
        $ionicPlatform.ready(function () {
            // $rootScope.backButtonIcon = $ionicConfigProvider.backButton.icon();
            if ($ionicPlatform.is('ios')) {
                $rootScope.platform = 'ios';
            } else if ($ionicPlatform.is('android')) {
                $rootScope.platform = 'android';
            }
            $rootScope.closeTip = function() {
                $rootScope.tipShow = false;
            };
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
        //$rootScope.$on('$locationChangeStart', function (e, next, current) {
        //
        //});
        //$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        //
        //});
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.name == 'login' || toState.name == 'register') {
                var targetScope = event.targetScope;
                targetScope.fromState = fromState;
                targetScope.fromParams = fromParams;
            }
        });
    })

    .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

    	.state('index', {
            url: '/index',
            templateUrl: 'templates/index.html',
            controller: 'IndexCtrl'
        })
		
        // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

             .state('tab.rooms', {
                url: '/rooms',
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/rooms.html',
                        controller: 'RoomsCtrl'
                    }
                }
            })
            // Each tab has its own nav history stack:

          /*  .state('tab.rooms', {
                url: '/rooms',
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/tab-rooms.html',
                        controller: 'RoomsCtrl'
                    }
                }
            })*/

            .state('tab.room-detail', {
                url: '/rooms/:roomId',
                cache: false,
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/room-detail.html',
                        controller: 'RoomDetailCtrl'
                    }
                }
            })

            .state('tab.shop', {
                url: '/shop',
                views: {
                    'tab-shop': {
                        templateUrl: 'templates/tab-shop.html',
                        controller: 'ShopCtrl'
                    }
                }
            })

            .state('tab.shop-detail', {
                url: '/shop',
                params: {shopId: null},
                views: {
                    'tab-shop': {
                        templateUrl: 'templates/shop-detail.html',
                        controller: 'ShopCtrl'
                    }
                }
            })

            .state('tab.shop-exchange', {
                url: '/shop/exchange',
                params: {
                    shop: {
                        id: null,
                        name: null,
                        money: null
                    },
                    contact:{
                        name:null,
                        address:null,
                        mobile:null
                    }
                },
                views: {
                    'tab-shop': {
                        templateUrl: 'templates/shop-exchange.html',
                        controller: 'ShopCtrl'
                    }
                }
            })

            .state('tab.room-detail-G03', {
                url: '/rooms/G03/:roomId',
                cache: false,
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/room-detail-G03.html',
                        controller: 'RoomDetailCtrl'
                    }
                }
            })
      .state('tab.room-detail-G30', {
                url: '/rooms/G30/:roomId',
                cache: false,
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/room-detail-G30.html',
                        controller: 'RoomDetailCtrl'
                    }
                }
            })
            .state('tab.room-detail-G03-trend', {
                url: '/tab/G03/trend',
                cache: false,
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/room-detail-G03-trend.html',
                        controller: 'G03TrendCtrl'
                    }
                }
            })
.state('tab.room-detail-G30-trend', {
                url: '/tab/G30/trend',
                cache: false,
                views: {
                    'tab-rooms': {
                        templateUrl: 'templates/room-detail-G30-trend.html',
                        controller: 'G30TrendCtrl'
                    }
                }
            })

            .state('tab.history', {
                url: '/history',
                views: {
                    'tab-history': {
                        templateUrl: 'templates/tab-shop.html',
                        controller: 'HistoryCtrl'
                    }
                }
            })

            .state('tab.create', {
                url: '/create',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-create.html',
                        controller: 'CreateCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
                .state('tab.account-detail', {
                url: '/account/detail',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/tab-account-detail.html',
                        controller: 'AccountDetailCtrl'
                    }
                }
            })
            .state('tab.account-rechargeAndWithdraw', {
                url: '/account/rechargeAndWithdraw',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-recharge-withdraw.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
          .state('tab.account-WithdrawQrCode', {
                url: '/account/WithdrawQrCode',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-WithdrawQrCode.html',
                        controller: 'WithdrawQrCodeCtrl'
                    }
                }
            })
            .state('tab.account-manager', {
                url: '/account/manager',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.account-manager-updateName', {
                url: '/account/manager-updateName',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager-updateName.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.account-transfer', {
                url: '/account/manager-transfer',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager-transfer.html',
                        controller: 'TransferCtrl'
                    }
                }
            })
            .state('tab.account-transfer-do', {
                url: '/account/manager-transfer-do',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager-transfer-do.html',
                        controller: 'TransferCtrl'
                    }
                }
            })
            .state('tab.account-proxy-recharge-do', {
                url: '/account/proxy-recharge-do',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-recharge-do.html',
                        controller: 'ProxyRechargeCtrl'
                    }
                }
            })
            .state('tab.account-proxy-recharge-log', {
                url: '/account/proxy-recharge-log',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-recharge-log.html',
                        controller: 'ProxyRechargeCtrl'
                    }
                }
            })
            .state('tab.account-proxy-unRecharge-do', {
                url: '/account/proxy-unRecharge-do',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-unRecharge-do.html',
                        controller: 'ProxyUnRechargeCtrl'
                    }
                }
            })
            .state('tab.account-proxy-unRecharge-log', {
                url: '/account/proxy-unRecharge-log',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-unRecharge-log.html',
                        controller: 'ProxyUnRechargeCtrl'
                    }
                }
            })
            .state('tab.account-proxy-users', {
                url: '/account/proxy-users',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-users.html',
                        controller: 'ProxyUsersCtrl'
                    }
                }
            })
            .state('tab.account-proxy-create', {
                url: '/account/proxy-create',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-create.html',
                        controller: 'ProxyCreateUserCtrl'
                    }
                }
            })
            .state('tab.account-proxy-apply', {
                url: '/account/proxy-apply',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-apply.html',
                        controller: 'ProxyApplyCtrl'
                    }
                }
            })
            .state('tab.account-proxy-logs', {
                url: '/account/proxy-logs',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-logs.html',
                        controller: 'ProxyLogsCtrl'
                    }
                }
            })
                 .state('tab.account-proxy-gamepoint', {
              
                url: '/account/proxy-gamepoint',
                params: {level: null},
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-gamepoint.html',
                        controller: 'GamePointCtrl'
                    }
                }
            })
                    .state('tab.account-proxy-servicepoint', {
              
                url: '/account/proxy-servicepoint',
                params: {level: null},
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-servicepoint.html',
                        controller: 'ServicePointCtrl'
                    }
                }
            })
            
               .state('tab.account-proxy-rechargepoint', {
              
                url: '/account/proxy-rechargepoint',
                params: {level: null},
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-rechargepoint.html',
                        controller: 'RechargePointCtrl'
                    }
                }
            })
            
        .state('tab.account-proxy-recharge-water', {
                  url: '/account/account-proxy-recharge-water',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-recharge-water.html',
                        controller: 'ProxyRechargeWaterCtrl'
                    }
                }
            })

            .state('tab.account-exchange', {
                url: '/account/exchange',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-exchange.html',
                        controller: 'ShopExchangeLogCtrl'
                    }
                }
            })

            .state('tab.account-transfer-log', {
                url: '/account/manager-transfer-log',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager-transfer-log.html',
                        controller: 'TransferCtrl'
                    }
                }
            })
//支持正版，授权冲突，格式化系统，后果自负。
            .state('tab.account-manager-updatePhone', {
                url: '/account/manager-updatePhone',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager-updatePhone.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.account-manager-updatePhone-confirm', {
                url: '/account/manager-updatePhone-confirm',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager-updatePhone-confirm.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('tab.account-manager-updatePsw', {
                url: '/account/manager-updatePsw',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-manager-updatePsw.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('tab.account-proxy', {
                url: '/account/proxy',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy.html',
                        controller: 'AccountCtrl'
                    }
                }
            })

            .state('tab.account-lottery-detail', {
                url: '/account/lottery-detail',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-lottery-detail.html',
                        controller: 'AccountLotteryCtrl'
                    }
                }
            })
            .state('tab.account-bonus-detail', {
                url: '/account/bonus-detail',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-bonus-detail.html',
                        controller: 'AccountBonusCtrl'
                    }
                }
            })

            .state('tab.account-bonus03-detail', {
                url: '/account/bonus03-detail',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-bonus03-detail.html',
                        controller: 'AccountBonus03Ctrl'
                    }
                }
            })
        .state('tab.account-bonus30-detail', {
                url: '/account/bonus30-detail',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-bonus30-detail.html',
                        controller: 'AccountBonus30Ctrl'
                    }
                }
            })
            .state('tab.account-recharge', {
                url: '/account/recharge',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/recharge.html',
                        controller: 'RechargeCtrl'
                    }
                }
            })

            .state('tab.account-rooms', {
                url: '/account/rooms',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/room-list.html',
                        controller: 'UserRoomsCtrl'
                    }
                }
            })

            .state('tab.account-room-props', {
                url: '/account/room-props/:roomId',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/room-props.html',
                        controller: 'UserRoomPropsCtrl'
                    }
                }
            })
             .state('tab.account-url', {
                url: '/account/url',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-url.html',
                        controller: 'AccountUrlCtrl'
                    }
                }
            })
            .state('tab.account-cards', {
                url: '/account/cards',
                params: {target: null},
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/bank-cards.html',
                        controller: 'BankCardsCtrl'
                    }
                }
            })

            .state('tab.account-recharge-history', {
                url: '/account/recharge-history',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/recharge-history.html',
                        controller: 'RechargeHistoryCtrl'
                    }
                }
            })
                  .state('tab.account-recharge-detail', {
                url: '/account/recharge-detail',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/tab-account-recharge-detail.html',
                        controller: 'RechargeDetailCtrl'
                    }
                }
            })
                   .state('tab.account-withdraw-detail', {
                url: '/account/withdraw-detail',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/tab-account-withdraw-detail.html',
                        controller: 'WithdrawDetailCtrl'
                    }
                }
            })
//支持正版，授权冲突，格式化系统，后果自负。
            .state('tab.account-withdraw-history', {
                url: '/account/withdraw-history',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/withdraw-history.html',
                        controller: 'WithdrawHistoryCtrl'
                    }
                }
            })

            .state('tab.account-withdraw', {
                url: '/account/withdraw',
                params: {bankName: null, branch: null, ownerName: null, account: null, mobile: null,imgsrc:null},
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/withdraw.html',
                        controller: 'WithdrawCtrl'
                    }
                }
            })
               .state('tab.account-withdrawcash', {
                url: '/account/withdrawcash',
                params: {bankName: null, branch: null, ownerName: null, account: null, mobile: null},
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/withdraw.html',
                        controller: 'WithdrawCtrl'
                    }
                }
            })//支持正版，授权冲突，格式化系统，后果自负。

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })

            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegisterCtrl'
            })
//支持正版，授权冲突，格式化系统，后果自负。
            .state('kf', {
                url: '/kf',
                templateUrl: 'templates/tab-kf.html',
                controller: 'KFCtrl'
            })
  .state('tab.game28', {
                url: '/rooms',
                params: {"gt": null},
                views: {
                    'tab-rooms': {
                templateUrl: 'templates/tab-rooms-28.html',
                controller: 'RoomsCtrl' }}
            })
              .state('tab.account-proxy-backwater-red', {
                url: '/account/proxy-backwater-red',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account/account-proxy-backwater-red.html',
                        controller: 'ProxyBackWaterLogsCtrl'
                    }
                }
            })
 .state('tab.submitpay', {
                url: '/submitpay',             

           params: {"paysrc": null},
				 views: {
                    'tab-account': {
                         templateUrl: 'templates/account/submitpay.html',
                controller: 'SubmitPayCtrl'
                    }
                }
            })
            	 .state('tab.inframe', {
                url: '/inframe',             

           params: {"inframe": null},
				 views: {
                    'tab-account': {
                         templateUrl: 'templates/account/inframe.html',
                controller: 'InframeCtrl'
                    }
                }
            })


 .state('tab.account-proxy-promote', {
                url: '/account-proxy-promote',             

         
				 views: {
                    'tab-account': {
                   templateUrl: 'templates/account/account-proxy-promote.html',
                   controller: 'AccountProxyPromoteCtrl'
                    }
                }
            })
 .state('tab.promoteqrcode', {
                url: '/promoteqrcode',             

                 params: {"qr": null},
				 views: {
                    'tab-account': {
                         templateUrl: 'templates/account/account-proxy-promoteqrcode.html',
                         controller: 'AccountProxyPromoteQrcodeCtrl'
                    }
                }
            })


        ;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/index');

    });
