chrome.browserAction.setBadgeBackgroundColor({color:"#F235B5"});
streamIsLive = false;

function checkIfLiveStream(){
	var xhr = new XMLHttpRequest();
	var channelID = "UCoEcT21TstAeHpG56WqOnGw"; // change HERE
	var key = "AIzaSyCarEIP0tK-A-H2Gv9lx9vE4Xy6ETexDiM"; // change HERE
	xhr.open("GET", "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId="+channelID+"&type=video&eventType=live&key="+key);
	xhr.onload = function(){
		if(xhr.status >= 200 && xhr.status < 400){
			var data = JSON.parse(xhr.responseText);
			switch(data.pageInfo.totalResults){
				case 1:
					setLiveOn();
					break;
				case 0:
					setLiveOff();
					break;
				default:
					break;
			}
		}
	};
	xhr.onerror = function(e){
		console.log(e);
	};
	xhr.send(null);
}

function setLiveOn(){
	if(!streamIsLive){
		streamIsLive = true;
		chrome.browserAction.setTitle({title:"Da Stream Iz Live bitchiezzz"}); // change HERE
		chrome.browserAction.setBadgeText({text:"ON"});
		chrome.browserAction.setIcon({
			path:{
				"19":"ressources/streamOn/streamOn19.png",
				"38":"ressources/streamOn/streamOn38.png"
			}
		});
	}
}

function setLiveOff(){
	if(streamIsLive){
		streamIsLive = false;
		chrome.browserAction.setBadgeText({text:""});	
		chrome.browserAction.setTitle({title:"Salade & Paté iz offline :sad:"}); // change HERE
		chrome.browserAction.setIcon({
			path:{
				"19":"ressources/streamOff/streamOff19.png",
				"38":"ressources/streamOff/streamOff38.png"
			}
		});
	}
}

checkEveryNMinutes = 5;
setInterval(checkIfLiveStream, checkEveryNMinutes*60000);

document.addEventListener('DOMContentLoaded', function(){
  checkIfLiveStream();
});
chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.create({ url: "http://saladepate.fr" });
});
chrome.notifications.onClicked.addListener(function(){
	chrome.tabs.create({ url: "http://saladepate.fr" });
});