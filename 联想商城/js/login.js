
function hq(a,b){
   return a.querySelector(b)
}
function logincz(){
	var register=document.querySelector("#UE #register")
	var login=document.getElementById("login")
	var close=hq(login,".close")
	var auto=document.querySelector("#auto-login")

    auto.onclick=function(){
    	this.checked?loginBtn.click():null
    }


	close.onclick=function(){   //隐藏登陆界面
		login.style.display="none"
		refreshBtn.click()
		
	}

	register.onclick=function(){  //显示登陆界面
		auto.checked?loginBtn.click():null
		login.style.display="block"
	}

    var tt=null,kg="1";
	var refresh=hq(login,".refresh")
	var refreshBtn=hq(refresh,"a")
	var Eswitch=document.querySelector("#Ewm>.switch")
	var Tswitch=document.querySelector("#Tologin>.switch")
    refreshBtn.onclick=function(){   //二维码刷新
       clearTimeout(tt)
       refresh.style.display="none"
       tt=setTimeout(function(){refresh.style.display="block"},30000)
    }
	Eswitch.onclick=function(){      //手机扫码登陆
		this.parentNode.style.display="none"
		Tswitch.parentNode.style.display="block"
        refreshBtn.click()
	}

	Tswitch.onclick=function(){     //账号电脑登陆
		this.parentNode.style.display="none"
		Eswitch.parentNode.style.display="block"
		tt=setTimeout(function(){refresh.style.display="block"},30000)
	}



	var cut=hq(login,".cut")
	var Tel=hq(login,".Tel")
	var mail=hq(login,".mail")
	var tf=""
	var mistake1=document.querySelectorAll(".mistake")[0]
    var mistake2=document.querySelectorAll(".mistake")[1]
	var cause1=hq(mistake1,"span")
    var cause2=hq(mistake2,"span")
	cut.onclick=function(){   //电脑账号登录方式
	   if(tf){
	   	  tf=""
	   	  this.innerText="用户名密码登录"
	      Tel.style.display="block"
	      mail.style.display="none"
	   }else{
	   	  tf="1"
	   	  this.innerText="手机验证码快捷登录"
	      mail.style.display="block"
	      Tel.style.display="none"
	   }

	   for(var n=0;n<inp.length;n++){
    			inp[n].classList.remove("on")
    			inp[n].classList.remove("red")
    			inp[n].value=""
    			var b=hq(inp[n].parentNode,"b")
    			b?b.style.display="none":null
    	}
    	mistake1.style.display="none"
    	mistake2.style.display="none"
	}


	var inp=login.querySelectorAll("#Tologin>div>div>input")  
    for(var i=0;i<inp.length;i++){       //输入选中效果
    	inp[i].onclick=function(){
    		for(var n=0;n<inp.length;n++){
    			inp[n].classList.remove("on")
    		}
    		this.classList.add("on")
    	}

    	inp[i].onkeydown = function(event){
           var b=hq(this.parentNode,"b")
           if(this.value&&b){
           	b.style.display="block"
           	b.classList.remove("del")
           	if(this.value.length==1){
           		b.style.display="none"
           	}
           }else{
           	 b?b.style.display="none":null
           }

    	   for(var n=0;n<inp.length;n++){
    			inp[n].classList.remove("red")
    	   }

    	   mistake1.style.display="none"
    	   mistake2.style.display="none"
        }

    }

    hq(Tel,"b").onclick=function(){
        this.style.display="none"
        hq(this.parentNode,".lock").value=""
        hq(this.parentNode,".lock").classList.remove("red")

    }

    hq(mail,"b").onclick=function(){
    	this.style.display="none"
    	hq(this.parentNode,".lock").value=""
    	hq(this.parentNode,".lock").classList.remove("red")

    }


	var loginBtn=hq(login,".login-btn>button")
	var user=document.querySelector("#UE .user")
    var userinfo=document.querySelector("#UE .userinfo")
    var quit=hq(userinfo,".quit")

    quit.onclick=function(){
    	userinfo.style.display="none"
        user.style.display="block"
    }
    loginBtn.onclick=function(){
         
        arr=[
              {
              	"syq":"13115947237",
              	"yq":"20020718xtf"
              }
            ]

    	if(cut.innerText=="用户名密码登录"){
    		var zh=hq(Tel,".lock").value
    		var mm=hq(Tel,".key").value
    		if(isNaN(zh)||zh==""||zh.length!=11){
    			mistake1.style.display="block"
    			cause1.innerText="手机号码格式不正确"
    			hq(Tel,".lock").classList.add("red")
    			hq(Tel,"b").classList.add("del")
    		}else{
    		   if(mm==""){
    			mistake1.style.display="block"
    			cause1.innerText="验证码不能为空"
    			hq(Tel,".key").classList.add("red")
    		   }
    		}
    		
    		
    	}else{
    		var zh=hq(mail,".lock").value
    		var mm=hq(mail,".key").value
    		if(isNaN(zh)||zh==""||zh.length!=11){
    			mistake2.style.display="block"
    			cause2.innerText="用户名不正确"
    			hq(mail,".lock").classList.add("red")
    			hq(mail,"b").classList.add("del")
    		}else{
    			if(mm==""){
    			mistake2.style.display="block"
    			cause2.innerText="密码不能为空"
    			hq(mail,".key").classList.add("red")
    		   }else{
    		   	   var i=0;
    		   	   while(i<arr.length){
                      var syq=arr[i].syq
                      var yq=arr[i].yq
                      if(syq==zh&&yq==mm){
                         loginBtn.innerText="正在登录 请稍等..."
                         setTimeout(function(){
                         	login.style.display="none"
                         	loginBtn.innerText="登录"
                            user.style.display="none"
                            userinfo.style.display="block"
                         },3000)
                         
                         break;
                      }
                      i++
    		   	   }
    		   }
    		}
    		
    	}


    }



}

logincz()
