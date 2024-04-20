import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../assets/css/pages/register.module.css';
import { AuthTemplate } from '../templates/AuthTemplate';
import { 
    validateName, 
    validateEmail, 
    validatePhone, 
    validatePassword,
    validateConfirm,
    validateRole
} from '../utils/registerValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [validated, setValidated] = useState({
    name: [null, []],
    email: [null, []],
    phone: [null, []],
    password: [null, []],
    confirm: [null, []],
    role: [null, []]
  });

  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/login');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    // Perform real-time validation
    if (name === 'password') {
      const [valid, errors] = validatePassword(value);
      setValidated(prevState => ({
        ...prevState,
        password: [valid, errors]
      }));
    } else if (name === 'confirmPassword') {
      const [valid, errors] = validateConfirm(formData.password, value)
      setValidated(prevState => ({
        ...prevState,
        confirm: [valid, errors]
      }));
    }else {
      // Reset validation status and errors for other fields
      setValidated(prevState => ({
        ...prevState,
        [name]: [null, []]
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation
    const [nameValid, nameErrors] = validateName(formData.name);
    setValidated(prevState => ({
      ...prevState,
      name: [nameValid, nameErrors]
    }));

    const [emailValid, emailErrors] = validateEmail(formData.email);
    setValidated(prevState => ({
      ...prevState,
      email: [emailValid, emailErrors]
    }));

    const [phoneValid, phoneErrors] = validatePhone(formData.phone);
    setValidated(prevState => ({
      ...prevState,
      phone: [phoneValid, phoneErrors]
    }));

    const [passwordValid, passwordErrors] = validatePassword(formData.password);
      setValidated(prevState => ({
        ...prevState,
        password: [passwordValid, passwordErrors]
      }));

    const [confirmValid, confirmError] = validateConfirm(formData.password, formData.confirmPassword)
    setValidated(prevState => ({
      ...prevState,
      confirm: [confirmValid, confirmError]
    }));

    const [roleValid, roleError] = validateRole(formData.role)
    setValidated(prevState => ({
      ...prevState,
      role: [roleValid, roleError]
    }))
  }

  return (
    <AuthTemplate>
      <div className={`col text-black d-flex ${styles.content}`}>
        <div className={`${styles['form-container']}`}>
          <h4>Create an account</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="fullname">Full Name</label>
              <input 
                type="text" 
                className={`form-control ${validated.name[0] === false && styles.errorBorder}`} 
                id="fullname" 
                placeholder="Example: John Noveda Doe"
                name='name'
                value={formData.name}
                onChange={(e) => handleInputChange(e)}
              />
              {!validated.name[0] && (
                <div className={styles.errorMessage}>
                  <ul className="m-0">
                    {validated.name[1].map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                className={`form-control ${validated.email[0] === false && styles.errorBorder}`} 
                id="email" 
                placeholder="Example: john@example.com"
                name='email'
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
              />
              {!validated.email[0] && (
                <div className={styles.errorMessage}>
                  <ul className="m-0">
                    {validated.email[1].map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                className={`form-control ${validated.phone[0] === false && styles.errorBorder}`}  
                id="phone"
                name='phone'
                placeholder="Example: 09000000000"
                value={formData.phone}
                onChange={(e) => handleInputChange(e)} 
              />
              {!validated.phone[0] && (
                <div className={styles.errorMessage}>
                  <ul className="m-0">
                    {validated.phone[1].map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                className={`form-control ${validated.password[0] === false && styles.errorBorder}`}
                id="password" 
                name='password'
                placeholder="Password" 
                value={formData.password}
                onChange={(e) => handleInputChange(e)}
              />
              {!validated.password[0] && (
                <div className={styles.errorMessage}>
                  <ul className="m-0">
                    {validated.password[1].map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                className={`form-control ${validated.confirm[0] === false && styles.errorBorder}`}
                id="confirmPassword" 
                name='confirmPassword'
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange(e)}
              />
              {!validated.confirm[0] && (
                <div className={styles.errorMessage}>
                  <ul className="m-0">
                    {validated.confirm[1].map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="form-group d-flex justify-content-evenly mt-3">
              <div className="form-check form-check-inline d-flex align-content-center justify-content-center gap-1 ">
                <input className="form-check-input" type="radio" name="role" id="teacher" value="teacher" onChange={handleInputChange} />
                <label className={`form-check-label`} htmlFor="teacher">Teacher</label>
              </div>
              <div className="form-check form-check-inline d-flex align-content-center justify-content-center gap-1">
                <input className="form-check-input" type="radio" name="role" id="student" value="student" onChange={handleInputChange} />
                <label className="form-check-label" htmlFor="student">Student</label>
              </div>
            </div>
              {!validated.role[0] && (
                <div className={styles.errorMessage}>
                  <ul className="m-0">
                    {validated.role[1].map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {
                loading ? <FontAwesomeIcon icon={faSpinner} spin/> : "Submit"
              }
            </button>
            <p className='text-center mt-3'>Already have an account? <span onClick={moveToLogin}>Sign in</span></p>
          </form>
        </div>
      </div>
    </AuthTemplate>
  );
};
