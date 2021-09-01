   // console.log()
   // alert()
   // document.write()
   // prompt('')   可定义输入
   // document.getElementById("")    选中id
   // document.querySelectorAll("") 选中所有元素
   // document.querySelector("")    选中元素的第一个
   


   function seckill(){

   	   function zero(n){
	      return n<10?"0"+n:n
	   }
      
	   	var cc=document.getElementById("session"),
	       js=document.getElementById("djs");
	   function djs(){
	      var now=new Date(),
	       sz=now.getHours(),    
	       tm= sz%2==0?sz:sz-1,  //创建创建专场开始点
	       zc=zero(tm)+":00 场";    //拼接字符，为文档输出做准备

	      var will=new Date();   //创建一个专场的结束点
	       will.setHours(tm+2,0,0,0)   //结束点为开始点的2小时后
	       // will.setMinutes(0)    //分钟改为0，为整点时刻
	       // will.setSeconds(0)    //秒钟改为0，为整点时刻

	      var time=parseInt((will-now)/1000),   //获取时间差
	       s=parseInt(time/3600),               //转换为小时差
	       f=parseInt(time%3600/60),            //转换为分钟差
	       m=time%60,                           //转换为秒钟差
	       zzqg=document.getElementById("zzqg");                           
	      cc.innerHTML=zc                       //输出专场点
	      zzqg.innerText=zc+"-正在抢购"
	      js.innerHTML="<dd>"+zero(s)+"</dd><dd>:</dd><dd>"+zero(f)+"</dd><dd>:</dd><dd>"+zero(m)+"</dd>"
	   }
	   djs()
   }
   seckill()
   setInterval(seckill,1000)


   

   	   ajax({
   	   	url:'./json/lenovo.json',
        callback:function(msg){
        	var arr=msg.data
        	var main=document.querySelector("#main")
		   for(var i=0;i<arr.length;i++){
		   	main.innerHTML+=`<div class="floor">
						        <div class="con-box">
						           <div class="Top clearfix">
						              <p class="tie"></p>
						              <div class="tle"></div>
						           </div>
						           <dl class="con clearfix">
						              <dt><a href="#"></a><img></dt>
						           </dl>
						        </div>
						     </div>`
		   }

		   var tie=document.querySelectorAll(".floor .tie"),
		       tle=document.querySelectorAll(".floor .tle"),
		       con=document.querySelectorAll(".floor .con"),
		       img=document.querySelectorAll(".floor .con>dt>img");

		   for(var i=0;i<arr.length;i++){
		      tie[i].innerText=arr[i].tie
		      var Right=arr[i].tle

		      if(Right.length!=0){
		      	for(var s=0;s<Right.length;s++){
		      		if(Right[s]=="更多"){
		      			tle[i].innerHTML+=`<a class="more" href="#">
		      			                      ${Right[s]}
		      			                      <img src="img/main/floor/more1.png">
		      			                      <img class="hover" src="img/main/floor/more2.png">
		      			                   </a>`
		      		}else{
		      			tle[i].innerHTML+=`<a href="#">${Right[s]}</a>`
		      		}
		      		
		      	}
		      }
		      
		      var conBox=arr[i].con
		      img[i].src="img/main/floor/img"+(i+1)+".jpg"
		      for(var y=0;y<conBox.length;y++){
		      	con[i].innerHTML+=`<dd fs="${i}" ds="${y}" >
		      	                      <a href="#">
		      	                         <i></i>
		      	                         <img src="img/main/floor/${(i+1)+"-"+(y+1)}.jpg">
		      	                      </a>
		      	                      <b><a href="#">${conBox[y].name}</a></b>
		      	                      <p><a href="#">${conBox[y].carry}</a></p>
		      	                      <a class="price" href="#">￥ <span> ${conBox[y].price}</span></a>
		      	                      <span class="mark">${conBox[y].mark}</span>
		      	                   </dd>`
		      }
		   }
          
		   
		   var mark=main.querySelectorAll(".mark")
		   for(var i=0;i<mark.length;i++){
		   	if(mark[i].innerText=="新品"){
		       mark[i].style.background="#7fc8ff"
		   	}
		   	if(mark[i].innerText=="爆款"){
		       mark[i].style.background="#FE3939"
		   	}
		   	if(mark[i].innerText=="热卖"||mark[i].innerText=="直降"){
		       mark[i].style.background="#FB6540"
		   	}
		   }

		   for(var i=0;i<con.length;i++){
		   	var dd=con[i].querySelectorAll("dd")
		   	if(dd.length==9){
		   		dd[7].className="min"
		   		dd[8].className="min"
		   	}
           }

           con[7].classList.add("teli")
           con[5].classList.add("teli")

           function skip(){
	           var ds=$('.floor .con>dd')
	           for(var i=0;i<ds.length;i++){
	           	ds[i].onclick=function(){
	           		window.open('details.html?'+this.getAttribute('fs')+"&"+this.getAttribute('ds'),'_black')
	           	}
	           }
	        }
	        skip()
        }
   	   })






		   



   





   

 