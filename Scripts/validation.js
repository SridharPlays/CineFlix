const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const contact_input = document.getElementById('contact-input')
const date_input = document.getElementById('date-input')
const error_message = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
	let errors = []

	if (firstname_input) {
		// If we have a firstname input then we are in the signup
		errors = getSignupFormErrors(firstname_input.value, email_input.value, password_input.value, contact_input.value, date_input.value);
	}
	else {
		// If we don't have a firstname input then we are in the login
		errors = getLoginFormErrors(email_input.value, password_input.value)
	}

	if (errors.length > 0) {
		// If there are any errors
		e.preventDefault()
		error_message.innerText = errors.join(". ")
	} else {
		if (firstname_input) {
			e.preventDefault()
			sendSignUpData(firstname_input.value, email_input.value, password_input.value, contact_input.value, date_input.value);
		}
		else {
			e.preventDefault()
			sendLoginFormData(email_input.value, password_input.value);
		}
	}
})

function getSignupFormErrors(firstname, email, password, contact, dob) {
	let errors = []

	if (firstname === '' || firstname == null) {
		errors.push('Firstname is required');
		firstname_input.parentElement.classList.add('incorrect');
	}
	if (email === '' || email == null) {
		errors.push('Email is required');
		email_input.parentElement.classList.add('incorrect');
	}
	if (contact === '' || contact == null) {
		errors.push('Phone Number is required');
		contact_input.parentElement.classList.add('incorrect');
	}
	if (dob === '' || dob == null) {
		errors.push('Date of Birth is required');
		date_input.parentElement.classList.add('incorrect');
	}
	if (password.length < 8) {
		errors.push('Password must have at least 8 characters');
		password_input.parentElement.classList.add('incorrect');
	}

	return errors;
}

function getLoginFormErrors(email, password) {
	let errors = []

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

const allInputs = [firstname_input, email_input, password_input, date_input, contact_input].filter(input => input != null)

allInputs.forEach(input => {
	input.addEventListener('input', () => {
		if (input.parentElement.classList.contains('incorrect')) {
			input.parentElement.classList.remove('incorrect')
			error_message.innerText = ''
		}
	})
})

async function sendSignUpData(Name, Email, Password, PhoneNumber, DateOfBirth) {
		const request = new Request("http://localhost:5000/api/auth/signup", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ 
				Email, Password, Name, PhoneNumber, DateOfBirth
			}),
		});
	
		try {
			const response = await fetch(request);
			console.log("Status:", response.status);
			
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
	
			const data = await response.json();
			console.log("Response Data:", data);
		} catch (error) {
			console.error("Error:", error);
		}
}

async function sendLoginFormData(Email, Password) {
	const request = new Request("http://localhost:5000/api/auth/login", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ 
			Email, Password
		}),
	});

	try {
		const response = await fetch(request);
		console.log("Status:", response.status);
		
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		console.log("Response Data:", data);
		window.location.href = 'index.html';
	} catch (error) {
		console.error("Error:", error);
	}
}