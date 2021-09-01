 function $(a,b){    //获取元素对象
      var c=null
      var el=b||document
      c=el.querySelectorAll(a)
      c.length>1?c:c=c[0]
      return c
}
   function cj(a,b){  //创建
      var cj=document.createElement(a)
      b?cj.className=b:null
      return cj
   }

   function tj(){  //添加
      var a=arguments[0]
      for(var i=1;i<arguments.length;i++){
        a.appendChild(arguments[i])
      }
      return a
   }

   function getStyle(a,b){  //获取元素属性
      return (a.currentStyle||getComputedStyle(a, null))[b];
   }
   
   function scrollT(){   //滚轮距顶
      return (document.documentElement||document.body).scrollTop;
   }


    //原生 js滚动条动画
    function scrollAnimate(a,b){
       var T=scrollT()
       var cz=(b-T)/100
       if(cz!=0){
        var tt=setInterval(function(){
          a.scrollTo(0,T+=cz)
        },4)

        setTimeout(function(){
          clearInterval(tt)
          T==b?null:a.scrollTo(0,b)
        },400)

       }
      
    }
   

   function pars(a,n){ //获取从自身向上数，第n层的父级
      var y;
      for(var i=0;i<n;i++){
         y=a
         a=y.parentNode
      }
    return a
   }

   function bddz(a,b){
     a.value=a.value*1+b
   }

   function bddj(a,b){
     a.value=a.value*1+b
   }

/*
 * @方法 each
 * @描述 数组循环并执行自定义函数
 * @参数 arr 数组(包含类数组)
 * @参数 callback 回调函数
 * @返回 没有返回
 * @示例 each([1,2,3],function(el,index){
    console.log(el,index)
    //el代表元素，index代表下标
  })
*/
function each(arr,callback){
  for(var i=0;i<arr.length;i++){
    callback(arr[i],i);
  }
}
/*
 * @方法 makeListToArray
 * @描述 将集合转换成数组
 * @参数 list 集合
 * @返回 将转换的数组返回
*/
function makeListToArray(list){
  var arr = [];
  for(var i=0;i<list.length;i++){
    arr.push(list[i]);
  }
  return arr;
}
/*
 * @方法 extend
 * @描述 将多个对象参数复制到一个对象中
 * @参数 第一个参数是目标对象，其它所有的对象都复制到这个对象中
 * @示例 extend({},{name:123},{age:21});
*/
function extend(){
  //arguments 所有的参数集合
  var arr = makeListToArray(arguments);
  var obj = arr.shift();
  var element;
  for(var i=0;i<arr.length;i++){
    element = arr[i];
    for(var index in element){
      obj[index] = element[index];
    }
  }

  return obj;
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


   //自查数据
   //jn:josn数据
   //a:oneID
   //b:towID
   //c:threeID
   function zcsj(jn,a,b,c){
      var arr,arr1=[],arr2=[];
      if(a){
         for(var i=0;i<jn.length;i++){
            if(jn[i].oneID==a){
               arr1.push(jn[i])
            }
         }
         arr=arr1
         if(b){
            for(var i=0;i<arr1.length;i++){
               if(arr1[i].twoID==b){
                  arr2.push(arr1[i])
               }
            }
            arr=arr2
            if(c){
               for(var i=0;i<arr2.length;i++){
                  if(arr2[i].threeID==c){
                     arr=arr2[i]
                  }
               }
            }
         }
      }
      return arr
   }
   /*
 * @描述 加载页面
 * @函数 load
 * @参数 obj 里面包括obj.el 元素对象
 * @参数 obj.url 地址
 * @示例 load({
   el : $('#id'),
   url : '地址'
 });
*/
function load(obj){
  var el = obj.el;
  var url = obj.url;
  var xmlHttp = getRequest();
  xmlHttp.onreadystatechange = function(){
    
    if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
      
      el.innerHTML = xmlHttp.responseText;
    }
  }
  
  xmlHttp.open('GET',url,true);
  xmlHttp.send();
}
  
   //设置Cookie
   function getCookie(key){
       var cookie=document.cookie
       var arr=cookie.split("&")
       var element;
       var obj={}
       for(var i=0;i<arr.length;i++){
          element=arr[i].split("=")
          obj[element[0]]=element[1]
       }
       return obj[key]
    }
    
    //获取Cookie
    function setCookie(key,value,day){
      var date=new Date()
      var expires;
      date.setTime(date.getTime()+day*24*60*60*1000)
      expires='expires='+date.toGMTString()
      document.cookie=key+"="+value+";"+expires+";path=/"
    }
    
    //删除Cookie
    function removeCookie(key){
      setCookie(key,getCookie(key),-1)
    }

    var cookie = {};
    /*
     * @描述 设置cookie
     * @函数 cookie.set
     * @参数
    */
    cookie.set = function(key,value,day){
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
    cookie.get = function(key){
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
    cookie.remove = function(key){
      cookie.set(key,cookie.get(key),-1);
    }