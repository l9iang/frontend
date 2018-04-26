
// ImaxGame游戏社区
//支持正版，授权冲突，格式化系统，后果自负。
//iMax游戏爱好者全网独家提供 盗版必究 本代码仅限学习和研究使用 禁止非法用途 责任自负 与本站无关 禁止任何形式的转卖和再分发 监控自动删除
// 定制化或者二次开发 联系qq：2035450966
//
angular.module('starter.services', [])

    .factory('$req', function ($http, $q, myConstants, $window) {
        function method(m, url, data) {
            var rq = {
                method: m,
                url: myConstants.IS_APP ? myConstants.BASE_URL  + url : '' + url
            };
            if (data) {
                if ('GET' == m) {
                    rq.params = data;
                } else {
                    rq.data = data;
                }
            }
            var uid = $window.localStorage.getItem('uid');
            var accessToken = $window.localStorage.getItem('accessToken');
            rq.headers = {
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'x-access-token': accessToken,
                'x-access-uid': uid
            };
            var deferred = $q.defer();
            $http(rq).then(function (res) {
                deferred.resolve(res.data);    //成功直接处理数据
            }, function (res) {
                deferred.reject(res);          //不超过则需要查看http请求状态和异常信息
            });

            return deferred.promise;
        }

        return {
            get: function (url, params) {
                return method('GET', url, params);
            },
            post: function (url, data) {
                return method('POST', url, data);
            }
        }
    })

    .factory('Auth', function ($req, $window, $rootScope) {
        return {
            isSignIn: function (callback) {
                callback = callback || function () {};
                if ($rootScope.user != null && $rootScope.user != undefined) {
                    callback($rootScope.user);
                    return;
                }
                var uid = localStorage.uid;
                if (!uid) {
                    callback();
                    return;
                }
                this.getUser(uid).then(function (res) {
                    if (res.code == 200) {
                        $rootScope.user = res.body;
                        callback($rootScope.user);
                    } else {
                        $req.post('/thirdparty/login/auto', {
                            uid: Number(localStorage.uid),
                            username: localStorage.username,
                            accessToken: localStorage.accessToken,
                            inWeixin: typeof WeixinJSBridge != 'undefined'
                        }).then(function (res) {
                            if (res.code == 200) {
                                $rootScope.user = res.body;
                                callback(res.body);
                            } else {
                                callback();
                            }
                        });
                    }
                });
            },
            getUser: function (uid) {
                return $req.get('/user/' + uid);
            },
            login: function (data) {
                localStorage.removeItem('uid');
                localStorage.removeItem('username');
                localStorage.removeItem('accessToken');
                return $req.post('/login', data);
            },
            logout: function () {
                localStorage.removeItem('uid');
                localStorage.removeItem('username');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('autoLogin');
                return $req.post('/user/logout');
            },
            register: function (data) {
                return $req.post('/register', data);
            },
            registerbymoible:function()
            {
            	 return $req.get('/registerbymoible');
            }
        };
    })

    .factory('ShopService', function ($req, $window, $rootScope, $timeout) {
        return {
            shopList: function (pageNo,pageSize) {
                return $req.post('/shop/list', {pageNo: pageNo, pageSize: pageSize});
            },
            get: function (id) {
                return $req.get('/shop/get',{id:id});
            },
            getContactInfo:function(){
                return  $req.get('/shop/getContactInfo');
            },
            doExchange:function(shopId,name,address,mobile){
                return  $req.post('/shop/doExchange',{shopId:shopId,name:name,address:address,mobile:mobile});
            }
        };
    })

    .factory('UserService', function ($req, $window, $rootScope, $timeout) {
        return {
            getNickName:function(uid){
                return $req.post('/user/getNickName', {uid:uid});
            },
            update: function (data) {
                return $req.post('/user/update', data);
            },
            transfer: function (data) {
                return $req.post('/user/transfer', data);
            },
            updatePsw: function (data) {
                return $req.post('/user/updatePsw', data);
            },
            sendSmsCode: function (data) {
                return $req.post('/user/sendSmsCode', data);
            },
            sendSmsCodebyCheck: function (data) {
                return $req.post('/user/sendSmsCode_1', data);
            },
           
            
            getPromoteQrcodePoster: function (data) {
                return $req.post('/user/getPromoteQrcode', data);
            },
            //--
            
            getPromoteQrcode: function (data) {
                return $req.get('/user/getPromoteQrcode?'+data);
            },
            bindMobile: function (data) {
                return $req.post('/user/bindMobile', data);
            },
            getLottery: function () {
                return $req.get('/user/myLottery');
            },
            getLotteryDetails: function (pageNo, pageSize) {
                return $req.get('/user/myLottery', {pageNo: pageNo, pageSize: pageSize});
            },
            getBonusDetails: function (pageNo, pageSize) {
                return $req.get('/user/myBonus', {pageNo: pageNo, pageSize: pageSize});
            },

            getBonus03Details: function (pageNo, pageSize) {
                return $req.get('/user/myBonus03', {pageNo: pageNo, pageSize: pageSize});
            },
            getBonus30Details: function (pageNo, pageSize) {
                return $req.get('/user/myBonus30', {pageNo: pageNo, pageSize: pageSize});
            },
            getTransferLog: function (pageNo, pageSize) {
                return $req.get('/user/transferLogs', {pageNo: pageNo, pageSize: pageSize});
            },
            getProxyUsers: function (pageNo, pageSize) {
                return $req.get('/user/proxyUsers', {pageNo: pageNo, pageSize: pageSize});
            },
            getProxyLogs: function (pageNo, pageSize) {
                return $req.get('/user/proxyLogs', {pageNo: pageNo, pageSize: pageSize});
            },
            getProxyGamepoint: function (pageNo, pageSize,level) {
                return $req.get('/user/proxygamepoint', {pageNo: pageNo, pageSize: pageSize,level:level});
            },
            getProxyRechargeWaterLogs: function (pageNo, pageSize) {
                return $req.get('/user/proxyrechargewaterLogs', {pageNo: pageNo, pageSize: pageSize});
            },
            getProxyRechargePoint: function (pageNo, pageSize,level) {
                return $req.get('/user/proxyrechargepoint', {pageNo: pageNo, pageSize: pageSize,level:level});
            },
            getShopExchangeLog:function(pageNo,pageSize){
                return $req.get('/user/exchangeLogs', {pageNo: pageNo, pageSize: pageSize});
            },
            getRoomHistory: function () {
                return $req.get('/user/roomHistory');
            },
            getBalance: function () {
                return $req.get('/user/balance');
            },
            applyRoom: function (data) {
                return $req.post('/user/roomApply', data);
            },
            
            applyCreateRoom: function (data) {
                return $req.post('/user/applyCreateRoom', data);
            },
            getRoomCount: function () {
                return $req.get('/user/roomCount');
            },
            getRooms: function (pageNo, pageSize) {
                return $req.get('/user/rooms', {pageNo: pageNo, pageSize: pageSize});
            },
            getInvitorId: function () {
                return $req.get('/user/getInvitorId');
            },
            createUser: function (data) {
                return $req.post('/user/createUser',data);
            },
            getProxyConfig: function () {
                return $req.get('/user/proxyConfig');
            },
            getProxyBackWaterRedLogs: function (pageNo, pageSize,queryUserId) {
                return $req.get('/user/proxyBackWaterRedLogs', {pageNo: pageNo, pageSize: pageSize, queryUserId:queryUserId});
            },
            getProxyServicePoint: function (pageNo, pageSize,level) {
                return $req.get('/user/proxyServicePoint', {pageNo: pageNo, pageSize: pageSize, level:level});
            },
            getCreateRoomConfig: function () {
                return $req.get('/user/roomCreateConfig');
            },
            doApply: function () {
                return $req.get('/user/proxyApply');
            },
            checkRecharge:function(uid){
                return $req.post('/user/checkRecharge', {uid:uid});
            },
            prixyRecharge: function (data) {
                return $req.post('/user/prixyRecharge', data);
            },
            prixyRechargeLog: function (pageNo,pageSize) {
                return $req.get('/user/prixyRechargeLog', {pageNo: pageNo, pageSize: pageSize});
            },
            prixyUnRecharge: function (data) {
                return $req.post('/user/prixyUnRecharge', data);
            },
            prixyUnRechargeLog: function (pageNo,pageSize) {
                return $req.get('/user/prixyUnRechargeLog', {pageNo: pageNo, pageSize: pageSize});
            },
            getBankQrcode: function (account) {
                return $req.get('/user/getbankqrcode/' + account);
            },
            getjumpurl: function () {
                return $req.get('/user/getjumpurl');
            }
            ,
            getrecharelist: function () {
                return $req.get('/user/getrecharelist');
            }
        };
    })

    .factory('configService', function ($req) {
          	
        return {
        	
            getLotteryDescription: function () {
                return lotteryDescription;
            },
            getLotteryMaxNumber: function () {
                return lotteryMaxNumber;
            },
            getLotteryMaxMoney: function () {
                return lotteryMaxMoney;
            },
            getAppTitle: function () {
                return appTitle;
            },
            getLotteryUnit: function () {
                return lotteryUnit;
            },
            getDic: function (dic) {
                return $req.get('/' + dic + '.dc');
            },
            getAppInfo: function () {
                return $req.get('/getappinfo');
            }
        };
    })

    .factory('Rooms', function ($req, $timeout, $ionicLoading, configService) {
        return {
            updateRooms: function ($scope, delay, filter) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles"></ion-spinner>'
                });
                var url = '/room/list/' + $scope.pageNo;
                $req.get(url, filter).then(function (res) {
                    if (200 == res.code) {
                        $timeout(function () {
                            var rooms = res.body.concat($scope.rooms);
                            var gameTypes = {};
                            if (rooms && rooms.length) {
                                for (var i = 0; i < rooms.length; i++) {
                                    var cat = gameTypes[rooms[i].type];
                                    if (cat) {
                                        var row = cat[cat.length - 1];
                                        if (row.length < 3) {
                                            row.push(rooms[i]);
                                        } else {
                                            row = [rooms[i]];
                                            cat.push(row);
                                        }
                                    } else {
                                        cat = [[rooms[i]]];
                                        gameTypes[rooms[i].type] = cat;
                                    }
                                }
                            }
                            $scope.rooms = gameTypes;
                            $ionicLoading.hide();
                        }, delay);
                    }
                }).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            },
            join: function (roomId) {
                return $req.get('/room/join/' + roomId);
            },
            getRoom: function (roomId) {
                return $req.get('/room/' + roomId);
            },
            deleteRoom: function (roomId) {
                return $req.get('/room/delete/' + roomId);
            },
            authorize: function (roomId, password) {
                return $req.post('room/authorize', {roomId: roomId, password: password});
            },
            getCata: function () {
                return configService.getDic('dic.chat.roomCata');
            },
            getProps: function (roomId) {
                return $req.get('/room/props', {roomId: roomId});
            },
            getTotalOnlineCount: function () {
                return $req.get('/totalOnlineCount');
            },
            getNotice: function () {
                return $req.get('/getNotice');
            },
            searchRoom: function (roomId) {
                return $req.get('/room/search/' + roomId);
            },
            updateProp: function (roomId,proid,key,value) {
                return $req.post('/room/updateProp', {roomId:roomId,proid:proid,key:key,value:value});
            },
            updateRoomProp:function (roomId,key,value) {
                return $req.post('/room/updateRoomProp', {roomId:roomId,key:key,value:value});
            }
        };
    })

    .factory('roomMessageService', function ($rootScope, Auth, $ionicPopup, $location, $ionicScrollDelegate, $state, $timeout) {
        return {
            process: function (data, $scope, ws) {
                var type = data.type;
                switch (type) {
                    case 'ORD':
                        this.processCMD(data, $scope, ws);
                        break;
                    case 'RED':
                        this.processLottery(data, $scope);
                        break;
                    case 'TXT':
                        this.processTxt(data, $scope);
                        break;
                    case 'TXT_SYS':
                        this.processSysTxt(data, $scope);
                        break;
                    case 'TXT_ALERT':
                        this.processAlertText(data, $scope);
                    case 'PC_MSG':
                        this.processAlertText(data, $scope);
                }
            },

        };
    })

    .factory('lottery', function ($req) {
        return {}
    })

    .factory('webSocketService', function ($ionicPopup, myConstants) {
        var ws, uri = 'chat';
        return {
            create: function (listener) {
                this.close();
                if ('WebSocket' in window) {
                    ws = new WebSocket("ws://" + (myConstants.IS_APP ? myConstants.WS_HOST : window.location.host) + "/" + uri);
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '您的浏览器不支持,请更新到现代浏览器.'
                    });
                }
                ws.onopen = listener.onOpen;
                ws.onmessage = listener.onMessage;
                ws.onclose = listener.onClose;
                ws.onerror = listener.onerror;
                return ws;
            },
            close: function () {
                if (ws) {
                    ws.close();
                }
                ws = null;
            }
        };
    })

    .factory('Pay', function ($req, $window, myConstants) {
        return {
            payChannels: function () {
                if (myConstants.IS_APP) {
                    return [1001,1002,1003];
                    //return [33, 31];
                } else {
                     return [1001,1002,1003];
                }
            }(),

            apply: function (index, totalFee) {
               // if (myConstants.IS_APP)
			   {
                  return   $req.post('/pay/apply/mzf', {
                        payChannel: this.payChannels[index],
                        totalFee: totalFee
                    });
                } 
            },

            applyWx: function (totalFee) {
                $req.post('pay/apply/wx', {
                    payChannel: 'WX_JSAPI',
                    totalFee: totalFee
                }).then(function (res) {
                    if (res.code == 200) {
                        $window.location.href = res.body;
                    }
                });
            }
        };
    })

    .factory('ThirdPartyLogin', function ($req, $window, myConstants) {
        return {
            apply: function (type, extras) {
                localStorage.removeItem('uid');
                localStorage.removeItem('username');
                localStorage.removeItem('accessToken');
                if (myConstants.IS_APP) {
                    Wechat.isInstalled(function (installed) {
                        //alert("Wechat installed: " + (installed ? "Yes" : "No"));
                        if (installed) {
                            var scope = "snsapi_userinfo", state = "_" + (+new Date());
                            Wechat.auth(scope, state, function (response) {
                                $req.get('/thirdparty/login/wx/code', {code: response.code});
                            }, function (reason) {
                                $ionicPopup.alert({
                                    title: '提示',
                                    template: '登录失败。'
                                });
                            });
                        } else {

                        }
                    }, function (reason) {
                        alert("Failed: " + reason);
                    });
                } else {
                    $req.post('thirdparty/login/apply', {
                        type: type,
                        extras: extras
                    }).then(function (res) {
                        if (res.code == 200) {
                            $window.location.href = res.body;
                        }
                    });
                }
            }
        }
    })
//支持正版，授权冲突，格式化系统，后果自负。
    .factory('Account', function ($req) {
        return {
            getBankCards: function () {
                return $req.get('/user/bankRecords');
            },
            
            getRechargeRecords: function (page, pageSize) {
                return $req.get('/user/rechargeRecords', {pageSize: pageSize, pageNo: page});
            },

            getWithdrawRecords: function (page, pageSize) {
                return $req.get('/user/withdrawRecords', {pageSize: pageSize, pageNo: page});
            },

            withdraw: function (data) {
                return $req.post('/user/withdraw', data);
            },
            withdrawcash: function (data) {
                return $req.post('/cash/withdraw', data);
            },
            getwithdrawminlimit: function () {
                return $req.get('/user/withdraw/minlimit' );
            },
            getwithdrawmaxlimit: function () {
                return $req.get('/user/withdraw/maxlimit' );
            },
            getwithdrawtime: function () {
                return $req.get('/user/withdraw/time' );
            }
            
        };
    })
     
     .factory('PcEggforJnd', function ($req) {
        return {
            getRates: function () {
                return $req.get('/ratesforjnd');
            },

            bet: function (data) {
                return $req.post('/pc/betforjnd', data);
            },
            getPcEggLog: function (pageNo,pageSize) {
                return $req.get('/pc/getPcEggLogforjnd', {pageNo: pageNo, pageSize: pageSize});
            }

        };
    })
    
    

    

    .factory('PcEgg', function ($req) {
        return {
            getRates: function () {
                return $req.get('/rates');
            },

            bet: function (data) {
                return $req.post('/pc/bet', data);
            },
            getPcEggLog: function (pageNo,pageSize) {
                return $req.get('/pc/getPcEggLog', {pageNo: pageNo, pageSize: pageSize});
            }

        };
    })
;
