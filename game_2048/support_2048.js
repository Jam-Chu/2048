/*
 * @Author: Jam
 * @Date: 2020-01-23 12:20:55
 * @LastEditTime : 2020-01-27 16:47:16
 * @LastEditors  : Please set LastEditors
 * @Description: auxiliary function
 * @FilePath: \front coding\game_2048\support_2048.js
 */
                                    //主界面的初始化辅助函数
//移动端宽高常量设定
documentWidth = window.screen.availWidth;       //设备宽
grid_wrapWidth = 0.92*documentWidth;            //大方格宽
grid_cellWidth = 0.18*documentWidth;            //小方格宽
cell_spaceWidth = 0.04*documentWidth;           //间距

//定位函数（离左，离上）
function getPosLeft(i,j){
    return cell_spaceWidth+j*(cell_spaceWidth+grid_cellWidth);
}
function getPosTop(i,j){
    return 20+i*(cell_spaceWidth+grid_cellWidth);
}
//数值决定的不同背景色选择函数
function getNumberBackgroundColor(number){
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }
    return "#ccc0b3";
}
//数值决定的不同色字体选择函数
function getNumberColor(number){
    if(number <= 4){
        return "#776e65";
    }
    return "white";
}
function nospace(board){
    for(var i = 0;i <= 3;i++){
        for(var j = 0;j <= 3;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}
function nomove(board){
    if(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)){
        return false;
    }
    return true;
}

                                    //主界面的初始化辅助函数
function canMoveLeft(board){
    for(var i = 0;i <= 3;i++){
        for(var j = 1;j <= 3;j++){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board){
    for(var i = 1;i <= 3;i++){
        for(var j = 0;j <= 3;j++){
            if(board[i][j] != 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board){
    for(var i = 0;i <= 3;i++){
        for(var j = 0;j <= 2;j++){
            if(board[i][j] != 0){
                if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(){
    for(var i = 0;i <= 2;i++){
        for(var j = 0;j <= 3;j++){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noBlockHorizental(row,column1,column2,board){
    for(var j = column1+1;j <= column2-1;j++){
        if(board[row][j] != 0){
            return false;
        }
    }
    return true;
}
function noBlockvertival(column,row1,row2,board){
    for(var i = row1+1;i <= row2-1;i++){
        if(board[i][column] != 0){
            return false;
        }
    }   
    return true;
}
