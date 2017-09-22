/*
* @Author: Administrator
* @Date:   2017-08-23 15:13:45
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-23 17:19:21
*/

'use strict';
window.onload=function(){
	function Game(){
		this.charSheet=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']
		this.length=5;
		this.elements=[];
	}
	Game.prototype={
		start:function(){
			this.getChars(this.length)
		},
		getChars:function(length){
			for(i=0;i<length;i++){
				this.getchar();
			}
		},
		getchar:function(){
			let num=Math.floor(Math.random()*this.charSheet.length)
			let divs=document.createElement('div')
			divs.classList.add('yangshi')
			divs.innerText=this.charSheet[num]
			let lefts=Math.random()*(innerWidth-200)+100
			let tops=Math.random*100
			divs.style.left=`${lefts}px`;
			divs.style.top=`${tops}px`;
			document.body.createElement(divs)
			
		}
	}
}