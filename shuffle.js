var nextChild = 0;
var tiles = []


$(function() {
	$("#rack").sortable({tolerance:"pointer",cursor:"move"});
	});
	
function renderTiles() {
	var rack = document.getElementById("rack");
	rack.innerHTML = "";
	var sideLength = tiles[0].width;
	var margin = 10;
	for (i = 0; i < tiles.length; i++) {}
		
}
function dragover(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    var source = document.getElementById(data);
    ev.target.parentNode.insertBefore(source, ev.target);
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
}

function key(ev) {
	var input = document.getElementById('lettersEntered');
	var letter = input.value;
	//if (ev.keyCode==13) { //enter pressed
	//} else if (ev.keyCode==27) {
	//}

	//if ((ev.keyCode>=65 && ev.keyCode<=90) || (ev.keyCode==191 && ev.shiftKey==true)) { // alpha character or '?' entered
	if (/[a-z\?]/i.test(letter)) { // alpha character or '?' entered
		var rack = document.getElementById('rack');
		var letter = input.value;
		if (/[a-z\?]/i.test(letter)) addTile(rack,letter);
	}
	input.value="";
}
function addTile(rack,letter) {
	var tile = createTile(letter);
	rack.appendChild(tile);
	//$( "#tile" ).draggable();
}
function createTile(letter) {
	var tile = document.createElement('DIV');
	//var tileHolder = document.createElement("DIV");
	//tile.appendChild(tile);
	tile.setAttribute('draggable','true');
	tile.setAttribute('class','tile');
	tile.setAttribute('ondragstart','drag(event)');
	tile.setAttribute('ondragover','dragover(event)');
	tile.setAttribute('ondrop','drop(event)');
	tile.setAttribute('onclick','pin()');
	//tile.setAttribute('id',++nextChild);
	tile.innerHTML=letter;
	//$(tile).draggable();
	//tile.setAttribute('ontouchstart','touchstart()');
	//tileHolder.setAttribute('id',"holder" + ++nextChild);
	//zoom = new ZoomView(tileHolder,"#nextChild");
	//tile.addEventListener("touchstart",touchStart,false);
	
	var sortableTile = document.createElement('DIV');
	sortableTile.setAttribute('class','tile');
	sortableTile.innerHTML=letter;
	sortableTile.setAttribute('onclick','pin()');
	sortableTile.setAttribute("id",++nextChild);
	//document.getElementById("sortableRack").appendChild(sortableTile);
	return sortableTile;
}
function shuffle() {
	var rack = document.querySelectorAll('.tile,.pinnedTile');
	var newRack = [], rackArray = [];
	var rackString = '';
	
	for (var i = 0; i < rack.length; i++) {
		var tile = rack[i];
		if (tile.getAttribute('class')=='tile') {
			rackArray.push(tile);
		} else {
			newRack[i] = tile;
		}
	}
	
	var i = 0;
	while (rackArray.length>0) {
		while (newRack.length>=i && newRack[i]) i++;
		var r = Math.round(Math.random())*(rackArray.length-1);
		newRack[i++]=rackArray[r];
		rackArray.splice(r,1);
	}
	
	var rack = document.getElementById("rack");
	rack.innerHTML = "";
	for (var i = 0; i < newRack.length; i++) {
		rack.appendChild(newRack[i]);
		rackString += newRack[i].innerText;
	}
	addToHistory(rackString);
		
}

function pin() {
	var tile = window.event.srcElement;
	if (tile.getAttribute('class')=='tile') {
		tile.setAttribute('class','pinnedTile')
	} else {
		tile.setAttribute('class','tile')
	}
}

function addToHistory(str) {
	var history = document.getElementById("history").innerHTML;
	if (history.indexOf(str + '<br>')<0) {
		history = str + '<br>' + history;
		document.getElementById("history").innerHTML = history;
	}
}

function touchStart(ev) {
	alert('touch started');
}