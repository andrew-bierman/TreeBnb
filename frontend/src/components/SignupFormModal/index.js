import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [shouldShowErrors, setShouldShowErrors] = useState(false);

  const { closeModal } = useModal();

  function isEmail(emailAddress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAddress.match(regex))
    return true;

   else
    return false;
}

  const validateForm = () => {
    const newErrors = []

    if(!email){
      newErrors.push('Email is required')
    } else if ( !isEmail(email) ) {
      newErrors.push('Invalid email')
    }

    if(!username){
      newErrors.push('Username is required')
    } else if ( isEmail(username) ) {
      newErrors.push('Username cannot be an email address')
    }

    if(!firstName){
      newErrors.push('First name is required')
    } else if ( isEmail(firstName) ) {
      newErrors.push('First name cannot be an email address')
    }

    if(!lastName){
      newErrors.push('Last name is required')
    } else if ( isEmail(lastName) ) {
      newErrors.push('Last name cannot be an email address')
    }

    if(!password){
      newErrors.push('Password is required')
    } else if(password !== confirmPassword) {
      newErrors.push('Passwords do not match')
    }

    setErrors(newErrors)

  }

  useEffect(() => {
    validateForm()
    // console.log({errors})
  }, [
      email,
      username,
      firstName,
      lastName,
      password,
      confirmPassword
  ])

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    setShouldShowErrors(true);
    validateForm();

    if (password === confirmPassword && errors.length === 0) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(Object.values(data.errors));
          // console.log(Object.values(data.errors))
          // console.log({errors})
        });
    } else if (password !== confirmPassword){
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
          { shouldShowErrors && (errors.length > 0) && (
            <ul className="errors">
              {errors.map((error, idx) => (
                <li key={idx} className='error'>
                  <i className="fas fa-solid fa-exclamation-circle"></i>
                  &nbsp;&nbsp;
                  {error}
                </li>
              )
              )}
            </ul>
          )}
        <br></br>
        {/* <label>
          Email */}
        <input
          type="email"
          placeholder="Email"
          minLength='3'
          maxLength='256'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* </label> */}
        <br></br>
        {/* <label>
          Username */}
        <input
          type="text"
          placeholder="Username"
          minLength='4'
          maxLength='30'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {/* </label> */}
        <br></br>
        {/* <label>
          First Name */}
        <input
          type="text"
          placeholder="First Name"
          minLength='2'
          maxLength='30'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {/* </label> */}
        <br></br>
        {/* <label>
          Last Name */}
        <input
          type="text"
          placeholder="Last Name"
          minLength='2'
          maxLength='30'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {/* </label> */}
        <br></br>
        {/* <label>
          Password */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {/* </label> */}
        <br></br>
        {/* <label>
          Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {/* </label> */}
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
