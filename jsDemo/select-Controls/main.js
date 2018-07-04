window.onload = function(){
    var oSelect = document.getElementsByTagName("span")[0];
    var oSub = document.getElementsByTagName("ul")[0];
    var aLi = oSub.getElementsByTagName("li");
    var i = 0;
    oSelect.onclick = function(event){
        var style = oSub.style;
        style.display = style.display == "block" ? "none" : "block";
        //阻止事件冒泡
        (event || window.event).cancelBubble = true;
    };
    for(var i=0;i<aLi.length;i++){
        //鼠标划过
        aLi[i].onmousemove = function(){
            this.className = "hover"
        };
        //鼠标离开
        aLi[i].onmouseout = function(){
            this.className = ""
        };
        //鼠标点击
        aLi[i].onclick = function(){
            oSelect.innerHTML = this.innerHTML;
        };
        //页面点击
        document.onclick = function(){
            oSub.style.display = "none"
        }
    }
}
