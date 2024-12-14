import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';
import HomeTemplate from '../../templates/HomeTemplate';
import styles from '../../assets/css/pages/Grades/grades.module.css';
import ProfileSide from '../../components/ProfileSide';
import { useNavigate } from 'react-router-dom';
import {getUserData} from '../../utils/userInformation';
import StudentGradeDoughnut from '../../components/Charts/StudentGradeDoughnut';
import LineChart from '../../components/Charts/LineChart';
import customFetch from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Grades() {

  const navigate = useNavigate();
  const user = getUserData();

  const [fetching, setFetching] = useState(true);

  const [classes, setClasses] = useState([]);
  const [gradedClasses, setGradedClasses] = useState(0);
  const [classData, setClassData] = useState([0, 0, 0]);


  const itemsPerPage = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page state

  // Calculate the total number of pages
  const totalPages = Math.ceil(classes.length / itemsPerPage);

  // Calculate which items should be displayed on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentClasses = classes.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

useEffect(() => {
    customFetch(`/classes/${user.id}/fetch`, {
        method: 'GET',
    })
    .then(data => {
        setClasses(data);
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
        setFetching(false);
    });

}, []);

useEffect(() => {
  const gradedClasses = classes.filter(classItem =>
    classItem?.grade?.remarks === "Not Yet Graded" && Number(classItem?.grade?.final_grade) === 0
  );
  setGradedClasses(gradedClasses.length);

  const ungraddedClasses = classes.filter(classItem =>
    classItem?.grade?.remarks === "Not Yet Graded" && Number(classItem?.grade?.final_grade) === 0
  );
  const failClasses = classes.filter(classItem =>
    classItem?.grade?.remarks === "Fail" && Number(classItem?.grade?.final_grade) < 70
  );
  const passClasses = classes.filter(classItem =>
    classItem?.grade?.remarks !== "Fail" && Number(classItem?.grade?.final_grade) >= 70 && Number(classItem?.grade?.final_grade) <= 100
  );

  setClassData([
    failClasses.length,
    passClasses.length,
    classes.length - (failClasses.length + passClasses.length),
  ]);

  // console.log('classes', classes);
  // console.log('gradedClasses', gradedClasses);
  // console.log('ungraddedClasses', ungraddedClasses);
  // console.log('failClasses', failClasses);
  // console.log('passClasses', passClasses);
}, [classes]);


  return (
    <HomeTemplate>

      <div className={`${styles.container} ${styles.classDashboard} studentGrades`}>
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
            <div className={styles.graphs}>
              {/* <LineChart /> */}
              <div className={styles.twoGraph}>
                <StudentGradeDoughnut classData={classData} />
                <div className={styles.cardContainer}>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>Total Classes</div>
                    <div className={styles.cardValue}>
                      {fetching ? <FontAwesomeIcon icon={faSpinner} spin /> : classes.length || 0}
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>Graded Class</div>
                    <div className={styles.cardValue}>
                      {fetching ? <FontAwesomeIcon icon={faSpinner} spin /> : classData[0] + classData[1] || 0}
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardTitle}>Ungraded Class</div>
                    <div className={styles.cardValue}>
                      {fetching ? <FontAwesomeIcon icon={faSpinner} spin /> : classes.length - (classData[0] + classData[1]) || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <MDBTable responsive hover className={styles.table}>
                <MDBTableHead>
                    <tr className="table-light">
                        <th scope="col">#</th>
                        <th scope="col">Class</th>
                        <th scope="col">Final Grade</th>
                        <th scope="col">Status</th>
                        <th scope="col">Certificate</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {classes && classes.length > 0 ? classes.map((classItem, index) => (
                        <>
                          <tr key={classItem.id}>
                              <th scope="row">{index + 1}</th>
                              <td>{classItem?.name}</td>
                              <td>{classItem?.grade?.final_grade || 0}</td>
                              <td>{classItem?.grade?.remarks}</td>
                              <td style={{textAlign: 'center'}}>
                                <FontAwesomeIcon 
                                  className={classItem?.certificate &&  classItem?.grade?.final_grade >= 70 || classItem?.certificate?.issued_to == "all" ? styles.hasCertificate : styles.noCertificate} 
                                  icon={faDownload} 
                                  onClick={ classItem?.certificate &&  classItem?.grade?.final_grade >= 70 || classItem?.certificate?.issued_to == "all" ?
                                      () => navigate(`/certificate`, { state: { captureMode: true, studentName: user.name, teacher: classItem?.certificate?.teacher_name, date: classItem?.certificate?.issue_date, className: classItem?.name, gwa: classItem?.grade?.final_grade, remarks: classItem?.grade?.remarks } }) 
                                    : null
                                    }
                                />
                                
                              </td>
                          </tr>
                        </>
                    )) :
                    <tr>
                        <td colSpan="5" className="text-center">No classes found</td>
                    </tr>
                    }
                </MDBTableBody>
            </MDBTable>

            <MDBPagination>
                <MDBPaginationItem disabled={currentPage === 1}>
                    <MDBPaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                    </MDBPaginationLink>
                </MDBPaginationItem>

                {/* Page number buttons */}
                {[...Array(totalPages)].map((_, index) => (
                    <MDBPaginationItem key={index} active={currentPage === index + 1}>
                        <MDBPaginationLink onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                ))}

                <MDBPaginationItem disabled={currentPage === totalPages}>
                    <MDBPaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                    </MDBPaginationLink>
                </MDBPaginationItem>
            </MDBPagination>
          </div>
        </div>
        <div className={`${styles.profileContainer}`}>
            <ProfileSide info={user} />
        </div>
      </div>

    </HomeTemplate>
  )
}
