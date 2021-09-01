   // console.log()
   // alert()
   // document.write()
   // prompt('')   可定义输入
   // document.getElementById("")    选中id
   // document.querySelectorAll("") 选中所有元素
   // document.querySelector("")    选中元素的第一个
   function cj(a){
      return document.createElement(a)
   }
   function footermid(){
	   	var arr=[
		            ["购物指南","服务商信息","购买流程","注册登录","商品评价"],
		            ["配送方式","配送方式","配送方式信息","签收原则","物流查询"],
		            ["支付方式","分期支付","支付方式","支付问题"],
		            ["订单信息","订单信息","发票信息","手机激活查询"],
		            ["售后服务","售后服务总则","24小时在线客服","联想服务入口","热门解决方案","Lenovo Quick Fix工具"],
		            ["其他说明","服务承诺","账户安全","手机产品购买须知","环境信息"]
	           ]
	   var ul=document.querySelector("#footer>.Middle>ul")

	   for(var i=0;i<arr.length;i++){
	   	var li=cj("li")
	   	for(var n=0;n<arr[i].length;n++){
	       li.innerHTML+=`<a href=# >${arr[i][n]}</a>`
	   	}
	   	ul.appendChild(li)
	   	
	   }
   }
   footermid()
   


 