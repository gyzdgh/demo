window.onload = function(){
    var oBox = document.getElementById("box");
    var bLeft = bTop = bRight = bBottom = bCtrlKey = false;

    setInterval(function(){
        if(bLeft){
            //控制向左
            oBox.style.left = oBox.offsetLeft - 10 + "px"
        }else if(bRight){
            //控制向右
            oBox.style.left = oBox.offsetLeft + 10 + "px"
        }
        if(bTop){
            //控制向上
            oBox.style.top = oBox.offsetTop - 10 + "px"
        }else if(bBottom){
            //控制向下
            oBox.style.top = oBox.offsetTop + 10 +"px"
        }
        //防止溢出
        limit();
    },30);

    document.onkeydown = function(event){
        var event = event || window.event;
        bCtrlKey = event.ctrlKey;

        switch(event.keyCode){
            //向左
            case 37:
            bLeft = true;
            break;
            //向上
            case 38:
            if(bCtrlKey){
                //声明宽高变量
                var oldWidth = oBox.offsetWidth;
                var oldHeight = oBox.offsetHeight;
                
                //设置div的距页面的宽高距离
                oBox.style.width = oBox.offsetWidth * 1.5 + "px"
                oBox.style.height = oBox.offsetHeight * 1.5 + "px"

                //设置div左边和顶部的距离
                oBox.style.left = oBox.offsetLeft - (oBox.offsetWidth - oldWidth) / 2 + "px";
                oBox.style.top = oBox.offsetTop - (oBox.offsetHeight - oldHeight) / 2 + "px";

                break;
            }
            bTop = true;
            break;
            //向右
            case 39:
            bRight = true;
            break;
            //向下
            case 40:
            if(bCtrlKey){
                var oldWidth = oBox.offsetWidth;
                var oldHeight = oBox.offsetHeight;

                oBox.style.width = oBox.offsetWidth * 0.75 + "px"
                oBox.style.height = oBox.offsetHeight * 0.75 + "px"

                oBox.style.left = oBox.offsetLeft - (oBox.offsetWidth - oldWidth) / 2 + "px";
                oBox.style.top = oBox.offsetTop - (oBox.offsetWidth - oldWidth) / 2 + "px";

                break;
            }
            bBottom = true;
            break;
            //根据keycode改变div的颜色
            case 49:
            bCtrlKey && (oBox.style.background = "green");
            break;
            case 50:
            bCtrlKey && (oBox.style.background = "yellow");
            break;
            case 51:
            bCtrlKey && (oBox.style.background = "red");
            break;
        }
        return false
    };
    //取消按键后的动作
    document.onkeyup = function(event){
        switch((event || window.event).keyCode){
            case 37:
            bLeft = false;
            break;
            case 38:
            bTop = false;
            break;
            case 39:
            bRight = false;
            break;
            case 40:
            bBottom = false;
            break;
        }
    };

    //防止溢出
    function limit(){
        var doc = [document.documentElement.clientWidth,document.documentElement.clientHeight]
        //防止左侧溢出
        oBox.offsetLeft <=0 && (oBox.style.left = 0);
        //防止顶部溢出
        oBox.offsetTop <=0 && (oBox.style.top = 0);
        //防止右侧溢出
        doc[0] - oBox.offsetLeft - oBox.offsetWidth <=0 && (oBox.style.left = doc[0] - oBox.offsetWidth + "px");
        //防止底部溢出
        doc[1] - oBox.offsetTop - oBox.offsetHeight <=0 && (oBox.style.top = doc[1] - oBox.offsetHeight + "px");
    }
};