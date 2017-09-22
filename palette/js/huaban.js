/*
 *属性：
 * 线宽   端点    颜色   边数    角    橡皮尺寸大小      width  height   history   ctx  mask
 * 
 * 
 * 方法：
 * 画线    画虚线    圆     矩形    多角形   
 * 橡皮  裁切   文字   
 * 新建   保存
 * */
function Palette(canvas,mask) {
	this.canvas = canvas;
	this.mask=mask;
	this.ctx = this.canvas.getContext('2d')
	this.history = [];
	this.cw = this.canvas.width;
	this.ch = this.canvas.height
	this.lineCap = 'butt';
	this.fillStyle = '#0085d0';
	this.strokeStyle = '#0085d0';
	this.lineWidth=3;
	this.style='stroke';
	this.num=5;
	this.jiao=5;
	this.temp=null;
}
Palette.prototype = {
	init:function(){
		this.ctx.setLineDash([0,0])
		this.ctx.strokeStyle=this.strokeStyle;
		this.ctx.fillStyle=this.fillStyle;
		this.ctx.lineCap=this.lineCap;
		this.ctx.lineWidth=this.lineWidth;
		this.ctx[this.style]();
		
	},
	line: function(ox,oy,cx,cy) {
		this.ctx.beginPath();
		this.ctx.moveTo(ox, oy);
		this.ctx.lineTo(cx, cy);
		this.ctx.closePath();
        this.ctx[this.style]();
	},
	dashed: function(ox,oy,cx,cy) {
		this.ctx.setLineDash([10, 20])
		this.ctx.beginPath()
		this.ctx.moveTo(ox, oy);
		this.ctx.lineTo(cx, cy);
		this.ctx.closePath();
        this.ctx[this.style]();
	},
	circle: function(ox,oy,cx,cy) {
		let r = Math.sqrt(Math.pow(cx - ox, 2) + Math.pow(cy - oy, 2));
		this.ctx.beginPath();
		this.ctx.arc(ox, oy, r, 0, 2 * Math.PI);
		this.ctx.closePath()
        this.ctx[this.style]();
	},
	duobian: function(ox,oy,cx,cy) {
		let r = Math.sqrt(Math.pow(cx - ox, 2) + Math.pow(cy - oy, 2));
		let rad = (360 / this.num) * Math.PI / 180;
		this.ctx.beginPath();
		this.ctx.moveTo(ox + r, oy)
		for(let i=0;i<this.num;i++){
			this.ctx.lineTo(ox + r * Math.cos(rad * i), oy + r * Math.sin(rad * i))
		}
		this.ctx.closePath()
        this.ctx[this.style]();

	},
	qianbi:function(){
		let that=this;
		this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.ctx.beginPath();
			that.ctx.moveTo(ox,oy);
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				that.ctx.clearRect(0, 0, that.cw, that.ch);
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
				that.ctx.lineTo(cx,cy);
				that.ctx.stroke();
			}
			that.mask.onmouseup=function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
			}
		}
	},
	duojiao:function(ox,oy,cx,cy){
		let r=Math.sqrt(Math.pow(cx - ox, 2) + Math.pow(cy - oy, 2));
		let r1=r/2;
		let rad=360/(this.jiao*2)*Math.PI/180;
		this.ctx.beginPath()
		this.ctx.moveTo(ox+r1,oy);
		for(let i=1;i<this.jiao*2;i++){
			if(i%2){
				this.ctx.lineTo(ox + r * Math.cos(rad * i), oy + r * Math.sin(rad * i))
			}else{
				this.ctx.lineTo(ox + r1 * Math.cos(rad * i), oy + r1 * Math.sin(rad * i))
			}
		}
		this.ctx.closePath()
	},
    juxing:function(ox,oy,cx,cy) {
        this.ctx.beginPath();
        this.ctx.moveTo(ox,oy);
        this.ctx.lineTo(ox,cy);
        this.ctx.lineTo(cx,cy);
        this.ctx.lineTo(cx,oy);
        this.ctx.closePath();
        this.ctx[this.style]();
    },
	draw:function(type){
        let that=this;
        this.mask.onmousedown=function(e){
            let ox=e.offsetX,oy=e.offsetY;
			that.init();
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				that.ctx.clearRect(0,0,that.cw,that.ch);
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
				that[type](ox,oy,cx,cy)
			}
			that.mask.onmouseup = function() {
				that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
            }
		}
	},
	eraser:function(obj,w,h){
		let that=this;
		this.mask.onmousedown=function(){
			obj.style.display='block'
			that.mask.onmousemove=function(e){
				e.preventDefault()
				let ox=e.offsetX,oy=e.offsetY;
				let lefts=ox-w/2,tops=oy-h/2;
				if(tops<=0){
					tops=0;
				}
				if(tops>=that.ch){
					tops=that.ch-h
				}
				if(lefts<=0){
					lefts=0
				}
				if(lefts>=that.cw){
					lefts=that.cw-w;
				}
				obj.style.left=`${lefts}px`;
				obj.style.top=`${tops}px`;
				that.ctx.clearRect(lefts,tops,w,h)
			}
			that.mask.onmouseup=function(){
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
				obj.style.display='none';
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
			}
		}
	},
	word:function(){
		let that=this;
		this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			let divs=document.createElement('div')
			divs.style.cssText=`
				width:100px;height:30px;border:2px solid #ccc;
				background:#fff;position:absolute;
				left:${ox}px;top:${oy}px;
			`;
			divs.contentEditable=true;
			this.mask.appendChild(divs);
			this.mask.onmousedown=null;
			let lefts,tops;
			divs.onmousedown=function(e){
				let rx=e.clientX,ry=e.clientY;
				let dl=divs.offsetLeft,dt=divs.offsetTop;
				that.mask.onmousemove=function(e){
					divs.style.cursor='move';
					let cx=e.clientX,cy=e.clientY;
					lefts=cx-rx+dl;
					tops=cy-ry+dt;
					console.log(lefts)
					divs.style.left=`${lefts}px`;
					divs.style.top=`${tops}px`;
				}
				divs.onmouseup=function(){
					that.mask.onmousemove=null;
					divs.onmouseup=null;
				}
			}	
			divs.onblur=function(){
				let value=divs.innerText;
				this.mask.removeChild(divs);
				this.ctx.textAlign='center';
				this.ctx.font='bold 20px sans-serif'
				this.ctx.fillText(value,lefts,tops)
			}.bind(this)
		}.bind(this)
	},
	reverse:function(){
		let imgData=this.ctx.getImageData(0,0,this.cw,this.ch);
		let data=imgData.data;
		for(i=0;i<data.length;i+=4){
			data[i]=255-data[i]
			data[i+1]=255-data[i+1]
			data[i+2]=255-data[i+2]
		}
		this.ctx.putImageData(imgData,0,0)
	},
	clip:function(clipObj){
		let that=this;
		this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			let w,h,minX,minY;
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				w=Math.abs(cx-ox),h=Math.abs(cy-oy);
				minX=cx>=ox?ox:cx;
				minY=cy>=oy?oy:cy;
				clipObj.style.cssText=`
					display:block;
					width:${w}px;height:${h}px;
					left:${minX}px;top:${minY}px;
				`;
			};
			that.mask.onmouseup=function(){
				that.temp=that.ctx.getImageData(minX,minY,w,h)
				that.ctx.clearRect(minX,minY,w,h);
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
				that.ctx.putImageData(that.temp,minX,minY)
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
				that.drag(minX,minY,w,h,clipObj)
			}
		}
	},
	drag:function(minX,minY,w,h,obj){
		let that=this;
		this.mask.onmousemove=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			if(ox>=minX && ox<=minX+w && oy>=minY && oy<=minY+h){
				that.mask.style.cursor='move'
			}else{
				that.mask.style.cursor='default'
			}
		}
		this.mask.onmousedown=function(e){
			let ox=e.offsetX,oy=e.offsetY;
			that.mask.onmousemove=function(e){
				let cx=e.offsetX,cy=e.offsetY;
				let lefts=cx-ox+minX;
				let tops=cy-oy+minY;
				if(lefts<0){
					lefts=0;
				}
				if(lefts>that.cw-w){
					lefts=that-w;
				}
				if(tops<0){
					tops=0;
				}
				if(tops>that.ch-h){
					tops=that.ch-h;
				}
				obj.style.left=`${lefts}px`;
				obj.style.top=`${tops}px`;
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
				that.ctx.putImageData(that.temp,lefts,tops);
			}
			that.mask.onmouseup=function(){
				that.temp=null;
				obj.style.display='none'
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch))
				that.mask.onmousemove=null;
				that.mask.onmouseup=null;
			}
			
		}
	}
}