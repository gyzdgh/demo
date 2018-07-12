window.onload = function(){
    var oDiv = document.getElementsByTagName("div")[0];
    var aInput = document.getElementsByTagName("input");
    var oP = document.getElementsByTagName("p")[0];
    var i = 0;

    aInput[0].onclick = function(event){
        //设置事件的阶段为true（捕获）
        (event || window.event).cancelBubble = true;
        //清理事件
        clearEvent();
        //为按钮的值添加value
        this.value += "(已激活)";
        oP.innerHTML = "鼠标点击页面，人物将移动到鼠标点击位置";
        //页面点击
        document.onclick = function(event){
            var event = event || window.event;
            //图片的样式
            oDiv.style.background = "url(./2.gif) no-repeat";
            //开始移动
            startMove(oDiv, {x:event.clientX, y:event.clientY},function(){
                oDiv.style.background = "url(./1.gif) no-repeat"
            });
            return false;
        }
    };

    aInput[1].onclick = function(event){
        //设置事件的阶段为true（捕获）
        (event || window.event).cancelBubble = true;
        //清理事件
        clearEvent();
        //为按钮的值添加value
        this.value += "(已激活)";
        oP.innerHTML = "按住鼠标左键在页面移动，人物将按照鼠标轨迹移动";
        //声明图片的位置
        var aPos = [{x:oDiv.offsetLeft,y:oDiv.offsetTop}];
        //页面中鼠标按下的事件
        document.onmousedown = function(event){
            var event = event || window.event;
            //往 apos 中添加x，y值 
            aPos.push({x:event.clientX,y:event.clientY});
            //页面中鼠标移动的事件
            document.onmousemove = function(event){
                var event = event || window.event;
                //往 apos 中添加x，y值 
                aPos.push({x:event.clientX,y:event.clientY});
                return false;
            };
            return false;
        };
        //页面鼠标离开的事件
        document.onmouseup = function(event){
            //初始化值
            document.onmousemove = null;
            oDiv.style.background = "url(./2.gif) no-repeat";
            var timer = setInterval(function(){
                if(aPos.length == 0){
                    clearInterval(timer);
                    oDiv.style.background = "url(./1.gif) no-repeat";
                    return;
                };
                //设置图片的位置
                oDiv.style.left = aPos[0].x + "px";
                oDiv.style.top = aPos[0].y + "px";
                //删除 apos 中数组的第一个值
                aPos.shift();
            },30);
        };
    };
    
    //清除事件的函数
    function clearEvent(){
        //设置鼠标事件的值
        document.onclick = null;
        document.onmousemove = null;
        document.onmousedown = null;
        document.onmouseup = null;
        for(i=0;i<aInput.length;i++){
            //替换按钮的值
            aInput[i].value = aInput[i].value.replace("(已激活)","");
            aInput[i].onmousedown = aInput[i].onmouseup = function(event){
                (event || window.event).cancelBubble = true;
            };
        };
    };
};

//开始移动的函数方法
function startMove(obj,oTarget,fnEnd){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        doMove(obj,oTarget,fnEnd)
    },30)
};

//做移动的函数方法
function doMove(obj,oTarget,fnEnd){
    //声明x，y的位置
    var iX = (oTarget.x - obj.offsetLeft) / 5;
    var iY = (oTarget.y - obj.offsetTop) / 5;
    //防止溢出
    iX = iX > 0 ? Math.ceil(iX) : Math.floor(iX);
    iY = iY > 0 ? Math.ceil(iY) : Math.floor(iY);
    if(oTarget.x == obj.offsetLeft && oTarget.y == obj.offsetTop){
        clearInterval(obj.timer);
        //回调
        fnEnd && fnEnd();
    }else{
        //图片的位置
        obj.style.left = obj.offsetLeft + iX + "px";
        obj.style.top = obj.offsetTop + iY + "px";
    }
};
