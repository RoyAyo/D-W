//Define all variables

//define all variables to prevent errors
var player_number,computer_number,querier,table,com,thinktime,dead,wounded,me,check,x,y,q,m,n;

var computer_query = new Array();
var player_query = new Array();
var dead = new Array();
var wounded = new Array();
var dead=["x","x","x","x"]
var wounded=new Array();
/////////////////

//
var manner=1
thinktime=1500
check=1
chek=1

/////////////////
querier=document.getElementById('submit');
var play_number=document.getElementById("players_number");
var answerer = document.getElementById("ans")

function game(){
	player_number=play_number.value;
	event.preventDefault()
	let a0=player_number[0];
	let a1=player_number[1];
	let a2=player_number[2];
	let a3=player_number[3];

	///////////////////////////////////

	if (player_number.length != 4) {
		alert("please enter four digits number");
		return false
	}	
	if (a0 == a1 || a1==a2 || a2==a3 || a0 == a3 || a1==a3 || a0==a2 ) {
		alert("do not repeat numbers");
		return false;
	}
	querier.value=="players_number" ? savenumber():query()        //I finally used ternary.......save the number and query the com

	
	/////////////////////////////

	//the functions..........
	function savenumber(){
		player_query.push(player_number);
		play_number.placeholder="query_computer";
		querier.value="query_computer";
		play_number.value="";
		alert("your number has been saved,Start the game")
		comp()

	}
	function query(){
		//everything is happening in this query
		player_query.push(player_number);
		dead_wound()
		alert(x+"D"+y+"W")
		let tr=document.createElement("tr");
		let td1=document.createElement("td");
		let td2=document.createElement("td");
		let td3=document.createElement("td");
		table = document.getElementsByClassName("table");
		table[0].appendChild(tr);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		let number=document.createTextNode(player_number);
		td1.appendChild(number);
		td2.appendChild(document.createTextNode(x + "D" + y + "W"));
		td3.appendChild(document.createTextNode("-"));
		if (thinktime== 1500 || thinktime == 3000) {
		var think=setInterval(function(){clearInterval(think);alert("chill")},1000)
		}
		else if (thinktime == 4500 || thinktime == 6000) {
		var think=setInterval(function(){
			clearInterval(think);
			alert("It is getting harder")
		
		},1000)
		}
		submit.disabled="disabled"
		com=setInterval(computer,thinktime)
	}
	///////dead and wounded
}
function shownumber(){
	alert("your number is " + player_query[0]);
	//alert("my number is " + computer_query[0]);
}


//for the computer functions

function comp(){
	//com pick  number
	me=String(Math.floor(Math.random() * 10000))
	let a0=me[0];
	let a1=me[1];
	let a2=me[2];
	let a3=me[3];

	///////////////////////////////////

	if (me.length != 4) {
		return comp();
	}	
	if (a0 == a1 || a1==a2 || a2==a3 || a0 == a3 || a1==a3 || a0==a2 ) {
		return comp();
	}
	computer_query.push(me);
}

function computer(){
	clearInterval(com);
	//pick random query numbers
	switch(manner){
		case 1:
			me=shuffler("1234")
			break
		
		case 2:
			me=shuffler("5789")
			break
		
		case 3:
			me = String(Math.floor(Math.random() * 10000))
			break
		
		default:
			computer_thoughts()		
	}
	
	let a0=me[0];
	let a1=me[1];
	let a2=me[2];
	let a3=me[3];

	///////////////////////////////////

	if (me.length != 4) {
		return computer();
	}	
	if (a0 == a1 || a1==a2 || a2==a3 || a0 == a3 || a1==a3 || a0==a2 ) {
		return computer();
	}
	manner++
	computer_query.push(me);
	alert("computer queries " + me)
	answerer.style.display = "";
	document.getElementById("com_query").innerHTML = "computer queries " + me;
	/////
}
function record(){
		let tr=document.createElement("tr");
		let td1=document.createElement("td");
		let td2=document.createElement("td");
		let td3=document.createElement("td");
		table = document.getElementsByClassName("table");
		table[0].appendChild(tr);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		let number=document.createTextNode(me);
		td1.appendChild(number);
		td2.appendChild(document.createTextNode("-"));
		td3.appendChild(document.createTextNode(q));
		if (thinktime < 6000){
			thinktime+=300;
		}
		submit.disabled=""
		document.getElementById("daw").value = ""
		play_number.value = ""

}
function dead_wound(){
	x=0
	y=0
	let queried = player_query[check];
	let query_with = computer_query[0];
	for (let i = 0; i < 4; i++) {
	let an = queried.charAt(i);
		for (let a = 0; a< 4; a++) {
			let nu = query_with.charAt(a)
			if (an==nu) {
				if (queried.indexOf(an)==query_with.indexOf(nu)) {
					x+=1
				}
				else{
					y+=1
				}
			}
		}
	}
	if (x==4){
		alert("We will meet again.....You win")
		document.getElementById("container").innerHTML = "Thank you for playing"
	}

	check+=1
}
function answer(){
	event.preventDefault();
	q = document.getElementById("daw").value.toUpperCase()
	m=0
	n=0
	let query_with = computer_query[chek];
	let queried = player_query[0];
	for (let i = 0; i < 4; i++) {
		let an = queried.charAt(i);
		for (let a = 0; a< 4; a++) {
			let nu = query_with.charAt(a)
			if (an==nu) {
				if (queried.indexOf(an)==query_with.indexOf(nu)) {
					m+=1
					dead[queried.indexOf(an)] = an
				}
				else{
					n+=1
					if (!wounded.includes(an)) {
						wounded.push(an)
					}
				}
			}
		}
	}
	let w = String(m+"D"+n+"W")
	if (q.length!=4 && q.length!=2) {
		alert("please input four digits,using FORMAT xDyW")
		return false
	}
	if (!q.match(/\dD\dW/i) && !q.match(/\dD/) && !q.match(/\dW/)) {
		alert("please use FORMAT xDyW,Use Zero dead and Zero Wounded for empty values")
		return false
	}
	let f = "0D"
	if (q.match(/\dD\dW/i)) {}
	else if (q.match(/\dD/)) {q+="0W"}
	else if (q.match(/\dW/)) {q=f+q}
	if (Number(q[0]) + Number(q[2]) > 4) {
		alert("Your values cannot be more than four")
		return false
	}
	if (q!=w) {
		alert("please check values again,do not cheat")
		return false
	}
	if (q=="4D0W") {
		alert("bounced,The computers number is " + computer_query[0])
		q="Bounced"
		document.getElementById("container").innerHTML = "Thank you for playing"	
	}
	chek+=1
	answerer.style.display="none";
	record()
}

///////how the computer thinks
function computer_thoughts(){
	if (!dead.includes("x")) {
		//The computer has all your values
		//either get it once or shuffle for fairness sake
		me = dead.join("")
		let exp=["kill","chill","kill","chill"]
		let t = Math.floor(Math.random()*exp.length)
		let act = exp[t]
		act=="kill" ? me=shuffler(me):""
	}
	else{
		me = wounded.join("");
		let r =  4 - wounded.length; //pick the remaining random numbers
		let sqr = new Array()
		let j=0
		for(let i=0;i<r;){
			let n = Math.floor(Math.random()*10)
			if (!sqr.includes(n)  && !wounded.includes(n)) {
				sqr.push(n)
				j++
				i++
			}
		}
		me+=sqr.join("")
		me = shuffler(me)
	}
}
function shuffler(item){
	let arr=item.split("")
	let sqr = new Array()
	let j=0
	for(let i=0;i<4;){
		let n = Math.floor(Math.random()*4)
		if (!sqr.includes(n)) {
			arr[j]=item[n]
			sqr.push(n)
			j++
			i++
		}
	}
	
	item=arr.join("")
	return item
}