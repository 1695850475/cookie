var tf=""
window.onscroll = function() {
        
        var nav=document.querySelector("#nav")
        var logo=document.querySelector("#logo")
        var Right=nav.querySelector(".Right")
        var Left=nav.querySelector(".Left")
        var UE=document.getElementById('UE')
        var logoIcon=document.getElementById('logo-icon')
        var scrollT =document.documentElement.scrollTop || document.body.scrollTop;
        var search=UE.children[0]
        
        if(scrollT>50){       //吸顶
           nav.style.cssText="position:fixed;top:0;left:0;z-index:99;height:50px;"
           Right.style.display="none"
           Left.style.cssText="line-height:50px"
           nav.querySelector(".con-box").appendChild(UE)
           nav.appendChild(logoIcon)
           search.className="search"
           search.style.left="-60px"
        }else{
           Right.style.display="block"
           nav.style.cssText="position:relative;height:70px;"
           Left.style.cssText="line-height:70px"
           logo.querySelector(".con-box").appendChild(UE)
           search.className=""
           logo.parentNode.appendChild(logoIcon)
        }

        
        var searchBox=document.getElementById('search-box')
        search.onclick=function(){
           tf="1"
           searchBox.style.display="block"
           nav.children[0].style.display="none"
           var tj=search.cloneNode(true)
           setTimeout(function(){tj.style.cssText="right:880px;transition:0.5s;"},100)
           searchBox.appendChild(tj)

        }
        
        var close=document.querySelector(".close")
        
        close.onclick=function(){
           tf=""
           searchBox.style.display="none"
           nav.children[0].style.display="block"
           searchBox.removeChild(searchBox.lastElementChild)
        }
        tf?close.click():null

        
        var floor=document.querySelector(".floor-model")
        var dd=floor.querySelectorAll("dd");
        var sidebar=document.querySelector(".sidebar")
        if(scrollT>560){         //出现模型
           sidebar.style.display="block"
           floor.style.display="block"
           dd[0].children[1].onclick=function(){
                  scrollAnimate(580)
           }
           if(scrollT<=920){
          	    dd[0].children[0].className="onspan"
        		    dd[0].children[1].className="ona"
          }else{
                dd[0].children[1].className=""
        		    dd[0].children[0].className=""
          }
        }else{
          sidebar.style.display="none"
          floor.style.display="none"

        }

        
        for(var i=1;i<dd.length;i++){   //模型跟随
        	var n=920;
        	if(scrollT>(n+=(i-1)*645)&&scrollT<=(n+645)){
        		dd[i].children[0].className="onspan"
        		dd[i].children[1].className="ona"
        	}else{
        		dd[i].children[1].className=""
        		dd[i].children[0].className=""
        	}
          dd[i].children[1].xb=n+1
          dd[i].children[1].onclick=function(){
            var target=this.xb
            scrollAnimate(target)
          }
        }


       var toTop=document.getElementById("toTop")
       toTop.onclick=function(){scrollAnimate(0)}


       //滚轮动画
       function scrollAnimate(top){
         var cz=(top-scrollT)/100
         if(cz!=0){
          var tt=setInterval(function(){
            window.scrollTo(0,scrollT+=cz)
          },4)

          setTimeout(function(){
            clearInterval(tt)
            scrollT==top?null:window.scrollTo(0,top)
          },400)

         }
        
       }


       // var login=document.getElementById("login")
       // login.style.top=scrollT+"px"
   }

   













   


 