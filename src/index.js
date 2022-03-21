// https://www.youtube.com/watch?v=2UBKjshUwM8
import { component } from "./component";

component();

import KUTE from 'kute.js'

/*  BACKGROUND POSITION EXAMPLE  */
var bgPos = document.getElementById('bgPos'),
	bgBox = bgPos.querySelector('.example-box'),
	bgb = bgPos.querySelector('.btn'),	
	bpTween = KUTE.to(bgBox, {backgroundPosition: ['0%','50%']}, { yoyo: true, repeat: 1, duration: 1500, easing: 'easingCubicOut'});
	
bgb.addEventListener('click', function(e){
	e.preventDefault();
	!bpTween.playing && bpTween.start();
},false);	
/*  BACKGROUND POSITION EXAMPLE  */