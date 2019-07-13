var dom = document.getElementById('clock');
//获取上下文
var ctx = dom.getContext('2d')
//获取宽度和高度
var width = ctx.canvas.width;
var height = ctx.canvas.height;
//获取半径
var r = width / 2;

function drawBackground() {
    ctx.save();
    //重设画布上x,y坐标
    ctx.translate(r, r);
    //开始绘制路径
    ctx.beginPath();
    ctx.lineWidth = 13;
    ctx.strokeStyle = "#B70D0D";
    //创建曲线
    ctx.arc(0, 0, r - 5, 0, 2 * Math.PI, false);
    //绘制已定义的路径
    ctx.stroke();

    //声明数字
    var hourNumbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    hourNumbers.forEach(function (number, i) {
        //获取弧度
        var rad = 2 * Math.PI / 12 * i;
        //获取x，y轴
        var x = Math.cos(rad) * (r - 30);
        var y = Math.sin(rad) * (r - 30);
        //绘制被填充的文本
        ctx.fillText(number, x, y);
    })

    //画点
    for (var i = 0; i < 60; i++) {
        //获取弧度
        var rad = 2 * Math.PI / 60 * i;
        var x = Math.cos(rad) * (r - 18);
        var y = Math.sin(rad) * (r - 18);
        ctx.beginPath();
        if (i % 5 === 0) {
            // ctx.rect(x - 1.5, y - 2, 3, 15);
            // ctx.moveTo(0, 10);
            // ctx.lineTo(0, -r / 2);
            ctx.fillStyle = "#666665";
            ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        } else {
            ctx.fillStyle = "#A3A3A3";
            ctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        }
        ctx.fill();
    }
}

//画时针
function drawHour(hour, minute) {
    ctx.save();
    ctx.beginPath();
    //弧度
    var rad = 2 * Math.PI / 12 * hour;
    var mrad = 2 * Math.PI / 12 / 60 * minute;
    //旋转绘图
    ctx.rotate(rad + mrad);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#666665";
    //把路径移动到指定点，不创建线条
    ctx.moveTo(0, 10);
    //添加新点，绘制线条
    ctx.lineTo(0, -r / 2);
    ctx.stroke();
    ctx.restore();
}

//画分针
function drawMinute(minute) {
    ctx.save();
    ctx.beginPath();
    //弧度
    var rad = 2 * Math.PI / 60 * minute;
    //旋转绘图
    ctx.rotate(rad);
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#666665";
    //把路径移动到指定点，不创建线条
    ctx.moveTo(0, 10);
    //添加新点，绘制线条
    ctx.lineTo(0, -r + 50);
    ctx.stroke();
    //返回之前保存的路径
    ctx.restore();
}
//画秒针
function drawSecond(second) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = "#DE6857";
    var rad = 2 * Math.PI / 60 * second;
    //旋转绘图
    ctx.rotate(rad);
    //把路径移动到指定点，不创建线条
    ctx.moveTo(-2, 10);
    ctx.lineTo(2, 10);
    //添加新点，绘制线条
    ctx.lineTo(1, -r + 25);
    ctx.lineTo(-1, -r + 25);
    ctx.fill();
    ctx.restore();
}

//画点
function drawDot3() {
    ctx.beginPath();
    ctx.fillStyle = "#E9887A";
    ctx.arc(0, 0, 10, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawDot2() {
    ctx.beginPath();
    ctx.fillStyle = "#EDB8B0";
    ctx.arc(0, 0, 7, 0, 2 * Math.PI, false);
    ctx.fill();
}

function drawDot1() {
    ctx.beginPath();
    ctx.fillStyle = "#C44A3D";
    ctx.arc(0, 0, 4, 0, 2 * Math.PI, false);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    drawBackground();
    drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
    drawDot3();
    drawDot2();
    drawDot1();
    ctx.restore();
}


draw();
setInterval(draw, 1000)


