function Operations(queno,question,option1,option2,option3,option4,correctAns){
	this.queno=queno;
	this.question=question;
	this.option1=option1;
	this.option2=option2;
	this.option3=option3;
	this.option4=option4;
	this.correctAns=correctAns;

}
var queOperations={
	queArr:[],
	queid1:0,
		addNewQue:function(question,option1,option2,option3,option4,correctAns)
	{
		var queno=this.queArr.length+1;
		var oprObject= new Operations(queno,question,option1,option2,option3,option4,correctAns);
		this.queArr.push(oprObject);
	},
		editQue:function(question,option1,option2,option3,option4,correctAns){
			var oprObject=new Operations(this.queid1,question,option1,option2,option3,option4,correctAns);
			this.queArr[parseInt(this.queid1)-1]=oprObject;
			
		},
			deleteQue:function(){
				//this.popQue(queid);
				console.log(this.queid1);
				var tempArr=[];
				var index=0;
				
				for(i=0;i<this.queArr.length;i++)
					{
						if(i==parseInt(this.queid1)-1)
							{
								
							}
							else{
						tempArr[index]=this.queArr[i];
								tempArr[index].queno=index+1;
								index++;
							}
					}
				this.queArr=null;
				this.queArr=tempArr;
				
				//console.log("called");
				
			},
	queid:function(queid1){
		this.queid1=queid1;
	},
	popQue:function(queid){
		console.log("calling..");
		for(var i=0;i<this.queArr.length-1;i++)
			{
				console.log("for calling");
				this.queArr[this.queArr.length-i-1]=this.queArr[this.queArr.length-i-2];
				//this.queArr[i].queno=i+1;
			}
		this.queArr.slice(0);
	}
}

var ansOperation={
	ansArr:[],
	addAns:function(qno,option)
	{
	  this.ansArr[qno]=option;
	},
	
}

