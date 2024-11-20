import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from '../assets/css/pages/register.module.css';
import { AuthTemplate } from '../templates/AuthTemplate';
import { 
    validateName, 
    validateEmail, 
    validatePhone, 
    validatePassword,
    validateConfirm,
    validateRole,
    validateFirstName,
    validateLastName
} from '../utils/registerValidation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner';
import { customFetch } from '../utils/api';
import { toast, ToastContainer } from 'react-toastify'
import CryptoJS from 'crypto-js';

export const Register = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    suffix: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  useEffect(() => {
    setFormData(prev => {
      return {
        ...prev,
        name: formData.first_name + ' ' + formData.middle_name + ' ' + formData.last_name + ' ' + formData.suffix
      }
    })

  }, [formData.first_name, formData.middle_name, formData.last_name, formData.suffix])

  const [validated, setValidated] = useState({
    name: [null, []],
    first_name: [null, []],
    middle_name: [null, []],
    last_name: [null, []],
    suffix: [null, []],
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Perform form validation
    const [nameValid, nameErrors] = validateName(formData.name);
    setValidated(prevState => ({
      ...prevState,
      name: [nameValid, nameErrors]
    }));

    const [firstValid, firstErrors] = validateFirstName(formData.first_name);
    setValidated(prevState => ({
      ...prevState,
      first_name: [firstValid, firstErrors]
    }));

    const [lastValid, lastErrors] = validateLastName(formData.last_name);
    setValidated(prevState => ({
      ...prevState,
      last_name: [lastValid, lastErrors]
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

    if (
      nameValid &&
      firstValid &&
      lastValid &&
      emailValid &&
      phoneValid &&
      passwordValid &&
      confirmValid &&
      roleValid
    ) {
      
      customFetch('/register', {
        method: 'POST',
        body: JSON.stringify(formData)
      })
        .then(response => {
          const url = response.url === 'http://localhost:5173/';
          if(response.statusText === 'OK' && url){
            return {"message": "Duplicate"}
          }
          return response.json();
        })
        .then(data => {
          if(data.message === "Duplicate"){
            toast.error("Email already exists!")
            return
          }
          toast.success("Registered Successfully")
          toast.loading("Redirecting...")
          customFetch('/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            })
            .then(response => {
                    return response.json();
                })
            .then(data => {

                if(data.message === 'Invalid Credintials!'){
                    toast.error(data.message)
                }else{
                  const stringData = JSON.stringify(data.message);
                  const hashedData = CryptoJS.AES.encrypt(stringData, 'capstone');
                  localStorage.setItem('userData', hashedData);
                  setTimeout(() => {
                    navigate('/dashboard')
                  }, 2000)
                }
                
                })
            .catch(error => console.error(error))
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }

  return (
    <AuthTemplate>
      <div className={`col text-black d-flex ${styles.content}`}>
        <ToastContainer 
          hideProgressBar={true}
        />
        <div className={`${styles['form-container']}`}>
          <h4>Create an account</h4>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={`${styles.formGroup} ${styles.userNames}`}>
              <div className={styles.firstName}>
                <label htmlFor="fullname">First Name</label>
                <input 
                  type="text" 
                  className={`form-control ${validated.first_name[0] === false && styles.errorBorder}`} 
                  id="first_name" 
                  name='first_name'
                  value={formData.first_name}
                  onChange={(e) => handleInputChange(e)}
                />
                {!validated.first_name[0] && (
                  <div className={styles.errorMessage}>
                    <ul className="m-0">
                      {validated.first_name[1].map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={styles.firstName}>
                <label htmlFor="fullname">Middle Name</label>
                <input 
                  type="text" 
                  className={`form-control`} 
                  id="middle_name" 
                  name='middle_name'  
                  value={formData.middle_name}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className={styles.firstName}>
                <label htmlFor="fullname">Last Name</label>
                <input 
                  type="text" 
                  className={`form-control ${validated.last_name[0] === false && styles.errorBorder}`} 
                  id="last_name" 
                  name='last_name'
                  value={formData.last_name}
                  onChange={(e) => handleInputChange(e)}
                />
                {!validated.last_name[0] && (
                  <div className={styles.errorMessage}>
                    <ul className="m-0">
                      {validated.last_name[1].map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={styles.firstName}>
                <label htmlFor="fullname">Suffix</label>
                <input 
                  type="text" 
                  className={`form-control`} 
                  id="suffix" 
                  name='suffix'
                  value={formData.suffix}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                className={`form-control ${validated.email[0] === false && styles.errorBorder}`} 
                id="email" 
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
            <button type="submit" className="btn btn-primary " disabled={loading} style={{backgroundColor: '#5D5DD4'}}>
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
