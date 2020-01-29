***********************************游戏架构*************************************
采用MVC架构
UI -- HTML/CSS：搭建界面静态场景
游戏主逻辑 -- JavaScript/jQuery：操作游戏数据，整个游戏进程控制
动画逻辑效果 -- JavaScript/jQuery：使游戏主逻辑能在UI层动态显示
支撑层逻辑：底层，沟通游戏数据与主逻辑，辅助函数的存放



***********************************文件信息1：底板层*************************************
一、2048.html
    1.2048标题部分：
        header父标签包含：
            h1标签表示标题
            a标签表示New Game;      id = newgame,？？？src = JavaScript:newGame()函数
            p标签表示分数显示，动态部分用？？？span标签表示   id = score；
        meta设备适配：
            utf-8编码
            ？？？viewpoint元信息：window宽高采用设备宽高，极大极小初始尺寸取一倍，禁止用户更改
            title标题
        link标签关联2048.css;
    2.2048主体部分
        div父标签包含整个棋盘盒子模型：     id = grid_wrap
            4*4个div表示16个固定棋盘格         class = grid_cell    id = cell_??
        JavaScript文件以及jquery关联
            关联main_2048.js、support_2048.js、show_2048.js以及在线jQuery库
        
二、2048.css（固定不动的东西用css固定样式实现）
    1、标题区：
        *{}：去除所有默认尺寸边距
        header父标签包含：
            转化块元素
            宽定义，高由元素撑开定义
            居中处理（可不写，因为宽已经顶格）
            文字居中（使文字在所属子标签内居中）
        header h1:
            字体字号字重
            边距设置
        header #newgame：
            字体字号字重字色

            a标签取消默认样式
            转化块元素
            宽度设置
            居中及边距设置

            背景色
            圆角
            弥散阴影
        header #score：
            字体字号
            居中边距
    2、游戏棋盘区：
        #grid_wrap:
            宽度高度设置
            居中及边距设置

            背景色
            圆角

            ？？？定位：relative
        #grid_wrap .grid_cell (所有子格，所以采用类选择器)：
            宽高设置

            背景色
            圆角

            ？？？定位：absolute
        .number_cell(在动态生成后书写数据层div)
            圆角

            字体字号字重
            ？？？字体行高
            字体居中

        




***********************************文件信息2：数据层*************************************
三、main.js
    1、变量区（仅声明未初始化）？？补全数据类型：
        board数组：用于存储4*4格子数据信息
        score：记录玩家分数
        conflict数组：记录已经发生过碰撞的格子（置true）
        移动端触控坐标：startx，starty，endx，endy
    
    2、初始化区：
        ？？ready方法。
        newGame（）函数定义：
            移动端是否适配准备prepareForMobile（）
            init（）：所有的重置数据准备
            generateNumber（）：产生一个新数据
            generateNumber（）：产生另一个新数据
        prepareForMobile（）：
            如果屏幕尺寸大于500
                尺寸设为原来pc端尺寸
            否则利用.css方法完成对css文件中数据的动态改变
        init（）：
            背景层初始化：双层for循环通过id选择器依次取得标签元素对象，通过？？？？.css方法利用定位函数getPos完成定位
            数据存储层初始化：双层for循环完成board[][]的初始化，全部置0
            碰撞检测数组初始化：双层for循环完成conflict[][]的初始化，全部置false 
            score = 0
            移动端坐标置0
            数据表现层初始化：updateBoardView（）
            分数显示updateScore（）
        updateBoardView（）：
            类选择器获得样式.number_cell,？？remove()方法复位
            获取html中的棋盘父元素#grid_wrap,用jQuery的？？？append方法动态添加4*4的数据层div：
            双重for循环，依次添加给一个div，并获得其对象，id = ncell_?? , class = number_cell完成js对div的css样式的动态管理
                若数据为0，则不显示，具体如下：
                    宽高为0
                    定位改为定在格子中间，采用getPos方法
                有数据，则显示，具体如下：
                    宽高设置（移动端适配时，改为相应常量表示）
                    定位设置（移动端适配时，改为相应常量表示）
                    背景颜色设置getNumberBackgroundColor(board[i][j])
                    字体颜色设置getNumberColor(board[i][j])
                    字体显示  
                confilct置false 
                类选择器对所有数据表现层div的字体进行移动端适配
                   
        generateNumber（）：【可作算法优化】
            先判断是否棋盘满，若满，返回假noSpace（）函数
            随机一个位置
                先产生0~4的两个随机数，再设置循环，只有坐标对应的位置为空才符合而跳出循环
            随机一个数字
                赋给上面生成的位置
            界面展示
                showNumber（x,y,number）；
            返回真
    
    3、玩家响应区
        （pc版）事件监听（键盘按下，触发函数（匿名函数）（对象代号）{……}）
            preventDefault()方法去除按键在浏览器中的默认功能
            switch case4个键分别响应上下左右，以左为例：
                case 左键：
                    如果左移动操作完成isMoveLeft（）：
                        生成一个新数字generateNumber（）延时
                        判断是否游戏结束isGameOver（）延时
                case 右键，上键，下键：同理类推
        isMoveLeft（）：
            判断是否能左移：canMoveLeft（board），不能则返回false
            双层for循环（以左为例，最左一列不需要操作一定不能左移，遍历顺序为先行后列，行内从左到右）
            【以右为例，最右一列不需要操作，遍历顺序先行后列，行内从右到左】
            【以上为例，最顶一行不需要操作，遍历顺序先列后行，列内先上后下】
            【以下为例，最底一行不需要操作，遍历顺序先列后行，列内先下后上】
                判断，若此个遍历到的元素非0：
                    新循环，此元素所在移动方向上由远到近遍历：
                        如果在由远及近的落点中，某落点为0，且落点到元素之间没有阻碍noBlockHorizontal（） || noBlockVertical（）
                            移动动画展示showMove（起点x,起点y，终点x，终点y）
                            落点对应的board值赋为元素值
                            元素的board置0
                            continue
                        如果落点值与元素值相等，且noBlockHorizontal（） || noBlockVertical（）&&落点对应的conflict值为false
                            移动动画展示showMove（起点x,起点y，终点x，终点y）
                            落点值+=元素值
                            落点conflict置true
                            元素的board置0
                            更新分数updateScore（）
                            continue
            刷新棋盘updateBoardView（），延时
            返回真
        isGameOver（）：
        如果格子满了，且不能作任何移动noMove（）
            GameOver（）函数；
        GameOver（）：【可优化】
            弹窗，游戏结束


四、support_2048.js
    常量设定
        设备宽=document.screen.availWidth
        大方格总宽（高）= 0.94*设备宽
        小方格宽（高） = 0.18*设备宽
        间隙 = 0.04*设备宽
    1、getPosLeft(行号,列号)/getPosTop(行号,列号):（移动端适配时方法相应改变）
        返回 根据行列序号计算而得的具体距离值
    2、getNumberColor(此格对应数值大小)：
        如果:数字小于等于4，返回某一色号
        否则：返回另一色号
    3、getNumberBackgroundColor(此格对应数值大小)：
        swich（数值）case：不同色号
    4、canMoveLeft(board),canMoveRight(board),canMoveUp(board),canMoveDown(board)
        【以左为例】，最左一列不需要操作一定不能左移，遍历顺序为先行后列，行内从左到右
            如果某一个元素的左侧一位的元素为0 || 某一个元素的左侧一位的元素与某元素相等
                返回 true
        全部遍历完，返回false
    5、noBlockHorizontal（行号，列号1，列号2），noBlockVertical（列号，行号1，行号2）
        遍历列号1到列号2中间的所有格子
            如果有不为0的，返回false
        返回 true
    6、noSpace（board）：
        双重for循环遍历所有格子
            如果某一格为0，返回false
        返回true
    7、noMove（board）：
        如果canMoveLeft(board),canMoveRight(board),canMoveUp(board),canMoveDown(board)有一个能动
            返回false
        返回true
            





五、show_2048.js
    1、showNumber（x坐标,y坐标,数字）
        取得对象
        设置背景色，字体色，显示字体
        对象.animate({css终点效果}，持续时间)
            宽高
            定位
    2、showMove（起点x,起点y，终点x，终点y）
        获得起点位置的元素对象
        对象.animate({css终点效果}，持续时间)
            定位改为终点top，left值，用getPos函数
    3、updateScore（score）：
        获取分数对象
        对象.text(分数显示)；


    
