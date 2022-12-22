import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";

const initialValues = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: ""
};

const initialTouchedValues = {
  email: false,
  username: false,
  firstName: false,
  lastName: false,
  password: false,
  confirmPassword: false
};

function SignupFormModal() {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouchedValues);

  const { closeModal } = useModal();

  function isEmail(emailAddress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    return emailAddress.match(regex);
  }

  const validateForm = () => {
    setErrors({
      email: !formValues.email ? 'Email is required' : !isEmail(formValues.email) ? 'Invalid email' : '',
      username: !formValues.username ? 'Username is required' : isEmail(formValues.username) ? 'Username cannot be an email address' : '',
      firstName: !formValues.firstName ? 'First name is required' : isEmail(formValues.firstName) ? 'First name cannot be an email address' : '',
      lastName: !formValues.lastName ? 'Last name is required' : isEmail(formValues.lastName) ? 'Last name cannot be an email address' : '',
      password: !formValues.password ? 'Password is required' : '',
      confirmPassword: formValues.password !== formValues.confirmPassword ? 'Passwords do not match' : ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some(err => err)) return;
  
    return dispatch(sessionActions.signup({ 
      email: formValues.email, 
      username: formValues.username, 
      firstName: formValues.firstName, 
      lastName: formValues.lastName, 
      password: formValues.password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          // TODO: fix this issue
          // if (data && data.errors) setErrors(Object.formValues(data.errors));
        });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    // setCredential('demo@user.io')
    // setPassword('password')
    return dispatch(sessionActions.login({ credential: 'demo@user.io', password: 'password' }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          // TODO: fix this issue
          // if (data && data.errors) setErrors(data.errors);
        }
      );
  }

  const handleChange = async (event) => {
    const { name, value } = event.target;
    await setFormValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prevState) => {
      return {
        ...prevState,
        [name]: true,
      };
    });
  }

  // reset all errors to inital in the first render
  useEffect(() => {
    setErrors(initialValues);
    setTouched(initialTouchedValues);
  }, []);

  useEffect(() => validateForm(), [formValues]);

  return (
    <>
      <h3 className="title is-3">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="field mb-5">
          <div className="control has-icons-left has-icons-right has-icons-left has-icons-right">
            <input
              required
              className={`input ${errors.email && touched.email ? 'is-danger' : ''}`}
              type="email"
              name="email"
              placeholder="Email"
              minLength='3'
              maxLength='256'
              value={formValues.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
            {errors.email && touched.email && 
              <>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.email}</h6>
              </>
            }
          </div>
        </div>
        {/* Username */}
        <div className="field mb-5">
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input ${errors.username && touched.username ? 'is-danger' : ''}`}
              type="text"
              name="username"
              placeholder="Username"
              minLength='4'
              maxLength='30'
              value={formValues.username}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            {errors.username && touched.username && 
              <>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.username}</h6>
              </>
            }
          </div>
        </div>
        {/* First Name */}
        <div className="field mb-5">
          <div className="control has-icons-left has-icons-right">
          <input
            className={`input ${errors.firstName && touched.firstName ? 'is-danger' : ''}`}
            type="text"
            name="firstName"
            placeholder="First Name"
            minLength='2'
            maxLength='30'
            value={formValues.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            {errors.firstName && touched.firstName && 
              <>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.firstName}</h6>
              </>
            }
          </div>
        </div>
        {/* Last Name */}
        <div className="field mb-5">
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input ${errors.lastName && touched.lastName ? 'is-danger' : ''}`}
              type="text"
              placeholder="Last Name"
              name="lastName"
              minLength='2'
              maxLength='30'
              value={formValues.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
            {errors.lastName && touched.lastName && 
              <>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.lastName}</h6>
              </>
            }
          </div>
        </div>
        {/* Password */}
        <div className="field mb-5">
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input ${errors.password && touched.password ? 'is-danger' : ''}`}
              type="password"
              name="password"
              value={formValues.password}
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            {errors.password && touched.password && 
              <>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.password}</h6>
              </>
            }
          </div>
        </div>
        {/* Confirm Password */}
        <div className="field mb-5">
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input ${errors.confirmPassword && touched.confirmPassword ? 'is-danger' : ''}`}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
            {errors.confirmPassword && touched.confirmPassword && 
              <>
                <span class="icon is-small is-right">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.confirmPassword}</h6>
              </>
            }
          </div>
        </div>
        <div className="buttons is-justify-content-flex-end mt-5">
          <button type="submit" className="button is-primary">Sign Up</button>
          <button className="button is-light" type='demo' onClick={handleDemo}>Demo User</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;
