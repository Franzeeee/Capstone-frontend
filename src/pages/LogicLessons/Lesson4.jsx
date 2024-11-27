import React from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import { getUserData } from '../../utils/userInformation'
import styles from '../../assets/css/pages/LogicLesson/lesson4.module.css'
import ProfileSide from '../../components/ProfileSide'
import ComplexFlowchart from '../../assets/img/ComplexFlowchart.png'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import customFetch from '../../utils/fetchApi'
import { toast } from 'react-toastify'


export default function Lesson4() {

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
                        <li className={`${styles.active}`}>Lesson 4: Creating Flowcharts for Algorithms</li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className={styles.content}>
          <div className={styles.LessonHeader}>
            <p className={styles.Title}>Lesson 4: Creating Flowcharts for Algorithms</p>
            <p><span className={styles.Sub}>Objective:</span> Teach how to create flowcharts for common algorithms and show how flowcharts can help in understanding algorithm logic. We’ll focus on translating pseudocode into flowcharts and demonstrating their usefulness.</p>
          </div>
          <div>
            <p className={styles.SubTitle}>Key Concepts:</p>
            <ol>
              <li className={styles.Sub}>Translating Pseudocode into Flowcharts:</li>
              <ul className={styles.BulletOrder}>
                  <li>We’ll learn how to convert pseudocode into flowchart diagrams. This process helps visualize the algorithm’s logic step by step, making it easier to understand and debug.</li>
                  <li>Understanding how to represent conditionals, loops, and processes in flowcharts is crucial for algorithm design.</li>
              </ul>
              <li className={styles.Sub}>Flowcharts for Common Algorithms:</li>
              <ul className={styles.BulletOrder}>
                  <li>By creating flowcharts for simple algorithms, we can clearly see how decisions and loops affect the program's flow.</li>
                  <li>Flowcharts help in identifying potential issues in the algorithm before coding begins.</li>
              </ul>
            </ol>
          </div>
          <div>
            <p className={styles.SubTitle}>Handling More Complex Algorithms</p>
            <p>Flowcharts are especially helpful for representing more complex algorithms. Let's take an algorithm with both nested loops and multiple conditions.</p>
          </div>
          <div>
            <p><span className={styles.Sub}>Example:</span> Check if a Number is Prime</p>
            <p>A prime number is a number greater than 1 that has no divisors other than 1 and itself. We can use a flowchart to check if a number is prime.</p>
          </div>
          <div>
            <p className={styles.Sub}>Pseudocode:</p>
            <div className={styles.Example}>
            START <br />
            {"\u00A0".repeat(10)}DECLARE num, i, isPrime<br />
            {"\u00A0".repeat(10)}INPUT num<br />
            {"\u00A0".repeat(10)}SET isPrime = TRUE<br />
            {"\u00A0".repeat(10)}FOR i = 2 TO num - 1<br />
            {"\u00A0".repeat(15)}  IF num MOD i = 0 THEN<br />
            {"\u00A0".repeat(20)}    isPrime = FALSE<br />
            {"\u00A0".repeat(20)}    BREAK<br />
            {"\u00A0".repeat(15)} END IF<br />
            {"\u00A0".repeat(10)}END FOR<br />
            {"\u00A0".repeat(10)}IF isPrime THEN<br />
            {"\u00A0".repeat(15)} PRINT "The number is prime"<br />
            {"\u00A0".repeat(10)}  ELSE<br />
            {"\u00A0".repeat(15)}PRINT "The number is not prime"<br />
            {"\u00A0".repeat(10)}END IF<br />
            END
            </div>
            <div>
              <br />
              <p className={styles.Sub}>Flowchart Steps:</p>
              <ol className={styles.NumericOrder}>
                <li>Start (Oval)</li>
                <li>Input number (Parallelogram)</li>
                <li>Set isPrime = TRUE (Rectangle)</li>
                <li>Set i = 2 (Rectangle)</li>
                <li>Decision: Is i {'<'} number? (Diamond)</li>
                <ul>
                  <li>Yes: Proceed to the next decision</li>
                  <li>No: Output "The number is prime" → End</li>
                </ul>
                <li>Decision: Is num MOD i = 0? (Diamond)</li>
                <ul>
                  <li>Yes: Set isPrime = FALSE, Exit loop (BREAK) (Rectangle)</li>
                  <li>No: Increment i by 1 (Rectangle)</li>
                </ul>
                <li>Loop back to the check i {'<'} num</li>
                <li>Decision: Is isPrime TRUE? (Diamond)</li>
                <ul>
                  <li>Yes: Output "The number is prime" (Parallelogram)</li>
                  <li>No: Output "The number is not prime" (Parallelogram)</li>
                </ul>
                <li>End (Oval)</li>
              </ol>
            </div>
            <div>
              <p className={styles.Sub}>Flowchart Example:</p>
              <div className={styles.FlowchartExample}>
                <img src={ComplexFlowchart} alt="" />
              </div>
            </div>
            <div>
              <p>This flowchart shows the process of checking if a number is prime by testing divisibility with all numbers from 2 up to num - 1. If any divisor is found, the algorithm marks the number as not prime and stops further checks.</p>
            </div>
          </div>
          <div>
            <p className={styles.SubTitle}>Using Flowcharts to Understand and Debug Algorithms</p>
            <p>Flowcharts are a great tool not only for designing algorithms but also for understanding and debugging them. By visually mapping out the logic, you can:</p>
          </div>
          <div>
            <ul className={styles.BulletOrder}>
              <li><span className={styles.Sub}>dentify Missing or Incorrect Logic:</span>I If a flowchart seems incomplete or doesn't make sense, it may indicate an issue in the algorithm.</li>
              <li><span className={styles.Sub}>Simplify Complex Code:</span> Flowcharts break down complex algorithms into simple steps, making it easier to follow and understand.</li>
              <li><span className={styles.Sub}>Find Optimization Opportunities:</span> By visualizing the flow, you can identify redundant steps or areas where the algorithm can be optimized.</li>
            </ul>
          </div>
          <div>
            <p className={styles.SubTitle}>Review</p>
            <ul className={styles.BulletOrder}>
              <li>Flowcharts help visually represent an algorithm’s logic, making it easier to understand and debug.</li>
              <li>We can translate pseudocode into flowcharts by using symbols like rectangles for processes, diamonds for decisions, and parallelograms for input/output.</li>
              <li>Flowcharts are essential tools for algorithm design, helping to visualize loops, conditionals, and processes.</li>
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
