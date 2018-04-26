
// ImaxGame游戏社区
//支持正版，授权冲突，格式化系统，后果自负。
//iMax游戏爱好者全网独家提供 盗版必究 本代码仅限学习和研究使用 禁止非法用途 责任自负 与本站无关 禁止任何形式的转卖和再分发 监控自动删除
// 定制化或者二次开发 联系qq：2035450966
//
angular.module('starter.controllers', [])

    .controller('HistoryCtrl', function () {

    })
 .controller('IndexCtrl', function ($scope,$ionicPopup, Rooms, $rootScope, Auth,UserService)
	{
	 
		$scope.$on('$ionicView.beforeEnter', function () 
		{
			
			 Rooms.getNotice().then(function (res) {
	                if (res.code == 200) {
	                   
	                        $scope.notice = res.body;
	                    
	                }
	            });
	            
	     
            Auth.isSignIn(function (user) 
			{
            	
				if( $rootScope.user )
				{
                

					 UserService.getBalance().then(function (res) {
                    if (res.code == 200) {
                        var b = res.body;
                        if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                            b = b.toFixed(2).replace('.00', '');
                        }
                       
                            $rootScope.user.money = b;
                        
                    }
                }).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
				    
					$scope.user   = $rootScope.user;
				}
			});
        });
		
		 
    })
    
    
	.controller('TabsCtrl', function ($state, $rootScope, $scope,Auth) {
        Auth.isSignIn();
        $scope.goAccount = function(){
            $rootScope.accountRouteFromRoom = false;
            $rootScope.accountRouteFromRoomId = null;
            $state.go('tab.account');
        }
    })
  .controller('AccountProxyPromoteCtrl', function ($scope,$state,$stateParams,$sce) {
	  
	  $scope.qr_img=qr_img;

    })
 .controller('AccountUrlCtrl', function ($scope,$state,$stateParams,$sce,UserService) {
  $scope.jumpurl="";	  
  $scope.$on('$ionicView.beforeEnter', function ()
  {
		  
		  
	  UserService.getjumpurl().then(function (res) {
          if (200 == res.code) {
       
         	 $scope.jumpurl= res.msg;
        	   
        
          } else {
              
          }
      });  
		  
		  
		  
 });

    })
   .controller('AccountProxyPromoteQrcodeCtrl', function ($scope,$state,$stateParams,$sce,UserService) {		 

	 
	  $scope.qrcodesrc="";
	  $scope.$on('$ionicView.beforeEnter', function () {
    
	 	  var qr = $stateParams.qr;
	 	 
	 	  
	 	 UserService.getPromoteQrcode("img="+qr.img+"&qrsize="+qr.qrsize+"&x="+qr.x+"&y="+qr.y).then(function (res) {
             if (200 == res.code) {
          	 //  alert(res.body.imgsrc);
            	 $scope.qrcodesrc= "/img/promote"+res.msg;
           	   
           
             } else {
                 
             }
         });
	 	 
	 	 
	// 	 $scope.qrcodesrc= "/user/getPromoteQrcode?img="+qr.img+"&qrsize="+qr.qrsize+"&x="+qr.x+"&y="+qr.y;
		   
		  
      });
 	
 	
        
    })
    .controller('KFCtrl', function ($scope,$state) {
        $scope.back = function(){
            $state.go('tab.rooms');
        }
    })
    .controller('SubmitPayCtrl', function ($scope,$state,$stateParams,$sce) {		 

	 	$scope.paysrc = $sce.trustAsResourceUrl( $stateParams.paysrc);

        
    })
     .controller('WithdrawQrCodeCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup, Upload) {		 

	 	 
    	 
    	   $scope.uploadwx = function (file) {
               if(file == null){
                   return;
               }
               Upload.upload({
                   url: 'user/uploadqrcode',
                   method: 'POST',
                   headers: {
                       'x-access-token': $rootScope.user.accessToken,
                       'x-access-uid': $rootScope.user.id
                   },
                   data: {file: file,qrtype:"wx"}
               }).then(function (res) {
                 // alert(res.data.body.headImage)
                   if(res.data.code == 200){
                       $ionicPopup.alert({
                           title: '提示',
                           template: "上传成功"
                       });
                       $scope.wximgsrc = res.data.body.qrtype;
                   }else{
                       $ionicPopup.alert({
                           title: '提示',
                           template: res.data.msg
                       });
                   }
                   //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
               });
           };
    	 
    	 
           $scope.uploadzfb = function (file) {
               if(file == null){
                   return;
               }
               Upload.upload({
                   url: 'user/uploadqrcode',
                   method: 'POST',
                   headers: {
                       'x-access-token': $rootScope.user.accessToken,
                       'x-access-uid': $rootScope.user.id
                   },
                   data: {file: file,qrtype:"zfb"}
               }).then(function (res) {
                   //alert(res.data.body.headImage)
                   if(res.data.code == 200){
                       $ionicPopup.alert({
                           title: '提示',
                           template: "上传成功"
                       });
                       $scope.zfbimgsrc = res.data.body.qrtype;
                   }else{
                       $ionicPopup.alert({
                           title: '提示',
                           template: res.data.msg
                       });
                   }
                   //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
               });
           };
    	 
    	 
    	 
    	 
           $scope.$on('$ionicView.beforeEnter', function () {
        	   $scope.zfbimgsrc="img/pay.png";
        	   $scope.wximgsrc="img/pay.png";
        	   
        	  
        	   
        	   UserService.getBankQrcode("wx"+$rootScope.user.id).then(function (res) {
                   if (200 == res.code) {
                	 //  alert(res.body.imgsrc);
                	   $scope.wximgsrc = res.body.imgsrc;
                 	   
                 
                   } else {
                       
                   }
               });
        	    
        	   UserService.getBankQrcode("zfb"+$rootScope.user.id).then(function (res) {
                   if (200 == res.code) {
                	   $scope.zfbimgsrc = res.body.imgsrc;
                 	   
                 
                   } else {
                       
                   }
               });
        	   
        	   
        	   
                
           });
    	 
    	 
    	 
    	 

        
    })
      .controller('InframeCtrl', function ($scope,$state,$stateParams,$sce) {		 

	 	$scope.inframesrc = $sce.trustAsResourceUrl( $stateParams.inframe);

        
    })
    .controller('CreateCtrl', function ($scope, $ionicPopup, UserService,configService,$state) {
    	
    	 $scope.conf = {};
         $scope.$on('$ionicView.beforeEnter', function () {
             UserService.getCreateRoomConfig().then(function (res) {
                 if (200 == res.code) {
                     $scope.conf = res.body;
                     if( $scope.conf.exp=="0")
                    	 {
                    	 $ionicPopup.alert({
                             title: '提示',
                             template:"暂停游戏房间群组自助创建,需要申请联系管理员"
                    	    
                         });
                    	  $state.go('tab.rooms');
                    	 
                    	 }
                 } else {
                     $ionicPopup.alert({
                         title: '提示',
                         template: res.msg
                     });
                 }
             });
         });
    	
    	
    	
    	
    	$scope.data = {};
    	  $scope.applygameTypes = {};
    	  $scope.roomimgs={};
    	 // data.limitNum =100;
    	  configService.getDic('dic.chat.applygameType').then(function (res) {
    		  
    		  $scope.applygameTypes = res;
    		    });
    	  
    	  configService.getDic('dic.chat.applyroomLogo').then(function (res) {
    		  $scope.roomimgs = res;
    		    });
    		  
          $scope.doCreate = function () {
              if (!$scope.data.name || !$scope.data.limitNum) {
                  $ionicPopup.alert({
                      title: '提示',
                      template: '用户名或人数限制不能为空'
                  });
                  return;
              }
              if(!$scope.data.type)
            	  {
            	  $ionicPopup.alert({
                      title: '提示',
                      template: '游戏类型不能为空'
                  });
                  return;
            	  }
              if($scope.data.limitNum>100)
        	  {
        	  $ionicPopup.alert({
                  title: '提示',
                  template: '最大人数不能大于100'
              });
              return;
        	  }
              UserService.applyCreateRoom($scope.data).then(function (res) {
                  if (200 == res.code) {
                	  
                	  $ionicPopup.alert({
                          title: '提示',
                          template: "房间群组创建成功，请继续维护扩展配置"
                      });
                 
                	  $state.go('tab.account-room-props',{roomId:res.body.id});
                  } else {
                      $ionicPopup.alert({
                          title: '提示',
                          template: res.msg
                      });
                  }
              });
          };

         
    })
    // .controller('leftMenu', function ($rootScope, $scope, configService) {
    //     configService.getDic('dic.chat.roomCata').then(function (res) {
    //         $scope.cata = res;
    //     });
    //     configService.getDic('dic.chat.gameType').then(function (res) {
    //         $scope.type = res;
    //     });
    //     $scope.filterRooms = function (filter) {
    //         $rootScope.roomsFilter = filter;
    //     };
    // })

    .controller('RoomsCtrl', function ($rootScope, $scope,Auth, Rooms,UserService, $state, configService, $ionicSideMenuDelegate, $ionicPopup, $interval, $timeout, $ionicScrollDelegate, myConstants) {
      
    	$scope.hidesearch="1";
    	$scope.$on('$ionicView.loaded', function () {
        	
        	configService.getAppInfo().then(function (res) {
                if (res.code == 200) {
                    var appinfo = res.body;
                      lotteryDescription = appinfo.lotteryDescription?appinfo.lotteryDescription:lotteryDescription;
                      appTitle =appinfo.appTitle?appinfo.appTitle:appTitle;
                      hometitle=appinfo.hometitle?appinfo.lotteryDescription:hometitle;
                      lotteryMaxNumber =parseInt(appinfo.lotteryMaxNumber?appinfo.lotteryMaxNumber:lotteryMaxNumber);
                      lotteryMaxMoney = parseInt(appinfo.lotteryMaxMoney?appinfo.lotteryMaxMoney:lotteryMaxMoney);
                      lotteryUnit =appinfo.lotteryUnit?appinfo.lotteryUnit:lotteryUnit;
                      $scope.hidesearch=appinfo.hidesearch;
                } else {
                    
                }
            });
        	
            var marquee = ['img/home/banner_1.png', 'img/home/banner_2.png'];
            if (marquee.length > 1) {
                $scope.marquee = [marquee[0], marquee[1]];
                var index = 0;
                $interval(function () {
                    $scope.run = true;
                    $timeout(function () {
                        index = ++index % marquee.length;
                        $scope.marquee = [marquee[index], marquee[(1 + index) % marquee.length]];
                        $scope.run = false;
                    }, 1000);
                }, 5000);
            } else {
                $scope.marquee = marquee;
            }
        });



		$scope.$on('$ionicView.beforeLeave', function () {

			 

               if( $scope.interval!=null){

                 $interval.cancel(  $scope.interval);
			   }

			}
);


$scope.$on('$ionicView.beforeEnter', function () {
            configService.getDic('dic.chat.gameType').then(function (res) {
              
                
            	//加入
				$scope.gametype = res;
				
				//游戏分类默认 0 数组
				$scope.gameTypeTab(0);
				
				//加入我的房间分类 
				//$scope.myRoomsType();
            });
            
            
            
                      
            
            $rootScope.hideTabs = false;
            Rooms.getTotalOnlineCount().then(function (res) {
                if (res.code == 200) {
                    $scope.onlineCount = res.body;
                } else {
                    $scope.onlineCount = 0;
                }
            });
            Auth.isSignIn(function (user) 
        			{
                    	
        				if( $rootScope.user )
        				{
                        

        					 UserService.getBalance().then(function (res) {
                            if (res.code == 200) {
                                var b = res.body;
                                if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                                    b = b.toFixed(2).replace('.00', '');
                                }
                               
                                    $rootScope.user.money = b;
                                
                            }
                        }).finally(function () {
                            $scope.$broadcast('scroll.refreshComplete');
                        });
        				    
        					$scope.user   = $rootScope.user;
        				}
        			});
            $scope.notice="好运连连   恭喜iMaxGame";
            Rooms.getNotice().then(function (res) {
                if (res.code == 200) {
                   
                        $scope.notice = res.body;
                    
                }
            });
/*            
            $scope.interval = $interval(function () {
                var obj = document.getElementById('scrollobj');
                if(obj==null||obj=="undefined")
				{
                           $interval.cancel(  $scope.interval);
				}
                var tmp = (obj.scrollLeft)++;
                if (obj.scrollLeft >= 1000) obj.scrollLeft=0;
                //当滚动条到达右边顶端时
                if (obj.scrollLeft==tmp) obj.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + $scope.notice;

            }, 20);*/
            
            $scope.doRefresh();
        });



$scope.gameTypeTab = function(type)
{
	if($scope.gametype[type].key=="my"){
		
		   $state.go('tab.account');
		
		return ;
	}
	 
	$scope.gameTypes      = [ $scope.gametype[type] ];
	$scope.gameTypesTab   = type;
	$scope.gameTypesTitle = $scope.gametype[type].text;
};

//加入我的房间分类
$scope.myRoomsType = function()
{
	$scope.gametype[4] = {"key":"my","text":"我的","properties":{"css":"my"}};
};

 
//进入指定房间
$scope.enterRoom = function()
{
        $ionicPopup.prompt({
            title: '提示',
            subTitle: '请输入房间ID',
            okText: '进入',
            okType: 'button-green',
            cancelText: '取消',
            inputType: 'text'
        }).then(function (roomId) 
		{
            if (roomId) 
			{
            	
            	Rooms.getRoom(roomId).then(function (res) {
                    if (200 == res.code) {
                      
                        $scope.join(res.body);
                    }else{
                        $ionicPopup.alert({
                            title: '提示',
                            template: res.msg
                        });
                    }
                });
            	
            	
            }
        });
} ;

        $scope.appTitle = configService.getAppTitle();
        $scope.rooms = [];
        $scope.pageNo = 1;

        Rooms.updateRooms($scope, 0, '');

        $scope.doRefresh = function () {




            Rooms.updateRooms($scope, 800, $rootScope.roomsFilter);


			 UserService.getBalance().then(function (res) {
                    if (res.code == 200) {
                        var b = res.body;
                        if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                            b = b.toFixed(2).replace('.00', '');
                        }
                        
                            $rootScope.user.money = b;
                         
                    }
                }).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });




        };

        $scope.gameTypeHideStatus = {};
        $scope.collapseRoomGroup = function (gameType) {
            $scope.gameTypeHideStatus[gameType] = !$scope.gameTypeHideStatus[gameType];
        };
		
		$scope.showGameType = function (gameType) {
            if($scope.gameTypeHideStatus.showType == gameType){
                $scope.gameTypeHideStatus.showType = null;
            }else{
                $scope.gameTypeHideStatus.showType = gameType
                $ionicScrollDelegate.scrollBy(0, 100, [true])
            }
            $ionicScrollDelegate.resize();
        };
		
        $scope.join = function (room) {
            $rootScope.room = room;
            switch ($rootScope.room.type) {
                case 'G03':
                    $state.go('tab.room-detail-' + $rootScope.room.type, {roomId: room.id});
                    break;
                case 'G30':
                    $state.go('tab.room-detail-' + $rootScope.room.type, {roomId: room.id});
                    break;
                default:
                    $state.go('tab.room-detail', {roomId: room.id});
                    break;
            }
        };

        
       
        $scope.searchRoom = function (roomId) {
        	Rooms.getRoom(roomId).then(function (res) {
                if (200 == res.code) {
                  
                    $scope.join(res.body);
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        };
        
        
        $scope.toggleLeft = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $rootScope.$watch('roomsFilter', function (nv) {
            if (nv !== undefined) {
                $scope.rooms = [];
                $scope.pageNo = 1;
                Rooms.updateRooms($scope, 800, nv);
            }
        });
    })



    .controller('RoomDetailCtrl', function ($rootScope, $scope, $ionicLoading, $ionicScrollDelegate, $stateParams, $ionicBackdrop, $ionicPopup, $ionicPopover, $state, $ionicModal, $ionicActionSheet, $timeout, $interval, configService, UserService, Rooms, webSocketService, Auth, PcEgg,PcEggforJnd) {
        var ws;
        var joinRoom;
        $scope.$on('$ionicView.beforeEnter', function () {
            joinRoom = function () {
                $ionicLoading.show({
                    template: '正在链接..'
                });
                Auth.isSignIn(function() {
                    Rooms.join($stateParams.roomId).then(function (res) {
                        if (200 == res.code) {
                            ws = webSocketService.create({onMessage: $scope.onMessage, onOpen: function () {
                                if ($rootScope.room.type == 'G03') {
                                    $scope.send(3, 'latestTermCmd', null);
                                }
                                else
                                	if ($rootScope.room.type == 'G30') {
                                    $scope.send(3, 'latestTermCmdForJnd', null);
                                }
                            }});
                        } else {
                            $ionicPopup.alert({
                                title: '提示',
                                template: res.msg
                            });
                            $state.go('tab.rooms');
                        }
                        $ionicLoading.hide();
                    });
                });
            };
            var showPwdInput = function (msg) {
                $rootScope.pwdInput = true;
                $ionicPopup.prompt({
                    title: '请输入房间密码',
                    subTitle: msg ? msg : '',
                    okText: '确定',
                    okType: 'button-green',
                    cancelText: '取消',
                    inputType: 'password'
                }).then(function (pwd) {
                    if (pwd == '') {
                        showPwdInput();
                    } else if (pwd == undefined) {
                        $rootScope.room = null;
                        $state.go('tab.rooms');
                        $rootScope.pwdInput = false;
                    } else {
                        Rooms.authorize($rootScope.room.id, pwd).then(function (res) {
                            if (res.code == 200) {
                                $rootScope.pwdInput = false;
                                joinRoom();
                            } else {
                                showPwdInput('密码错误');
                            }
                        });
                    }
                });
            };
            Rooms.getRoom($stateParams.roomId).then(function (res) {
                if (res.code == 200) {
                   
                    if (!$rootScope.room) {
                        $rootScope.room = res.body;
                        $timeout(function () {
                            switch ($rootScope.room.type) {
                                case 'G03':
                                    $state.go('tab.room-detail-' + $rootScope.room.type, {roomId: $stateParams.roomId}, {reload: true});
                                    break;
                                case 'G30':
                                    $state.go('tab.room-detail-' + $rootScope.room.type, {roomId: $stateParams.roomId}, {reload: true});
                                    break; 
                                default:
                                    $state.go('tab.room-detail', {roomId: $stateParams.roomId}, {reload: true});
                                    break;
                            }
                        }, 300);
                        return;
                    }
                    else
                    	{
                    	  $rootScope.room = res.body;
                    	}
                    if ($rootScope.room.needPsw) {
                        if (!$rootScope.pwdInput) {
                            showPwdInput();
                        }
                    } else {
                        joinRoom();
                    }
                    $scope.isGameBegin = $rootScope.room.status == '1';

                  //  if ($rootScope.room.type == 'G03') {
                    if ( ($rootScope.room.type == 'G03') ||( $rootScope.room.type == 'G30')) {
                        $scope.touzhuState = {
                            inputSelected: false,
                            amount: null
                        };
                       /* PcEgg.getRates().then(function (res) {
                            if (res.code == 200) {
                                $scope.pcRates = res.body;
                            }
                        });*/
                        
                        if ($rootScope.room.type == 'G03') {
                            PcEgg.getRates().then(function (res) {
                                if (res.code == 200) {
                                    $scope.pcRates = res.body;
                                }
                            });
                            }else   if ($rootScope.room.type == 'G30') {
                            	
                            	PcEggforJnd.getRates().then(function (res) {
                                     if (res.code == 200) {
                                         $scope.pcRates = res.body;
                                     }
                                 });
                            	
                            	
                            }
                            	
                        
                        
                        $scope.termTimeout = function (remainSeconds) {
                            var m = Math.floor(remainSeconds / 60) % 60;
                            var h = Math.floor(remainSeconds / 60 / 60);
                            if (h < 10) {
                                $scope.hour1 = '0';
                                $scope.hour2 = h < 0 ? 0 : h;
                            } else {
                                h = String(h);
                                $scope.hour1 = h.substring(0, 1);
                                $scope.hour2 = h.substring(1, 2);
                            }
                            if (m < 10) {
                                $scope.minute1 = '0';
                                $scope.minute2 = m < 0 ? 0 : m;
                            } else {
                                m = String(m);
                                $scope.minute1 = m.substring(0, 1);
                                $scope.minute2 = m.substring(1, 2);
                            }
                            var s = remainSeconds % 60;
                            if (s < 10) {
                                $scope.second1 = '0';
                                $scope.second2 = s < 0 ? 0 : s;
                            } else {
                                s = String(s);
                                $scope.second1 = s.substring(0, 1);
                                $scope.second2 = s.substring(1, 2);
                            }
                            //chb 封盘计时代码
                            if(remainSeconds <= 60 && remainSeconds >= 30){
                                $scope.stopTime = true;
                                var stopSecond = remainSeconds - 30;
                                if(stopSecond < 10){
                                    $scope.stopSecond1 = '0';
                                    $scope.stopSecond2 = stopSecond < 0 ? 0 : stopSecond;
                                }else{
                                    stopSecond = stopSecond + "";
                                    $scope.stopSecond1 = stopSecond.substring(0, 1);
                                    $scope.stopSecond2 = stopSecond.substring(1, 2);
                                }
                            }else{
                                $scope.stopTime = false;
                            }
                        };

                        $scope.termSchedule = function (content) {
                            if ($scope.pcEggInterval) {
                                $interval.cancel($scope.pcEggInterval);
                                $scope.pcEggInterval = undefined;
                            }
                            $scope.termId = content.termId;
                            $scope.simpleWord = content.simpleWord;
                            $scope.logs = content.logs;
                            var remainSeconds = content.remainSeconds;
                            var count = remainSeconds;
                            $scope.termTimeout(remainSeconds);
                            remainSeconds--;
                            var interval = $interval(function () {
                                $scope.termTimeout(remainSeconds);
                                remainSeconds--;
                                if (remainSeconds < 0 && interval) {
                                    $interval.cancel(interval);
                                }
                            }, 1000, count);
                            $scope.pcEggInterval = interval;
                        };

                        $scope.switchTz = function (rate) {
                            $scope.selectedRate = rate;
                        };

                        $scope.switchInputSelected = function () {
                            $scope.touzhuState.inputSelected = !$scope.touzhuState.inputSelected;
                        };

                        $scope.calculateAmount = function (index) {
                            switch (index) {
                                case 0:
                                    if ($scope.touzhuState.inputSelected) {
                                        $scope.touzhuState.amount = 50;
                                    } else {
                                        $state.go('tab.account-recharge');
                                    }
                                    break;
                                case 1:
                                    $scope.touzhuState.amount = $scope.touzhuState.inputSelected ? 100 : 10;
                                    break;
                                case 2:
                                    $scope.touzhuState.amount = $scope.touzhuState.inputSelected ? 200 :
                                        (!$scope.touzhuState.amount || $scope.touzhuState.amount < 20) ? 20 : ($scope.touzhuState.amount * 2 > 20000 ? 20000 : $scope.touzhuState.amount * 2);
                                    break;
                            }
                        };

                        $scope.hideTouzhuPad = function () {
                            $scope.touzhuPadShow = false;
                            $scope.currentTouzhuPad = 'c';
                            $scope.selectedRate = undefined;
                        };

                        $scope.switchToLeft = function () {
                            $scope.currentTouzhuPad = 'l';
                            $scope.touzhuState.inputSelected = false;
                            $scope.selectedRate = undefined;
                        };

                        $scope.switchToCenter = function () {
                            $scope.currentTouzhuPad = 'c';
                            $scope.touzhuState.inputSelected = false;
                            $scope.selectedRate = undefined;
                        };

                        $scope.switchToRight = function () {
                            $scope.currentTouzhuPad = 'r';
                            $scope.touzhuState.inputSelected = false;
                            $scope.selectedRate = undefined;
                        };



                        $scope.pcEggBetforJnd=function() {
                        	  Auth.isSignIn(function (user) {
                                  if (!user) {
                                      showLoginDialog();
                                      return;
                                  } 
                        	  });
                            if (!$scope.selectedRate || !$scope.touzhuState.amount || $scope.touzhuState.amount < 0 || !$scope.termId) {
                                return;
                            }
                            if ($scope.touzhuState.betting) {
                                return;
                            }
                            $scope.touzhuState.betting = true;
                            PcEggforJnd.bet({'num': $scope.termId, 'key': $scope.selectedRate.param, 'money': $scope.touzhuState.amount}).then(function (res) {
                                $scope.touzhuState.betting = false;
                                if (res.code == 200) {
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                    $scope.touzhuPadShow = false;
                                }else{
                                    $ionicPopup.alert({
                                        title: '错误',
                                        template: res.msg
                                    });
                                    $scope.touzhuPadShow = false;
                                }
                            });
                        };
                        



                        $scope.pcEggBet = function () {
                        	  Auth.isSignIn(function (user) {
                                  if (!user) {
                                      showLoginDialog();
                                      return;
                                  } 
                        	  });
                            if (!$scope.selectedRate || !$scope.touzhuState.amount || $scope.touzhuState.amount < 0 || !$scope.termId) {
                                return;
                            }
                            if ($scope.touzhuState.betting) {
                                return;
                            }
                            $scope.touzhuState.betting = true;
                            PcEgg.bet({'num': $scope.termId, 'key': $scope.selectedRate.param, 'money': $scope.touzhuState.amount}).then(function (res) {
                                $scope.touzhuState.betting = false;
                                if (res.code == 200) {
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                    $scope.touzhuPadShow = false;
                                }else{
                                    $ionicPopup.alert({
                                        title: '错误',
                                        template: res.msg
                                    });
                                    $scope.touzhuPadShow = false;
                                }
                            });
                        };
                        
                               $scope.cancelPcEggBet = function () {
                            $ionicPopup.confirm({
                                title: '提示',
                                template: '确定取消本期所有下注?',
                                okText: '是',
                                okType: 'button-green',
                                cancelText: '否'
                            }).then(function (res) {
                                if (res) {
                                    PcEgg.cancelBet({'num': $scope.termId}).then(function (res) {
                                        if (res.code == 200) {
                                            $ionicPopup.alert({
                                                title: '提示',
                                                template: res.msg
                                            });
                                        }else{
                                            $ionicPopup.alert({
                                                title: '错误',
                                                template: res.msg
                                            });
                                        }
                                    });
                                }
                            });
                        };
                    }
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                    return false;
                }
            });
            
            if ($rootScope.room) {
                $scope.roomLink = window.location.href;
                var clipboard = new Clipboard('.room-menu-item.room-link');
                clipboard.on('success', function (e) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '复制成功，快去召唤小伙伴吧^_^'
                    });
                });
                $scope.clipboard = clipboard;
            }
            
            
            
        });
        $scope.$on('$ionicView.afterLeave', function () {
            $scope.clipboard.destroy();
        });

        $scope.$on('$ionicView.beforeLeave', function () {
            webSocketService.close();
        });

        $scope.alert = {};
        $scope.messages = [];
        $scope.visibleMessages = [];
        $scope.hold = false;
        $scope.scrollToEnd = true;

        $scope.toggleHistory = function () {
            $scope.historyListShow = !$scope.historyListShow;
        };

        $scope.onMessage = function (event) {
            var data = JSON.parse(event.data);
            var type = data.type;
            $scope.$apply(function () {
                switch (type) {
                    case 'ORD':
                        $scope.processCMD(data);
                        break;
                    case 'RED_SYS':
                    case 'RED':
                        $scope.processLottery(data);
                        break;
                    case 'TXT':
                        $scope.processTxt(data);
                        break;
                    case 'TXT_SYS':
                        $scope.processSysTxt(data);
                        break;
                    case 'TXT_ALERT':
                        $scope.processAlertText(data);
                        break;
                    case 'PC_MSG':
                        $scope.processPcMSG(data);
                        break;
                }
            });
        };

        $scope.goTrend = function () {
            $state.go('tab.room-detail-G03-trend');
        };
        $scope.goTrendforjnd = function () {
            $state.go('tab.room-detail-G30-trend');
        };//支持正版，授权冲突，格式化系统，后果自负。
        var showLoginDialog = function (content) {
            $ionicPopup.confirm({
                title: '提示',
                template: content || '注册用户才可以发言和参与游戏',
                scope: $scope,
                buttons: [
                    {text: '注册', type: 'button-default', onTap: function () {
                        return 0;
                    }},
                    {text: '登录', type: 'button-positive', onTap: function () {
                        return 1;
                    }},
                    {text: '<div class="close">+</div>', type: 'login-dlg-close', onTap: function () {
                        return 2;
                    }}
                ]
            }).then(function (res) {
                if (res == 1) {
                    webSocketService.close();
                    $state.go('login');
                } else if (res == 0) {
                    webSocketService.close();
                    $state.go('register');
                }
            });
        };

        $scope.processCMD = function (data) {
            var cmd = data.cmd;
            var content = data.content;
            switch (cmd) {
                case 'notLogin':
                    showLoginDialog(content);
                    break;
                case 'alert':
                    if ($scope.lotteryOpenPopover.isShown()) {
                        $timeout(function () {
                            $scope.closeLottery();
                            $ionicPopup.alert({
                                title: '提示',
                                template: content
                            });
                        }, 600);
                    } else {
                        $ionicPopup.alert({
                            title: '提示',
                            template: content
                        });
                    }
                    break;
                case 'showLotteryDetail':
                    $scope.detail = content;
                    $scope.closeLottery();
                    $scope.detailModal.show();
                    break;
                case 'showRoomMembers':
                    $scope.members = content;
                    $scope.membersModal.show();
                    break;
                case 'lotteryOpenSuccess':
                    $scope.lotteries[content].opened = 1;
                    $timeout(function () {
                        $scope.opening = false;
                        $scope.audio = document.createElement('audio');
                        $scope.audio.src = '/music/hongbao.wav';;
                        $scope.audio.play();
                        $scope.openDetailModal(content);
                    }, 600);
                    break;
                case 'lotteryOpenFailed':
                    $scope.opening = false;
                    $scope.lotteryOpenPopover.hide();
                    break;
                case 'lotteryCanOpen':
                    $scope.openLotteryOpenPopover();
                    break;
                case 'lotteryHasOpened':
                    $scope.lotteries[content].opened = 1;
                    $scope.openDetailModal(content);
                    break;
                case 'lotteryExpired':
                case 'lotteryFinished':
                    $timeout(function () {
                        $scope.lotteries[content].opened = 1;
                        $scope.lotteryOpenPopover.hide();
                        $scope.opening = false;
                        $scope.openTooSlowPopover();
                    }, 600);
                    break;
                case 'gameBegin':
                    $scope.isGameBegin = true;
                    // $rootScope.room.status = '1';
                    break;
                case 'gameOver':
                    $scope.isGameBegin = false;
                    // $rootScope.room.status = '0';
                    break;
                case 'latestTerm':
                    $scope.termSchedule(content);
                    break;
            }
        };

        $scope.processLottery = function (data) {
            var messageTime = data.msgTime;
            var lastMessageTime = $scope.lastMessageTime;
            // if (!lastMessageTime || messageTime.getTime - lastMessageTime.getTime >= 5 * 60 * 1000) {
            var timer = {
                content: messageTime.substring(11),
                showAvatar: false,
                align: 'center',
                style: 'notice timer'
            };
            this.pushMessage(timer);
            // }
            $scope.lastMessageTime = messageTime;

            var uid = $scope.user ? $scope.user.id : undefined;
            if (uid === data.sender) {
                $scope.closeModal();
            }
            data.lottery = true;
            $scope.lotteries[data.content.id] = data;
            var details = data.content.detail;
            if (details && details[uid]) {
                $scope.lotteries[data.content.id].opened = 1;
            }
            $scope.processTxt(data);
        };

        $scope.processTxt = function (data) {
            var uid = $scope.user ? $scope.user.id : undefined;
            data.showAvatar = true;
            if (uid === data.sender) {
                data.align = 'right';
                data.style = 'self';
            } else {
                data.align = 'left';
            }
            this.pushMessage(data);
        };

        $scope.processSysTxt = function (data) {
            data.showAvatar = false;
            data.align = 'center';
            data.style = 'notice';
            this.pushMessage(data);
        };

        $scope.processAlertText = function (data) {
            $scope.alert.content = data.content;
            $scope.alert.hide = false;
            if ($scope.alert.hideTimeout) {
                $timeout.cancel($scope.alert.hideTimeout);
            }
            var setActive = function () {
                $scope.alert.active = true;
                $scope.alert.activeTimeout = $timeout(function () {
                    $scope.alert.activeTimeout = null;
                    $scope.alert.active = false;
                }, 1000);
            };
            if ($scope.alert.active) {
                if ($scope.alert.activeTimeout === undefined) {
                    $scope.alert.active = false;
                    setActive();
                }
            } else {
                setActive();
            }
            $scope.alert.hide = true;
            $scope.alert.hideTimeout = $timeout(function () {
                $scope.alert.content = undefined;
                $scope.alert.hideTimeout = undefined;
            }, 8000);
        };

        $scope.processPcMSG = function (data) {
            $scope.termSchedule(data.content);
        };

        var scrollDelegate = $ionicScrollDelegate.$getByHandle('mainScroll');
        $scope.pushMessage = function (data) {
            $scope.messages.push(data);
            if ($scope.messages.length > 150) {  //超过150条记录 就删除前面50条消息
                $scope.messages.splice(0, 50);
            }
            if ($scope.scrollToEnd) {
                if ($scope.visibleMessages.length >= 30) {
                    $scope.visibleMessages.splice(0, $scope.visibleMessages.length - 15);
                    $timeout(function () {
                        scrollDelegate.scrollBottom(false);
                    }, 0);
                    $timeout(function () {
                        if (!$scope.visibleMessages.length || $scope.visibleMessages[$scope.visibleMessages.length - 1].msgId != data.msgId) {
                            $scope.visibleMessages.push(data);
                            scrollDelegate.scrollBottom(true);
                        }
                    }, 200);
                } else {
                    if (!$scope.visibleMessages.length || $scope.visibleMessages[$scope.visibleMessages.length - 1].msgId != data.msgId) {
                        $scope.visibleMessages.push(data);
                    }
                    $timeout(function () {
                        scrollDelegate.scrollBottom(true);
                    }, 0);
                }
            }
        };

        $scope.scrollComplete = function () {
            if ($scope.hold) {
                return;
            }
            $scope.scrollToEnd = scrollDelegate.getScrollPosition().top == scrollDelegate.getScrollView().__maxScrollTop;
            if ($scope.scrollToEnd) {
                var vlm = $scope.visibleMessages.length ? $scope.visibleMessages[$scope.visibleMessages.length - 1].msgId : undefined;
                var lm = $scope.messages.length ? $scope.messages[$scope.messages.length - 1].msgId : undefined;
                if (vlm != lm) {
                    var start = $scope.messages.length >= 16 ? $scope.messages.length - 16 : 0;
                    $scope.visibleMessages = $scope.messages.slice(start);
                    $timeout(function () {
                        scrollDelegate.scrollBottom(true);
                    }, 0);
                }
            }
        };
        $scope.onHold = function () {
            $scope.hold = true;
            $scope.scrollToEnd = false;
        };
        $scope.onRelease = function () {
            $scope.hold = false;
        };

        $scope.loadMoreMessages = function () {
            if (!$scope.messages.length) {
                $scope.$broadcast('scroll.refreshComplete');
                return;
            }
            var oh = scrollDelegate.getScrollView().__contentHeight;
            var vlm = $scope.visibleMessages[0].msgId;
            for (var j = $scope.messages.length - 1; j > 0; j--) {
                if ($scope.messages[j].msgId == vlm) {
                    var end = j >= 16 ? j - 16 : 0;
                    for (var i = j - 1; i >= end; i--) {
                        $scope.visibleMessages.unshift($scope.messages[i]);
                    }
                    break;
                }
            }
            $scope.$broadcast('scroll.refreshComplete');
            scrollDelegate.resize();
            $timeout(function () {
                var nh = scrollDelegate.getScrollView().__contentHeight;
                if (nh - oh >= 50) {
                    scrollDelegate.scrollTo(0, nh - oh - 50, false);
                }
            }, 0);
        };

        $scope.lotteries = {};
        $scope.data = {
            money: '',
            number: '',
            description: '',
            moneyLed: '0.00'
        };


        $scope.btnDisabled = true;
        $scope.lotteryDescription = configService.getLotteryDescription();

        $scope.moneyReady = false;
        $scope.numberReady = false;
        $scope.appTitle = configService.getAppTitle();
        $scope.lotteryUnit = configService.getLotteryUnit();
        $scope.handUp = function () {
            if (!$scope.isGameBegin && $scope.user && $scope.user.id) {
                this.send(2, 'handsUpCmd', null);
            }
        };

        $scope.openRoomMenu = function ($event) {
            var target = $event.target;
            var btns = target.offsetParent;
            var height = btns.offsetHeight;
            var width = btns.offsetWidth;
            var left = btns.offsetLeft;
            var top = btns.offsetTop;

            $scope.menuStyle = {left: left - 200 + width + 'px', top: top + height + 'px'};
            $scope.menuMaskStyle = {display: 'block'};
            UserService.getBalance().then(function (res) {
                if (res.code == 200) {
                    var b = res.body;
                    if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                        b = b.toFixed(2).replace('.00', '');
                    }
                    $scope.balance = b;
                }
            });
        };
        $scope.closeRoomMenu = function () {
            $scope.menuMaskStyle = {display: 'none'};
            $scope.balance = '...';
        };
        $scope.gotoAccount = function () {
            webSocketService.close();
            $state.go('tab.rooms').then(function () {
                $rootScope.tabAnimation = true;
                $state.go('tab.account');
            });
        };
        $scope.numberFilter = function (e) {
            if (e.keyCode == 46 || e.keyCode == 9 || e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39) {
                e.returnValue = true;
                return;
            }
            if (e.keyCode == 190 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
                var money = $scope.data.money;
                var index = money.toString().indexOf('.');
                if (e.keyCode == 190 && index > -1) {
                    e.returnValue = false;
                    return;
                }
                if (index > -1 && index < (money.length - 2)) {
                    e.returnValue = false;
                    return;
                }
                e.returnValue = true;
            } else
                e.returnValue = false;
        };

        $scope.$watch('data.money', function (nv, ov, scope) {
            var money = parseFloat(nv);
            if (!isNaN(money)) {
                if (money > configService.getLotteryMaxMoney()) {
                    money = configService.getLotteryMaxMoney();
                }
                scope.data.money = money;
                scope.data.moneyLed = money.toFixed(2);
                scope.moneyReady = true;
                if (scope.moneyReady && scope.numberReady) {
                    scope.btnDisabled = false;
                }
            } else {
                scope.data.moneyLed = '0.00';
                scope.btnDisabled = true;
                scope.moneyReady = false;
            }
        });

        $scope.$watch('data.number', function (nv, ov, scope) {
            var number = parseInt(nv);
            if (!isNaN(number)) {
                if (number > configService.getLotteryMaxNumber()) {
                    number = configService.getLotteryMaxNumber();
                }
                scope.data.number = number;
                scope.numberReady = true;
                if (scope.moneyReady && scope.numberReady) {
                    scope.btnDisabled = false;
                }
            } else {
                scope.data.number = '';
                scope.btnDisabled = true;
                scope.numberReady = false;
            }
        });

        $scope.openLottery = function (lotteryId) {
        	 
        	
        	//禁抢 单雷 多雷
        	if ($rootScope.room.type == 'G43'||$rootScope.room.type == 'G46'){
        		  this.openDetailModal(lotteryId);
        	 /*   $ionicPopup.alert({
                      title: '提示',
                      template: "本群为禁抢群，仅可发包，稍后查看中雷结果。"
                 });*/
              	return;
          		
          	 }
        	 if (1 == $scope.lotteries[lotteryId].opened) {
              	  
                 this.openDetailModal(lotteryId);
                 return;
             }
        	 
            $scope.lottery = $scope.lotteries[lotteryId];
            this.send(2, 'checkLotteryStatusCmd', {lotteryId: lotteryId});
            
            
        };

        $scope.realOpenLottery = function (lotteryId) {
            if (1 == $scope.lotteries[lotteryId].opened) {
                return;
            }
            $scope.opening = true;
            this.send(2, 'openLotteryCmd', {lotteryId: lotteryId});
           
            
        };

        $scope.closeLottery = function () {
            if ($scope.tooSlowPopover) {
                $scope.tooSlowPopover.hide();
            }
            if ($scope.lotteryOpenPopover) {
                $scope.lotteryOpenPopover.hide();
            }
        };

        $ionicModal.fromTemplateUrl('templates/room-lottery.html', {
            scope: $scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/room-lottery-detail.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.detailModal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/room-desc.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.roomDescModal = modal;
        });

        $ionicModal.fromTemplateUrl('templates/room-members.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.membersModal = modal;
        });

        $ionicPopover.fromTemplateUrl('templates/room-member-detail.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover = popover;
        });
        $ionicPopover.fromTemplateUrl('templates/room-member-detail.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.popover1 = popover;
        });
        $ionicPopover.fromTemplateUrl('templates/room-lottery-open.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.lotteryOpenPopover = popover;
        });
        $ionicPopover.fromTemplateUrl('templates/room-lottery-too-slow.html', {
            scope: $scope
        }).then(function (popover) {
            $scope.tooSlowPopover = popover;
        });
        $scope.openLotteryOpenPopover = function ($event) {
            $scope.opening = false;
            $scope.lotteryOpenPopover.show($event);
        };
        $scope.openTooSlowPopover = function ($event) {
            $scope.tooSlowPopover.show($event);
        };

        $scope.openPopover = function ($event, member, inner) {
            $scope.member = member;
            if (inner) {
                $scope.popover1.show($event);
            } else
                $scope.popover.show($event);
        };

        $scope.openModal = function () {
            Auth.isSignIn(function (user) {
                if (!user) {
                    showLoginDialog();
                } else {
                	  if ($scope.room.type == 'G45') {
                		  
                		  $ionicPopup.alert({
                              title: '提示',
                             template: '本群为坐庄群，玩家禁止发包.'
                         });
                	  }
                	  else               if ($scope.room.type == 'G03') {
                        $scope.touzhuPadShow = true;
                        $scope.currentTouzhuPad = 'c';
                        UserService.getBalance().then(function (res) {
                            if (res.code == 200) {
                                var b = res.body;
                                if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                                    b = b.toFixed(2).replace('.00', '');
                                }
                                $scope.balance = b;
                            }
                        });
                    } 
                    else     if ($scope.room.type == 'G30') {
                        $scope.touzhuPadShow = true;
                        $scope.currentTouzhuPad = 'c';
                        UserService.getBalance().then(function (res) {
                            if (res.code == 200) {
                                var b = res.body;
                                if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                                    b = b.toFixed(2).replace('.00', '');
                                }
                                $scope.balance = b;
                            }
                        });
                    }    
                    else {
                        $scope.data = {
                            money: '',
                            number: '',
                            description: '',
                            moneyLed: '0.00'
                        };
                        $scope.modal.show();
                    }

                    UserService.getBalance().then(function (res) {
                        if (res.code == 200) {
                            var b = res.body;
                            if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                                b = b.toFixed(2).replace('.00', '');
                            }
                            $scope.balance = b;
                        }
                    });
                }
            });
        };

        $scope.closeModal = function () {
            if ($scope.modal) {
                $scope.modal.hide();
            }
        };

        $scope.openMembersModal = function () {
            this.send(2, 'showRoomMembersCmd', null);
        };

        $scope.openDescModal = function () {
            $scope.roomDescModal.show();
        };

        $scope.closeMembersModal = function () {
            $scope.membersModal.hide();
        };

        $scope.closeDescModal = function () {
            $scope.roomDescModal.hide();
        };

        $scope.openDetailModal = function (lotteryId) {
            this.send(2, 'showLotteryDetailCmd', {lotteryId: lotteryId});
            this.closeLottery();
        };

        $scope.closeDetailModal = function () {
            $scope.detailModal.hide();
        };

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
            $scope.membersModal.remove();
            $scope.roomDescModal.remove();
            $scope.detailModal.remove();
            $scope.popover.remove();
            $scope.popover1.remove();
            $scope.lotteryOpenPopover.remove();
            $scope.tooSlowPopover.remove();
        });

        $scope.showAdvancedButtons = function () {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    {text: '<b>Share</b> This'},
                    {text: 'Move'}
                ],
                destructiveText: 'Delete',
                titleText: 'Modify your album',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    console.log(index);
                    return true;
                },
                destructiveButtonClicked: function (e) {
                    console.log(e);
                }
            });

            $timeout(function () {
                hideSheet();
            }, 2000);
        };
        $scope.checkstr = function(str)
        {
        	   return /(.).*?\1/.test( str );
        }
        $scope.send = function (flag, cmd, data) {
            $scope.btnDisabled = true;
            if (ws && 1 == ws.readyState) {
                if (1 == flag) {
                	 if ($scope.room.type == 'G42')
                     {
                		 if(this.checkstr($scope.data.description))
                			 {
                			  
                			  $ionicPopup.alert({
                                  title: '提示',
                                 template: '有重复的雷点，不允许有重复的雷点.'
                             });
                			  $scope.btnDisabled = false;
                			  return;
                			 }
                	 }
                    ws.send(JSON.stringify({content: $scope.data, type: 'RED'}));
                    //this.closeModal();
                } else if (2 == flag) {
                    ws.send(JSON.stringify({cmd: cmd, content: data, type: 'ORD'}));
                } else if (3 == flag) {
                    ws.send(JSON.stringify({cmd: cmd, content: data, type: 'CMD'}));
                } else {
                    Auth.isSignIn(function (user) {
                        if (user) {
                            if ($scope.content) {
                                ws.send(JSON.stringify({content: $scope.content}));
                                $scope.content = '';
                            }
                        } else {
                            showLoginDialog();
                        }
                    });
                }
            } else {
                joinRoom();
                //webSocketService.close();
                //$ionicPopup.alert({
                //    title: '提示',
                //    template: '与房间链接已断开,请重新进入.'
                //});
                //$state.go('tab.rooms');
            }
        };

        $scope.keyEnter = function (e) {
            if (e.keyCode == 13) {
                $scope.send();
            }
        };

        $scope.back = function () {
            $ionicPopup.confirm({
                title: '提示',
                template: '确定退出房间?',
                okText: '是',
                okType: 'button-green',
                cancelText: '否'
            }).then(function (res) {
                if (res) {
                    webSocketService.close();
                    $state.go('tab.rooms');
                }
            });
        };

        // $scope.toggleEmojiBoard = function () {
        //     $scope.emojiOpen = !$scope.emojiOpen;
        //     $timeout(function () {
        //         scrollDelegate.scrollBottom(true);
        //     }, 100);
        // };
        //
        // var getUnicodeCharacter = function (cp) {
        //     if (cp >= 0 && cp <= 0xD7FF || cp >= 0xE000 && cp <= 0xFFFF) {
        //         return String.fromCharCode(cp);
        //     } else if (cp >= 0x10000 && cp <= 0x10FFFF) {
        //         cp -= 0x10000;
        //         var first = ((0xffc00 & cp) >> 10) + 0xD800
        //         var second = (0x3ff & cp) + 0xDC00;
        //         return String.fromCharCode(first) + String.fromCharCode(second);
        //     }
        // };
        //
        // $scope.emojiList = [];
        // for (var i = 1; i < 80; i++) {
        //     $scope.emojiList.push(getUnicodeCharacter(0x1f600 + i));
        // }
        // for (var j = 0; j < 17; j++) {
        //     $scope.emojiList.push(getUnicodeCharacter(0x1f440 + j));
        // }
        // $scope.insertEmoji = function (emoji) {
        //     if (!$scope.content) {
        //         $scope.content = emoji;
        //         return;
        //     }
        //
        //     var ctrl = document.getElementById('chatMsgInput');
        //     if (ctrl.selectionStart || ctrl.selectionStart == '0') {
        //         var caretPos = ctrl.selectionStart;
        //         var content = $scope.content;
        //         $scope.content = content.substr(0, caretPos) + emoji + content.substr(caretPos);
        //
        //         if(ctrl.setSelectionRange) {
        //             ctrl.focus();
        //             ctrl.setSelectionRange(caretPos, caretPos + 1);
        //         } else if (ctrl.createTextRange) {
        //             var range = ctrl.createTextRange();
        //             range.collapse(true);
        //             range.moveEnd('character', caretPos);
        //             range.moveStart('character', caretPos);
        //             range.select();
        //             console.log('===')
        //         }
        //     }
        // };
        //
        // $scope.closeEmojiBoard = function ($event) {
        //     if ($scope.emojiOpen) {
        //         $scope.emojiOpen = false;
        //         $event.preventDefault();
        //     }
        // };
    }).filter('trustHtml', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }
}])

    .controller('AccountLotteryCtrl', function ($scope, UserService) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getLotteryDetails($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getLotteryDetails($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })

    .controller('AccountBonusCtrl', function ($scope, UserService) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getBonusDetails($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getBonusDetails($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })

    .controller('ShopCtrl', function ($rootScope, $state, $ionicPopup, $scope, ShopService, $stateParams, $ionicHistory, webSocketService) {
        $scope.$on('$ionicView.beforeEnter', function () {
            if ($stateParams.shopId) {
                ShopService.get($stateParams.shopId).then(function (res) {
                    if (res.code == 200) {
                        $scope.shop = res.body;
                    }else{
                        $ionicPopup.alert({
                            title: '提示',
                            template: "商品信息丢失!"
                        });
                        $ionicHistory.goBack();
                    }
                });
            } else if ($stateParams.shop) {
                $scope.shop = $stateParams.shop;
            }
        });
        $scope.records = [];
        $scope.page = 1;
        $rootScope.shop={};
        $rootScope.concat = {};
        $scope.doRefresh = function () {
            $scope.page = 1;
            ShopService.shopList($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            ShopService.shopList($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.goShop = function (id) {
            ShopService.get(id).then(function (res) {
                if (res.code == 200) {
                    $rootScope.shop = res.body;
                    $state.go('tab.shop-detail', {shopId: id});
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: "商品信息丢失!"
                    });
                }

            });
        };

        $scope.step1 = function (shop) {
            //获取上次的收货信息
            ShopService.getContactInfo().then(function (res) {
                if (res.code == 200) {
                    $rootScope.contact = res.body;
                    $state.go('tab.shop-exchange', {shop: shop,contact:$rootScope.contact});
                }
            });
        }

        $scope.step2 = function (shop,contact) {
            ShopService.doExchange(shop.id,contact.name,contact.address,contact.mobile).then(function(res){
                if(res.code==200){
                    $ionicPopup.alert({
                        title: '提示',
                        template: "兑换成功,请留意“我的账户”兑换管理中的发货进度!"
                    });
                    $state.go('tab.shop');
                }else{
                    $ionicPopup.alert({
                        title: '错误',
                        template: res.msg
                    });
                }
            })
        }
    })

    .controller('ShopExchangeLogCtrl', function ($scope, $stateParams, $ionicHistory, UserService) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getShopExchangeLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getShopExchangeLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
//支持正版，授权冲突，格式化系统，后果自负。
    .controller('AccountBonus03Ctrl', function ($scope, UserService) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getBonus03Details($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getBonus03Details($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
      .controller('AccountBonus30Ctrl', function ($scope, UserService) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getBonus30Details($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getBonus30Details($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })


    .controller('TransferCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getTransferLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getTransferLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }

        $scope.transfer = function (userId,money) {
            if(money <= 0){
                $ionicPopup.alert({
                    title: '提示',
                    template: '金额必须大于0'
                });
                return;
            }
            UserService.getNickName(userId).then(function (res) {
                if (200 == res.code) {
                    $ionicPopup.confirm({
                        title: '转账确认',
                        template: '昵称:<strong style="color:green">'+res.nickName+'</strong><br>金额:<strong style="color:orangered">'+money+'金币</strong>',
                        scope: $scope,
                        buttons: [
                            {text: '取消', type: 'button-default', onTap: function () {
                                return 0;
                            }},
                            {text: '确定', type: 'button-positive', onTap: function () {
                                return 1;
                            }},
                            {text: '<div class="close">+</div>', type: 'login-dlg-close', onTap: function () {
                                return 2;
                            }}
                        ]
                    }).then(function (res) {
                        if (res == 1) {
                            UserService.transfer({userId: userId, money: money}).then(function (res) {
                                if (200 == res.code) {
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                    $state.go('tab.account');
                                }else{
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                }
                            });
                            //webSocketService.close();
                        } else if (res == 0) {
                            //webSocketService.close();
                        }
                    });
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });


        };
    })

    .controller('ProxyRechargeCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.prixyRechargeLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.prixyRechargeLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.prixyRecharge = function (userId,money) {
            if(money <= 0){
                $ionicPopup.alert({
                    title: '提示',
                    template: '金额必须大于0'
                });
                return;
            }
            UserService.checkRecharge(userId).then(function (res) {
                if (200 == res.code) {
                    $ionicPopup.confirm({
                        title: '上分确认',
                        template: '昵称:<strong style="color:green">'+res.body+'</strong><br>金额:<strong style="color:orangered">'+money+'金币</strong>',
                        scope: $scope,
                        buttons: [
                            {text: '取消', type: 'button-default', onTap: function () {
                                return 0;
                            }},
                            {text: '确定', type: 'button-positive', onTap: function () {
                                return 1;
                            }},
                            {text: '<div class="close">+</div>', type: 'login-dlg-close', onTap: function () {
                                return 2;
                            }}
                        ]
                    }).then(function (res) {
                        if (res == 1) {
                            UserService.prixyRecharge({userId: userId, money: money}).then(function (res) {
                                if (200 == res.code) {
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                    $state.go('tab.account');
                                }else{
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                }
                            });
                            //webSocketService.close();
                        } else if (res == 0) {
                            //webSocketService.close();
                        }
                    });
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });


        };
    })

    .controller('ProxyUnRechargeCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.prixyUnRechargeLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.prixyUnRechargeLog($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

        $scope.prixyUnRecharge = function (userId,money) {
            if(money <= 0){
                $ionicPopup.alert({
                    title: '提示',
                    template: '金额必须大于0'
                });
                return;
            }
            UserService.checkRecharge(userId).then(function (res) {
                if (200 == res.code) {
                    $ionicPopup.confirm({
                        title: '下分确认',
                        template: "用户昵称:<strong style='color:green'>"+res.nickName+"</strong><br>账户余额:"+res.money+"金币<br>下分金额:<strong style='color:orangered'>"+money+"金币</strong>",
                        scope: $scope,
                        buttons: [
                            {text: '取消', type: 'button-default', onTap: function () {
                                return 0;
                            }},
                            {text: '确定', type: 'button-positive', onTap: function () {
                                return 1;
                            }},
                            {text: '<div class="close">+</div>', type: 'login-dlg-close', onTap: function () {
                                return 2;
                            }}
                        ]
                    }).then(function (res) {
                        if (res == 1) {
                            UserService.prixyUnRecharge({userId: userId, money: money}).then(function (res) {
                                if (200 == res.code) {
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                    $state.go('tab.account');
                                }else{
                                    $ionicPopup.alert({
                                        title: '提示',
                                        template: res.msg
                                    });
                                }
                            });
                            //webSocketService.close();
                        } else if (res == 0) {
                            //webSocketService.close();
                        }
                    });
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });


        };
    })

    .controller('G03TrendCtrl', function ($scope, $state, $stateParams, Auth, $window, PcEgg) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            PcEgg.getPcEggLog($scope.page, 50).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            PcEgg.getPcEggLog($scope.page, 50).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

    })

      .controller('G30TrendCtrl', function ($scope, $state, $stateParams, Auth, $window, PcEggforJnd) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefreshforjnd = function () {
            $scope.page = 1;
            PcEggforJnd.getPcEggLog($scope.page, 50).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMoreforjnd = function () {
        	PcEggforJnd.getPcEggLog($scope.page, 50).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };

    })
    
    
    .controller('ProxyUsersCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getProxyUsers($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getProxyUsers($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })

    .controller('ProxyApplyCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.conf = {};
        $scope.$on('$ionicView.beforeEnter', function () {
            UserService.getProxyConfig().then(function (res) {
                if (200 == res.code) {
                    $scope.conf = res.body;
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        });
        $scope.apply = function(){

            msg ="<span style='color:dimgrey;font-size: 11px;'>系统将扣除账户金币购买代理权限，确认购买?</span>";

            $ionicPopup.confirm({
                title: '申请确认',
                template:msg ,
                scope: $scope,
                buttons: [
                    {text: '取消', type: 'button-default', onTap: function () {
                        return 0;
                    }},
                    {text: '确定', type: 'button-positive', onTap: function () {
                        return 1;
                    }},
                    {text: '<div class="close">+</div>', type: 'login-dlg-close', onTap: function () {
                        return 2;
                    }}
                ]
            }).then(function (res) {
                if (res == 1) {
                    UserService.doApply().then(function (res) {
                        if (200 == res.code) {
                            $ionicPopup.alert({
                                title: '提示',
                                template: "恭喜,你已经成为代理!"
                            });
                            $rootScope.user.userType='2';
                            $state.go('tab.account');
                        } else {
                            $ionicPopup.alert({
                                title: '提示',
                                template: res.msg
                            });
                        }
                    });
                } else if (res == 0) {
                    //webSocketService.close();
                }
            });
        };
    })

    .controller('ProxyCreateUserCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.data = {};
        $scope.createUser = function () {
            if (!$scope.data.username || !$scope.data.password) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '用户名或者密码不能为空'
                });
                return;
            }
            if ($scope.data.password != $scope.data.password_c) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '两次密码输入不一致'
                });
                return;
            }
            if (!$scope.data.wx && !$scope.data.mobile && !$scope.data.alipay) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '微信/手机/支付宝请至少选填一项,作为密码找回依据!'
                });
                return;
            }

            UserService.createUser($scope.data).then(function (res) {
                if (200 == res.code) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '账号创建成功!'
                    });
                    $state.go('tab.account-proxy');
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        }
    })

    .controller('ProxyLogsCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getProxyLogs($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getProxyLogs($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
        .controller('GamePointCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.leveltag = $stateParams.level;
        $scope.doRefresh = function () {
        	Auth.getUser( $rootScope.user.id ).then(function (res) {
                if (res.code == 200) {
                    var b = res.body;
                    $scope. user =b;
                }
            });
            $scope.page = 1;
            UserService.getProxyGamepoint($scope.page, 20,$scope.leveltag).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getProxyGamepoint($scope.page, 20,$scope.leveltag).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
    .controller('ProxyRechargeWaterCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getProxyRechargeWaterLogs($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getProxyRechargeWaterLogs($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
    
        .controller('RechargePointCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.leveltag =$stateParams.level;
        $scope.doRefresh = function () {
        	Auth.getUser( $rootScope.user.id ).then(function (res) {
                if (res.code == 200) {
                    var b = res.body;
                    $scope. user =b;
                }
            });
            $scope.page = 1;
            UserService.getProxyRechargePoint($scope.page, 20,$stateParams.level).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getProxyRechargePoint($scope.page, 20,$stateParams.level).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
    
    
    .controller('AccountCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup, Upload) {
        $scope.upload = function (file) {
            if(file == null){
                return;
            }
            Upload.upload({
                url: 'user/upload',
                method: 'POST',
                headers: {
                    'x-access-token': $rootScope.user.accessToken,
                    'x-access-uid': $rootScope.user.id
                },
                data: {file: file}
            }).then(function (res) {
                //alert(res.data.body.headImage)
                if(res.data.code == 200){
                    $ionicPopup.alert({
                        title: '提示',
                        template: "上传成功"
                    });
                    $scope.user.headImg = res.data.body.headImage;
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.data.msg
                    });
                }
                //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            });
        };
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.doRefresh = function () {
                UserService.getBalance().then(function (res) {
                    if (res.code == 200) {
                        var b = res.body;
                        if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                            b = b.toFixed(2).replace('.00', '');
                        }
                        if (!$rootScope.user) {
                            $rootScope.$watch('user', function (nv) {
                                if (nv) {
                                    nv.money = b;
                                }
                            });
                        } else {
                            $rootScope.user.money = b;
                        }
                    }
                }).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
                if ($scope.roomCount == undefined || $scope.roomCount == null) {
                    UserService.getRoomCount().then(function (res) {
                        if (res.code == 200) {
                            $scope.roomCount = res.body;
                        }
                    });
                }
            };
            $scope.doRefresh();
        });

        $scope.updateName = function (nickName) {
            UserService.update({id: $rootScope.user.id, nickName: nickName}).then(function (res) {
                if (200 == res.code) {
                    $rootScope.user.nickName = nickName;
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                    $state.go('tab.account-manager');
                }
            });
        };

        $scope.updatePsw = function (oldPwd, newPwd, confirmPwd) {
            UserService.updatePsw({
                id: $rootScope.user.id,
                oldPwd: oldPwd,
                newPwd: newPwd,
                confirmPwd: confirmPwd
            }).then(function (res) {
                if (200 == res.code) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                    $state.go('tab.account-manager');
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        };

        $scope.sendSmsCode = function (mobile) {
            UserService.sendSmsCode({id: $rootScope.user.id, mobile: mobile}).then(function (res) {
                if (200 == res.code) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '短信发送成功,请输入验证码!'
                    });
                    $scope.mobile = mobile;
                    $state.go('tab.account-manager-updatePhone-confirm');
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        };

        $scope.bindMobile = function (smsCode) {
            UserService.bindMobile({id: $rootScope.user.id, smsCode: smsCode, mobile: $scope.mobile}).then(function (res) {
                if (200 == res.code) {
                    $rootScope.user.mobile = $scope.mobile;
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                    $state.go('tab.account-manager');
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        };
//支持正版，授权冲突，格式化系统，后果自负。
        $scope.logout = function () {
            $ionicPopup.confirm({
                title: '请确认',
                template: '确定退出当前登录账号?',
                okText: '是',
                okType: 'button-green',
                cancelText: '否'
            }).then(function (ok) {
                if (ok) {
                    Auth.logout().then(function (res) {
                        if (res.code == 200) {
                            $rootScope.user = undefined;
                            $state.go('tab.rooms');
                        }
                    });
                }
            });
        }
    })
    .controller('AccountDetailCtrl',function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
    
    	
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.doRefresh = function () {
            	Auth.getUser( $rootScope.user.id ).then(function (res) {
                    if (res.code == 200) {
                        var b = res.body;
                        $scope. user =b;
                    }
                }).finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
                
            };
            $scope.doRefresh();
        });

    	
    	
    	
    })

    .controller('UserRoomsCtrl', function ($scope, UserService) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.doRefresh();
        });

        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getRooms($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.rooms = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    })

    .controller('UserRoomPropsCtrl', function ($scope, $stateParams, Rooms,$ionicPopup,$state) {
        $scope.$on('$ionicView.beforeEnter', function () {
            Rooms.getProps($stateParams.roomId).then(function (res) {
            
                if (res.code == 200) {
                 
                    $scope.props = res.body.props;
                    $scope.room = res.body.room;
                }else{
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        });
      
        $scope.updateRoomProp = function (roomId,key,alias) {
            $ionicPopup.prompt({
                title: '修改房间属性['+alias+"]",
                okText: '确定',
                okType: 'button-green',
                cancelText: '取消',
                inputType: 'text'
            }).then(function (value) {
            	if(!value)
            		{
            		return;
            		}
            	if(key=="limitNum" &&(value>100))
                 {
            		$ionicPopup.alert({
                        title: '提示',
                        template: "最大人数不能超过100"
                    });

            		 return ;
            		
            		}
                Rooms.updateRoomProp(roomId,key,value).then(function (res) {
                    if (res.code == 200) {
                        $ionicPopup.alert({
                            title: '提示',
                            template: "修改成功!"
                        });

                        if(key=="id"){
                            $state.go("tab.account-rooms");
                        }else{
                            Rooms.getProps($stateParams.roomId).then(function (res) {
                                if (res.code == 200) {
                                    $scope.props = res.body.props;
                                    $scope.room = res.body.room;
                                  
                                }
                            });
                        }
                    }else{
                        $ionicPopup.alert({
                            title: '提示',
                            template: res.msg
                        });
                    }
                })
            });
        };

        
        
        $scope.updateProp = function (roomId,proid,key,alias) {
            $ionicPopup.prompt({
                title: '修改房间属性['+alias+"]",
                okText: '确定',
                okType: 'button-green',
                cancelText: '取消',
                inputType: 'text'
            }).then(function (value) {
            	if(!value)
        		{
        		return;
        		}
                Rooms.updateProp(roomId,proid,key,value).then(function (res) {
                    if (res.code == 200) {
                        $ionicPopup.alert({
                            title: '提示',
                            template: "修改成功!"
                        });

                        if(key=="id"){
                            $state.go("tab.account-rooms");
                        }else{
                            Rooms.getProps($stateParams.roomId).then(function (res) {
                                if (res.code == 200) {
                                    $scope.props = res.body.props;
                                    $scope.room = res.body.room;
                                  
                                }
                            });
                        }
                    }else{
                        $ionicPopup.alert({
                            title: '提示',
                            template: res.msg
                        });
                    }
                })
            });
        };

        $scope.deleteRoom = function (roomId) {
        	$ionicPopup.confirm({
                title: '提示',
                template: '确定删除本房间?',
                okText: '是',
                okType: 'button-green',
                cancelText: '否'
            }).then(function (res) {
             
            	if(!res)
        		{
        		   return;
        		}
                Rooms.deleteRoom(roomId).then(function (res) {
                    if (res.code == 200) {
                        $ionicPopup.alert({
                            title: '提示',
                            template: "删除成功!"
                        });
                        $state.go("tab.account-rooms");
                        
                    }else{
                        $ionicPopup.alert({
                            title: '提示',
                            template: res.msg
                        });
                    }
                })
            });
        };
        
        
        

        
        
        
        
    })

    .controller('BankCardsCtrl', function ($scope, $state, $stateParams, Account) {
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.forWithdraw = $stateParams.target == 'tab.account-withdraw';
            $scope.refreshCards();
        });

        $scope.refreshCards = function () {
            Account.getBankCards().then(function (res) {
                if (res.code == 200) {
                  /*  if (!res.body || res.body.length == 0) {
                        if ($scope.forWithdraw) {
                            $state.go('tab.account-withdraw');
                            return;
                        }
                    }*/
                    $scope.cards = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.gotoWithdraw = function (card) {
            if (!$scope.forWithdraw) {
                return;
            }
            var params = {
                bankName: card.bankName,
                branch: card.branch,
                ownerName: card.name,
                account: card.account,
                mobile: card.mobile,
                imgsrc:card.imgsrc
            };

            $state.go('tab.account-withdraw', params);
        };
    })

    .controller('RechargeHistoryCtrl', function ($scope, Account) {
        $scope.records = [];
        $scope.page = 1;

        $scope.doRefresh = function () {
        	   if ($scope.loading) {
                   return;
               }
               $scope.loading = true;
            $scope.page = 1;
            Account.getRechargeRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }  
                $scope.loading = false;
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
        	   if ($scope.loading) {
                   return;
               }
               $scope.loading = true;
            Account.getRechargeRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.loading = false;
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
    
    
        .controller('RechargeDetailCtrl', function ($scope, Account) {
        $scope.records = [];
        $scope.page = 1;

        $scope.doRefresh = function () {
        	   if ($scope.loading) {
                   return;
               }
               $scope.loading = true;
            $scope.page = 1;
            Account.getRechargeRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }   $scope.loading = false;
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
        	  if ($scope.loading) {
                  return;
              }
              $scope.loading = true;
            Account.getRechargeRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.loading = false;
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })

    
    

    .controller('WithdrawHistoryCtrl', function ($scope, Account) {
        $scope.page = 1;
        $scope.records = [];

        $scope.doRefresh = function () {
            if ($scope.loading) {
                return;
            }
            $scope.loading = true;
            $scope.page = 1;
            Account.getWithdrawRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
                $scope.loading = false;
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            if ($scope.loading) {
                return;
            }
            $scope.loading = true;
            Account.getWithdrawRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.loading = false;
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })

    
        .controller('WithdrawDetailCtrl', function ($scope, Account) {
        $scope.page = 1;
        $scope.records = [];

        $scope.doRefresh = function () {
            if ($scope.loading) {
                return;
            }
            $scope.loading = true;
            $scope.page = 1;
            Account.getWithdrawRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    $scope.records = res.body;
                }
                $scope.loading = false;
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            if ($scope.loading) {
                return;
            }
            $scope.loading = true;
            Account.getWithdrawRecords($scope.page, 20).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.loading = false;
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
    
    
    .controller('RechargeCtrl', function ($rootScope, $scope, $ionicPopup, $state, $ionicActionSheet, UserService, Auth, Pay, $window, myConstants) {
        var userAgent = $window.navigator.userAgent.toLowerCase();
        $scope.rechargelist="";
        $scope.$on('$ionicView.beforeEnter', function () {
        	
        	UserService.getrecharelist().then(function (res) {
        		var b="10,20,30,50,100,500";
                if (res.code == 200) {
                    var b = res.msg;
                     
                }
                $scope.rechargelist= b.split(",");
                
            }) ;
        	
        	
        	
        	
        });
        $scope.payOrder = {};
        var icons = myConstants.IS_APP ? {
            1001: 'ali.png',
            1002: 'wx.png',
1003: 'qqwap.png'
        } :{
             1001: 'ali.png',
            1002: 'wx.png',
				 1003: 'qqwap.png'
        };
        var buttons = [
             
                       
        ];
        for (var i = 0; i < Pay.payChannels.length; i++) {
            if (icons[Pay.payChannels[i]]) {
                buttons.push({
                    text: '<img src="img/pay/' + icons[Pay.payChannels[i]] + '" class="pay-channel-sel">',
                    className: 'pay-channel-btn'
                });
            }
        }
        var inwx = (/micromessenger/i).test(navigator.userAgent);
     

        $scope.doRecharge = function () {
            if (!$scope.payOrder.amount) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '请输入充值金额'
                });
                return;
            }
            $ionicActionSheet.show({
                buttons: buttons,
                titleText: '选择支付方式',
                buttonClicked: function (index) {
                    //if (myConstants.IS_APP)
						{
                          {
                            Pay.apply(index, $scope.payOrder.amount).then(
								
							function(res){

								  if (res.code == 200) {

                                  //   $state.go('tab.submitpay',{paysrc: res.body});
                                     $window.location.href =  res.body;
                                     
								  }
								  else
								   {
									    $ionicPopup.alert({
                    title: '提示',
                    template: '充值提交失败，请重新发起'
                });
								    }
							
							
							}

							);
                        }
                    }  
                    return true;
                }
            });
        };

        $scope.doRefresh = function () {
            UserService.getBalance().then(function (res) {
                if (res.code == 200) {
                    var b = res.body;
                    if (/^(-?\d+)(\.\d+)?$/.test(b)) {
                        b = b.toFixed(2).replace('.00', '');
                    }
                    if (!$rootScope.user) {
                        $rootScope.$watch('user', function (nv) {
                            if (nv) {
                                nv.money = b;
                            }
                        });
                    } else {
                        $rootScope.user.money = b;
                    }
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    })


    .controller('WithdrawCtrl', function ($scope, $state, $stateParams, $ionicPopup, Account) {
        $scope.withdraw ={};
        $scope.minlimit=10;
        $scope.limittime="00:00-23:59";
        $scope.$on('$ionicView.beforeEnter', function () {
            if ($stateParams) {
            	            	
                $scope.withdraw = $stateParams;
            }
            
         
            
            Account.getwithdrawtime().then(function(res){
        		
       		 if (200 == res.code&& res.msg) {
                     
       				$scope.limittime = res.msg;
                }
       		 
      		  var isok = true;
      		
       		 
       		var myDate = new Date();
       		
       		var timecheck = $scope.limittime.split("-");
       		
       		var max =timecheck[1];
       		var min =timecheck[0];
       		
       		var cur=myDate.getHours() + ":"+ myDate.getMinutes();
       		
       		if(cur<min || cur>max)
       			{
       			
       			isok = false;
       			}
       		  
       		  
       		  
       		  if(isoke==false)
       			  {
       			  
       		  
       			 $ionicPopup.alert({
                     title: '提示',
                     template: '现在不属于金币流转处理时间，请在'+$scope.limittime +"进行金币流转"
                 });
       			  
       			 $state.go('tab.account');
       			 
       			 
       			 
       			  }
       		  
       		 
       		 
       		 
       		 
       		 
       		 
       	});
            
            
            
            Account.getwithdrawminlimit().then(function(res){
        		
         		 if (200 == res.code&& res.msg) {
                       
         				$scope.minlimit = res.msg;
                  }
         		
         	});
           
            
            
            
            
            
            
        });

        $scope.doWithdraw = function () {
            var w = $scope.withdraw;
            if (!w.bankName || !w.branch || !w.ownerName || !w.account || !w.mobile || !w.money) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '为了确保金币流转成功, 以上表单信息请务必填写完整后再提交'
                });
                return;
            }
            if (w.money <   $scope.minlimit) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '提出金额不得低于'+  $scope.minlimit+'元'
                });
                return;
            }
            Account.withdraw(w).then(function (res) {
                if (res.code == 200) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '金币流转申请已成功提交, 系统将在24小时内将款项转入你的收款账户, 请注意查收'
                    }).then(function () {
                        $state.go('tab.account-rechargeAndWithdraw');
                    });
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '金币流转申请失败: ' + res.msg
                    });
                }
            });
        };
        
        
        $scope.doWithdrawCash = function () {
            var w = $scope.withdraw;
            if (!w.money) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '为了确保金币流转成功, 金额不能为空切不能超过实际余额。'
                });
                return;
            }
            if (w.money <   $scope.minlimit) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '提出金额不得低于'+  $scope.minlimit+'元'
                });
                return;
            }
            Account.withdrawcash(w).then(function (res) {
                if (res.code == 200) {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '金币流转申请已成功提交,请注意微信查收，若未收到账请联系客服。'
                    }).then(function () {
                    	
                    	
                       //window.location.href = res.body;
                        
                    	$state.go('tab.inframe',{inframe: res.body});
                        
                        
                    });
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: '金币流转申请失败: ' + res.msg
                    });
                }
            });
        };
        
        
        
        
    })

    .controller('LoginCtrl', function ($scope, $state, $ionicPopup, Auth, $rootScope, ThirdPartyLogin) {
        $scope.data = {};
        $scope.apptitle = appTitle;
        $scope.$on('$ionicView.beforeEnter', function () {
            if(localStorage.autoLogin) {
                $scope.data.username = localStorage.username;
                $scope.data.password = localStorage.password;
            }
        });

        $scope.doLogin = function () {
            if (!$scope.data.username || !$scope.data.password) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '用户名或者密码不能为空'
                });
                return;
            }
            Auth.login($scope.data).then(function (res) {
                if (200 == res.code) {
                    $rootScope.user = res.body;
                    localStorage.uid = res.body.id;
                    localStorage.username = $scope.data.username;
                    localStorage.accessToken = res.body.accessToken;
                    localStorage.autoLogin = $scope.data.autoLogin;
                    if(localStorage.autoLogin){
                        localStorage.password = $scope.data.password;
                    }
                    if ($scope.fromState && $scope.fromState.length > 0) {
                        $state.go($scope.fromState.name, $scope.fromParams);
                    } else {
                        $state.go('tab.rooms');
                    }
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        };

        $scope.loginWx = function () {
            var extras = {};
            if ($scope.fromState) {
                extras.fromUrl = $scope.fromState.url;
                if ($scope.fromParams) {
                    extras.fromParams = $scope.fromParams;
                }
            }
            ThirdPartyLogin.apply('wx', extras);
        };
    })
   .controller('ServicePointCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.data = {};
        $scope.leveltag =$stateParams.level;
        $scope.doRefresh = function () {
        	Auth.getUser( $rootScope.user.id ).then(function (res) {
                if (res.code == 200) {
                    var b = res.body;
                    $scope. user =b;
                }
            });
            $scope.page = 1;
            UserService.getProxyServicePoint($scope.page, 20,$scope. $scope.leveltag).then(function (res) {
                $scope.records = [];
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getProxyServicePoint($scope.page, 20, $scope.leveltag).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
    .controller('ProxyBackWaterLogsCtrl', function ($scope, $state, $stateParams, Auth, $window, UserService, $rootScope, $ionicPopup) {
        $scope.records = [];
        $scope.page = 1;
        $scope.data = {};
        $scope.doRefresh = function () {
            $scope.page = 1;
            UserService.getProxyBackWaterRedLogs($scope.page, 20,$scope.data.queryUserId).then(function (res) {
                $scope.records = [];
                if (res.code == 200) {
                    $scope.records = res.body;
                }
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            UserService.getProxyBackWaterRedLogs($scope.page, 20,$scope.data.queryUserId).then(function (res) {
                if (res.code == 200) {
                    if (res.body && res.body.length > 0) {
                        $scope.records = $scope.records.concat(res.body);
                        $scope.page++;
                    }
                    if (!res.body || res.body.length < 20) {
                        $scope.noMoreItemsAvailable = true;
                    }
                } else {
                    $scope.noMoreItemsAvailable = true;
                }
            }).catch(function () {
                $scope.noMoreItemsAvailable = true;
            });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    })
    .controller('RegisterCtrl', function ($scope, $state, $ionicPopup, Auth,UserService,$interval,myConstants ,$rootScope) {
        $scope.data = {};
        $scope.vcodeStr = "获取验证码";
    	$scope.registerWithoutPhoneNo = true;
        $scope.$on('$ionicView.beforeEnter', function () {
        	Auth.registerbymoible().then(function(res){
        		
        		 if (200 == res.code&& res.msg=="1") {
                      
        				$scope.registerWithoutPhoneNo = false;
                 }
        		
        	});
		
            $scope.showPassword = false;
            UserService.getInvitorId().then(function (res) {
                if (200 == res.code) {
                    //alert(res.body)
                    $scope.data.parentId = res.body;
                }
            });
        });
        
		$scope.sendSmsCode= function () {
			 if ($scope.vcodeTimeout) {return;}
			 
			 
		
			  if (!$scope.registerWithoutPhoneNo && (!$scope.data.mobile)) {
               $ionicPopup.alert({
                   title: '提示',
                   template: '手机号不能为空'
               });
               return;
           }
			 
		    if (!new RegExp('^1[3-9][0-9]{9}$', 'g').test($scope.data.mobile)) {
				$ionicPopup.alert({
					title: '提示',
					template: '手机号不正确'
				});
				return;
			}
			   
           UserService.sendSmsCodebyCheck({mobile: $scope.data.mobile}).then(function (res) {
               if (200 == res.code) { 
					 $scope.vcodeTimeout = myConstants.vcodeTimeout;
					 $scope.vcodeStr = "倒计时"+$scope.vcodeTimeout;
						$interval(function () {
							$scope.vcodeTimeout--;
							$scope.vcodeStr = "倒计时"+$scope.vcodeTimeout;
							if($scope.vcodeTimeout==0) {
								$scope.vcodeStr = "获取验证码";
							}    
						}, 1000, myConstants.vcodeTimeout);
					
               } else {
                   $ionicPopup.alert({
                       title: '提示',
                       template: res.msg
                   });
               }
           });
       }; 
		

        $scope.doRegister = function () {
            if (!$scope.data.username || !$scope.data.password) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '用户名或者密码不能为空'
                });
                return;
            }
            
            if (!$scope.registerWithoutPhoneNo && (!$scope.data.mobile || !$scope.data.smsCode)) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '手机号或者验证码不能为空'
                });
                return;
            }
            
            if ($scope.data.password != $scope.data.password_c) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '两次密码输入不一致'
                });
                return;
            }
           // if (!$scope.data.wx && !$scope.data.mobile && !$scope.data.alipay) {
             //   $ionicPopup.alert({
                 //   title: '提示',
                  //  template: '微信/手机/支付宝请至少选填一项,作为密码找回依据!'
              //  });
              //  return;
           // }

            Auth.register($scope.data).then(function (res) {
                if (200 == res.code) {
                    $rootScope.user = res.body;
                    localStorage.uid = res.body.id;
                    localStorage.username = $scope.data.username;
                    localStorage.accessToken = res.body.accessToken;
                    if ($scope.fromState && $scope.fromState.length>0 && $scope.fromState.name!='login' ) {
                        $state.go($scope.fromState.name, $scope.fromParams);
                    } else {
                        $state.go('tab.rooms');
                    }
                } else {
                    $ionicPopup.alert({
                        title: '提示',
                        template: res.msg
                    });
                }
            });
        }
    })
;
