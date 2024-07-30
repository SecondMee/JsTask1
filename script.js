//validation

const phoneNum = document.getElementById("empPhone");
phoneNum.addEventListener('keypress',function(event){
	let key = event.key;
	let regex = new RegExp("^[0-9]$");    
// Check if key is in the reg exp
	console.log(regex.test(key));
    if(!regex.test(key)){
        
        // Restrict the special characters
        event.preventDefault();  
        //return false;
    }
});

document.getElementById("empName").addEventListener('keypress',function(event){
	//console.log(event.key);
	//console.log(!checkName(event.key));
	if(!checkName(event.key)){
		event.preventDefault();
	}
});

document.getElementById("empId").addEventListener('keypress',function(event){
	if(!checkId(event.key)){
		event.preventDefault();
	}
});



const formDetails=document.getElementById('myForm');

let myCurrEdit=null;
const idSet = new Set();
let currEnterBtn = false;


//need to create hasmap to store id


function myFunction() {
	event.preventDefault();
	const updateBtn = document.getElementById("updateBtn");
	updateBtn.style.display='none';
	const idCheck=document.getElementById("empId").value;
	if(idSet.has(idCheck)){
		alert("ID already exist");
	}else{
		if(validateForm()){
			console.log("success");
			idSet.add(idCheck);
			reset();
		}
		else{
			alert("You may have not filled the form or given incorrect details");
		}	
	}
}


const formValidation = document.getElementById("myForm");

/*formValidation.addEventListener('focus',function(event){
	switch(event.target.id){
	case "empName" : console.log("ee");
			 break;
	case "empId" : console.log("ifdddd");;
		       break;
	case "empPhone" : console.log("phoneee");
			  break;
	case "status" : console.log("staatussss");
		  	break;
	}
},true);*/

//form validation

formValidation.addEventListener('blur',function(event){
	switch(event.target.id){
	
	/*case "empName" : if(checkName(document.getElementById(event.target.id).value)){
				toggleWarningOff(event.target.id);
			  }else{
				toggleWarningOn(event.target.id);
			 }
			 break;
	case "empId" : if(checkId(document.getElementById(event.target.id).value)){
				toggleWarningOff(event.target.id);
		       }else{
				toggleWarningOn(event.target.id);
		       }
		       break;*/
	case "empPhone" : if(document.getElementById(event.target.id).value=="" || checkPhone(document.getElementById(event.target.id).value)){
				toggleWarningOff(event.target.id);
			  }else{
				toggleWarningOn(event.target.id);
			  }
			  break;
	case "status" : if(checkStatus(document.getElementById(event.target.id).value)){
				toggleWarningOff(event.target.id);
			}else{
				toggleWarningOn(event.target.id);
			}
		  	break;
	}
},true);

function checkName(str){
	return /^[a-zA-Z\s]+$/.test(str);
}

function checkId(str){
    return /^[a-zA-Z0-9]+$/.test(str);
}

function checkPhone(str){
    return /^[0-9]{10}$/.test(str);
}

function checkStatus(value){
	return value!="";
}

function validateForm(){
	const name = checkName(document.getElementById("empName").value);
	const id = checkId(document.getElementById("empId").value);
	const num = checkPhone(document.getElementById("empPhone").value);
	const status = checkStatus(document.getElementById("status").value);
	if(!name){
		toggleWarningOn("empName");
	}
	if(!id){
		toggleWarningOn("empId");
	}
	if(!num){
		toggleWarningOn("empPhone");
	}
	if(!status){
		toggleWarningOn("status");
	}
	const idZero = document.getElementById("empId").value.charAt(0)!='0';
	const numZero = document.getElementById("empPhone").value.charAt(0)!='0';
	/*console.log("vafsalldasdlsadlasldlasdl");
	console.log(idZero);
	console.log(numZero);*/
	return (name && id && num && status && idZero && numZero);
}


function toggleWarningOn(id){
	//console.log(document.getElementById(id).value);
	//console.log(document.getElementById("empNameP").innerHTML);
	//console.log(document.getElementById(id).value=="");
	const paraId=id+"P";
	const ele = document.getElementById(paraId);
	//ele.style.display="block";
	ele.style.visibility="visible";
	ele.style.opacity=1;
}

function toggleWarningOff(id){
	//console.log(document.getElementById(id).value=="");
	const paraId=id+"P";
	const ele = document.getElementById(paraId);
	//ele.style.display="none";
	ele.style.visibility="hidden";
	ele.style.opacity=0;
}


document.getElementById("myForm").addEventListener("keydown",function(event){
	if(event.keyCode === 13){
		const btn = document.getElementById("updateBtn");
		const computedStyle = window.getComputedStyle(btn);
		//console.log(computedStyle.display); 		
		//console.log(computedStyle.display === "none");
		if(computedStyle.display !== "none"){
			event.preventDefault();
			btn.click();
		}
	}
});

function update(){
	if(validateForm()){
		updateFunction();
	}else{
		alert("You may have not filled the form or given incorrect details");
	}

}


function updateFunction(){
	console.log("updateeeeeeeeeeeeeeeeeee");
	const ele = myCurrEdit;
	const eleStatus = document.getElementById("status").value;

	const idUpdate = ele.childNodes[2].childNodes[0].innerHTML.substr(10);
	const newId = document.getElementById("empId").value;
	ele.childNodes[1].childNodes[0].innerHTML = "Name:     "  + document.getElementById("empName").value;
	ele.childNodes[2].childNodes[0].innerHTML =  "ID:       " + document.getElementById("empId").value;
	ele.childNodes[3].childNodes[0].innerHTML = "Phone No: " + document.getElementById("empPhone").value;
	
	console.log(ele.childNodes[1].innerHTML);
	console.log(ele.childNodes[2].innerHTML);

	console.log(ele.childNodes[3].innerHTML);

			
	if(eleStatus == ele.childNodes[4].innerHTML){
		ele.childNodes[1].childNodes[0].innerHTML = "Name:     " + document.getElementById("empName").value;
		ele.childNodes[2].childNodes[0].innerHTML = "ID:       " + document.getElementById("empId").value;
		ele.childNodes[3].childNodes[0].innerHTML = "Phone No: " + document.getElementById("empPhone").value;
	}else{
		ele.remove();
		const element = document.getElementById(eleStatus);
		element.appendChild(ele);
	}	
	ele.childNodes[4].innerHTML = eleStatus;
	ele.style.display="block";
	myCurrEdit=null;
	
	//console.log(idUpdate);
	//console.log(newId);
	if(idUpdate!=newId){
		idSet.add(newId);
		idSet.delete(idUpdate);
	}

	const formDetails2=document.getElementById('myForm');
	for(let x of formDetails2){
		if(x.id!=""){
		x.value="";
		}
	}
	enableButtons();
	toggleOff();
	console.log("--------");
	console.log(ele);
}

function reset(){
	const obj= new Map();
	for(let x of formDetails){
		if(x.id!=""){
		obj.set(x.id,x.value);
		x.value="";
		}
	}
	display(obj.get("status"),obj);
}


function toggleOn(){
	const submitBtn = document.getElementById("submitBtn");
	const resetBtn = document.getElementById("resetBtn");
	const updateBtn = document.getElementById("updateBtn");
	updateBtn.style.display="inline-block";
	submitBtn.style.display="none";
	resetBtn.style.display="none";
}

function toggleOff(){
	const submitBtn = document.getElementById("submitBtn");
	const resetBtn = document.getElementById("resetBtn");
	const updateBtn = document.getElementById("updateBtn");
	updateBtn.style.display="none";
	submitBtn.style.display="inline-block";
	resetBtn.style.display="inline-block";
}

function clearForm(){
	toggleWarningOff("empName");
	toggleWarningOff("empId");
	toggleWarningOff("empPhone");
	toggleWarningOff("status");

}

document.getElementById("resetBtn").addEventListener('click',clearForm);


function display(status,obj){
	const card = document.createElement("div");
	card.classList.add("emp-box");
	
	const element = document.getElementById(status);
	element.appendChild(card);

	const title = document.createElement("h3");
	const titleText = document.createTextNode("Emp Details");
	title.appendChild(titleText);
	card.appendChild(title);

	const edit = document.createElement("button");
	const deleteBtn = document.createElement("button");

	for(const [key,value] of obj.entries()){
		if(key=="status")
			break;
		const para = document.createElement("p");
		const pretag = document.createElement("pre");
		let text="";
		switch(key){
			case "empName" : text= "Name:     " + value;
				        break;
			case "empId" : text= "ID:       " + value;
				       edit.id=value+"edit";
				       deleteBtn.id=value+"delete";
				       break;	
			case "empPhone" : text= "Phone No: " + value;
		}

		const node = document.createTextNode(text);
		pretag.appendChild(node)
		para.appendChild(pretag);
		card.appendChild(para);
	}	
	
	//<p id="storeStatus"></p>
	const ptag = document.createElement("p");
	const ptagText = document.createTextNode(status);
	ptag.id="storeStatus";
	ptag.appendChild(ptagText);
	card.appendChild(ptag);

	edit.className="editButtonC";
	edit.appendChild(document.createTextNode("Edit"));
	card.appendChild(edit);
	
	deleteBtn.className="deleteButtonC";
	deleteBtn.appendChild(document.createTextNode("Delete"));
	card.appendChild(deleteBtn);
	
	
	
	edit.addEventListener('click',toTop);
	edit.addEventListener('click',editDetails);
	deleteBtn.onclick= deleteButton;

	clearForm();

	function toTop(){
		window.scrollTo({top:0,behavior:"smooth"});
	}

	function editDetails(){
		clearForm();
		const computedDisplay = window.getComputedStyle(updateBtn).getPropertyValue('display');
		//console.log(computedDisplay);

		const ele = this.parentNode;
		console.log("editttttttttttttttt");
		console.log(ele.childNodes[1].childNodes[0].innerHTML);
		console.log(ele.childNodes[2].innerHTML);
		console.log(ele.childNodes[3].innerHTML);
		console.log(ele.childNodes[4].innerHTML);
		console.log(ele.childNodes[1].childNodes[0].innerHTML.substr(10));
		console.log(ele.childNodes[2].childNodes[0].innerHTML.substr(10));
		console.log(ele.childNodes[3].childNodes[0].innerHTML.substr(10));
		console.log(ele.childNodes[4].innerHTML);
		document.getElementById("empName").value=ele.childNodes[1].childNodes[0].innerHTML.substr(10);
		document.getElementById("empId").value=ele.childNodes[2].childNodes[0].innerHTML.substr(10);
		document.getElementById("empPhone").value=ele.childNodes[3].childNodes[0].innerHTML.substr(10);
		document.getElementById("status").value=ele.childNodes[4].innerHTML;
		ele.style.display="none";
		myCurrEdit=ele;
		toggleOn();
		disableButtons();
	}
	
	
	function deleteButton(){
		const ele = this.parentNode;
		idSet.delete(ele.childNodes[2].childNodes[0].innerHTML.substr(10));
		ele.remove();
	}	
}

/*document.getElementById("empName").addEventListener('keyDown',function(){
	console.log("helloooor");
},true);*/


function disableButtons(){
	const editBtns = document.getElementsByClassName("editButtonC");
	const deleteBtns = document.getElementsByClassName("deleteButtonC");
	for(let btn of editBtns){
		btn.disabled = true;
	}
	for(let btn of deleteBtns){
		btn.disabled = true;
	}

}

function enableButtons(){
	const editBtns = document.getElementsByClassName("editButtonC");
	const deleteBtns = document.getElementsByClassName("deleteButtonC");
	for(let btn of editBtns){
		btn.disabled = false;
	}
	for(let btn of deleteBtns){
		btn.disabled = false;
	}

}

