
function recommend(){
	var arr=[
         [
          {"nm":"联想智能体脂秤X2 故宫文创联名","price":"￥299"},
          {"nm":"网课小新15 2020锐龙版 15.6英寸全面屏高性能轻薄笔记本电脑银色","price":"￥4599"},
          {"nm":"拯救者铝合金散热支架 Z2 陨石灰","price":"￥129"},
          {"nm":"ThinkPad 小黑双模鼠标 午夜黑","price":"￥149"}
         ],
         [
          {"nm":"thinkplus 便携适配器 65W","price":"￥149"},
          {"nm":"ThinkPad T14 2021 酷睿版 英特尔酷睿i7 硬核专业办公本 5VCD","price":"￥11499"},
          {"nm":"摩托罗拉 motorola edge s 8GB+128GB 先锋版 远岱寒烟","price":"￥2199"},
          {"nm":"联想平板小新Pad Plus 11英寸 影音娱乐办公学习平板电脑 凝玉白","price":"￥1999"}
         ],
         [
          {"nm":"联想都市简约双肩包B1801 （送电脑远程调修服务）","price":"￥79"},
          {"nm":"thinkplus 口红电源 黑 USB-C 65W","price":"￥169"},
          {"nm":"thinkplus 都市流行双肩包 玄武黑","price":"￥399"},
          {"nm":"联想无线静音鼠标N911 Pro 黑色（送电脑远程调修服务）","price":"￥99"}
         ]
        ]

		var con=hq(document,".recommend .con>div")
		for(var i=0;i<arr.length;i++){
			var ul=cj("ul")
			for(var n=0;n<arr[i].length;n++){
		       var xx=arr[i][n]
		       ul.innerHTML+=`<li>
							     <a href="#">
							        <img src="img/main/recommend/${(i+1)+'-'+(n+1)}.jpg" alt="">
							     </a>
							     <p>${xx.nm}</p>
							     <b>${xx.price}</b>
							  </li>`
			}
			con.appendChild(ul)
		}

       
		var next=hq(document,".recommend .next")
		var prev=hq(document,".recommend .prev")
		var ul=hqs(document,".recommend ul")
		var index=0
		clm=["syg","now","xyg"]
		tab()
		next.onclick=function(){
			con.appendChild(con.children[0])
			// clm.push(clm.splice(0,1)[0])
			tab()
			
		}

		prev.onclick=function(){
			con.insertBefore(con.children[2],con.children[0])
			// clm.unshift(clm.splice(clm.length-1,1)[0])
			tab()
			
		}

		
		function tab(){
			for(var i=0;i<clm.length;i++){
				con.children[i].className=clm[i]
		    }
		}
		// function tab(){
		// 	for(var i=0;i<ul.length;i++){
		// 	   ul[i].style.display="none"
		//     }
		//     ul[index].style.display="block"
		// }

		// ul[0].style.display="block"
}
recommend()


function gmsp(){
	var arr=[]
	var shp=document.cookie.split(";")
	shp=shp.map(a=>a.split(/(&|=)/).filter(a=>a!="="&&a!="&"))
	if(shp){
		ajax({
			url:"./json/lenovo.json",
				async:'false',
			callback:function(msg){
			   var outer=msg.data
			   for(var i=0;i<shp.length;i++){
			   	 var fs=shp[i][0]*1
		         var ds=shp[i][1]*1
		         var num=shp[i][2]*1
                 let {name,price}=outer[fs].con[ds]
                 console.log(name,price)
                 arr.push({name,price,num,fs,ds})
			   }
			   console.log(arr)
	           
			}
	    })
	}
	

	
	
	var car=hq(document,"#Total-operating .car-con")
	for(var i=0;i<arr.length;i++){
		car.innerHTML+=`<dd shp="${arr[i].fs+"&"+arr[i].ds}">
			                  <div>
			                     <i class="t-check">✓</i>
			                  </div>
			                  <div>
			                     <a href="#">
			                        <img class="t-goods" src="img/main/floor/${arr[i].fs+1}-${arr[i].ds+1}.jpg" alt="">
			                     </a>
			                  </div>
			                  <div class="t-name"><h3>${arr[i].name}</h3></div>
			                  <div class="t-price">¥<span>${arr[i].price}</span></div>
			                  <div class="quantity-box">
			                     <input class="minus" type="button" value="-">
			                     <input class="t-quantity" type="text" value="${arr[i].num}">
			                     <input class="plus" type="button" value="+">
			                     <p class="xg">限购5件</p>
			                  </div>
			                  <div class="t-sum">¥<span>${arr[i].price}</span></div>
			                  <div>
			                     <button class="collect">移入收藏夹</button>
			                     <button class="delete">删除</button>
			                  </div>
			             </dd>`
	}
}
gmsp()






function jgld(){
   var Toop=hq(document,"#Total-operating")
   var payment=hq(document,"#payment")
   var Scheck=hqs(document,"#main .s-check")
   var Tcheck=hqs(Toop,".t-check")
   var Aquantity=hq(payment,".all-quantity")
   var Aprice=hq(payment,".all-price")
   var minus=hqs(Toop,".minus")
   var plus=hqs(Toop,".plus")
   var Tquantity=hqs(Toop,".t-quantity")
   //全部商品
   var car=hq(Toop,".car-con")
   function quantity(){
   		var sl=0
		var quantity=hq(document,".quantity")
		var zsl=hqs(Toop,".t-quantity")
		for(var i=0;i<zsl.length;i++){
			sl+=zsl[i].value*1
		}
		quantity.innerText=sl
   }
   quantity()
    //删除
   var del=hqs(car,".delete")
   for(var i=0;i<del.length;i++){
    	del[i].onclick=function(){
    		var username=pars(this,2).getAttribute('shp')
    		cookie.remove(username)
    		car.removeChild(pars(this,2))
    		quantity()
    		zfjq()
    	}
   }
   //刷新商品总数	
   function sum(a,b){
    	var Tsum=hq(pars(a,2),".t-sum>span")
    	var Tprice=hq(pars(a,2),".t-price>span")
    	Tsum.innerText=Tprice.innerText*b.value
   }
   //数量加减操作
   for(var i=0;i<minus.length;i++){
   	   minus[i].onclick=function(){
   	   	var zhi=this.nextElementSibling
   	   	zhi.value=zhi.value*1-1
   	   	hq(pars(this,1),".xg").style.display="none"
   	   	zhi.value<=1?zhi.value=1:null
   	   	sum(this,zhi)
   	   	quantity()
   	   	zfjq()
   	   	var username=pars(this,2).getAttribute('shp')
   	   	cookie.set(username,zhi.value,7)
   	   }

   	   plus[i].onclick=function(){
   	   	var zhi=this.previousElementSibling
   	   	zhi.value=zhi.value*1+1
   	   	if(zhi.value>=5){
   	   		zhi.value=5
   	   		hq(pars(this,1),".xg").style.display="block"
   	   	}
   	   	sum(this,zhi)
   	   	quantity()
   	   	zfjq()
   	   	var username=pars(this,2).getAttribute('shp')
   	   	cookie.set(username,zhi.value)
   	   }
   }
   //支付价钱
   function zfjq(){
   	var xz=hqs(car,".xz"),zj=0,zl=0;
   	console.log(xz)
   	for(var q=0;q<car.children.length;q++){
   		car.children[q].style.background="white"
   	}
   	for(var y=0;y<xz.length;y++){
   		var par=pars(xz[y],2)
   		zj+=hq(par,".t-sum>span").innerText*1
        zl+=hq(par,".t-quantity").value*1
        par.style.background="#FFF8F4"
   	}
   	Aprice.innerText="¥"+zj
   	Aquantity.innerText=zl

   }
   //选中商品的操作
   for(var i=0;i<Tcheck.length;i++){
	   	Tcheck[i].tf=""
	   	Tcheck[i].onclick=function(){
            
	   		if(this.tf){
	   		   this.tf=""
	   		   this.classList.remove("xz")
	   		}else{
	   		   this.tf="1"
	   		   this.classList.add("xz")
	   		}

	        var gs=hqs(car,".xz").length
	   		if(gs==Tcheck.length){
	           pars(Scheck[0],1).click()
	   		}else{
	   		   for(var s=0;s<Scheck.length;s++){
		   			pars(Scheck[s],1).tf=""
		   			Scheck[s].className="s-check"
	   		   }
	   		}
	   		zfjq()
	   	} 
   }
   //全选操作
   for(var i=0;i<Scheck.length;i++){
	   	this.tf=""
	   	
	   	pars(Scheck[i],1).onclick=function(){
	   		console.log(1)
	   		if(this.tf){
	   			this.tf=""
	   			hq(this,".s-check").className="s-check"
	            for(var n=0;n<Tcheck.length;n++){
	   			   Tcheck[n].className="t-check"
	   			   Tcheck[n].tf=""
	   		    }
	   		}else{
	   			this.tf="1"
	   			hq(this,".s-check").className="s-check xz"
	   			for(var n=0;n<Tcheck.length;n++){
	   			   Tcheck[n].className="t-check xz"
	   			   Tcheck[n].tf="1"
	   		    }
	   		}
            zfjq()
	   		for(var s=0;s<Scheck.length;s++){
	   			pars(Scheck[s],1).tf=this.tf
	   			hq(pars(Scheck[s],1),".s-check").className=hq(this,".s-check").className
	   		}
	   		
	   	}
   }

   var Adelete=hq(payment,".all-delete")
   Adelete.onclick=function(){
   	var xz=hqs(car,".xz")
   	for(var i=0;i<xz.length;i++){
       $('.delete',pars(xz[i],2)).onclick()
   	}
   	zfjq()
   	quantity()
   }
}
jgld()


 