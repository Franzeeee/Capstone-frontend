import React from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import { getUserData } from '../../utils/userInformation'
import styles from '../../assets/css/pages/LogicLesson/lesson2.module.css'
import ProfileSide from '../../components/ProfileSide'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import customFetch from '../../utils/fetchApi'
import { toast } from 'react-toastify'

export default function Lesson2() {
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
                        <li className={`${styles.active}`}>Lesson 2: Basic Control Structures in Pseudocode</li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className={styles.content}>
            <div className={styles.LessonHeader}>
                <p className={styles.Title}>Lesson 2: Basic Control Structures in Pseudocode</p>
                <p><span className={styles.Sub}>Objective:</span> Teach control structures (conditional statements and loops) in pseudocode to represent logic in algorithms.</p>
            </div>
            <div>
                <p className={styles.SubTitle}>Key Concepts:</p>
                <ol>
                    <li><span className={styles.Sub}>Conditional Statements:</span> These allow the program to make decisions based on certain conditions. In pseudocode, we often use IF, ELSE IF, and ELSE to represent these decisions.</li>
                    <ul className={styles.BulletOrder}>
                        <li><span className={styles.Sub}>IF:</span> Executes a block of code if the condition is true.</li>
                        <li><span className={styles.Sub}>ELSE IF:</span> Tests another condition if the previous IF was false.</li>
                        <li><span className={styles.Sub}>ELSE:</span> Executes code if all previous conditions are false.</li>
                    </ul>
                    <li ><span className={styles.Sub}>Looping Structures:</span> These allow a block of code to be executed repeatedly. Common loops in pseudocode include FOR and WHILE loops.</li>
                    <ul className={styles.BulletOrder}>
                        <li><span className={styles.Sub}>FOR:</span> A loop that repeats a block of code a fixed number of times.</li>
                        <li><span className={styles.Sub}>WHILE:</span> A loop that repeats a block of code while a given condition remains true.</li>
                    </ul>
                </ol>
            </div>
            <div>
                <p className={styles.SubTitle}>Conditional Statements in Pseudocode</p>
                <p>Let's start by revisiting the concept of if-else statements with a simple example.</p>
                <p><span className={styles.Sub}>Example 1:</span> Check if a number is positive, negative, or zero.</p>
                <div className={styles.Example}>
                START <br />
                {"\u00A0".repeat(10)}DECLARE number<br />
                {"\u00A0".repeat(10)}INPUT number<br />
                {"\u00A0".repeat(10)}IF number {'>'} 0 THEN<br />
                {"\u00A0".repeat(15)}PRINT "The number is positive"<br />
                {"\u00A0".repeat(10)}ELSE IF number {"<"} 0 THEN<br />
                {"\u00A0".repeat(15)}PRINT "The number is negative"<br />
                {"\u00A0".repeat(10)}ELSE<br />
                {"\u00A0".repeat(15)}PRINT "The number is zero"<br />
                {"\u00A0".repeat(10)}END IF<br />
                END
                </div>
                <p><span className={styles.Sub}>Explanation:</span> The pseudocode checks the value of the number. If it's greater than 0, it prints "The number is positive". If it's less than 0, it prints "The number is negative". If neither condition is true (i.e., the number is zero), it prints "The number is zero".</p>
            </div>
            <div>
              <div>
                <p className={styles.SubTitle}>Looping Structures in Pseudocode</p>
                <p>There are two common types of loops in pseudocode: FOR loops and WHILE loops.</p>
              </div>
              <div>
                <p className={styles.SubTitle}>2.1 FOR Loop</p>
                <p>A FOR loop is used when the number of iterations is known in advance.</p>
              </div>
              <div>
                <p><span className={styles.Sub}>Example 2:</span> Print the numbers from 1 to 5.</p>
                <div className={styles.Example}>
                START <br />
                {"\u00A0".repeat(10)}FOR i = 1 TO 5<br />
                {"\u00A0".repeat(15)}PRINT i<br />
                {"\u00A0".repeat(10)}END FOR<br />
                END
                </div>
                <p><span className={styles.Sub}>Explanation:</span> This pseudocode uses a FOR loop to print numbers from 1 to 5. The loop will run 5 times, and with each iteration, the variable i will increase by 1, starting from 1.</p>
              </div>
              <div>
                <p className={styles.SubTitle}>2.2 WHILE Loop</p>
                <p>A WHILE loop is used when the number of iterations is not known and is based on a condition.</p>
              </div>
              <div>
                <p><span className={styles.Sub}>Example 3:</span> Print numbers from 1 to 5 using a WHILE loop.</p>
                <div className={styles.Example}>
                START <br />
                {"\u00A0".repeat(10)}END FORDECLARE i <br />
                {"\u00A0".repeat(10)}END FOR SET i = 1 <br />
                {"\u00A0".repeat(10)}END FORWHILE i {'<'}= 5 <br />
                {"\u00A0".repeat(15)}END FOR  PRINT i <br />
                {"\u00A0".repeat(15)}END FOR   SET i = i + 1 <br />
                {"\u00A0".repeat(10)}END FOREND WHILE <br />
                END
                </div>
                <p><span className={styles.Sub}>Explanation:</span> In this case, the loop runs as long as i is less than or equal to 5. After printing i, it increments by 1.</p>
              </div>
              <div>
                <p className={styles.SubTitle}>Combining Conditionals and Loops</p>
                <p>We can also combine loops and conditionals to solve more complex problems.</p>
              </div>
              <div>
                <p><span className={styles.Sub}>Example 4:</span> Sum all even numbers from 1 to 10.</p>
                <div className={styles.Example}>
                START<br />
                {"\u00A0".repeat(10)}DECLARE sum, i<br />
                {"\u00A0".repeat(10)}SET sum = 0<br />
                {"\u00A0".repeat(10)}FOR i = 1 TO 10<br />
                {"\u00A0".repeat(15)}IF i MOD 2 = 0 THEN<br />
                {"\u00A0".repeat(20)}sum = sum + i<br />
                {"\u00A0".repeat(15)}END IF<br />
                {"\u00A0".repeat(10)} END FOR<br />
                {"\u00A0".repeat(10)} PRINT sum<br />
                END
                </div>
                <p><span className={styles.Sub}>Explanation:</span> This pseudocode uses a FOR loop to iterate through the numbers 1 to 10. The IF statement inside the loop checks if a number is even (i MOD 2 = 0). If the number is even, it adds that number to sum. After the loop finishes, the total sum of even numbers (2 + 4 + 6 + 8 + 10) is printed.</p>
              </div>
              <div>
                <p className={styles.SubTitle}>Review:</p>
                <ul className={styles.BulletOrder}>
                  <li>Conditionals (IF, ELSE IF, ELSE) help make decisions in pseudocode based on conditions.</li>
                  <li>Loops (FOR, WHILE) repeat a block of code, either a set number of times or as long as a condition is true.</li>
                  <li></li>Combining conditionals and loops allows for solving more complex problems, such as summing specific values or checking conditions within a series of numbers.
                </ul>
              </div>
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
