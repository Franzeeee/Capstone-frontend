import React from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import HomeTemplate from '../../templates/HomeTemplate';
import styles from '../../assets/css/pages/Grades/grades.module.css';
import ProfileSide from '../../components/ProfileSide';
import { useNavigate } from 'react-router-dom';
import {getUserData} from '../../utils/userInformation';
import StudentGradeDoughnut from '../../components/Charts/StudentGradeDoughnut';

export default function Grades() {

  const navigate = useNavigate();
  const user = getUserData();

  const assessments = [
    {
        id: 1,
        title: 'Assessment 1',
        total_submissions: 25,
        start_date: '2024-11-10T10:00:00Z',
    },
    {
        id: 2,
        title: 'Assessment 2',
        total_submissions: 10,
        start_date: '2024-11-15T10:00:00Z',
    },
    {
        id: 3,
        title: 'Assessment 3',
        total_submissions: 30,
        start_date: '2024-11-20T10:00:00Z',
    }
];

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
            <div className={styles.graphs}>
              <StudentGradeDoughnut />
              <StudentGradeDoughnut />
            </div>
            <MDBTable striped responsive hover className={styles.table}>
                <MDBTableHead>
                    <tr className="table-secondary">
                        <th scope="col">#</th>
                        <th scope="col">Class</th>
                        <th scope="col">Final Grade</th>
                        <th scope="col">Status</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {assessments.map((assessment, index) => (
                        <tr key={assessment.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{assessment.title}</td>
                            <td>{assessment.total_submissions || 0}</td>
                            <td>{new Date(assessment.start_date).toLocaleDateString() || 'N/A'}</td>
                        </tr>
                    ))}
                </MDBTableBody>
            </MDBTable>
          </div>
        </div>
        <div className={`${styles.profileContainer}`}>
            <ProfileSide info={user} />
        </div>
      </div>

    </HomeTemplate>
  )
}
