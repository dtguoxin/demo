/*
* @Author: Administrator
* @Date:   2017-08-14 10:19:54
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-15 23:30:37
*/

'use strict';
/*
先判断是  函数 还是字符串
字符串，先去空，再判断第一个字符

 */
function $(select,ranger=document){
	if(typeof select=='string'){
		let selector = select.trim();
		let firstChar = selector.charAt(0);
			if (firstChar == '#') {
				return ranger.getElementById(selector.substring(1));
			}else if(firstChar == '.') {
				return ranger.getElementsByClassName(selector.substring(1));
			}else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
				return ranger.getElementsByTagName(selector);
			}
	}else if(typeof select=='function'){
		window.onload=function(){
			select();
		}
	}
}

//html ()
//  获取或者设置元素内容
function html(element,content){
	if(arguments.length==2){
		element.innerHTML=content;
	}else if(arguments.length==1){
		return element.innerHTML;
	}
}


function text(element,content){
	if(arguments.length==2){
		element.innerText=content;
	}else if(arguments.length==1){
		return element.innerText;
	}
}

/*
设置样式
css()
 */
function css(element,attrObj){
	for(let i in attrObj){
		element.style[i]=attrObj[i];
	}
}

/*添加事件on*/
function on(collection,type,fn){
	for(let i=0;i<collection.length;i++){
		collection[i][type]=fn;
	}
}
/*删除事件off*/
function off(collection,type){
		for (let i=0; i<collection.length; i++) {
			collection[i][type] = null;
		}
	}


/*动画*/
function animate(element,attrObj,speed,fn){
			let t = setInterval(function(){
				for (let i in attrObj) {
					let start = parseInt(getComputedStyle(element,null)[i]);
					if(start>=attrObj[i]){
						clearInterval(t);
						if(fn){
							fn();
						}
					}
					element.style[i] = `${start+speed}px`
				}
			},60)
		}



/*$(function(){
	let all=$('box')
	let t=$('.box')[0]

	样式调用
	let box1=$('.box1',t)
	html(box1[0],'<p>八戒八戒  心肠不坏</p>')
	text(box1[0],'八戒')
	css(box1[0],{width:'200px',height:'200px',background:'green'})

	添加事件
	on(t,'onclick',function(){
		this.style.background='yellow';
	})


	动画
	animate(t,{width:'500',height:'500'},10,function(){
		t.style.background='yellow'
	})


	引用老师js动画
	animate(t,{width:300,height:300},1000,Expo.easeInOut,function(){
		t.style.background='yellow'

	})


	
})*/