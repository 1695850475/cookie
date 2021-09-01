   // console.log()
   // alert()
   // document.write()
   // prompt('')   可定义输入
   // document.getElementById("")    选中id
   // document.querySelectorAll("") 选中所有元素
   // document.querySelector("")    选中元素的第一个


   function lbtzcz(){
         var lbtb=document.querySelector("#slideshow-box")
         var lbt=document.querySelector(".slideshow")
         var lbl=document.querySelectorAll(".slideshow>li")
         var icon=lbt.querySelectorAll("a>img")
         lbl[0].style.display="block"
         for(var i=0;i<icon.length-1;i++){
            icon[i].src="img/banner/slideshow"+(i+1)+".jpg"
         }


         var Maxdex=lbl.length-1
         var index=0,tt=null,zw=lbtb.clientWidth;
         var prev=document.querySelector(".prev")
         var next=document.querySelector(".next")
         var yd=document.querySelectorAll(".yd>dd")
         

          //下一张
          next.onclick=function(){
             index++
             if(index>10){
              lbt.style.left=0
              index=1
             }
             tab()
          }

          //上一张
          prev.onclick=function(){
             index--
             if(index<0){
              lbt.style.left=-10*zw+"px"
              index=9
             }
             tab()
          }

          tt=setInterval(function(){
             next.onclick()
          },3000)

          //对切换轮播的操作
          function tab(){
            //关闭切换轮播时正在进行的定时器
            clearInterval(tt)
            //清除默认样式
            for(var i=0;i<yd.length;i++){
              yd[i].style.background="rgba(0,0,0,0.1)"
            }
            //因为原点的个数与轮播图的数量不一致
            //故需要进行判断之后给对应的原点加 选中样式 类名
            var tf=index>9?0:index
            yd[tf].style.background="rgb(0, 122, 255)"

            //运动
            move(lbt,{
              left:-index*zw
             },function(){
              //位移完成后重新打开轮播定时器
              tt=setInterval(function(){ next.onclick() },3000)
             })
          }


         for(var i=0;i<yd.length;i++){
            yd[i].xb=i
            yd[i].onmouseover=function(){
               if(index==lbl.length-1){
                lbt.style.left=0
               }
               index=this.xb
               tab()
            }
         }


         lbtb.onmouseover=function(){
            next.style.display="block"
            prev.style.display="block"
         }
         lbtb.onmouseout=function(){
            next.style.display="none"
            prev.style.display="none"
         }
        
         //拖拽
         (function(){
          lbtb.onmousedown=function(e){
            var ev=e||window.event
            clearInterval(tt)
            ev.preventDefault()
            //关闭可能正在执行的运动函数定时器
            clearInterval(lbt.timer)
            //存储按下时的鼠标水平坐标
            //（做为本次拖拽当中水平初始值）
            var initialX=ev.pageX
            //存储按下时轮播图水平距（）
            //（做为本次拖拽当中ul的left初始值）
            var initialL=lbt.offsetLeft
              window.onmousemove=function(e){
                 clearInterval(tt)
                 var ev=e||window.event
                 ev.preventDefault()
                 //计算每次移动时水平坐标与初始值的差
                 var X=ev.pageX-initialX
                 //将初始水平距加上差值重新赋值给轮播图
                 lbt.style.left=initialL+X+"px"
                 
                 //对于头尾衔接处的无缝效果
                 //需要单独重设ul的left初始值与index值
                 if(lbt.offsetLeft>0){
                  index=Maxdex
                  lbt.style.left=(initialL=-index*zw)+"px"
                 }else if(lbt.offsetLeft<-Maxdex*zw){
                  index=0
                  lbt.style.left=initialL=0
                 }
              }

              window.onmouseup=function(e){
                var ev=e||window.event
                ev.preventDefault()
                window.onmousemove=null
                //计算松开与点击时坐标的水平距离（拖拽距离）
                var jl=ev.pageX-initialX
                //判断距离是否超过显示区域的4分之1
                if(Math.abs(jl)>zw/4){
                //若是向右拖拽就进行上一张操作
                //若为向左拖拽就进行下一张操作
                  jl>0?prev.onclick():next.onclick()
                }else{
                  //若没有，则回到当前index对应的轮播图
                  tab()
                }
              }
          }
         }())
   }

   lbtzcz()

   function cj(a){
      return document.createElement(a)
   }


   function erjidy(){
         var arr=[
                  [
                   {"tle":"游戏本","con":["拯救者Y7000","拯救者Y7000P","拯救者R7000P","拯救者R7000","拯救者Y9000K","拯救者R9000X","IP选件","拯救者R9000P"]},
                   {"tle":"轻薄本","con":["小新 Pro 16","小新Air 15","小新Air 14","小新Pro14","小新Pro 13","Y9000X"]},
                   {"tle":"便携本","con":["YOGA 5G","YOGA 14s","YOGA Pro 14C"]},
                   {"tle":"常规本","con":["IdeaPad 14M 4G/5G","IdeaPad 14s"]},
                   {"tle":"分体台式机","con":["GeekPro","天逸510S","天逸510 Pro"]},
                   {"tle":"游戏台式机","con":["异能者","刃9000k","刃9000","刃7000k","刃7000P"]},
                   {"tle":"一体台式机","con":["AIO 520","AIO 520C","YOGA 27","AIO 酷","AIO 逸"]},
                   {"tle":"子系列","con":["小新","拯救者","YOGA"]},
                   {"tle":"场景","con":["高清游戏","家庭娱乐","潮范校园","便捷出行"]},
                   {"tle":"特色服务","con":["私人定制","以旧换新","极速达"]}
                  ],
                  [
                   {"tle":"ThinkPad","con":["X1 系列（尊贵旗舰）","X系列（商务轻薄）","T系列（专业经典）","P系列（创意设计）","S系列（新锐职场）","E系列（日常办公）"]},
                   {"tle":"ThinkBook","con":["锐智系创造本 ","14系列锐智系创造本 ","15系列轻颜系创造本 ","13s系列轻颜系创造本 ","14s系列视觉系创造本 ","14p系列视觉系创造本 ","15p系列视觉系创造本 ","16p系列高端超轻薄本 ","13x系列双面屏超轻薄本 Plus系列"]},
                   {"tle":"thinkplus","con":["口红电源","随身充","商务箱包","耳机","U盘","键鼠套装","口袋全向麦"]},
                   {"tle":"特色服务","con":["专属定制","以旧换新"]}
                  ],
                  [
                   {"tle":"拯救者","con":["拯救者电竞手机2 Pro","拯救者电竞手机Pro"]},
                   {"tle":"motorola","con":["摩托罗拉 edge s","摩托罗拉 刀锋 5G","moto g50"]},
                   {"tle":"乐檬","con":["联想乐檬K12 Pro","联想乐檬K12"]},
                   {"tle":"手机配件","con":["Lenovo GaN 90W 适配器","Lenovo 65W适配器","Lenovo Type-C USB 3.1数据线","Lenovo 45W 适配器","Lenovo Type-C USB 2.0 数据线","摩托罗拉 刀锋5G 专属手机真皮皮套"]},
                   {"tle":"170/171","con":["懂陪伴","糖豆儿","大白话"]}
                  ],
                  [
                   {"tle":"智能家居","con":["门锁","扫地机器人","儿童机器人"]},
                   {"tle":"智慧办公","con":["个人云","投影仪"]},
                   {"tle":"智玩出行","con":["滑板车","平衡车"]},
                   {"tle":"健康生活","con":["牙刷","体脂秤","按摩设备"]},
                   {"tle":"智能安防","con":["摄像头","录音笔"]}
                  ],
                  [
                   {"tle":"电脑周边","con":["鼠标","键盘","支架","电脑清洁","光驱","电源适配器","转接&扩展设备","电脑包"]},
                   {"tle":"存储设备","con":["U盘","固态硬盘","移动硬盘"]},
                   {"tle":"显示生态","con":["Lenovo显示器","ThinkVision"]},
                   {"tle":"娱乐生活","con":["耳机","耳麦","K歌宝","音箱","MP3/播放器"]},
                   {"tle":"游戏设备","con":["游戏鼠标","机械键盘","电竞耳机"]},
                   {"tle":"打印机","con":["单功能打印机","多功能一体机","耗材"]},
                   {"tle":"商用SIoT","con":["智能大屏","大屏支架","投屏器"]}
                  ],
                  [
                   {"tle":"小新平板","con":["小新Pad plus","小新Pad Pro","小新Pad"]},
                   {"tle":"YOGA平板","con":["YOGA Pad Pro"]},
                   {"tle":"智能平板","con":["M8系列"]},
                   {"tle":"常规平板","con":["Tab M10 系列"]}
                  ],
                  [
                   {"tle":"Care+","con":["延长保修","上门服务"]},
                   {"tle":"系统服务","con":["重装系统","新机开荒","专家上门","电脑加速","驱动安装","网课调优","Office365"]},
                   {"tle":"清洁保养","con":["拆机清洁","外观清洁","清洁套装工具"]},
                   {"tle":"诊断维修","con":["电脑故障检修服务","电脑硬件安装服务","电脑系统检测服务"]},
                   {"tle":"数据恢复","con":["远程数据恢复","硬件开盘数据恢复"]},
                   {"tle":"硬件升级","con":["内存","SSD固态硬盘","笔记本硬盘/内存升级套装"]}
                  ]
                 ]

            var image=[
                       ["1-1.jpg","1-2.jpg"],
                       ["2-1.jpg","2-2.jpg"],
                       ["3-1.jpg","3-2.jpg"],
                       ["4-1.jpg","4-2.jpg"],
                       ["5-1.jpg","5-2.jpg"],
                       ["6-1.jpg","6-2.jpg"],
                       ["7-1.jpg","7-2.jpg"]
                      ]
            var EC=document.querySelectorAll("#banner .erji-con")
            for(var i=0;i<EC.length;i++){
               for(var n=0;n<arr[i].length;n++){
                  var dl=cj("dl"),dt=cj("dt"),
                      at=cj("a"),gs=arr[i][n];
                  at.href="#"
                  at.innerText=gs.tle
                  dt.appendChild(at)
                  dl.appendChild(dt)
                  for(var s=0;s<gs.con.length;s++){
                     var dd=cj("dd"),ad=cj("a")
                     ad.href="#"
                     ad.innerText=arr[i][n].con[s]
                     dd.appendChild(ad)
                     dl.appendChild(dd)
                  }
                  EC[i].appendChild(dl)
               }
                  var div=cj("div")
                  for(var y=0;y<image[i].length;y++){
                     var da=cj("a"),dg=cj("img");
                     dg.src="img/banner/erji"+image[i][y]
                     da.href="#"
                     da.appendChild(dg)
                     div.appendChild(da)
                  }
                  EC[i].appendChild(div)
            }
   }

   erjidy()

   
   



   function bottom(){
      var arr=[
             {"tle":"会员福利","icon":["bt1-1.png","bt1-2.png"]},
             {"tle":"驱动下载","icon":["bt2-1.png","bt2-2.png"]},
             {"tle":"小新铺子","icon":["bt3-1.png","bt3-2.png"]},
             {"tle":"拯救者联盟","icon":["bt4-1.png","bt4-2.png"]},
             {"tle":"Think家族","icon":["bt5-1.png","bt5-2.png"]},
             {"tle":"手机新品","icon":["bt6-1.png","bt6-2.png"]},
             {"tle":"刃天堂","icon":["bt7-1.png","bt7-2.png"]},
             {"tle":"平板电脑","icon":["bt8-1.png","bt8-2.png"]},
             {"tle":"选件","icon":["bt9-1.png","bt9-2.png"]},
             {"tle":"智能","icon":["bt10-1.png","bt10-2.png"]},
             {"tle":"服务","icon":["bt11-1.png","bt11-2.png"]}
           ]

            var con=document.querySelector("#banner .con-box")
            for(var i=0;i<arr.length;i++){
               con.innerHTML+=`<li>
                                 <a href="#">
                                    <img src="img/banner/${ arr[i].icon[0] }" alt="">
                                    <img class="hover" src="img/banner/${ arr[i].icon[1] }" alt="">
                                    <span>${arr[i].tle}</span>
                                 </a>
                              </li>`
            }
   }

   bottom()

   






 