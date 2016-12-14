$(document).ready(function() {
	
		var w = document.documentElement.offsetWidth || document.body.offsetWidth;
	    var now = 100 * (w/ 640); //APP里面打开的尺寸；
	
	//判断打开方式
	var browser = {
			versions: function () {
			    var u = navigator.userAgent, app = navigator.appVersion;
			    return {     //移动终端浏览器版本信息
			      trident: u.indexOf('Trident') > -1, //IE内核
			      presto: u.indexOf('Presto') > -1, //opera内核
			      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			      iPad: u.indexOf('iPad') > -1, //是否iPad
			      webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
			    };
			  }(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
		};
	
	if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
		  var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
		  if (browser.versions.ios) {
		    //是否在IOS浏览器打开
		    now = 100 * ((w-80)/ 640);
		  }
		  if(browser.versions.android){
		  	now = 100 * ((w-80)/ 640);
		    //是否在安卓浏览器打开
		  }
		  if (ua.match(/MicroMessenger/i) == "micromessenger") {
		    //在微信中打开
		    now = 100 * ((w-50)/ 640);
		  }
		  if (ua.match(/WeiBo/i) == "weibo") {
		    //在新浪微博客户端打开
		  }
		  if (ua.match(/QQ/i) == "qq") {
		    //在QQ空间打开
		  }
		 
		  if(browser.versions.android){
		    //是否在安卓浏览器打开
		  }
		} else {
		  //否则就是PC浏览器打开
		}
	
		
	 $("html").css("fontSize", now + "px");

    var data = {
				"code":"0",						//#正确或错误的状态码，0：正确 1：错误
				"message":"提示信息",			//#返回信息
				"data":{
					"open_dt":"20150809",		//#用户开户日期
					"open_dt_rank":"288888",	//#用户开户时间早晚排名
					"org":[{"cnt":10,"name":"北京分行"},{"cnt":4,"name":"东单分行"},{"cnt":2,"name":"西单分行"}],	//#只取前三条
					"asset":[{"value":10,"name":"理财"},{"value":40,"name":"基金"},{"value":50,"name":"储蓄"}],
					"asset_desc":"积极",		//#展示客户资产配置类型,稳健/积极
					"salary_amt":"2846970",		//#本年工资总收入
					"salary_amt_p":78,			//#同年龄段排名百分比
					"fin_amt":"2846970",		//#客户理财购买金额
					"fin_amt_p":78,				//#理财购买排名百分比
					"fin_amt_d":7,				//#绘制半个金钱的数量
					"payment":[{"name":"水费","amt":"164.8","cnt":12},{"name":"电费","amt":"164.8","cnt":20}],		//#云缴费
					"consume_amt":"46124.66",	//#云支付总消费金额
					"consume_categ":[{"value":20,"name":"旅游"},{"value":35,"name":"网购"},{"value":22,"name":"餐饮"},{"value":23,"name":"其他"}],
					"cust_lvl_name":"白银用户"	//#用户等级
					}
			};
			
	//引导页
	var guide = function () {
		$("#guide").addClass('page').show();
	}
	//历史合作页		
	var history = function(userData) {
		if(userData.open_dt && userData.open_dt_rank){
	    			var open_date = userData.open_dt.split(""); 
	    			var date_str= '';
	    			for(var i=0; i<open_date.length; i++){
	    				date_str += '<li><img class="number_img" src="img/'+ open_date[i] +'.png"/></li>'
	    			}
	    			
	    			$('.history_top ul').append(date_str);
	    			
	    			var $ids=$(".history_numer");
						Num({
							data:userData.open_dt_rank,
							id:$ids
						});
						
					$("#history").addClass('page').show();
	    		}
	};
	//常去网点
	var oftenNetwork = function(userData) {
		if(userData.org){
			var tableStr = '';
			for(var i=0; i<3; i++){
				tableStr += '<tr><td>'+ userData.org[i].name +'</td><td>'+ userData.org[i].cnt +'</td></tr>';
			}
			
			$('.welcome table').append(tableStr);
			
			$("#oftenNetwork").addClass('page').show();
		}
	}
	//资产配置
	var asset = function(userData) {
		if(userData.asset){
			$("#asset").addClass('page').show();
			
			var myChart = echarts.init(document.getElementById('asset_contain'));
			option = {
				color:["#f39801","#0ba29b","#fdd100","#90c320"],
				title: {
					x: 'center',
					y: 'center',
					textStyle: {
						fontSize: 18,
						fontWeight: 0,
						fontFamily: "微软雅黑"
					}
		
				},
				legend: {
					show: true,
					padding: 0
				},
				series: [{
					center:['45%','50%'],
					type: 'pie',
					radius: ['25%', '50%'],
					label: {
						normal: {
							show: true,
							formatter: function (obj) {
							 return obj.name + '\n' + obj.percent.toFixed(0) + '%'
							                       },
							textStyle:{
		            			color:"#ffd413",
		            			baseLine:'middle',
		            			algin:'left'
		            		}
						}
		
					},
					labelLine: {
						normal: {
							show: true,
							lineStyle:{
		            			color:"#fff"
		            		}
						}
					},
					itemStyle: {
						normal:{
		                    shadowColor:'rgba(0,0,0,.7)',
		                    shadowOffsetX:"8",
		                    shadowBlur:"16"
		               }
					},
					data: userData.asset
				}]

	};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			
			if(userData.asset_desc == '稳健'){
				userData.asset_desc = '稳健进取型';
			}else if(userData.asset_desc == '积极'){
				userData.asset_desc = '积极主动型';
			}
			
			
			$('.asset_p2 span').html(userData.asset_desc);
			
		}
	}
	//工资收入
	var salary = function(userData) {
		if(userData.salary_amt && userData.salary_amt_p){
		    var $wage=$("#wage");
			Money({
				data:userData.salary_amt,
				id:$wage
			});
			$("#salary_percent").html(userData.salary_amt_p+'%');
			
			$("#salary").addClass("page").show();
				
		}
	}
	//理财购买页面
	var purchase = function(userData) {
		if(userData.fin_amt && userData.fin_amt_p && userData.fin_amt_d){
			var $purchase=$("#purchase-cmt");
				Money({
					data:userData.fin_amt,
					id:$purchase
				});
				
			$("#purchase_percent").html(userData.fin_amt_p+'%');
			
			var dollar = userData.fin_amt_d;
			var full = parseInt(dollar/2);
			var half = dollar%2;
			var zero = 5-full-half;
			
			for(var i=0; i<full; i++){
				$('.dollars li').eq(i).addClass('full-dollar')
			}
			for(var i=full; i<(full+half); i++){
				$('.dollars li').eq(i).addClass('half-dollar')
			}
			for(var i=(full+half); i<5; i++){
				$('.dollars li').eq(i).addClass('zero-dollar')
			}
			
			$('#purchase').addClass('page').show();
		}
	}
	//没有资产配置和理财购买的页面
	var defaults = function() {
		$("#default").addClass("page").show();
	}
	//云缴费
	var payment = function(userData) {
		if(userData.payment){
			var paymentArr = userData.payment;
			var paymentStr = '';
			for(var i=0; i<paymentArr.length; i++){
				paymentStr += '<li><p class="cloud_style">'+ paymentArr[i].name +'</p><p class="cloud_number"><span class="cloud_num"><i>'+ paymentArr[i].cnt +'</i>次</span><span class="cloud_money"><i>'+ paymentArr[i].amt +'</i>元</span></p></li>';
			}
			
			$(".consumption_cloud ul").append(paymentStr);
			
			$("#payment").addClass("page").show();
		}
	}
	//云支付
	var cloudPay = function(userData) {
		if(userData.consume_amt && userData.consume_categ){
			var ids=$("#consumption_money");
			Money({
				data:userData.consume_amt,
				id:ids
			});
			
			
			$('#cloudPay').addClass('page').show();
					// 基于准备好的dom，初始化echarts实例
			var consumptionChart = echarts.init(document.getElementById('consumption_pie'));
			option = {
				color:["#f5b85b","#e32d56","#60506d","#359ea1"],
		        series : [
		        { 
		            name: '访问来源',
		            type: 'pie',
		            radius : '55%',
		            center: ['50%', '40%'],
		            label:{
		            	normal:{
		            		show: true,
		            		formatter: "{b} \n{d}%",
		            		textStyle:{
		            			color:"#ffd413"
		            		}
		            			
		            	}
		            },
		            labelLine:{
		            	normal:{
		            		lineStyle:{
		            			color:"#fff"
		            		}
		            	}
		            },
		            data:userData.consume_categ
		        }
		    ]
		};
		
		    // 使用刚指定的配置项和数据显示图表。
			consumptionChart.setOption(option);
		}
	}
	//云缴费/云支付默认页
	var defaultPay = function(userData) {
		$('#defaultPay').addClass('page').show();
	}
	//称号页面
	var designation = function(userData) {
		if(userData.cust_lvl_name){
			switch(userData.cust_lvl_name)
				{
				case "皇冠用户":
				  $('#queen').addClass('page').show();
				  break;
				case "钻石用户":
				  $('#diamond').addClass('page').show();
				  break;
				case "白金用户":
				  $('#ptGold').addClass('page').show();
				  break;
				case "黄金用户":
				  $('#gold').addClass('page').show();
				  break;
				case "白银用户":
				  $('#slivery').addClass('page').show();
				  break;
				default:
				  break;
				}
		}
	}
	
	var renderData = function(data){
		 if(data.code == 0){
	    	if(data.data){
	    		var userData = data.data;
	    		//显示向导页
	    		guide();
	    		//历史合作页
	    		history(userData);
	    		//常去网点
	    		oftenNetwork(userData);
	    		//资产配置
	    		asset(userData);
	    		//理财购买页面
				purchase(userData);
				//工资收入
	    		salary(userData);
				//没有资产配置和理财购买的页面
				//defaults(userData);
				//云缴费
				payment(userData);
				//云支付
				cloudPay(userData);
				//云缴费/云支付默认页
				//defaultPay(userData);
				//称号页面
				designation(userData);
	    	}
	    }
	}
    //渲染数据到页面
    renderData(data);
    
    //调用满屏滚动事件
    $('.wp-inner').fullpage({
    	    page: '.page',
		    start: 0,
		    duration: 200,
		    drag: true
    });
    
	function Num(opt) {
		this.data = opt.data || 0;
		this.id = opt.id;
		this.datas = String(this.data);
		this.arr = this.datas.split("");
		for(var i = 0; i < this.datas.length; i++) {
				this.id.append("<i><img class='numbers' src='img/" + this.datas[i] + ".png'/></i>");
		}
	}
	
	
	
	
	
	
	
	
	
})