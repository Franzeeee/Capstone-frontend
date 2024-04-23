import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { checkLoggedIn } from '../utils/auth';
import { customFetch } from '../utils/api';
import styles from '../assets/css/pages/home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import cardImage from '../assets/img/card-img.jfif';

export const DashboardContent = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        const checkLoginStatus = async () => {
          const loggedIn = await checkLoggedIn();
          if (loggedIn) {
            
          } else {
            navigate('/login')
          }
        }
        checkLoginStatus();
      },[]);

    const handleLogout = () => {
        customFetch('/logout', {
            method: 'POST',
            body: {},
            })
            .then(response => {
                response.json()
            })
            .then(data => {
                console.log(data);
                navigate('/login');
            })
            .catch(error => {
                console.log(error);
            })
    }

  return (
    <div className={`row m-0 overflow-hidden ${styles.row} `}>
        <div className={`col-9 ${styles.leftContent}`}>
            <div className={`${styles.discussionContainer} col bg-dark-subtle d-flex align-items-center justify-content-start flex-column position-relative rounded`}>
          <div className="row">
              <h5 className='m-0'>Start a Discussion</h5>
              <div className={`${styles.inputContainer}`}>
                <input type="text" placeholder='Write announcement... '/>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className={`row ${styles.title}`}>
                <p clasName={`m-0 text-white`}>Assessments (20)</p>
              </div>
              <div className="row">
                <div className={`col ${styles.wrapper}`}>
                  <ul className={`${styles.carousel}`}>

                    <li className={`${styles.card}`}>
                        <div className="img">
                          <img src={cardImage} alt="" />
                        </div>
                        <div className={`${styles.text}`}>
                          <h2>Simple Control Flow and Looping</h2>
                          <span>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quod quisquam molestiae obcaecati ratione, repudiandae in. Iusto perspiciatis eos repellendus natus praesentium doloremque ipsum minus enim consequatur! Architecto, nam alias.
                          </span>
                        </div>
                        <div className={`${styles.details}`}>
                          <div className={`${styles.devider}`}>
                          </div>
                          <div className={`${styles.detailsContent}`}>
                            <span style={{color: 'blue'}}> View Details</span>
                            <div className={`${styles.level}`}>
                              <span>Beginner</span>
                              <div className="levelColor">
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className={`${styles.card}`}>
                        <div className="img">
                          <img src={cardImage} alt="" />
                        </div>
                        <div className={`${styles.text}`}>
                          <h2>Simple Control Flow and Looping</h2>
                          <span>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quod quisquam molestiae obcaecati ratione, repudiandae in. Iusto perspiciatis eos repellendus natus praesentium doloremque ipsum minus enim consequatur! Architecto, nam alias.
                          </span>
                        </div>
                        <div className={`${styles.details}`}>
                          <div className={`${styles.devider}`}>
                          </div>
                          <div className={`${styles.detailsContent}`}>
                            <span style={{color: 'blue'}}> View Details</span>
                            <div className={`${styles.level}`}>
                              <span>Beginner</span>
                              <div className="levelColor">
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className={`${styles.card}`}>
                        <div className="img">
                          <img src={cardImage} alt="" />
                        </div>
                        <div className={`${styles.text}`}>
                          <h2>Simple Control Flow and Looping</h2>
                          <span>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit quod quisquam molestiae obcaecati ratione, repudiandae in. Iusto perspiciatis eos repellendus natus praesentium doloremque ipsum minus enim consequatur! Architecto, nam alias.
                          </span>
                        </div>
                        <div className={`${styles.details}`}>
                          <div className={`${styles.devider}`}>
                          </div>
                          <div className={`${styles.detailsContent}`}>
                            <span style={{color: 'blue'}}> View Details</span>
                            <div className={`${styles.level}`}>
                              <span>Beginner</span>
                              <div className="levelColor">
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className={`row ${styles.title}`}>
              <p clasName={`m-0 text-white`}>Course Materials</p>
            </div>
            <div className="row"> 
                
            </div>
          </div>
        </div>
        <div className={`col-3 ${styles.rightContent} h-100`}>

        </div>
    </div>
  )
}
