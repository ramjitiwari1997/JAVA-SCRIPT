var counter=30;
window.addEventListener("load",bindEvents);
var objects=null;
function bindEvents()
{
	document.getElementById("submitadmin").addEventListener("click",checkAdmin);
	document.getElementById("submituser").addEventListener("click",checkUser);
	document.getElementById("backadmin").addEventListener("click",backHome);
	document.getElementById("backuser").addEventListener("click",backHome);
	document.getElementById("addquestion").addEventListener("click",addQuestion);
	document.getElementById("adminlogin").addEventListener("click",adminLogin);
	document.getElementById("userlogin").addEventListener("click",userLogin);
	document.getElementById("next").addEventListener("click",nextQuestion);
	document.getElementById("previous").addEventListener("click",previousQuestion);
	document.getElementById("submit").addEventListener("click",resultShow);
	document.getElementById("save").addEventListener("click",afterEdit);
	
	document.getElementById("save").style.display="none";
	document.getElementById("user").style.display="none";
	document.getElementById("admin").style.display="none";
	document.getElementById("submit").style.display="none";
	document.getElementById("adminhome").style.display="none";
	document.getElementById("questionoperation").style.display="none";
	document.getElementById("userquestion").style.display="none";
	document.getElementById("showResult").style.display="none";
	loadRecords();
	
	document.getElementById("a").addEventListener("click",checkOption);
	document.getElementById("b").addEventListener("click",checkOption);
	document.getElementById("c").addEventListener("click",checkOption);
	document.getElementById("d").addEventListener("click",checkOption);
	
	
	
	
}
indexValue=0;
function adminLogin(){
    document.getElementById("home").style.display="none";
	document.getElementById("admin").style.display="block";
	
}
function userLogin(){
	document.getElementById("home").style.display="none";
	document.getElementById("user").style.display="block";
}
function checkAdmin()
{
	var username=document.getElementById("adminname").value;
	var password=document.getElementById("adminpassword").value;
	var x=document.getElementById("status");
	if(username==password)
		{
			document.getElementById("admin").style.display="none";
		   document.getElementById("adminhome").style.display="block";
			document.getElementById("questionoperation").style.display="block";
			x.style.color="green";
			x.innerHTML="welcome  "+username;
		}
	else{
		x.style.color="red";
		x.innerHTML="invalid username or password"
	}
	
}
function checkUser(){
	var username=document.getElementById("username").value;
	var password=document.getElementById("userpassword").value;
	var x=document.getElementById("status");
	if(username==password)
		{
		document.getElementById("user").style.display="none";
			x.style.color="green";
		    x.innerHTML="welcome  "+username;
			if(objects==null)
				{
					alert("no examination is in this Time")
				}
			else{
			document.getElementById("userquestion").style.display="block";
			printQuestion();
		TimerConfig.setTimer();
				colorAttempted();
			}
		}
		else{
		x.style.color="red";
	x.innerHTML="invalid username or password";
		}
	
}
function backHome()
{
	document.getElementById("user").style.display="none";
	document.getElementById("admin").style.display="none";
	document.getElementById("home").style.display="block";
}
function addQuestion()
{
	var question=document.getElementById("question").value;
	var option1=document.getElementById("option1").value;
	var option2=document.getElementById("option2").value;
	var option3=document.getElementById("option3").value;
	var option4=document.getElementById("option4").value;
	var correctans=document.getElementById("correctans").value;
	queOperations.addNewQue(question,option1,option2,option3,option4,correctans);
	printRecord(queOperations.queArr[queOperations.queArr.length-1]);
	saveRecords();
	clearField();
	document.getElementById("questiontable").value="";
}
function printRecord(queObject)
{ 
	//console.log(queObject.del);
	var tbody=document.getElementById("tbody");
	var row=tbody.insertRow();
	index=0;
	for(key in queObject)
		{ 

			row.insertCell(index).innerHTML=queObject[key];
			index++;
}
	              var del=readyForDelete(queObject);
					row.insertCell(index).appendChild(del);
	var edit=readyForEdit(queObject);
	row.insertCell(index).appendChild(edit);
}
function printRecords(queArray)
{
	var tbody=document.getElementById("tbody");
	tbody.innerHTML="";
	queArray.forEach(printRecord);
	
}
function saveRecords()
{
	if(browserSupport())
		{
			var json=JSON.stringify(queOperations.queArr);
	        localStorage.mydata=json;
		}
	
}
function loadRecords()
{
	if(browserSupport())
		{
			if(localStorage.mydata)
				{
		    objects=JSON.parse(localStorage.mydata);
			queOperations.queArr=objects;
			printRecords(queOperations.queArr);
			//console.log(queOperations.queArr[0].del instanceof Element);
					
				}
			else{
				alert("can't load the data");
			}
		
}
}
	function browserSupport()
	{
		if(!localStorage)
			{
				alert("can't save your browser is outdated");
				return false;
			}
				return true;
			
	}
function nextQuestion()
{ 
	if(indexValue==queOperations.queArr.length-1)
	{
		document.getElementById("next").style.display="none";
		document.getElementById("previous").style.display="block"
		
	}
 else{
	indexValue++;
	 printQuestion();
	  
 }
}
function previousQuestion()
{
	document.getElementById("submit").style.display="none";
	if(indexValue==0)
		{
			document.getElementById("previous").style.display="none";
			document.getElementById("next").style.display="block";
		}
	else{
		indexValue--;
		printQuestion();
	}
}
function printQuestion(){
	
	if(indexValue==0)
		{
			document.getElementById("previous").style.display="none";
		}
	else if(indexValue>0&&indexValue<queOperations.queArr.length-1)
		{
			document.getElementById("next").style.display="block";
			document.getElementById("previous").style.display="block";
			document.getElementById("submit").style.display="none";
			
		}
	else{
		document.getElementById("next").style.display="none";
		document.getElementById("submit").style.display="block";
	}
	var questionpara=document.getElementById("questionpara").innerHTML=queOperations.queArr[indexValue].queno+"  "+queOperations.queArr[indexValue].question;
	document.getElementById("optn1p").innerHTML=queOperations.queArr[indexValue].option1;
	document.getElementById("optn2p").innerHTML=queOperations.queArr[indexValue].option2;
	document.getElementById("optn3p").innerHTML=queOperations.queArr[indexValue].option3;
	document.getElementById("optn4p").innerHTML=queOperations.queArr[indexValue].option4;
	optionStable();
}
 function checkOption()
{
	var x=document.getElementsByName("option");
	var table=document.getElementById("colortable");
	for(var i=0;i<x.length;i++)
		{
if(x[i].checked)
	{	if(ansOperation.ansArr[indexValue]!=null)
		{
			x[i].checked=false;
			table.rows[0].cells[indexValue].style.backgroundColor="white";
			ansOperation.ansArr[indexValue]=null;
		}
	 else
		{
		table.rows[0].cells[indexValue].style.backgroundColor="green";
		ansOperation.addAns(indexValue,x[i].value);
		}
	                         }
		                 }
                    }       



function optionStable()
{
	var x=document.getElementsByName("option");
	for(var i=0;i<x.length;i++)
	if(ansOperation.ansArr[indexValue]==null)
		{
			x[i].checked=false;
		}
	else{
		document.getElementById(ansOperation.ansArr[indexValue]).checked=true;
	}
}
 function resultShow()
{ 
	var length=queOperations.queArr.length;
	var totalNoOfQuestion=length;
	var attempt=0;
	var right=0;
	var wrong=0;
	for(var i=0;i<length;i++)
		{
			if(ansOperation.ansArr[i]!=null)
				{
					if(ansOperation.ansArr[i]==queOperations.queArr[i].correctAns)
						{
							
							right++;
						}
					else{
						wrong++;
					}
					attempt++;
				}
		}
	document.getElementById("userquestion").style.display="none";
 document.getElementById("showResult").style.display="block";
	document.getElementById("noofquestion").innerHTML="NO. OF QUESTIONS:"+length;
    document.getElementById("attempt").innerHTML="NO. OF ATTEMPTED QUESTIONS :"+attempt;
 document.getElementById("right").innerHTML="NO. OF RIGHT ANSWERS :"+right;
 document.getElementById("wrong").innerHTML="NO. OF WRONG ANSWERS:"+wrong;
	
}
    

var TimerConfig=
	{
	TimeVar:null,
 setTimer:function()
{	
this.TimerVar=setInterval(this.getTimer,1000);
},
getTimer:function()
{  if(counter===0)
	{
		resultShow();
		console.log(counter);		
		clearInterval(this.TimeVar);		
	}
 else
	 {
	document.getElementById("timer").innerHTML="Time Left:   "+counter+"sec";
	counter--;
	 }
 
},
}
function colorAttempted()
{
	var table=document.getElementById("colortable");
	var row=table.insertRow(0);
	for(var i=0;i<queOperations.queArr.length;i++)
		{
			row.insertCell(i).innerHTML=i+1;
		}
}
function readyForDelete(obj){
	var img=document.createElement("img");
	img.src="images/Delete.png";
	img.setAttribute("obj",JSON.stringify(obj));
	img.addEventListener("click",Delete);
	return img;
}
function Delete(event)
{
	var obj=JSON.parse(event.srcElement.getAttribute("obj"));
	console.log(obj.queno);
	queOperations.queid(obj.queno);
	queOperations.deleteQue();
	saveRecords();
	loadRecords();
	
}
function readyForEdit(obj){
	
	var img=document.createElement("img");
	img.src="images/edit.png";
	img.setAttribute("obj",JSON.stringify(obj));
	img.addEventListener("click",Edit);
	return img;
}
function Edit(event){
	var  obj=JSON.parse(event.srcElement.getAttribute("obj"));
	console.log(obj.question);
	document.getElementById("addquestion").style.display="none";
	document.getElementById("save").style.display="block";
	document.getElementById("question").value=obj.question;
	document.getElementById("option1").value=obj.option1;
	document.getElementById("option2").value=obj.option2;
	document.getElementById("option3").value=obj.option3;
	document.getElementById("option4").value=obj.option4;
	document.getElementById("correctans").value=obj.correctAns;
	queOperations.queid(obj.queno);
	console.log(queOperations.queid1);
}
function afterEdit(){
var question=	document.getElementById("question").value;
	var option1=document.getElementById("option1").value;
	var option2=document.getElementById("option2").value;
	var option3=document.getElementById("option3").value;
	var option4=document.getElementById("option4").value;
	var correctans=document.getElementById("correctans").value;
	queOperations.editQue(question,option1,option2,option3,option4,correctans);
	saveRecords();
	loadRecords();
	clearField();
	document.getElementById("save").style.display="none";
	document.getElementById("addquestion").style.display="block";
	
	
}
function clearField(){
	document.getElementById("question").value="";
	document.getElementById("option1").value="";
	document.getElementById("option2").value="";
	document.getElementById("option3").value="";
	document.getElementById("option4").value="";
	document.getElementById("correctans").value="";
}