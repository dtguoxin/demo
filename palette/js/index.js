window.onload=function(){
	let canvas=document.querySelector('canvas')
	
	let ctx=canvas.getContext('2d');
//	ctx.fillText('jkdj',20,30)
	let solid=document.querySelector('.solid')
	let dashed=document.querySelector('.dashed')
	let circle=document.querySelector('.circle')
	let duobian=document.querySelector('.duobian')
	let mask=document.querySelector('.mask')
	let qianbi=document.querySelector('.qianbi')
	let duojiao=document.querySelector('.duojiao')
	let ab=new Palette(canvas,mask)
	let style=document.querySelectorAll('.style')
	let color=document.querySelectorAll('.color')
	
	/*solid.onclick=function(){
		ab.draw('line')
	}
	dashed.onclick=function(){
		ab.draw('dashed')
	}
	circle.onclick=function(){
		ab.draw('circle')
	}
	duobian.onclick=function(){
		ab.draw('duobian')
	}
	qianbi.onclick=function(){
		ab.qianbi()
	}
	duojiao.onclick=function(){
		ab.draw('duojiao')
	}*/
	let tools=document.querySelectorAll('.tools')
	let eraser=document.querySelector('.eraser')
	let rubber=document.querySelector('.rubber')
	eraser.onclick=function(){
		ab.eraser(rubber,30,30)
	}
	
	
	let word=document.querySelector('.word')
	word.onclick=function(){
		ab.word()
	}
	
	
	let save=document.querySelector('.save')
	save.onclick=function(){
		save.href=canvas.toDataURL('image/png')
		save.download='a.png'
	}
	
	
	let reverse=document.querySelector('.reverse')
	reverse.onclick=function(){
		ab.reverse()
	}
	
	let caiqie=document.querySelector('.caiqie')
	let clipObj=document.querySelector('.clip')
	caiqie.onclick=function(){
		ab.clip(clipObj)
	}
	
	tools.forEach(element=>{
		element.onclick=function(){
			let active=document.querySelector('label[active=true]')
			active.setAttribute('active',false);
			element.setAttribute('active',true);
			ab.draw(this.id)
			if(this.id=='qianbi'){
				ab.qianbi();
			}else{
				ab.draw(this.id)
			}
		}
	})
	style.forEach(element=>{
		element.onclick=function(){
			ab.style=this.id;
		}
	})
	color.forEach((element,index)=>{
		element.onchange=function(){
			if(index==0){
				ab.strokeStyle=this.value;
			}
			if(index==1){
				ab.fillStyle=this.value;
			}
		}
	})

}