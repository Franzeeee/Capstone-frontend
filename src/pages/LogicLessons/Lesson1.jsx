import React from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import { getUserData } from '../../utils/userInformation'
import styles from '../../assets/css/pages/LogicLesson/lesson1.module.css'
import ProfileSide from '../../components/ProfileSide'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import customFetch from '../../utils/fetchApi'
import { toast } from 'react-toastify'


export default function Lesson1() {

    const navigate = useNavigate();

    const { code } = useParams();

    const navigateToClass = () => navigate(`/c/${code}`);

    const [classInfo, setClassInfo] = useState(null);


    useEffect(() => {
        customFetch(`/class/${code}`, {
            method: 'GET',
        })
        .then(data => {
            setClassInfo(data);
        })
        .catch(err => {
            toast.error("An error occurred while fetching class information");
        })
    }, [])

  const user = getUserData();

  return (
    <HomeTemplate>
        <div className={`${styles.container} ${styles.classDashboard}`}>
        <div className={`${styles.contentContainer}`}>
            <div className={`${styles.header}`}>
                <div className={`${styles.create}`}>
                    <div>
                        <ul>
                            <li onClick={() => navigate('/')}>{user.role === 'teacher' ? "Dashboard" : "Home"}</li>
                            <li>/</li>
                            <li onClick={navigateToClass}>{classInfo?.name || "Loading"}</li>
                            <li>/</li>
                            <li className={`${styles.active}`}>Lesson 1: Introduction to Pseudocode</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
            <div className={styles.LessonHeader}>
                <p className={styles.Title}>Lesson 1: Introduction to Pseudocode</p>
                <p><span className={styles.Sub}>Objective:</span> Teach the basics of pseudocode and how it is used to represent algorithms in a human-readable way before translating them into actual programming languages.</p>
            </div>
            <div>
                <p className={styles.SubTitle}>Key Concepts:</p>
                <ol>
                    <li className={styles.Sub} >What is pseudocode?</li>
                    <ul className={styles.BulletOrder}>
                        <li>Pseudocode is a way of writing algorithms in a simplified, human-readable manner. It is not tied to any specific programming language but follows the logical flow of the program.</li>
                        <li>It is used to plan and design algorithms before coding.</li>
                    </ul>
                    <li className={styles.Sub}>Why use pseudocode?</li>
                    <ul className={styles.BulletOrder}>
                        <li>It helps programmers think through the logic of an algorithm without worrying about the syntax of a specific programming language.</li>
                        <li>It’s easy to understand and use for people at all levels of programming knowledge.</li>
                        <li>It aids in the design and communication of algorithms, especially in teams.</li>
                    </ul>
                </ol>
            </div>
            <div >
                <p className={styles.SubTitle}>Structure of Pseudocode:</p>
                <ol >
                    <li className={styles.Sub}>Keywords:</li>
                    <ul className={styles.BulletOrder}>
                        <li>START: Marks the beginning of the algorithm.</li>
                        <li>END: Marks the end of the algorithm.</li>
                        <li>DECLARE: Used to declare variables or data types.</li>
                        <li>IF / ELSE / ELSE IF: Conditional logic.</li>
                        <li>FOR / WHILE: Looping structures.</li>
                        <li>PRINT: Outputs a result to the user.</li>
                    </ul>
                    <li className={styles.Sub}>Simple Example:</li>
                    <ul className={styles.BulletOrder}>
                        <li>To make it clearer, let’s look at a basic pseudocode example that calculates the sum of two numbers:</li>
                        <div className={styles.Example}>
                        START<br/>
                        {"\u00A0".repeat(10)}DECLARE num1, num2, sum <br/>
                        {"\u00A0".repeat(10)}INPUT num1, num2<br/>
                        {"\u00A0".repeat(10)}sum = num1 + num2<br/>
                        {"\u00A0".repeat(10)}PRINT sum
                        END

                        </div>
                        <li>This algorithm starts by declaring variables num1, num2, and sum, takes input from the user for num1 and num2, calculates the sum, and then prints the result.</li>
                    </ul>
                </ol>
            </div>
            <div>
                <p className={styles.SubTitle}>Writing a Simple Algorithm Using Pseudocode:</p>
                <p>Let’s write pseudocode to solve the following problem:</p>
                <p><span className={styles.Sub}>Problem:</span> Find the largest of two numbers.</p>
                <p className={styles.SubTitle}  >Pseudocode:</p>
                <div className={styles.Example}>
                START <br />
                {"\u00A0".repeat(10)}DECLARE num1, num2, largest <br />
                {"\u00A0".repeat(10)}INPUT num1, num2<br />
                {"\u00A0".repeat(10)}IF num1 {'>'} num2 THEN<br />
                {"\u00A0".repeat(10)}largest = num1<br />
                {"\u00A0".repeat(10)}ELSE<br />
                {"\u00A0".repeat(10)}largest = num2<br />
                {"\u00A0".repeat(10)}END IF<br />
                {"\u00A0".repeat(10)}PRINT largest<br />
                END
                </div>
                <p><span className={styles.Sub}>Explanation:</span> This pseudocode takes two numbers (num1 and num2) as input and compares them. If num1 is greater than num2, it sets largest to num1. Otherwise, it sets largest to num2. Finally, it prints the largest number.</p>
            </div>
            <div>
                <p className={styles.SubTitle}>Review:</p>
                <ul className={styles.BulletOrder}>
                    <li>Pseudocode helps break down a problem into smaller steps, making it easier to implement in any programming language.</li>
                    <li>It is not bound by syntax rules, so it focuses solely on the logic.</li>
                    <li>Practice writing pseudocode for simple problems, and over time, you will be able to solve more complex problems efficiently.</li>
                </ul>
            </div>
          </div>
        </div>
        <div className={`${styles.profileContainer}`}>
            <ProfileSide info={user} />
        </div>
      </div>
    </HomeTemplate>
  )
}
