import React from 'react'
import HomeTemplate from '../../templates/HomeTemplate'
import { getUserData } from '../../utils/userInformation'
import styles from '../../assets/css/pages/LogicLesson/lesson3.module.css'
import ProfileSide from '../../components/ProfileSide'
import SimpleFlowchart from '../../assets/img/SimpleFlowchart.png'
import { SubTitle } from 'chart.js'
export default function Lesson3() {

  const user = getUserData();

  return (
    <HomeTemplate>
        <div className={`${styles.container} ${styles.classDashboard}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.header}`}>
              <div className={`${styles.create}`}>
                  <div>
                      <ul>
                          <li>Grades</li>
                      </ul>
                  </div>
              </div>
          </div>
          <div className={styles.content}>
            <div className={styles.LessonHeader}>
              <p className={styles.Title}>Lesson 3: Introduction to Flowcharts</p>
              <p><span className={styles.Sub}>Objective:</span> Introduce flowcharts as a visual way to represent algorithms and processes, making them easier to understand and follow.</p>
            </div>
            <div>
              <p className={styles.SubTitle}>Key Concepts:</p>
              <ol>
                <li className={styles.SubTitle}>What is a Flowchart?</li>
                <ul className={styles.BulletOrder}>
                  <li>A flowchart is a diagrammatic representation of an algorithm or process. It uses various symbols to represent different types of actions or steps.</li>
                  <li>Flowcharts help you understand the logical flow of a process, making them an essential tool for both planning and debugging algorithms.</li>
                </ul>
                <li className={styles.SubTitle}>Why Use Flowcharts?</li>
                <ul className={styles.BulletOrder}>
                  <li>They provide a visual representation of an algorithm, which can be easier to follow than written pseudocode.</li>
                  <li>Flowcharts make it easier to identify problems in a process or algorithm.</li>
                  <li>They can be used as documentation, so others can understand your logic without needing to read through the actual code.</li>
                </ul>
                <li><span className={styles.SubTitle}>Basic Flowchart Symbols:</span> Flowcharts use specific symbols to represent different types of operations or steps:</li>
                <ul className={styles.BulletOrder}>
                  <li><span className={styles.Sub}>Oval (or Ellipse):</span> Represents the Start or End of the process.</li>
                  <li><span className={styles.Sub}>Parallelogram:</span> Represents Input or Output operations (e.g., user input or displaying a result).</li>
                  <li><span className={styles.Sub}>Rectangle:</span> Represents a Process step, such as a calculation or assignment.</li>
                  <li><span className={styles.Sub}>Diamond:</span> Represents a Decision (e.g., an IF statement, or a condition that must be checked).</li>
                </ul>
              </ol>
            </div>
            <div>
              <p className={styles.SubTitle}>Flowchart Symbols in Detail</p>
              <p>Here’s a summary of the most commonly used flowchart symbols:</p>
              <div className={styles.FlowTable}>
                <table border="1" cellPadding="10">
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Purpose</th>
                      <th>Example Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Oval</td>
                      <td>Start or End of the algorithm/process</td>
                      <td>Start, End</td>
                    </tr>
                    <tr>
                      <td>Parallelogram</td>
                      <td>Input or Output (read data/display results)</td>
                      <td>Input data, display results</td>
                    </tr>
                    <tr>
                      <td>Rectangle</td>
                      <td>Process or Action (e.g., calculation)</td>
                      <td>Variable assignment, arithmetic</td>
                    </tr>
                    <tr>
                      <td>Diamond</td>
                      <td>Decision (Condition/if-else logic)</td>
                      <td>Check if a number is positive/negative</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <p className={styles.SubTitle}>Simple Flowchart Example</p>
              <p>Let’s take a simple pseudocode example and convert it into a flowchart.</p>
              <p className={styles.Sub}>Pseudocode Example:</p>
              <div className={styles.Example}>
              START <br />
              {"\u00A0".repeat(10)}DECLARE number<br />
              {"\u00A0".repeat(10)}INPUT number<br />
              {"\u00A0".repeat(10)}IF number {">"} 0 THEN<br />
              {"\u00A0".repeat(15)}PRINT "The number is positive"<br />
              {"\u00A0".repeat(10)}ELSE IF number {"<"} 0 THEN<br />
              {"\u00A0".repeat(15)}PRINT "The number is negative"<br />
              {"\u00A0".repeat(10)}ELSE<br />
              {"\u00A0".repeat(15)}PRINT "The number is zero"<br />
              {"\u00A0".repeat(10)}END IF<br />
              END
              </div >
              <div>
              <p className={styles.Sub}>Flowchart Steps:</p>
              <ol className={styles.NumericOrder}>
                <li>Start (Oval)</li>
                <li>Input num1, num2 (Parallelogram)</li>
                <li>Decision: Is num1 {'>'} num2? (Diamond)</li>
                  <ul className={styles.BulletOrder}>
                    <li>If Yes: Set largest = num1 (Rectangle)</li>
                    <li>If No: Set largest = num2 (Rectangle)</li>
                  </ul>
                <li>Output largest (Parallelogram)</li>
                <li>End (Oval)</li>
              </ol>
              </div>
              <p className={styles.Sub}>Flowchart Example:</p>
              <div className={styles.FlowchartExample}>
                <img src={SimpleFlowchart} alt="" />
              </div>
            </div>
            <div>
              <p className={styles.SubTitle}>Review</p>
              <ul className={styles.BulletOrder}>
                <li>Flowcharts provide a visual representation of an algorithm or process.</li>
                <li>Symbols like ovals (Start/End), parallelograms (Input/Output), rectangles (Process), and diamonds (Decision) help to clearly represent the flow of control in an algorithm.</li>
                <li>Flowcharts can help you understand and debug algorithms more easily by breaking down complex logic into simpler, visual steps.</li>
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
