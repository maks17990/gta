'use strict';
/**
 * Manage Weather time.
 */

const cicleTime = 30; // Change that to your day cicle in real life minutes
const timeInGame = cicleTime/24;
const cicleUpdate = timeInGame*60 *1000;

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

	if(timeInGame < 1){
		calcTime = Math.floor(seconds/timeInGame) % 60; //does not work
	}else{
		calcTime = Math.floor(minutes/timeInGame) % 24;	
	}
	
	if(calcTime==0 || calcTime==12){
		const randomWeather = Math.floor(Math.random() * customWeathers.length);  
    	mp.world.weather = customWeathers[randomWeather];
	}	

	mp.world.time.hour = calcTime;
	setTimeout(changeWeather, cicleUpdate);
}

changeWeather();