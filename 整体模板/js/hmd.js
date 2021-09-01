/*
 * @description pulic libray
 * @author haiyun ji
 * @time 2021.8.19
*/
(function(global){
	const hmd = {version:1.0};

	/*
	 * @描述 查询功能的方法
	*/
	const query = {
		$(css,el){
			el = el || document;
			return el.querySelector(css);
		},
		_(css,el){
			el = el || document;
			return el.querySelectorAll(css);
		},
		/*
		 * @描述 获取或设置属性
		*/
		attr(el,key,value){
			if(!value){
				return el.getAttribute(key);
			}

			el.setAttribute(key,value);
		},
		/*
		 * @描述 删除属性
		*/
		removeAttr(el,key){
			el.removeAttribute(key);
		}

	}

	/*
	 * @描述 元素显示
	 * @参数 obj 键值对集合
	 * @参数 obj.attr fade 淡入淡出
	 * @参数 obj.attr slide 滑入滑出
	*/
	const method = {}
	method.show = function(obj){
		var el = obj.el;
		var attr = obj.attr;//fade slide
		switch(attr){
			case 'fade':
				el.style.display = 'block'
				this.method.move({
					el : el,
					json:{
						opacity : 100
					}
				})
				break;
			case 'slide':
				this.method.move({
					el : el,
					json:{
						width : parseInt(el.width),
						height: parseInt(el.height)	
					}
				});
				
				break;
			case 'roll':
				el.style.display = 'block';
				this.method.move({
					el : el,
					json:{
						height:parseInt(el.height)
					}
				})
				
				break;
		}
		
	}
	/*
	 * @描述 元素隐藏
	 * @参数 obj 键值对集合
	*/
	method.hide = function(obj){
		var el = obj.el;
		var attr = obj.attr;
		
		switch(attr){
			case 'fade':
				hmd.method.move({
					el : el,
					json:{
						opacity:0
					},
					fn : function(){
						this.style.display = 'none'
					}
				})
				
				break;
			case 'slide':
				el.width = el.offsetWidth
				el.height = el.offsetHeight;
				this.method.move({
					el : el,
					json:{
						width:width,
						height:height
					}
				})
				
				break;
			case 'roll':
				el.width = el.offsetWidth
				el.height = el.offsetHeight
				this.method.move({
					el : el,
					json:{
						height:0
					},
					fn : function(){
						this.style.display = 'none'
					}
				})
				
		}
	}
	/*
	 * @描述 给元素上设置键值对
	*/
	method.data = function(el,key,value){
		if(!value){
			return el[key];
		}

		el[key] = value;
	}

	method.removeData = function(el,key){
		if(!el[key]){
			throw TypeError(`没有${key}`);
		}
		delete el[key];
	}

	Object.assign(query,method);

	/*
	 * @描述 基础方法存放处
	*/
	const basic = {
		each(arr,callback){
			for(var i=0;i<arr.length;i++){
				callback.call(arr,arr[i],i);
			}
		},
		extend(obj,...args){
			let element;
			for(let i=0;i<args.length;i++){
				element = args[i];
				for(let index in element){
					obj[index] = element[index];
				}
			}
		}
	}

	/*
	 * @描述 创建XMLHttpRequest
	 * @函数 getRequest
	 * @返回 XMLHttpRequest对象
	*/
	function getRequest(){
		var xmlHttp;
		if(window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
		}else{
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		
		return xmlHttp;
	}

	/*
	 * @描述 发送请求，接收数据
	*/
	function ajax(obj){
		var url = obj.url,
			method = obj.method || 'GET',
			param = obj.param || '',
			//async必须是字符串
			async = obj.async || true,
			callback = obj.callback || function(){};
		var xmlHttp = getRequest();
		xmlHttp.onreadystatechange = function(){
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
				if(xmlHttp.responseXML){
					callback(xmlHttp.responseXML);
					return;
				}
				callback(JSON.parse(xmlHttp.responseText));
			}
		}
		
		xmlHttp.open(method,url,eval(async));
		if(method === 'POST'){
			xmlHttp.setRequestHeader ("content-type", "application/x-www-form-urlencoded" )		
		}
		xmlHttp.send(param);
	}

	hmd.ajax = ajax;
	/*
	 * @描述 存放cookie的地方
	*/
	hmd.cookie = {};

	/*
	 * @描述 设置cookie
	 * @函数 cookie.set
	 * @参数
	*/
	hmd.cookie.set = function(key,value,day){
		day = day || 1;
		var date = new Date();
		var expires;
		date.setTime(date.getTime()+day*24*60*60*1000);
		expires = 'expires='+date.toGMTString();
		document.cookie=key+'='+value+';'+expires+';path=/';
	}
	/*
	 * @描述 获取cookie
	 * @函数 cookie.get
	 * @参数 key
	*/
	hmd.cookie.get = function(key){
		var cookie = document.cookie;
		var arr = cookie.split(';');
		var obj = {};
		var element;
		for(var i=0;i<arr.length;i++){
			element=arr[i].split('=');
			obj[element[0]] = element[1];
		}
		return obj[key] ? obj[key] : obj[' '+key];
	}
	/*
	 * @描述 删除cookie
	 * @函数 cookie.remove
	 * @参数 key 键
	*/
	hmd.cookie.remove = function(key){
		cookie.set(key,cookie.get(key),-1);
	}

	/*
  	 * @描述 将所有的方法放到此处
	*/
	hmd.method = {};
	/*
	 * @描述 所有的接口存放处
	*/
	hmd.service = {};

	Object.assign(hmd,query,basic);

	global.hmd = hmd;

}(this));
/*
 * @描述 完美运动方法
*/
(function(){
	const move = (function(){
		function getStyle(obj, attr){  
		      if(obj.currentStyle)    {  
		          return obj.currentStyle[attr]; //for ie 
		     }else{  
		         return getComputedStyle(obj, false)[attr];  // for ff
		     }  
		 }

		return function(args){
			const obj = args.el;
			const json = args.json || {};
			const fn = args.fn;
			const speed = args.speed || 8;
			const delay = args.delay || 30;

			//停止上一次定时器  
     		clearInterval(obj.timer); //关闭前一个定时器，解决对同个对象同时调用多个Move()时，定时器叠加问题。使用obj.timer给每个调用Move()的对象赋予各自的定时器，防止多个对象同时调用Move()时，同用一个定时器，而导致相关干扰问题。 
     		//保存每一个物体运动的定时器  
     		obj.timer = setInterval(function(){  
         	//判断同时运动标志  
         	var bStop = true;  
	         for(var attr in json){    
	             //取当前值    
	             var iCur = 0;  //创建一个变量，用于存储 attr属性每时每刻的值
	             if(attr == 'opacity'){  
	              //针对在FF中opacity属性值为浮点数值问题，将属性值 四舍五入、转换成浮点型。乘以100，使opacity属性值与IE统一为百分数
	                 iCur = Math.round(parseFloat(getStyle(obj, attr))*100);  
	             }else{  
	                 iCur = parseInt(getStyle(obj,attr)); //将除opacity外的属性(width/fontSize/MarginLeft等)的初始值 转换为整型 
	             }  
	             //计算速度  
	             var iSpeed = (json[attr] - iCur) / speed;  //创建 递减的速度speed变量。实现属性值的变速改变
	             iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);  //取整，解决浏览器忽略小于1px的数值 导致运动结束时，离目标值Itarget少几个像素的问题
	             //检测同时到达标志  
	             if(iCur != json[attr]){  
	                 bStop = false;  
	             }     
	             //更改属性，获取动画效果  
	             if(attr=='opacity'){  
	                 iCur += iSpeed  
	                 obj.style.filter='alpha(opacity:' + iCur + ')';  
	                 obj.style.opacity=iCur / 100;  
	             }  
	             else{  
	                 obj.style[attr]=iCur+iSpeed+'px';  
	             }  
	         }  
	         //检测停止  
	         if(bStop){  
	             clearInterval(obj.timer);  
	             if(fn) fn.call(obj);  
	         }  
	     },delay) 
		}
	}());

	hmd.method.move = move;
}());