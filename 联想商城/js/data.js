function detail(){
   var within,outer;
   var pointto=$('#pointto .con .text')
   var Dimg=$('#detail-img')
   ajax({
	   	url:"./json/lenovo.json",
			async:'false',
			callback:function(msg){
		       var tf=location.search.slice(1).split('&')
		       var fs=tf[0],ds=tf[1];
		       outer=msg.data[fs].con[ds]
		       pointto.innerText+=" "+outer.name
		       $('.name').innerText=outer.name
	           $('.carry').innerText=outer.carry
	           $('.price>b').innerHTML+=outer.price

            //购物车联动
            var buy_car=$('.buy_car')
            var inp=$('.buy_num input')
            buy_car.onclick=function(){
               cookie.set(fs+"&"+ds,inp.value,7)
               console.log(document.cookie)
            }
			}
   })
   
   ajax({
		url:"./json/details.json",
		async:'false',
		callback:function(msg){
	       var tf=location.search.slice(1).split('&')
	       var fs=tf[0],ds=tf[1];
	       within=msg.data[fs][ds]
	       var bh=$('.good_action>span')
	       bh.innerText+=" "+within.Product_ID
	       var arr=within.details_img.split(",")

	       var str=[]
	       for(var i=0;i<arr.length;i++){
              str.push(`
              	<div><img src=${arr[i]}></div>
              	`)
	       }
	       console.log(Dimg)
	       Dimg.innerHTML+=str.join("")
	       $('.evaluate_num>a').innerText=within.evaluate_num

		}
   })
   
   //活动部分
   function Activity(){
   	  var dl=$('.activity>ol')
   	  var arr=within.activity
   	  for(var i=0;i<arr.length;i++){
   	     dl.innerHTML+=`
                        <li>
                           <i ${arr[i].name?"":"class='none'"}>${arr[i].name}</i>
                           <span>${arr[i].text_con}</span>
                        </li>
   	                   `
   	  }

   }
   Activity()
   
   //服务
   function Serve(){
   	  var box=$('.serve')
   	  function getserve(){
   	  	var str=""
   	  	for(var i=0;i<arr.length;i++){
             str+=`<dd>${arr[i]}</dd>`
	      }
	      return str
   	  }
   	  
      
      //系统
      if(within.operating_system){
          var arr=within.operating_system.split(",")
          box.innerHTML+=`<dl class="system-configuration"><dt height="100%">操作系统</dt>${getserve()}</dl>`
      }
      
      //配置
      if(within.configuration){
          var arr=within.configuration.split(",")
          box.innerHTML+=`<dl class="system-configuration"><dt height="100%">选择配置</dt>${getserve()}</dl>`
      }

      //定制
      if(within.customization){
          var arr=within.customization.split(",")
          box.innerHTML+=`<dl class="customization"><dt>私人定制</dt>${getserve()}</dl>`
   	  }

   	  function getRepair(){
   	  	 var str=""
         for(var i=0;i<arr.length;i++){
         	str+=`<dd>
         	        <p>${arr[i][0].name}</p><span>￥${arr[i][0].price}</span><i></i>
         	        <ul>${
         		    function(){
         		    	var li=""
         		    	for(var n=0;n<arr[i].length;n++){
	                       li+=`<li>
	                          <label>
		                          <input type="checkbox">
		                          <span>${arr[i][n].name}</span>
		                          <b><i>￥</i>${arr[i][n].price}</b>
		                      </label>
	                          <a href="#">详情></a>
	                       </li>`
	         	        }
	         	        return li
         		    }()
                  }</ul></dd>`
         	
	    }
	    return str
   	  }
      
      //保修
      if(within.serve){
      	  var arr=within.serve
      	  box.innerHTML+=`<dl class="repair"><dt>选择服务</dt>${getRepair()}</dl>`
      }

      //分期
      if(within.installment){
         var insta=$('.installment')
         var div=$('div',insta)
         var arr=within.installment
         for(var i=0;i<arr.length;i++){
            for(var n=0;n<arr[i].length;n++){
               var inp=cj('input')
               inp.type='checkbox'
               var spa=cj('span')
               spa.innerText=arr[i][n].num
               var p=cj('p')
               p.innerText=arr[i][n].price
               tj(div[i],tj(cj('label'),inp,spa,p))
            }
         }
         tj(box,insta)
      }

   }
   Serve()

   //地址
   function Site(){
      var arr=[]
      ajax({
        url:'./json/site.json',
        async:"false",
        callback:function(msg){
           arr=msg.data
           console.log(arr)
        }
      })

      var box=$('.serve')
      var site=$('.site')
      var ul=$('.site-con>ul',site)
      var btn=$('.site-con>.top>button')
      var province=ul[0]
      var city=ul[1]
      var district=ul[2]
      var spa=$('.site>dd>span')
      for(var i=0;i<btn.length;i++){
        btn[i].tf=i
        btn[i].onclick=function(){
          $('.site-con>.top>button.on').className=""
          this.className="on"
          $('.site-con>ul.on').classList.remove("on")
          ul[this.tf].classList.add("on")
        }
      }
      function getProvince(){
         province.innerHTML=""
         for(var i=0;i<arr.length;i++){
             var li=cj('li')
             li.innerText=arr[i].province
             li.xb=i
             li.onclick=function(){
                if(this.innerText!=btn[0].innerText){
                  btn[0].innerText=this.innerText
                  btn[1].innerText=" 请选择"
                  btn[2].innerText=" 请选择"
                  btn[1].xb=this.xb
                  getCity(this.xb)
                  btn[1].onclick()
                }
                var larr=pars(this,1).children
                for(var y=0;y<larr.length;y++){
                  larr[y].classList.remove("on")
                }
                this.classList.add("on")
             }
             tj(province,li)
         }
      }
      getProvince()
      function getCity(index){
         city.innerHTML=""
         var Carr=arr[index].data
         for(var i=0;i<Carr.length;i++){
             var li=cj('li')
             li.innerText=Carr[i].city
             li.xb=i
             li.onclick=function(){
                if(this.innerText!=btn[1].innerText){
                  btn[1].innerText=this.innerText
                  btn[2].innerText=" 请选择"
                  btn[2].xb=this.xb
                  getDistrict(Carr,this.xb)
                  btn[2].onclick()
                }
                var larr=pars(this,1).children
                for(var y=0;y<larr.length;y++){
                  larr[y].classList.remove("on")
                }
                this.classList.add("on")
             }
             tj(city,li)
         }
      }
      function getDistrict(Carr,index){
        district.innerHTML=""
        var Darr=Carr[index].district.split(",")
        for(var i=0;i<Darr.length;i++){
             var li=cj('li')
             li.innerText=Darr[i]
             li.xb=i
             li.onclick=function(){
                btn[2].innerText=this.innerText
                for(var i=0;i<spa.length;i++){
                  spa[i].innerText=btn[i].innerText
                }
                var larr=pars(this,1).children
                for(var y=0;y<larr.length;y++){
                  larr[y].classList.remove("on")
                }
                this.classList.add("on")
             }
             tj(district,li)
         }
      }
      for(var i=0;i<ul.length;i++){
        ul[i].children[0].onclick()
      }
      tj(box,site)
                     
   }
   Site()
   
   //选择操作
   function Select(){
   	function _select1(dd){
   		for(var n=0;n<dd.length;n++){
           dd[n].onclick=function(){
              for(var y=0;y<dd.length;y++){
                 dd[y].classList.remove('on')
              }
              this.className='on'
           }
   		}
   	}
   	var arr=$('.system-configuration')
   	if(arr.length){
   		for(var i=0;i<arr.length;i++){
   		   _select1(arr[i].children)
   	    }
   	}else{
   		 _select1(arr.children)
   	}
    

    var arr=$('.repair>dd')
    function _select2(la){
    	if(la.length){
    		for(var n=0;n<la.length;n++){
	        	la[n].oninput=function(){
	        		if($('input',this).checked){
	        			$('p',pars(this,3)).innerText=$('span',this).innerText
	        			$('span',pars(this,3))[0].innerText=$('b',this).innerText
	        			for(var i=0;i<$('input',pars(this,3)).length;i++){
	        				$('input',pars(this,3))[i].checked=false
	        			}
	        			pars(this,3).classList.add("on")
	        			$('input',this).checked=true
	        		}else{
	        			pars(this,3).classList.remove("on")
	        			$('p',pars(this,3)).innerText=$('span',$('label',pars(this,2))[0]).innerText
	        			$('span',pars(this,3))[0].innerText=$('b',$('label',pars(this,2))[0]).innerText
	        		}
	        	}
	        }
    	}else{
    		la.oninput=function(){
    			if($('input',this).checked){
                   pars(this,3).classList.add("on")
    			}else{
                   pars(this,3).classList.remove("on")
    			}
    		}
    	}
   		
   	}
    if(arr.length){
    	for(var i=0;i<arr.length;i++){
    	   var la=$('label',arr[i])
    	   _select2(la)
    	}
    }else{
    	   var la=$('label',arr)
    	   _select2(la)
    }

     //分期选择
       var inp=$('.installment input')
       var dd=$('.installment dd')
       dd[2].onclick=function(){
        if(this.classList.contains('on')){
           this.className=""
        }else{
          for(var n=0;n<inp.length;n++){
                inp[n].checked=""
          }
          for(var y=0;y<dd.length;y++){
                  dd[y].className=""
          }
          this.className="on"
          $('span',dd[0])[0].innerText="选择分期"
          $('span',dd[1])[0].innerText="选择分期"
        }
        
       }
       for(var i=0;i<inp.length;i++){
        inp[i].oninput=function(){
           if(this.checked){
              for(var n=0;n<inp.length;n++){
                inp[n].checked=""
              }
              for(var y=0;y<dd.length;y++){
                dd[y].className=""
              }
              $('span',dd[0])[0].innerText="选择分期"
              $('span',dd[1])[0].innerText="选择分期"
              this.checked="1"
              $('span',pars(this,3))[0].innerText=$('span',pars(this,1)).innerText
              pars(this,3).className='on'
           }else{
              pars(this,3).className=''
              $('span',pars(this,3))[0].innerText=""
              $('span',dd[0])[0].innerText="选择分期"
              $('span',dd[1])[0].innerText="选择分期"
           }
        }
       }

       //地址
       
   }
   Select()

   //数量
   function BuyNum(){
      var plus=$('.buy_num button')[0]
      var subtract=$('.buy_num button')[1]
      var inp=$('.buy_num input')
      var hint=$('.buy_num_hint')
      plus.onclick=function(){
         if(inp.value<5){
            bddz(inp,1)
         }
         if(inp.value==5){
            hint.style.display="block"
            move(hint,{
              opacity:100
            },function(){
              move(this,{
                opacity:0
              },function(){
                hint.style.display="none"
              })
            })
         }
         
      }

      subtract.onclick=function(){
         if(inp.value>1){
           bddj(inp,1)
         }
         
      }





   }
   BuyNum()
   //放大镜部分
   function magnify(){
   	 var dl=$('.show>.con>dl')
   	 var next=$('.show>.next')
   	 var prev=$('.show>.prev')

   	 next.onclick=function(){
        move(dl,{left:-480})
   	 }

   	 prev.onclick=function(){
        move(dl,{left:0})
   	 }

   	 var arr=within.Img_list.split(",")
   	 for(var i=0;i<arr.length;i++){
   	    dl.innerHTML+=`<dd><img src="${arr[i]}"></dd>`
   	 }

   	 var dd=$('dd',dl)
   	 console.log(dd)
   	 function tab(index){
   	 	for(var i=0;i<dd.length;i++){
   	 	   dd[i].classList.remove('on')
   	 	}
   	 	
   	 	prev.style.color=index==0?"#e4e4e4":"#A5A5A5"
   	 	next.style.color=index==dd.length-1?"#e4e4e4":"#A5A5A5"
 

   	 	dd[index].className="on"
   	 	$('.ISshow>img').src=$('.big>img').src=$('img',dd[index]).src

   	 }
   	 var ISshow=$('.ISshow')
   	 var big=$('.big')
   	 var zz=$('.zz')
   	 var box=$('#main-T>.con-box')
   	 console.log(box)
   	 ISshow.onmouseenter=function(){
   	 	big.style.display="block"
   	 	zz.style.display="block"
        ISshow.onmousemove=function(e){
           var ev=e||window.event
           var X=ev.pageX-box.offsetLeft-zz.clientWidth/2
           var Y=ev.pageY-box.offsetTop-zz.clientHeight/2
           var maxX=ISshow.clientWidth-zz.clientWidth
           var maxY=ISshow.clientHeight-zz.clientHeight
           X<0?X=0:X>maxX?X=maxX:null
           Y<0?Y=0:Y>maxY?Y=maxY:null
           zz.style.left=X+"px"
           zz.style.top=Y+"px"
           var bl= big.clientHeight/zz.clientHeight
           $('img',big).style.cssText="left:-"+bl*X+"px;"+
                                      "top:-"+bl*Y+"px;"+
                                      "width:"+bl*ISshow.clientWidth+"px;"+
                                      "height:"+bl*ISshow.clientHeight+"px;"
        }
        ISshow.onmouseleave=function(){
           ISshow.onmousemove=null
           zz.style.display="none"
           big.style.display="none"
        }
   	 }

   	 for(var i=0;i<dd.length;i++){
   	 	dd[i].xb=i
   	 	dd[i].onmouseenter=function(){
           tab(this.xb)
   	 	}
   	 }
   	 dd[0].onmouseenter()
   	 
   }
   magnify()


}
detail()
