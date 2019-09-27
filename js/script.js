let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let body = document.body;
let scores = document.querySelectorAll('.score');
let num=0;
let total=100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');

function createBalloon() {
	let div = document.createElement('div');
	let rand = Math.floor(Math.random()*colors.length); //creating integer number randomly [0,5)
	div.className = 'balloon balloon-'+colors[rand];

	rand = Math.floor(Math.random()*(windowWidth-100)); /*width of the balloon=100px*/
	div.style.left = rand+'px';
	div.dataset.number = currentBalloon; //creating data-number attribute with the value currentBalloon	
	currentBalloon++;
	//console.log(div);

    body.appendChild(div); //add new div element to the bottom of the body
    animateBalloon(div);
}

function animateBalloon(elem) {
	let pos =0;
	let random= Math.floor(Math.random()*6-3);
	let interval = setInterval(frame,12-Math.floor(num/10) + random);

	function frame(){
		//console.log(pos);
		//to find an element by its attribute, we have to use []
		/*checking whether a balloon with the attribute
		called "data-number" already exists on the webpage*/
		if(pos>= (windowHeight+200) && (document.querySelector('[data-number = "'+elem.dataset.number+'"]') !== null )){ //width of the balloon=200px*/
			clearInterval(interval); //stop the setInterval func.
			gameOver = true;
		}else{
			pos++;
			//console.log(pos);
			elem.style.top = windowHeight - pos+'px';
		}
	}
}

function deleteBalloon(elem){
		elem.remove();
		num++;
		updateScore();
		playBallSound();
		playBgSound();	
}

function playBallSound(){
	let audio = document.createElement('audio');
	audio.src = 'sounds/pop.mp3';
	audio.play();
}

function playBgSound(){
	let audioBg = document.getElementById('audio');
	let playPromise = audio.play();

    if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
    })
    .catch(error => {
      // Auto-play was prevented
    });
  }
}

function updateScore(){
	for(let i=0;i<scores.length;i++){
		scores[i].textContent = num;
	}
}

function startGame(){
	restartGame();
	let timeout=0;
	let loop = setInterval(function(){
		timeout=Math.floor(Math.random()*600-100);
		//console.log(timeout);
		if(!gameOver && num !==total){
			createBalloon();
		}else if(num !== total){
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display = 'block';
		}else{
			clearInterval(loop);
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display = 'block';
		}
		
	}, 800+timeout);
}
function restartGame(){
	let forRemoving = document.querySelectorAll('.balloon');
	for(let i=0; i<forRemoving.length;i++){
		forRemoving[i].remove();
	}
	gameOver = false;
	num=0;
	updateScore();
}
//event delegation: add eventListener to the whole page.
document.addEventListener('click', function(event){
	//console.log(event);
	//If you pop the balloon, it'll be deleted.
	if(event.target.classList.contains('balloon')){
		deleteBalloon(event.target);
	}
})

document.querySelector('.restart').addEventListener('click',function(){
	totalShadow.style.display='none';
	totalShadow.querySelector('.win').style.display='none';
	totalShadow.querySelector('.lose').style.display ='none';
	startGame();
})

document.querySelector('.cancel').addEventListener('click',function(){
	totalShadow.style.display='none';
})

 startGame();
