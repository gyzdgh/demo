window.onload = function(){
    var oBox = document.getElementById("box");
    var oH2 = oBox.getElementsByTagName("h2")[0];
    var oA = oBox.getElementsByTagName("a")[0];
    var aSpan = oBox.getElementsByTagName("span");
    //初始化距离
    var disX = disY = 0;
    //初始化拖拽的值
    var bDarg = false;
    //声明块到页面的距离
    var oPos = [{x:oBox.offsetLeft,y:oBox.offsetTop}]

    //鼠标按下，激活拖拽
    oH2.onmousedown = function(event){
        var event = event || window.event;
        bDarg = true;
        //设置x和y的距离
        disX = event.clientX - oBox.offsetLeft;
        disY = event.clientY - oBox.offsetTop;
        //添加距离
        oPos.push({x:oBox.offsetLeft,y:oBox.offsetTop})
        //鼠标捕获，把全部的鼠标事件定位到该元素(激活)
        this.setCapture && this.setCapture();
        return false
    };

    //拖拽开始
    document.onmousemove = function(event){
        if (!bDarg) return;
        var event = event || window.event;
        //声明距离
        var iL = event.clientX - disX;
        var iT = event.clientY - disY;
        var maxL = document.documentElement.clientWidth - oBox.offsetWidth;
        var maxT = document.documentElement.clientHeight - oBox.offsetHeight;

        //设置距离
        iL = iL < 0 ? 0 : iL;
        iL = iL > maxL ? maxL : iL;
        iT = iT < 0 ? 0 : iT;
        iT = iT > maxT ? maxT : iT;

        oBox.style.marginTop = oBox.style.marginLeft = 0;
        oBox.style.left = iL + "px";
        oBox.style.top = iT + "px";

        //添加距离
        oPos.push({x:iL,y:iT})

        status();
        return false;
    };

    //鼠标释放，结束拖拽
    document.onmouseup = window.onblur = oH2.onlosecapture = function(){
        bDarg = false;
        //释放鼠标捕获，取消所有鼠标事件在该元素上的定位
        oH2.releaseCapture && oH2.releaseCapture();
        status();
    };

    //回放拖动轨迹
    oA.onclick = function(){
        if(oPos.length == 1) return;
        var timer = setInterval(function(){
            //声明一个空数组来存储opos数组删除最后一个的值
            var aPos = oPos.pop();
            aPos ? (oBox.style.left = aPos.x + "px",oBox.style.top = aPos.y + "px",status()) : clearInterval(timer)
        },30);
        //去除链接虚线
        this.focus = false;
        return false 
    };

    //阻止冒泡
    oA.onmousedown = function(event){
        (event || window.event).cancelBubble = true;
    };

    //监听状态函数
    function status(){
        aSpan[0].innerHTML = bDarg;
        aSpan[1].innerHTML = oBox.offsetTop;
        aSpan[2].innerHTML = oBox.offsetLeft; 
    };

    //初始调用
    // status()
};