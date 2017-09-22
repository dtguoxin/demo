/*
* @Author: Administrator
* @Date:   2017-08-23 09:02:11
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-24 08:57:08
*/

'use strict';
/*
属性：
	哪些字符
	个数
	速度
	得分
	生命值
	扣分

方法：开始
	  消除
	  产生字符：
	  几个 
	  哪些
	  下一关
	  重新开始
 */
window.onload=function(){
	function Game(){
		this.charSheet=[
		['Q','img/Q.png'],
		['W','img/W.png'],
		['E','img/E.png'],
		['R','img/R.png'],
		['T','img/T.png'],
		['Y','img/Y.png'],
		['U','img/U.png'],
		['I','img/I.png'],
		['O','img/O.png'],
		['P','img/P.png'],
		['A','img/A.png'],
		['S','img/S.png'],
		['D','img/D.png'],
		['F','img/F.png'],
		['G','img/G.png'],
		['H','img/H.png'],
		['J','img/J.png'],
		['K','img/K.png'],
		['L','img/L.png'],
		['Z','img/Z.png'],
		['X','img/X.png'],
		['C','img/C.png'],
		['V','img/V.png'],
		['B','img/B.png'],
		['N','img/N.png'],
		['M','img/M.png']
		]
		this.length=5;
		this.position=[];
		this.elements=[];
		this.speeds=10;
		this.score=0;
		this.scoreObj=document.querySelector('div.score:first-child>span')
		this.gq=10;
		this.life=10;
		this.lifeObj=document.querySelector('div.score:last-child>span')
	}
	Game.prototype={
		start:function(){
			this.getChars(this.length)
			this.drop()
			this.key()
		},
		getChars:function(length){
			for(let i=0;i<length;i++){
				this.getChar();
			}
		},
		checkRepeat:function(num){
			/*this,elements.some(function(value){
				return value.innerText==this.charSheet[num]
			})*/
			return this.elements.some(value=>value.innerText==this.charSheet[num])
		},
		checkPosition:function(lefts){
			return this.position.some(function(value){
				return Math.abs(value-lefts)<50
			})
		},
		getChar:function(){
				let num;
				let divs=document.createElement('div')
				let lefts;
				let tops=Math.random()*100;

				do{
					num=Math.floor(Math.random()*this.charSheet.length)
				}while(this.checkRepeat(num))
				do{
					lefts=(innerWidth-200)*Math.random()+100
				}while(this.checkPosition(lefts))
				divs.classList.add('yangshi')
				divs.style.cssText=`
					left:${lefts}px;top:${tops}px;
					background-image:url(${this.charSheet[num][1]})
				`;
				divs.innerText=this.charSheet[num][0];
				document.body.appendChild(divs)
				this.elements.push(divs)
				this.position.push(lefts)
		},
		drop:function(){
			let that=this;
			this.t=setInterval(function(){
				for(let i=0;i<that.elements.length;i++){
					let tops=that.elements[i].offsetTop;
					that.elements[i].style.top=`${tops+that.speeds}px`;
					if(tops>=500){
						document.body.removeChild(that.elements[i])
						that.elements.splice(i,1)
						that.position.splice(i,1)
						that.life--;
						that.lifeObj.innerText=that.life;
						if(that.life==0){
							if(confirm('是否继续挑战?')){
								clearInterval(that.t)
								for(let i=0;i<that.elements.length;i++){
									document.body.removeChild(that.elements[i])
								}
								that.elements=[];
								that.position=[];
								that.life=10;
								that.lifeObj.innerText=that.life;
								that.start();
							}else if(confirm('是否选择退出')){
								close();
							}else{
								that.start();
							}
						}
					}

				}
				if(that.elements.length<that.length){
					that.getChar();
				}
			},100)
		},
		key:function(){
			let that=this;
			document.onkeydown=function(e){
				let char=String.fromCharCode(e.keyCode)
				for(let i=0;i<that.elements.length;i++){
					if(char==that.elements[i].innerText){
						that.score++;
						that.scoreObj.innerText=that.score;
						document.body.removeChild(that.elements[i])
						that.elements.splice(i,1)
					}
					if(that.score==that.gq){
						that.next()
					}
				}
			}
		},
		next:function(){
			if(confirm('是否开启下一关')){
				clearInterval(this.t)
				for(let i=0;i<this.elements.length;i++){
					document.body.removeChild(this.elements[i])
				}
				this.elements=[];
				this.position=[];
				this.gq+=10;
				this.length++;
				this.start();
			}else if(confirm('是否选择退出')){
				close();
			}else{
				this.start()
			}
			
		},
		/*again:function(){
			if(confirm('是否重新挑战')){
				clearInterval(this.t)
				for(let i=0;i<this.elements.length;i++){
					document.body.removeChild(this.elements[i])
				}
				this.elements=[];
				this.position=[];
				this.gq+=10;
				this.length++;
				this.start();
			}else if(confirm('是否选择退出')){
				close();
			}else{
				this.start();
			}
		}*/

	}


	let game=new Game()
	game.start()

}
