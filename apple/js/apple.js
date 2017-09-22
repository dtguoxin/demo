window.onload=function(){
	let banner=document.querySelector('.banner')
	let imgs=document.querySelectorAll('.banner>a')
	let widths=banner.offsetWidth;
	let next=0
	let now=0
	let btns=document.querySelectorAll('.btn>li')
	let btns1=document.querySelectorAll('.btn>li>a>div')
	let t=setInterval(move,3000)
	function move(){
		next++;
		if(next==imgs.length){
			next=0;
		}
		imgs[next].style.left=`${widths}px`;
		btns[now].style.background='#dcdcdc';
		animate(btns1[now],{width:0},0);
		animate(btns1[next],{width:50},3000);
		animate(imgs[next],{left:0});
		animate(imgs[now],{left:-widths});
		now=next;
	}
	//鼠标移入轮播暂停
	banner.onmouseenter=function(){
		clearInterval(t)
	};
	banner.onmouseleave=function(){
		t=setInterval(move,3000)
	}
	
}
