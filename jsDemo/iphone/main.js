window.onload = function(){
    var iphone = document.getElementById("iphone");
    var oLock = document.getElementById("lock");
    var oBtn = oLock.getElementsByTagName("span")[0];
    //初始化x的值
    var disX = 0;
    //规定滑动的范围
    var maxL = oLock.clientWidth - oBtn.offsetWidth;
    //在页面中生成img
    var oBg = document.createElement("img");
    oBg.src = "./2.jpg";

    //鼠标点击事件
    oBtn.onmousedown = function(e){
        //e是这个鼠标事件
        var e = e || window.event;
        disX = e.clientX - this.offsetLeft;


        document.onmousemove = function(e){
            var e = e || window.event;
            var l = e.clientX - disX;

            //防止溢出
            l < 0 && (l = 0);
            l > maxL && (l = maxL);
            
            oBtn.style.left = l + "px";
            oBtn.offsetLeft == maxL && (iphone.style.background = "url("+ oBg.src +")",
            oLock.style.display = "none")
            return false;
        }

        document.onmouseup = function(){
            document.onmousemove = null;
            document.onmouseup = null;
            oBtn.releaseCapture && oBtn.releaseCapture();
            oBtn.offsetLeft > maxL / 2 ?
            startMove(maxL,function(){
                iphone.style.background = "url("+oBg.src +")";
                oLock.style.display = "none";
            }) :
            startMove(0);
        };

        this.setCapture && this.setCapture();
        return false;
    };

    function startMove(iTarget,onEnd){
        clearInterval(oBtn.timer);
        oBtn.timer = setInterval(function(){
            doMove(iTarget,onEnd);
        },30);
    }

    function doMove(iTarget,onEnd){
        var iSpeed = (iTarget - oBtn.offsetLeft) / 5;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        iTarget == oBtn.offsetLeft ? (clearInterval(oBtn.timer),onEnd && onEnd()) :
        oBtn.style.left = iSpeed + oBtn.offsetLeft + "px";
    }
}