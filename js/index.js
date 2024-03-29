
let homeTitles = ['THE MAGIC WALLPAPER','HANDSAWAY',
					'IT\'S JUST THE BELL','WHY SO SERIOUS',
					'SPARKS IN COLORS','THE IMPOSSIBLE',
					'THE SOUND OF SLIVER','CROSSING AT OWN RISK'];
// 点击切换视频 传入true左
function toggleslide(direction){
	clearTimeout(clicktimer);
	clicktimer = setTimeout(function(){
		if(hasRemove){				// 防抖
			hasRemove=false;	
			clearInterval(timer);
			slideVideos(direction,()=>{
				$('.home-title h1').eq(index).textillate('in');	// 视频完全撤场之后显示title
				hasRemove = true;
				loopTimer();
			});
		}
	}, 1000);
}

// 视频自动轮播
function loopTimer(){
	timer = setInterval(function(){
		slideVideos(false,()=>{
			$('.home-title h1').eq(index).textillate('in');	// 视频完全撤场之后显示title
		});
	}, 5000);
}

function stopIndexTimer(){
	clearInterval(timer);
}

// 切换视频 ,callback 切换回调，direction 方向true左
function slideVideos(direction,callback){		
	$('.home-title h1').eq(index).textillate('out');		// 当前视频标题隐藏
	disanima('out');						//discover按钮
	if(direction){
		videos[index--].removeVideo(callback);	//当前视频隐藏
	}else{
		videos[index++].removeVideo(callback);	//当前视频隐藏
	}
	if(index==videos.length){
		index=0;
	}
	if(index<0){
		index = videos.length-1;
	}
	videos[index].showVideo();
}

// discover 按钮显示隐藏动画效果
function disanima(eff){
	if(eff === 'in'){
		anime({													// discover 按钮隐藏
			targets: '.discover',
			scale: '1',
			opacity: '1'
		});
		$('.description').fadeIn(400);
	}else if(eff === 'out'){
		anime({													// discover 按钮隐藏
			targets: '.discover',
			scale: '1.2',
			opacity: '0'
		});

		$('.description').fadeOut(400);
	}
}

function initHomeTitle(){
	// homeTitles.forEach((e,index)=>{
	// 	createTitle(e);
	// })
	createTitle(homeTitles[0]);
	createTitle(homeTitles[1],'fadeInLeft');
	createTitle(homeTitles[2],'fadeInLeft','fadeOutLeft');
	createTitle(homeTitles[3],'fadeInRightBig','fadeOutLeftBig');
	createTitle(homeTitles[4],'fadeInRightBig','fadeOutLeftBig');
	createTitle(homeTitles[5],'fadeInRightBig','fadeOutLeftBig');
	createTitle(homeTitles[6],'fadeInRightBig','fadeOutLeftBig');
	createTitle(homeTitles[7],'fadeInRightBig','fadeOutLeftBig');
}

// 创建首页标题对象
function createTitle(title,ineffect,outeffect){
	 $('.home-title').append(`<h1>${title}</h1>`);

	 $('.home-title h1').textillate({
				  // the default selector to use when detecting multiple texts to animate
				  selector: 'h1',
				  loop: false,
				  // sets the minimum display time for each text before it is replaced
				  minDisplayTime: 800,
				  // sets the initial delay before starting the animation
				  // (note that depending on the in effect you may need to manually apply
				  // visibility: hidden to the element before running this plugin)
				  initialDelay: 0,
				  // set whether or not to automatically start animating
				  autoStart: false,
				  // custom set of 'in' effects. This effects whether or not the
				  // character is shown/hidden before or after an animation
				  // inEffects: [],
				  // custom set of 'out' effects
				  // outEffects: [ 'fade' ],
				  // in animation settings
				  in: {
				      // set the effect name
				    effect: ineffect||'fadeInRightBig',
				    // set the delay factor applied to each consecutive character
				    delayScale: .3,
				    // set the delay between each character
				    delay: 50,
				    // set to true to animate all the characters at the same time
				    sync: false,
				    // randomize the character sequence
				    // (note that shuffle doesn't make sense with sync = true)
				    shuffle: true,
				    // reverse the character sequence
				    // (note that reverse doesn't make sense with sync = true)
				    reverse: false,
				    // callback that executes once the animation has finished
				    callback: function () {
				    	disanima('in');	
				    }
				  },
				  // out animation settings.
				  out: {
				    effect: outeffect||'fadeOutLeftBig',
				    delayScale: .3,
				    delay: 50,
				    sync: false,
				    shuffle: false,
				    reverse: false,
				    callback: function () {
				    }
				  },
				  // callback that executes once textillate has finished
				  callback: function () {},
				  type: 'char'
		});
}

function clearPage(){
	$('.page').empty();
	$(document).off();
	$(window).off();
}

function loadTransitionAnim(callback,doneCallback){
	anime({
	  targets: '.green',
	  translateY: '-100%',
	  easing: 'easeInOutExpo',
	  duration: 1100,
	  complete: ()=> {clearPage()
	  loadingDone(callback,doneCallback)}
	});
	anime({
	  targets: '.black',
	  translateY: '0%',	
	  easing: 'easeInOutExpo',
	  delay: 100,
	  duration: 1000,
	  complete: function(){
	  	anime({
		  targets: '.black',
		  translateY: '-100%',
		  easing: 'linear',
		  duration: 300,
		  complete: ()=>{
		  	
		  	$('.green,.black').css('transform','translateY(100%)');
		  }
		})
	  }
	});
}

window.onload = () => {
	// clearPage();
	// $('.page').empty();
	// loadTransitionAnim(()=>{		
	// 	loadDetailPage('.page');
	// });
	loadingDone(()=>{
		loadIndex();
	},()=>{
		startLoop();
	});
}

$('.works').click(()=>{
	loadTransitionAnim(()=>{
		$('.page').append(pageWorkHtml);
		$('.component .list').hide().fadeIn(800);
		$('.pattern').css({'visibility': 'visible'});
		loadItems();
		$(document).trigger('scroll');
	});
	stopIndexTimer();
});

function indexBindEvent(){
	$('.discover').click(()=>{
		loadTransitionAnim(()=>{
			loadDetailPage('.page');
		});
	});

	$('.controls.right').click( ()=>toggleslide(false));
	$('.controls.left').click( ()=>toggleslide(true));
}

$('.logo').click(()=>{
	loadTransitionAnim(loadIndex,startLoop);
});
$('.danparis').click(function(event) {
	loadTransitionAnim(()=>{
		loadAbout();
		danBindEvent();
	
		$('.component .list').hide().fadeIn(800);
		$('.pattern').css({'visibility': 'visible'});
		loadItems();
	});
	stopIndexTimer();
});

function startLoop(){
	$('.home-title h1').eq(index).textillate('in');	
	$('.pattern')[0].style.visibility = 'visible'; // 显示方块蒙版
	loopTimer();
}

function loadIndex(){
	$('.page').append(pageHomeHtml);
	index = 0;
	hasRemove = true;
	initHomeTitle();
	indexBindEvent();
	videos = [new vidbg('.videos', {
		      mp4: 'media/1.mp4',
		      overlay: false
	}, {}),
	new vidbg('.videos', {
		      mp4: 'media/2.mp4',
		      overlay: false
	}, {}),
	new vidbg('.videos', {
		      mp4: 'media/3.mp4',
		      overlay: false
	}, {}),
	new vidbg('.videos', {
		      mp4: 'media/4.mp4',
		      overlay: false
	}, {}),
	new vidbg('.videos', {
		      mp4: 'media/5.mp4',
		      overlay: false
	}, {}),
	new vidbg('.videos', {
		      mp4: 'media/6.mp4',
		      overlay: false
	}, {}),
	new vidbg('.videos', {
		      mp4: 'media/7.mp4',
		      overlay: false
	}, {}),
	new vidbg('.videos', {
		      mp4: 'media/8.mp4',
		      overlay: false
	}, {})];
}
var videos;
var index = 0;		// 视频轮播下标
var timer;
var hasRemove = true;
var clicktimer ;

/* HOME PAGE*/
var pageHomeHtml = 	'<div class="videos" style="height: 100%;width: 100%"></div>'
	pageHomeHtml += '<div class="pattern"></div>'
	pageHomeHtml += '<div class="controls right"></div>'
	pageHomeHtml += '<div class="controls left"></div>'
	pageHomeHtml += '<div class="titles">'
	pageHomeHtml += ' 	<div class="home-title">'
	pageHomeHtml += ' 		<div class="description">'
	pageHomeHtml += ' 			<div class="client">DAN</div>'
	pageHomeHtml += '           <div class="hashtags">#instagram #ecology #consciousness #toolate #influencers #WWF</div>'
	pageHomeHtml += '		</div>'
	pageHomeHtml += '	</div>'
	pageHomeHtml += '</div>'
	pageHomeHtml += '<a href="javascirp:void()" id="home-discover">'
	pageHomeHtml += ' 	<div class="discover">'
	pageHomeHtml += ' 		<span class="arrow" ></span>'
	pageHomeHtml += '   	<!-- react-text: 71 -->discover<!-- /react-text -->'
	pageHomeHtml += '	</div>'
	pageHomeHtml += '</a>'


