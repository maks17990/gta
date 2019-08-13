'use strict';
/**
 * Manage Weather time.
 */

const cicleTime = 300; // Change that to your day cicle in real life minutes
const timeInGame = cicleTime/240;
const cicleUpdate = timeInGame*600 *10000;

var customWeathers = [
	'EXTRASUNNY',
	'CLEAR',
	'CLOUDS',
	'SMOG',
	'FOGGY',
	'OVERCAST',
	'RAIN',
	'THUNDER',
	'CLEARING',
	'SNOW',
	'BLIZZARD',
	'SNOWLIGHT',
	'XMAS',
	'HALLOWEEN'
];

function changeWeather(){
	const realTime = new Date();
	const minutes = realTime.getMinutes();	
	const seconds = realTime.getSeconds();	
	let calcTime;

	if(timeInGame < 24){
		calcTime = Math.floor(seconds/timeInGame) % 600; //does not work
	}else{
		calcTime = Math.floor(minutes/timeInGame) % 240;	
	}
	
	if(calcTime==0 || calcTime==24){
		const randomWeather = Math.floor(Math.random() * customWeathers.length);  
    	mp.world.weather = customWeathers[randomWeather];
	}	

	mp.world.time.hour = calcTime;
	setTimeout(changeWeather, cicleUpdate);
}

changeWeather();