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

    $('.wp-inner').fullpage({
    	    page: '.page',
		    start: 0,
		    duration: 200,
		    drag: true
    });
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('asset_contain'));
	option = {
		color:["#f39801","#0ba29b","#fdd100","#90c320"],
		title: {
//			text: 'Total:\n100%',
			x: 'center',
			y: 'center',
			textStyle: {
				fontSize: 14,
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
//					formatter: "{b} \n{d}%",
					formatter: function (obj) {
					 return obj.name + '\n' + obj.percent.toFixed(0) + '%'
					                       },
					textStyle:{
            			color:"#ffd413"
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
			data: [{
				value: 10,
				name: '理财'
			}, {
				value: 15,
				name: '基金'
			}, {
				value: 26,
				name: '国债'
			}, {
				value: 39,
				name: '储蓄'
			}]
		}]

	};
	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);
	
	var datas=12457.98;
		var ids=$("#consumption_money");
		Money({
			data:datas,
			id:ids
		});
	var data2=2846970;
	var $purchase=$("#purchase");
		Money({
			data:data2,
			id:$purchase
		});
	var data4=28469.10;
	var $wage=$("#wage");
		Money({
			data:data4,
			id:$wage
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
	var data3=284730;
	var $ids=$(".history_numer");
		Num({
			data:data3,
			id:$ids
		});
		
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
            data:[
                {value:20, name:'旅行'},
                {value:22, name:'餐饮'},
                {value:23, name:'其他'},
                {value:35, name:'网购'}
            ]
        }
    ]
};

    // 使用刚指定的配置项和数据显示图表。
	consumptionChart.setOption(option);
})