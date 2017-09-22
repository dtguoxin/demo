$(function(){
	let next=0;
	let t=setInterval(function(){
		move("l")
	},1000)
	function move(dir){
		if(dir=="l"){
			next++
			if(next==$(".banner>a").length){
				next=0
			}
		}
		if(dir=="r"){
			next--
			if(next==-1){
				next=$(".banner>a").length-1
			}
		}
		$(".banner>a").css({
			opacity:0.2,zIndex:0
		}).eq(next).animate({
			opacity:1}).css({zIndex:1})
			
		$(".btn>li").css({
			background:"none"
		}).eq(next).css({
			background:"#ccc"
		})
	}
	
	$(".banner").hover(function(){
		clearInterval(t)
	},function(){
		t=setInterval(function(){
			move("l")
		},1000)
	})
	
	$(".btn>li").click(function(){
		let index=$(this).index(".btn>li")
		next=index
		move()
	})
	
	$(".lis").hover(function(){
		$(".youla").css("display","block")
	},function(){
		$(".youla").css("display","none")
	})
	
	
	//按需加载
	let newarr=[];
	let flag=true;
	let flag1=true;
	$(".meilizhanshi").each(function(index,obj){
		newarr.push($(obj).offset().top)
	})
	$(window).scroll(function(){
		let st=document.body.scrollTop;
		newarr.forEach(function(value,index){
			if(st+$(window).innerHeight()>=value+200){
				let imgs=$(".meilizhanshi").eq(index).find("img")
				for(let i=0;i<imgs.length;i++){
					imgs[i].src=imgs[i].getAttribute('srcPhy')
				}
			}
		})
		
		//侧边搜索框出现与隐藏
		if($(".display").offset().top+100<=st+$(window).innerHeight()){
			if(flag){
				$(".louceng").animate({width:36,height:332})
				flag=false;
			}
		}else{
			if(!flag){
				flag=true;
				$(".louceng").animate({width:0,height:0})
			}
		}
		
		//头部搜索框出现与隐藏
		if($(".meili").offset().top+150<=st+$(window).innerHeight()){
			if(flag1){
				$(".xialahead").animate({top:0})
				flag1=false;
			}
		}else{
			if(!flag1){
				$(".xialahead").animate({top:-50})
				flag1=true;
			}
		}
		
		//页面显示那个模块，那个模块的楼层按钮颜色改变
		newarr.forEach(function(value,index){
			if(st+$(window).innerHeight()>=value+200){
				$(".louceng>li").removeClass();
				$(".louceng>li").first().nextUntil($(".louceng>li").last()).addClass("a");
				$(".louceng>li.a").eq(index).addClass(`bianse${index}`)
			}
		})
	})
	
	//点击楼层。显示相应的板块
	let floorarr=[];
	$(".b").each(function(index,obj){
		floorarr.push($(obj).offset().top-100)

	})
	$(".louceng a").each(function(index,obj){
		obj.onclick=function(){
			$("body").animate({scrollTop:floorarr[index]})
		}
	})
	$(".loucengtiaozhuan-dingbu").click(function(){
		$("body").animate({scrollTop:0})
	})

	/*右固定  鼠标移入，出现注释*/
	var flag3=true;
	$(".search-right>li").each(function(index,obj){
		$(obj).hover(function(){
			$(".cela-right").eq(index).animate({opacity:1,left:-85})

		},function(){
			$(".cela-right").eq(index).animate({left:-110,opacity:0})
		})
	})
})
