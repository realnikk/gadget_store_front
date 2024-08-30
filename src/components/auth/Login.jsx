import React, { useState, useEffect } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const Login = () => {
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	const redirectUrl = location.state?.path || "/"

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	const [emailState, setEmailState] = useState(false)
	const [passwordState, setPasswordState] = useState(false)
	const submitButton = document.getElementById('submitButton')
	const inputPasswordField = document.getElementById('password')
	const inputEmailField = document.getElementById('email')

	const [errorMessage, setErrorMessage] = useState("")

	const handleEmailInput = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
		const isCorrect = emailPattern.test(e.target.value)
		if(!isCorrect){
			setEmailState(false)
			submitButton.disabled = true
		    inputEmailField.style.borderColor = '#eb4034'
		    inputEmailField.style.borderWidth = '2px'
		} else {
			setEmailState(true)
		    inputEmailField.style.borderColor = '#84e670'
			inputEmailField.style.borderWidth = '2px'
			if(passwordState){
				submitButton.disabled = false
			}
		}
    }

	const handlePasswordInput = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
        if(e.target.value.length < 5){
			setPasswordState(false)
			submitButton.disabled = true
			inputPasswordField.style.borderColor = '#eb4034'
			inputPasswordField.style.borderWidth = '2px'
		} else {
			setPasswordState(true)
		    inputPasswordField.style.borderColor = '#84e670'
			inputPasswordField.style.borderWidth = '2px'
			if(emailState){
				submitButton.disabled = false
			}
		}
    }

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			auth.handleLogin(token)
			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}

	return (
		<section className="container col-6 mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div className="row mb-3">
					<label htmlFor="email" className="col-sm-2 col-form-label">
						Email
					</label>
					<div>
						<input
							id="email"
							name="email"
							type="email"
							className="form-control"
							value={login.email}
							onChange={handleEmailInput}
						/>
					</div>
				</div>

				<div className="row mb-3">
					<label htmlFor="password" className="col-sm-2 col-form-label">
						Password
					</label>
					<div>
						<input
							id="password"
							name="password"
							type="password"
							className="form-control"
							value={login.password}
							onChange={handlePasswordInput}
						/>
					</div>
				</div>

				<div className="mb-3">
					<button id='submitButton' type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Login
					</button>
					<span style={{ marginLeft: "10px" }}>
						Don't' have an account yet?<Link to={"/register"}> Register</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Login