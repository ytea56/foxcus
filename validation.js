const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
	// Stop the page from refreshing automatically on submit
	e.preventDefault()

	let errors = []

	// SMART CHECK: If firstname_input exists in the HTML, we are on the signup page
	if (firstname_input) {
		errors = getSignupFormErrors(
			firstname_input.value, 
			email_input.value, 
			password_input.value, 
			repeat_password_input.value
		)
	}
	// Otherwise, we are on the login page!
	else {
		errors = getLoginFormErrors(
			email_input.value, 
			password_input.value
		)
	}

	if (errors.length > 0) {
		// If there are any validation errors, show them cleanly
		error_message.innerText = errors.join(". ")
	} else {
		// SUCCESS! No errors found.
		
		// If they signed up, let's remember their name
		if (firstname_input) {
			localStorage.setItem("username", firstname_input.value.trim());
		}
		
		// Send them right along to your main application homepage!
		window.location.href = "index.html";
	}
})

// --- SIGNUP VALIDATION LOGIC ---
function getSignupFormErrors(firstname, email, password, repeatPassword) {
	let errors = []

	if (firstname === '' || firstname == null) {
		errors.push('Firstname is required')
		firstname_input.parentElement.classList.add('incorrect')
	}
	if (email === '' || email == null) {
		errors.push('Email is required')
		email_input.parentElement.classList.add('incorrect')
	}
	if (password === '' || password == null) {
		errors.push('Password is required')
		password_input.parentElement.classList.add('incorrect')
	}
	if (password && password.length < 8) {
		errors.push('Password must have at least 8 characters')
		password_input.parentElement.classList.add('incorrect')
	}
	if (password !== repeatPassword) {
		errors.push('Password does not match repeated password')
		password_input.parentElement.classList.add('incorrect')
		if (repeat_password_input) repeat_password_input.parentElement.classList.add('incorrect')
	}

	return errors;
}

// --- LOGIN VALIDATION LOGIC ---
function getLoginFormErrors(email, password) {
	let errors = [];

	if (email === '' || email == null) {
		errors.push('Email is required')
		email_input.parentElement.classList.add('incorrect')
	}
	if (password === '' || password == null) {
		errors.push('Password is required')
		password_input.parentElement.classList.add('incorrect')
	}

	return errors;
}

// --- INPUT RESETTER ---
// Group all possible inputs into an array
const allInputs = [firstname_input, email_input, password_input, repeat_password_input]

allInputs.forEach(input => {
	// FIX: Check if the input actually exists on the CURRENT page before adding the listener!
	if (input) {
		input.addEventListener('input', () => {
			if (input.parentElement.classList.contains('incorrect')) {
				input.parentElement.classList.remove('incorrect')
				error_message.innerText = ''
			}
		})
	}
})
