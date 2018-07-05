window.onload = function(){
    var aLi = document.getElementsByTagName("li");
    var oBig = document.getElementById("big");
    var oLoading = oBig.getElementsByTagName("div")[0];
    var i=0;
    for(var i=0;i<aLi.length;i++){
        aLi[i].index = i;
        //鼠标划过，预加载图片插入容器并显示
        aLi[i].onmouseover = function(){
            //在页面中创建一个img标签
            var oImg = document.createElement("img");
            //图片预加载
            var img = new Image();
            img.src = oImg.src = aLi[this.index].getElementsByTagName("img")[0].src.replace(".jpg","_big.jpg");
            //插入大图片
            oBig.appendChild(oImg);
            //鼠标划过样式
            this.className = "active";
            //显示big
            oBig.style.display = oLoading.style.display = "block";
            //判断大图是否加载成功
            img.complete ? oLoading.style.display = "none" : 
            (oImg.onload = function(){oLoading.style.display = "none";})
        };
        //鼠标移动大图跟随鼠标移动
        aLi[i].onmousemove = function(event){
            var event = event||window.event;
            var iWidth = document.documentElement.offsetWidth - event.clientX;
            //设置big的top值
            oBig.style.top = event.clientY + 20 + "px";
            //设置big的left值，如果右侧不够就在左侧显示
            oBig.style.left = (iWidth < oBig.offsetWidth + 10 ? event.clientX - oBig.offsetWidth - 10 :
            event.clientX + 10) + "px";
        };
        //鼠标离开删除大图并隐藏大图容器
        aLi[i].onmouseout = function(){
            this.className = "";
            oBig.style.display = "none";
            //移除大图片
            oBig.removeChild(oBig.lastChild)
        };
    }
}