import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"

const Registration = () => {
	const [registration, setRegistration] = useState({
		username: "",
		email: "",
		password: ""
	})

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	const [usernameState, setUsernameState] = useState(false)
	const [emailState, setEmailState] = useState(false)
	const [passwordState, setPasswordState] = useState(false)
	const [passwordConfirmationState, setPasswordConfirmationState] = useState(false)
	const submitButton = document.getElementById('submitButton')
	const inputPasswordField = document.getElementById('password')
	const inputUsernameField = document.getElementById('username')
	const inputEmailField = document.getElementById('email')
	const inputPasswordConfField = document.getElementById('passwordConfirmation')

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleUsernameInput = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
        if(e.target.value.length < 5){
			setErrorMessage("Username must contain at least 5 charachters")
			setUsernameState(false)
			submitButton.disabled = true
			inputUsernameField.style.borderColor = '#eb4034'
			inputUsernameField.style.borderWidth = '2px'
		} else {
			setErrorMessage("")
			setUsernameState(true)
		    inputUsernameField.style.borderColor = '#84e670'
			inputUsernameField.style.borderWidth = '2px'
			if(emailState && passwordState && passwordConfirmationState){
				submitButton.disabled = false
			}
		}
    }

	const handleUsernameClick = (e) => {
        if(e.target.value.length < 5){
			setErrorMessage("Username must contain at least 5 charachters")
			inputUsernameField.style.borderColor = '#eb4034'
			inputUsernameField.style.borderWidth = '2px'
		}
    }

	const handleEmailInput = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
		const isCorrect = emailPattern.test(e.target.value)
		if(!isCorrect){
			setErrorMessage("Email doesn't match email pattern")
			setEmailState(false)
		    submitButton.disabled = true
		    inputEmailField.style.borderColor = '#eb4034'
		    inputEmailField.style.borderWidth = '2px'
		} else {
			setErrorMessage("")
		    setEmailState(true)
	        inputEmailField.style.borderColor = '#84e670'
		    inputEmailField.style.borderWidth = '2px'
		   if(usernameState && passwordState && passwordConfirmationState){
			    submitButton.disabled = false
		    }
		}
	}

	const handleEmailClick = (e) => {
		const isCorrect = emailPattern.test(e.target.value)
		if(!isCorrect){
			setErrorMessage("Email doesn't match email pattern")
		    inputEmailField.style.borderColor = '#eb4034'
		    inputEmailField.style.borderWidth = '2px'
		}
    }

	const handlePasswordInput = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
        if(e.target.value.length < 5){
			setErrorMessage("Password must contain at least 5 charachters")
			setPasswordState(false)
			submitButton.disabled = true
			inputPasswordField.style.borderColor = '#eb4034'
			inputPasswordField.style.borderWidth = '2px'
			inputPasswordConfField.disabled = true
		} else {
			const hasNumber = /\d/.test(e.target.value)
			if(!hasNumber){
				setErrorMessage("Password must contain at least 1 figure")
				setPasswordState(false)
				submitButton.disabled = true
			    inputPasswordField.style.borderColor = '#eb4034'
			    inputPasswordField.style.borderWidth = '2px'
				inputPasswordConfField.disabled = true
			} else {
				const hasSmallLetter = /[a-z]/.test(e.target.value)
				if(!hasSmallLetter){
					setErrorMessage("Password must contain at least 1 lowercase english letter")
					setPasswordState(false)
					submitButton.disabled = true
			        inputPasswordField.style.borderColor = '#eb4034'
			        inputPasswordField.style.borderWidth = '2px'
					inputPasswordConfField.disabled = true
				} else {
					const hasBigLetter = /[A-Z]/.test(e.target.value)
				    if(!hasBigLetter){
					    setErrorMessage("Password must contain at least 1 uppercase english letter")
						setPasswordState(false)
						submitButton.disabled = true
			            inputPasswordField.style.borderColor = '#eb4034'
			            inputPasswordField.style.borderWidth = '2px'
						inputPasswordConfField.disabled = true
					} else {
						if(passwordConfirmationState){
							setErrorMessage("Passwords are not equal")
							submitButton.disabled = true
			                setPasswordConfirmationState(false)
			                inputPasswordConfField.style.borderColor = '#eb4034'
			                inputPasswordConfField.style.borderWidth = '2px'
						} else {
							if(inputPasswordConfField.value === e.target.value){
								setErrorMessage("")
			                    setPasswordConfirmationState(true)
			                    inputPasswordConfField.style.borderColor = '#84e670'
			                    inputPasswordConfField.style.borderWidth = '2px'
								if(usernameState && emailState && passwordState){
									submitButton.disabled = false
								}
							} else {
								setErrorMessage("")
						        setPasswordState(true)
						        inputPasswordConfField.disabled = false
						        inputPasswordField.style.borderColor = '#84e670'
						        inputPasswordField.style.borderWidth = '2px'
						        if(usernameState && emailState && passwordConfirmationState){
							        submitButton.disabled = false
						        }
							}
						}
					}
				}
			}
		}
	}

	const handlePasswordClick = (e) => {
        if(e.target.value.length < 5){
			setErrorMessage("Password must contain at least 5 charachters")
			inputPasswordField.style.borderColor = '#eb4034'
			inputPasswordField.style.borderWidth = '2px'
		} else {
			const hasNumber = /\d/.test(e.target.value)
			if(!hasNumber){
				setErrorMessage("Password must contain at least 1 figure")
			    inputPasswordField.style.borderColor = '#eb4034'
			    inputPasswordField.style.borderWidth = '2px'
			} else {
				const hasSmallLetter = /[a-z]/.test(e.target.value)
				if(!hasSmallLetter){
					setErrorMessage("Password must contain at least 1 lowercase english letter")
			        inputPasswordField.style.borderColor = '#eb4034'
			        inputPasswordField.style.borderWidth = '2px'
				} else {
					const hasBigLetter = /[A-Z]/.test(e.target.value)
				    if(!hasBigLetter){
					    setErrorMessage("Password must contain at least 1 uppercase english letter")
			            inputPasswordField.style.borderColor = '#eb4034'
			            inputPasswordField.style.borderWidth = '2px'
					} 
				}
			}
		}
	}

	const handlePasswordConfirmation = (e) => {
		if(registration.password === e.target.value){
			setErrorMessage("")
			setPasswordConfirmationState(true)
			inputPasswordConfField.style.borderColor = '#84e670'
			inputPasswordConfField.style.borderWidth = '2px'
			if(usernameState && emailState && passwordState){
				submitButton.disabled = false
			}
		} else {
			setErrorMessage("Passwords are not equal")
			submitButton.disabled = true
			setPasswordConfirmationState(false)
			inputPasswordConfField.style.borderColor = '#eb4034'
			inputPasswordConfField.style.borderWidth = '2px'
		}
	}

	const handlePasswordConfirmationClick = (e) => {
		if(registration.password !== e.target.value){
			setErrorMessage("Passwords are not equal")
			inputPasswordConfField.style.borderColor = '#eb4034'
			inputPasswordConfField.style.borderWidth = '2px'
		}
	}

	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ username: "", email: "", password: "" })
			inputPasswordConfField.value = ""
			inputPasswordConfField.style.borderColor = ""
			inputPasswordField.style.borderColor = ""
			inputEmailField.style.borderColor = ""
			inputUsernameField.style.borderColor = ""
			setUsernameState(false)
			setEmailState(false)
			setPasswordState(false)
			setPasswordConfirmationState(false)
			submitButton.disabled = true
			inputPasswordConfField.disabled = true
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
			if(error.message.includes(inputEmailField.value)){
				inputEmailField.style.borderColor = '#eb4034'
		        inputEmailField.style.borderWidth = '2px'
			} else if (error.message.includes(inputUsernameField.value)){
				inputUsernameField.style.borderColor = '#eb4034'
			    inputUsernameField.style.borderWidth = '2px'
			}
		}
		setTimeout(() => {
			setSuccessMessage("")
		}, 5000)
	}

	return (
		<section className="container col-6 mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			{successMessage && <p className="alert alert-success">{successMessage}</p>}
			<h2>Registration</h2>
			<form onSubmit={handleRegistration}>
				<div className="mb-3 row">
					<label htmlFor="username" className="col-sm-2 col-form-label">
						Username
					</label>
					<div className="col-sm-10">
						<input
							id="username"
							name="username"
							type="text"
							className="form-control"
							value={registration.username}
							onChange={handleUsernameInput}
							onClick={handleUsernameClick}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div className="col-sm-10">
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={registration.email}
							onChange={handleEmailInput}
							onClick={handleEmailClick}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div className="col-sm-10">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={registration.password}
							onChange={handlePasswordInput}
							onClick={handlePasswordClick}
						/>
					</div>
				</div>

				<div className="mb-3 row">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Confirm password
					</label>
					<div className="col-sm-10">
						<input
						    disabled
							type="password"
							className="form-control"
							id="passwordConfirmation"
							name="passwordConfirmation"
							onChange={handlePasswordConfirmation}
							onClick={handlePasswordConfirmationClick}
						/>
					</div>
				</div>

				<div className="mb-3">
					<button disabled id="submitButton" type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Register
					</button>
					<span style={{ marginLeft: "10px" }}>
						Already have an account? <Link to={"/login"}>Login</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Registration