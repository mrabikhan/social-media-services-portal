const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const SignUpForm = document.getElementById('SignUpForm');


SignUpForm.addEventListener('click', (e) => {
	Signup(e)
});

const Signup = async (e) => {
	e.preventDefault();

	var name = document.getElementById('name').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var radiobtn = document.querySelectorAll('.radiobtn1');
	let selectedOption = null;
	radiobtn.forEach((radioButton) => {
		if (radioButton.checked) {
			selectedOption = radioButton.value;
		}
	});

	const response = await fetch("http://localhost:5000/api/user/createuser", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ 
			name: name, 
			email: email, 
			password: password, 
			AccountType: selectedOption 
		})
	})

	const json = await response.json();
	console.log(json);
	if (json.success) {
		localStorage.setItem("token", json.AuthToken)
		localStorage.setItem("account", json.AccountType)
		if(json.AccountType=="Buyer"){
			window.open("buyer.html", "_self");
		}
		else if (json.AccountType=="Worker"){
			window.open("worker.html", "_self");
		}
	}
	else {
		// showAlert("Wrong Credentials", "danger")
		console.log("wrong credential")
	}
}

const SignInForm = document.getElementById('SignInForm');


SignInForm.addEventListener('click', (e) => {
	SignIn(e)
});


const SignIn = async (e) => {
	e.preventDefault();

	var email = document.getElementById('EmailLogin').value;
	var password = document.getElementById('PasswordLogin').value;

	const response = await fetch("http://localhost:5000/api/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body:JSON.stringify({email:email,password:password})
	})
	const json = await response.json();
	console.log(json);
	if(json.success){
		localStorage.setItem('token',json.AuthToken);
		localStorage.setItem('account',json.AccountType);
		if(json.AccountType=="Buyer"){
			window.open("buyer.html", "_self");
		}
		else if (json.AccountType=="Worker"){
			window.open("worker.html", "_self");
		}
	}
	else{
		console.log("Account not found")
	}
}