window.onload=function(){
	let song =document.querySelector('.song');
    let singer = document.querySelector('.singer');
	let end = document.querySelector('.end');
	let audio =document.querySelector('audio');
	let ul = document.querySelector('.main-right>ul');
	let img=document.querySelector('.disc-nei>img');
	let i=0
	let next=document.querySelector('.icon-xiayishou');
	let pre=document.querySelector('.icon-shangyishou');
	let bofang=document.querySelector('.icon-bofang')
	let pause=document.querySelector('.icon-pause')
	let paused=document.querySelectorAll('.paused')
	
	render(database[i])
	
	
	
	function render(data) {
        end.innerText = `${data.alltime}`;
        img.src = data.photo;
        audio.src = data.src;
        song.innerText = data.songs;
        singer.innerText = data.name;
        ul.innerHTML = '';
        for(let j=0;j<data.lyrics.length;j++){
                ul.innerHTML +=`
                    <li>${data.lyrics[j].lyric}</li>
                `;
        }
        
        next.onclick=function(){
		i++;
		render(database[i]);
		audio.play()
        pause.style.display = 'block';
        bofang.style.display = 'none';
	}
	pre.onclick=function(){
		i--;
        render(database[i]);
        audio.play()
        pause.style.display = 'block';
        bofang.style.display = 'none';
	}
	paused[0].onclick = function () {
        if(audio.paused){
            audio.play();
            pause.style.display = 'block';
            bofang.style.display = 'none';
        }else{
            audio.pause();
            pause.style.display = 'none';
            bofang.style.display = 'block';
        }
    }
	paused[1].onclick = function () {
        if(audio.paused){
            audio.play();
            pause.style.display = 'block';
            bofang.style.display = 'none';
        }else{
            audio.pause();
            pause.style.display = 'none';
            bofang.style.display = 'block';
        }
    }
        
        audio.ontimeupdate = function () {
	        let bili = audio.currentTime/audio.duration;
	        let neiline = document.querySelector('.nei-line');
	        let linebtn=document.querySelector('.line-btn')
	        let begin = document.querySelector('.begin');
	        begin.innerText =`${Math.floor(audio.currentTime/60)>=10?Math.floor(audio.currentTime/60):'0'+Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60)>=10?Math.floor(audio.currentTime%60):'0'+Math.floor(audio.currentTime%60)}`
	        neiline.style.width = `${bili*100}%`;
	        linebtn.style.left=`${bili*780}px`;
	        data.lyrics.forEach((element,index)=>{
	        	if(begin.innerText==element.time){
	        		let yangshi=index;
	        		if(index<3){
	        			index=0
	        		}else{
	        			index-=3
	        		}
	        		ul.innerHTML = '';
			        for(let y=index;y<data.lyrics.length;y++){
			                ul.innerHTML +=`
			                    <li class="li${y}">${data.lyrics[y].lyric}</li>
			                `          
			        }
			        document.querySelector(`.li${yangshi}`).style.color='red'
			        document.querySelector(`.li${yangshi}`).style.fontSize='20px'
	        	}
        	})
   		}
    }
	let viobtn=document.querySelector('.vol-nei-linebtn')
	let lefts;
	let violine=document.querySelector('.vol-nei-line')
	let volume=document.querySelector('.volume')
	volume.onmousedown=function(e){
		let ox=e.clientX;
		lefts=viobtn.offsetLeft;
		volume.onmousemove=function(e){
			let cx=e.clientX;
			let lefts1=cx-ox+lefts;
			if(lefts1<=-7){
				lefts1=-7
			}
			if(lefts1>=88){
				lefts1=88
			}
			viobtn.style.left=`${lefts1}px`;
			violine.style.width=`${lefts1+7}px`;
			audio.volume=`${lefts1+7}`/95;
			console.log(audio.volume)
		}
		volume.onmouseup=function(){
			volume.onmousemove=null;
			volume.onmouseup=null;
		}
	}
}
