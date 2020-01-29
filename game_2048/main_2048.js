/*
 * @Author: your name
 * @Date: 2020-01-21 17:29:53
 * @LastEditTime : 2020-01-27 21:27:53
 * @LastEditors  : Please set LastEditors
 * @Description: Data Storage & main logic description
 * @FilePath: \front coding\game_2048\main_2048.js
 */

var board = new Array();                //数组：游戏界面4*4格子中的数据
var score;                              //记分板
var conflicted = new Array();           //数组记录格子移动后是否发生碰撞
//移动端触控坐标
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;


                                //主界面的初始化
$(document).ready(function(){newGame();});
function newGame(){
    prepareForMobile();
    //初始化棋盘格，调用函数init()
    init();
    //随机产生两个随机位置随机2/4大小的数字
    generateNumber();
    generateNumber();
}
function prepareForMobile(){
    if(documentWidth > 500){
        grid_wrapWidth = 500;
        grid_cellWidth = 100;
        cell_spaceWidth = 20;
        $("#newgame").css('width',"10%");
    }
    $("#grid_wrap").css('width',grid_wrapWidth-2*cell_spaceWidth);
    $("#grid_wrap").css('height',grid_wrapWidth-2*cell_spaceWidth);
    $("#grid_wrap").css('padding',cell_spaceWidth);
    $("#grid_wrap").css('border-radius',0.02*grid_wrapWidth);

    $(".grid_cell").css('width',grid_cellWidth);
    $(".grid_cell").css('height',grid_cellWidth);
    $(".grid_cell").css('border-radius','6px');
    
}
function init(){
    //完成无数据界面的搭建（下层背景div）
    for(var i = 0;i <= 3;i++){
        for(var j = 0;j <= 3;j++){
            var grid_cell = $("#cell_"+i+j);        //$()等价于document.get("")获取元素对象
            //top/left根据div的id值循环确定其定位，based on get(i,j)函数
            grid_cell.css('top',getPosTop(i,j));
            grid_cell.css('left',getPosLeft(i,j));
        }
    }
    //cell上的数值为0（不显示），为board二维数组所有值附上初始值0
    for(var i = 0;i <= 3;i++){
        board[i] = new Array();
        conflicted[i] = new Array();
        for(var j = 0;j <= 3;j++){
            board[i][j] = 0;
            conflicted[i][j] = false;
        }
    }
    updateBoardView();      //将board存储的数据与html标签及样式关联
    score = 0;
    updateScore(score);
}
//刷新棋盘
function updateBoardView(){
    $(".number_cell").remove();
    for(var i = 0;i <= 3;i++){
        for(var j = 0;j <= 3;j++){
            //调用jQuery的append动态添加数值层div（上层）
            $("#grid_wrap").append('<div class="number_cell" id ="ncell_'+i+''+j+'"></div>');
            var numberCell = $("#ncell_"+i+j);
            //根据不同数据动态改变数值层div的css样式
            if(board[i][j] == 0){       //数值0，div定位在方框中心，宽高为0
                numberCell.css('width','0px');
                numberCell.css('height','0px');
                numberCell.css('top',getPosTop(i,j)+grid_cellWidth/2);
                numberCell.css('left',getPosLeft(i,j)+grid_cellWidth/2);
            }
            else{       //有值时，根据数值大小不同调整字色，背景色以及数字显示
                numberCell.css('width',grid_cellWidth);
                numberCell.css('height',grid_cellWidth);
                numberCell.css('top',getPosTop(i,j));
                numberCell.css('left',getPosLeft(i,j));
                numberCell.css('color',getNumberColor(board[i][j]));
                numberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                numberCell.text(board[i][j]);
                
            }
            conflicted[i][j] = false;
        }
    }
    $(".number_cell").css("line-height",grid_cellWidth+'px');
    $(".number_cell").css("font-size",0.6*grid_cellWidth+'px');
}
//新数据产生函数（不仅会用于初始化中）
function generateNumber(){
    if(nospace(board)){     //判断棋盘是否满，若满，则直接返回假
        return false;
    }
    //随机一个棋盘格位置，限定在board[i][j] == 0的位置中产生
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){        //死循环判断，当且仅当产生符合的棋盘格才能跳出(初级算法)
        if(board[randx][randy] == 0){
            break;
        }
        var randx = parseInt(Math.floor(Math.random()*4));
        var randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机产生2或4中的一个数
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNumber;
    //界面显示函数
    showNumber(randx,randy,randNumber);
    return true;
}

                                //玩家响应（pc）
document.addEventListener('keydown',function (event) { 
    event.preventDefault();
    switch(event.keyCode){
        case 37:
            if(isMoveLeft()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
            break;
        case 38:
            if(isMoveUp()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
            break;
        case 39:
            if(isMoveRight()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
            break;
        case 40:
            if(isMoveDown()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
            break;
        default: break;
    }
});

                                //玩家响应（移动端 web app）
document.addEventListener('touchstart',function(start){
    startx = start.touches[0].pageX;
    starty = start.touches[0].pageY;
});
document.addEventListener('touchmove',function(move){
    move.preventDefault();
},{passive:false});
document.addEventListener('touchend',function(end){
    endx = end.changedTouches[0].pageX;
    endy = end.changedTouches[0].pageY;

    var deltax = endx-startx;
    var deltay = endy-starty;
    if(Math.abs(deltax) < 0.1*documentWidth && Math.abs(deltay) < 0.1*documentWidth){
        return;
    }
    //左右滑动
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            if(isMoveRight()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
        }
        else{
            if(isMoveLeft()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
        }
    }
    //上下滑动
    else{
        if(deltay > 0){
            if(isMoveDown()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
        }
        else{
            if(isMoveUp()){
                setTimeout("generateNumber();",200); 
                setTimeout("isGameOver()",200);
            }
        }
    }
});
function isGameOver(){
    if(nospace(board) && nomove(board)){
        setTimeout("GameOver()",200);
    }
}
function GameOver() {
    alert("游戏结束");
}
function isMoveLeft(){
    if(!canMoveLeft(board)){return false;}
    for(var i = 0;i <= 3;i++){
        for(var j = 1;j <= 3;j++){
            if(board[i][j] != 0){
                for(var k = 0;k < j;k++){
                    if(board[i][k] == 0 && noBlockHorizental(i,k,j,board)){
                        showMove(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizental(i,k,j,board) && conflicted[i][k] == false) {
                        showMove(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        conflicted[i][k] = true;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function isMoveUp(){
    if(!canMoveUp(board)){return false};
    for(var j = 0;j <=3;j++){
        for(var i = 1;i <= 3;i++){
            if(board[i][j] != 0){
                for(var k = 0;k < i;k++){
                    if(board[k][j] == 0 && noBlockvertival(j,k,i,board)){
                        showMove(i,j,k,j);
                        board[k][j]=board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j]  == board[i][j] && noBlockvertival(j,k,i,board) && conflicted[k][j] == false) {
                        showMove(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        conflicted[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function isMoveRight(){
    if(!canMoveRight(board)){return false};
    for(var i = 0;i <= 3;i++){
        for(var j = 2;j >= 0;j--){
            if(board[i][j] != 0){
                for(var k = 3;k > j;k--){
                    if(board[i][k] == 0 && noBlockHorizental(i,j,k,board)){
                        showMove(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizental(i,j,k,board) && conflicted[i][k] == false) {
                        showMove(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        conflicted[i][k] = true;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}
function isMoveDown(){
    if(!canMoveDown(board)){return false};
    for(var j = 0;j <= 3;j++){
        for(var i = 2;i >= 0;i--){
            if(board[i][j] != 0){
                for(var k = 3;k > i;k--){
                    if(board[k][j] == 0 && noBlockvertival(j,i,k,board)){
                        showMove(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] == board[i][j] && noBlockvertival(j,i,k,board) && conflicted[k][j] == false) {
                        showMove(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        conflicted[k][j] = true;
                        score += board[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            } 
        }
    }
    setTimeout("updateBoardView()",200);
    return true;
}


