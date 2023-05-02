// frontend/src/components/LoginFormModal/index.js
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const initialValues = {
  credential: "",
  password: "",
};

const initialTouchedValues = {
  credential: false,
  password: false,
};

function LoginFormModal() {
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialValues);
  const [touched, setTouched] = useState(initialTouchedValues);
  const [errors, setErrors] = useState(initialValues);
  const [errorMsg, setErrorMsg] = useState({});
  const { closeModal } = useModal();

  const validateForm = () => {
    setErrors({
      credential: !formValues.credential ? "Username or Email is required" : "",
      password: !formValues.password ? "Password is required" : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(errors).some((err) => err)) return;

    console.log({
      credential: formValues.credential,
      password: formValues.password,
    });
    return dispatch(
      sessionActions.login({
        credential: formValues.credential,
        password: formValues.password,
      })
    ).then((data) => {
      if (data && data.errors) {
        setErrorMsg(Object.values(data.errors)[0]);
      } else {
        closeModal();
      }
    });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    // setCredential('demo@user.io')
    // setPassword('password')
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        // TODO: fix
        // if (data && data.errors) setErrors(data.errors);
      });
  };

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
  };

  // reset all errors to inital in the first render
  useEffect(() => {
    setErrors(initialValues);
    setTouched(initialTouchedValues);
  }, []);

  useEffect(() => validateForm(), [formValues]);

  return (
    <>
      {errorMsg && Object.keys(errorMsg).length !== 0 && (
        <ErrorMessage message={JSON.stringify(errorMsg)} />
      )}
      <h3 className="title is-3">Log In</h3>
      <form onSubmit={handleSubmit}>
        <div className="field mb-5">
          {/* Username or Email */}
          <div className="control has-icons-left has-icons-right">
            <input
              type="text"
              name="credential"
              placeholder="Username or Email"
              className={`input ${
                errors.credential && touched.credential ? "is-danger" : ""
              }`}
              minLength="3"
              maxLength="256"
              value={formValues.credential}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
            {errors.credential && touched.credential && (
              <>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.credential}</h6>
              </>
            )}
          </div>
        </div>
        <div className="field mb-5">
          {/* Password */}
          <div className="control has-icons-left has-icons-right">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className={`input ${
                errors.password && touched.password ? "is-danger" : ""
              }`}
              value={formValues.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
            {errors.password && touched.password && (
              <>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
                <h6 className="help is-danger">{errors.password}</h6>
              </>
            )}
          </div>
        </div>
        <div className="buttons is-justify-content-flex-end mt-5">
          <button type="submit" className="button is-primary">
            Log In
          </button>
          <button className="button is-light" type="demo" onClick={handleDemo}>
            Demo User
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
