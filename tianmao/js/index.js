/*
* @Author: Administrator
* @Date:   2017-08-13 16:56:32
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-20 20:29:06
*/

'use strict';
/*window.onload=function(){
	let imgs=document.getElementsByClassName('banner-dis')
	let btn=document.getElementsByClassName('btn')[0]
	let btns=btn.getElementsByTagName('li')
	let num=0;
	btns[0].style.background='#706e6e';
	for(let i=0;i<imgs.length;i++){
		btns[i].onmouseenter=function(){
			imgs[num].style.display='none';
			btns[num].style.background='rgba(174, 174, 174, 0.2)';
			imgs[i].style.display='block';
			btns[i].style.background='#706e6e';
			num=i;
		}
	}

	let t=setInterval(fn, 2000);
	let banner=document.getElementsByClassName('banner')[0];
	banner.onmouseenter=function(){
		clearInterval(t)
	}
	banner.onmouseleave=function(){
		t=setInterval(fn, 2000)
	}
	function fn(){
		num++;
		if(num==imgs.length){
			num=0;
		}
		for(let i=0;i<imgs.length;i++){
			imgs[i].style.display='none';
			btns[i].style.background='rgba(174, 174, 174, 0.2)'
		}
		imgs[num].style.display='block';
		btns[num].style.background='#706e6e';
	}
	let youla=document.getElementsByClassName('youla')
	let lis=document.getElementsByClassName('lis')
	for(let i=0;i<lis.length;i++){
		lis[i].onmouseenter=function(){
			youla[i].style.display='block';
		}
		lis[i].onmouseleave=function(){
			youla[i].style.display='none';
		}
	}
}*/


/*动画方式写轮播*/

$(function(){
	let banner=$('.banner')[0];
	let imgs=$('.banner-dis')
	let now=0;
	let next = 0;
	let widths=banner.offsetWidth;
	let btn=$('.btn')[0]
	let btns=$('li',btn)
	let t;
	t=setInterval(move,3000);
	function move(){
		next++;
		if(next==imgs.length){
			next=0;
		}
		imgs[next].style.left=`${widths}px`;
		btns[next].style.background='#706e6e';
		btns[now].style.background='rgba(174, 174, 174, 0.2)';
		animate(imgs[next],{left:0})
		animate(imgs[now],{left:-widths})
		
		now=next;
	}
	/*鼠标放入暂停自动轮播*/
	banner.onmouseenter=function(){
		clearInterval(t)
	}
	banner.onmouseleave=function(){
		t=setInterval(move,3000)
	}

	/*鼠标移入btns，出现相应的图片*/
	
	btns[0].style.background='#706e6e';
	for(let i=0;i<btns.length;i++){
		btns[i].onmouseenter=function(){
			if(i==now){
				return;
			}
			
			imgs[i].style.left=`${widths}px`
			btns[i].style.background='#706e6e';
			btns[now].style.background='rgba(174, 174, 174, 0.2)';
			animate(imgs[now],{left:-widths})
			animate(imgs[i],{left:0})
			now=i;
			next=i;
		}
	}


	/*侧拉*/
	let youla=document.getElementsByClassName('youla')
	let lis=document.getElementsByClassName('lis')
	for(let i=0;i<lis.length;i++){
		lis[i].onmouseenter=function(){
			youla[i].style.display='block';
		}
		lis[i].onmouseleave=function(){
			youla[i].style.display='none';
		}
	}

	/*按需加载*/
	/*
浏览器的高度+滚动条滚动的距离  >=  元素页面左上角的距离
innerHeight     scrollTop              offsetTop
 */
	let wh=window.innerHeight;
	let newarr=[];
	let floor=document.querySelectorAll('.meilizhanshi')
	let floors=document.querySelector('.banner1')
	//let secfloor=document.querySelectorAll('.chaizhanshi')
	let num=0;
	let flag=true;
	let floorsH=floors.offsetTop;
	let xialahead=document.querySelector('.xialahead')
	floor.forEach(element=>{
		newarr.push(element.offsetTop)
	})



// 楼层跳转点击
	let loucengbtns=document.querySelectorAll('li.a')
	let loucengarr=[];
	let body=document.querySelector('body')
	let floor2=document.querySelectorAll('div.b')
	let dingbubtn=document.querySelector('.loucengtiaozhuan-dingbu')
	let louceng=document.querySelector('ul.louceng')
	let flag1=true;
	let num2=0;

	// 点击侧导航，出现相应的页面内容
	floor2.forEach(element=>{
		loucengarr.push(element.offsetTop-100)
	})
	
	loucengbtns.forEach(function(element,index){
		element.onclick=function(){
			animate(body,{scrollTop:loucengarr[index]})
		}
	})
	dingbubtn.onclick=function(){
		animate(body,{scrollTop:0})
	}


	window.onscroll=function(){
		let st=document.body.scrollTop;          //获取页面顶部和浏览器顶部之间的距离
		
		newarr.forEach(function(value,index){
			if(wh+st>=value+200){
				let imgs=floor[index].getElementsByTagName('img');
				// loucengbtn[index].classList.add('.bianse')
				
				
				for(let i=0;i<imgs.length;i++){
					imgs[i].src=imgs[i].getAttribute('srcPhy')
					//secimg[i].src=secimg[i].getAttribute('srcPhy')
				}
				
			}
		})

		loucengarr.forEach(function(value,index){
			if(wh+st>=value){
				loucengbtns[num2].style.background='#626262'
				loucengbtns[index].style.background='#ff7901'
				
				num2=index;
			}
		})

		if(wh+st>=floorsH){
			if(flag){
				flag=false;
				animate(xialahead,{top:0})
			}
				
		}else{
			if(!flag){
				flag=true;
				animate(xialahead,{top:-50})
			}			
		}
			if(wh+st>=floorsH){
				if(flag1){
					flag1=false;
					animate(louceng,{width:36,height:332})
				}						
		}else{
			if(!flag1){
				flag1=true;
				animate(louceng,{width:0,height:0})
			}			
		}
	}

	// 测导航出现与隐藏
	let lins=document.querySelectorAll('.search-right>li')
	let tupian=document.querySelectorAll('.cela-right')
	for(let i=0;i<lins.length;i++){
		lins[i].onmouseenter=function(){
			tupian[i].style.display='block';
			animate(tupian[i],{left:-85})
		}
		lins[i].onmouseleave=function(){
			animate(tupian[i],{left:-110},200)
			tupian[i].style.display='none';
		}
	}
})