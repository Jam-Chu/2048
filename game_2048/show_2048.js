/*
 * @Author: your name
 * @Date: 2020-01-23 12:19:04
 * @LastEditTime : 2020-01-27 17:13:05
 * @LastEditors  : Please set LastEditors
 * @Description: for showing
 * @FilePath: \front coding\game_2048\show_2048.js
 */
//根据随机产生的位置，数据，制定用户可见的css样式与动画效果
function showNumber(x,y,number){
    var numberCell = $("#ncell_"+x+y);
    numberCell.css('backgroundColor',getNumberBackgroundColor(number));
    numberCell.css('color',getNumberColor(number));
    numberCell.text(number);
    //调用jQuery动画函数animate({css终点}，时长ms)
    numberCell.animate({
        width:grid_cellWidth,
        height:grid_cellWidth,
        top:getPosTop(x,y),
        left:getPosLeft(x,y)
    },200);
}
function showMove(fromx,fromy,tox,toy){
    var from_ncell = $("#ncell_"+fromx+fromy);
    from_ncell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy),
    },200)
    
}
function updateScore(score){
    $("#score").text("Score: "+score);
}