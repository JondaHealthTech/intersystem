window.onload=jInitMe
T1=self.F1.T1, T2=self.F1.T2

// for eye icon, hide,unhide password
function jTogglePassword(event){
	
	if(T2.type=="password"){
		T2.type="text";
		event.target.src = "./assets/images/eyeOpen.png";
	}
	else{
		T2.type="password";
		event.target.src = "./assets/images/eyeClose.png";
	}
}

function jInitMe(){
	// cursor on first text box 
	T1.focus()
}

function jCheckKey(event){
	jChangeMe();
	// For 'Enter' key
	if(event.which === 13){
		jLogin()
	}
}
// Hide alert text
function jChangeMe(){ 
	document.getElementById("AlertText").style.opacity=0
}
// client side Validation
function jLogin(){	
	if ((T1.value=="")||(T2.value=="")){
		document.getElementById("AlertText").style.opacity=1
		return false
	}
	#server(..cLogin(T1.value,T2.value))#
}