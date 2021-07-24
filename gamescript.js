//獲取繪製工具
	/*
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");//獲取上下文
	ctx.moveTo(0,0);
	ctx.lineTo(450,450);*/
	var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    /*ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(450,450);
    ctx.stroke();
    */

    var snake =[];//定義一條蛇，畫蛇的身體
    var snakeCount = 6;//初始化蛇的長度
	var foodx =0;
	var foody =0;
    var togo =0;
    function drawtable()//畫地圖的函式
    {


    	for(var i=0;i<60;i++)//畫豎線
    	{
    		ctx.strokeStyle="black";
    		ctx.beginPath();
    		ctx.moveTo(15*i,0);
    		ctx.lineTo(15*i,600);
    		ctx.closePath();
    		ctx.stroke();
    	}
        for(var j=0;j<40;j++)//畫橫線
    	{
    		ctx.strokeStyle="black";
    		ctx.beginPath();
    		ctx.moveTo(0,15*j);
    		ctx.lineTo(900,15*j);
    		ctx.closePath();
    		ctx.stroke();
    	}
    	
    	for(var k=0;k<snakeCount;k++)//畫蛇的身體
			{
			ctx.fillStyle="#000";
			if (k==snakeCount-1)
			{
				ctx.fillStyle="yellow";//蛇頭的顏色與身體區分開
			}
			ctx.fillRect(snake[k].x,snake[k].y,15,15);//前兩個數是矩形的起始座標，後兩個數是矩形的長寬。
			
			}
			//繪製食物	
    		ctx.fillStyle ="red";
	     ctx.fillRect(foodx,foody,15,15);
	     ctx.fill();
    	
    }

    
    function start()//定義蛇的座標
    {
    	//var snake =[];//定義一條蛇，畫蛇的身體
        //var snakeCount = 6;//初始化蛇的長度
		
		for(var k=0;k<snakeCount;k++)
    		{
    			snake[k]={x:k*15,y:0};
    			
            }
			
		  drawtable();
          addfood();//在start中呼叫新增食物函式

    }

    function addfood()
	{
	foodx = Math.floor(Math.random()*60)*15; //隨機產生一個0-1之間的數
	foody = Math.floor(Math.random()*40)*15;
		
		for (var k=0;k<snake;k++)
		{
			if (foodx==snake[k].x&&foody==sanke[k].y)//防止產生的隨機食物落在蛇身上
			{	
			addfood();
			}
		}
	
	
	}	
    		
   function move()
   {
	switch (togo)
	{
	case 1: snake.push({x:snake[snakeCount-1].x-15,y:snake[snakeCount-1].y}); break;//向左走
	case 2: snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y-15}); break;
	case 3: snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y}); break;
	case 4: snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y+15}); break;
	case 5: snake.push({x:snake[snakeCount-1].x-15,y:snake[snakeCount-1].y-15}); break;
	case 6: snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y+15}); break;
	default: snake.push({x:snake[snakeCount-1].x+15,y:snake[snakeCount-1].y});
	}
    snake.shift();//刪除陣列第一個元素
   	ctx.clearRect(0,0,900,600);//清除畫布重新繪製
   	isEat();
	isDead();
	drawtable();
   } 			
   
   function keydown(e)
   {
   switch(e.keyCode)
		{
         case 37: togo=1; break;
		 case 38: togo=2; break;
		 case 39: togo=3; break;
		 case 40: togo=4; break;
		 case 65: togo=5; break;
		 case 68: togo=6; break;
		}
   }
   
   function isEat()//吃到食物後長度加10
   {
    if(snake[snakeCount-1].x==foodx&&snake[snakeCount-1].y==foody)
   {
		addfood();
		snakeCount++;
		snake.unshift({x:-15,y:-15});
   }
   
   }
   
   function isDead()
   {
    if (snake[snakeCount-1].x>885||snake[snakeCount-1].y>585||snake[snakeCount-1].x<0||snake[snakeCount-1].y<0)
		{
		alert("You are dead,GAME OVER!!!");
		window.location.reload();
		}
   }
   
    document.onkeydown=function(e)
{
	keydown(e);

} 
window.onload = function()//呼叫函式
{ 
	start();
	setInterval(move,150);
	drawtable();
	
	

}
          