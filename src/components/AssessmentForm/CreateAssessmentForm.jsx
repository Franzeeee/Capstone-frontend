import React, { useState } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';
import styles from '../../assets/css/components/create-assessment-form.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
const CreateAssessmentForm = ({ activeForm, onSubmit, handleClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '00:00:00',
        timeLimit: null,
        coding_problems: [],
    });

    const [addingProblem, setAddingProblem] = useState(true);
    const [tempProblem, setTempProblem] = useState({
        problem_title: '',
        problem_description: '',
        sample_input: '',
        expected_output: '',
    });
    

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleProblemChange = (e) => {
        const { name, value } = e.target;
        setTempProblem((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddProblem = () => {
        if (tempProblem.problem_title && tempProblem.problem_description && tempProblem.sample_input && tempProblem.expected_output) {
            setFormData((prevData) => ({ ...prevData, coding_problems: [...prevData.coding_problems, tempProblem] }));
            setTempProblem({
                problem_title: '',
                problem_description: '',
                sample_input: '',
                expected_output: '',
            });
            setAddingProblem(false);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);  // Send data to parent
    };

    const addProblem = () => {
        setAddingProblem(true);
    }

    const cancelAddingPoblem = () => {
        setAddingProblem(false);
        setTempProblem({
            problem_title: '',
            problem_description: '',
            sample_input: '',
            expected_output: '',
        });
    }

    return (
        <Form onSubmit={handleSubmit}>
            {activeForm === 'logic' ? (
                <>
                    <Form.Group className={`${styles.formGroup}`} controlId="title">
                        <Form.Label className={styles.formLabel}>Assessment Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={formData.title}
                            onChange={handleChange}
                            className={styles.control}
                        />
                    </Form.Group>
                    <Form.Group className={`${styles.formGroup} mb-3`} controlId="description">
                        <Form.Label className={styles.formLabel}>Assessment Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder="Enter Description"
                            value={formData.description}
                            onChange={handleChange}
                            className={styles.control}
                        />
                    </Form.Group>
                    <Form.Group className={`${styles.formGroup} mb-3`} controlId="dueDate">
                        <Form.Label className={styles.formLabel}>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className={styles.control}
                        />
                    </Form.Group>
                </>
            ) : (
                <>
                    <Form.Group className={`${styles.formGroup} mb-2`} controlId="title1">
                        <Form.Label className={styles.formLabel}>Assessment Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter Title"
                            value={formData.title}
                            onChange={handleChange}
                            className={styles.control}
                        />
                    </Form.Group>
                    <Form.Group className={`${styles.formGroup} mb-2`} controlId="description1">
                        <Form.Label className={styles.formLabel}>Assessment Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder="Enter Description"
                            value={formData.description}
                            onChange={handleChange}
                            className={styles.control}
                        />
                    </Form.Group>
                    <Form.Group className={`${styles.formGroup} mb-2`} controlId="timeLimit">
                        <Form.Label className={styles.formLabel}>Time Limit (hh:mm:ss)</Form.Label>
                        <Form.Control
                            type="text"
                            name="timeLimit"
                            placeholder="00:00:00"
                            value={formData.timeLimit}
                            onChange={handleChange}
                            className={styles.control}
                        />
                    </Form.Group>
                    <Form.Group className={`${styles.formGroup} mb-3`} controlId="codingProblems">
                        <Form.Label className={styles.formLabel}>
                            Coding Problem/s 
                            <FontAwesomeIcon 
                                style={{display: `${formData.coding_problems.length === 0 ? "none" : "inline" }`}} 
                                onClick={() => addProblem()} 
                                className={styles.addProblem} 
                                icon={faCirclePlus} />

                            </Form.Label>
                        { formData.coding_problems.length !== 0 && !addingProblem ? (
                            formData.coding_problems.map((problem, index) => (
                                <Accordion className={styles.accordion}>
                                    <Accordion.Item eventKey={index}>
                                        <Accordion.Header>{problem.problem_title}</Accordion.Header>
                                        <Accordion.Body>
                                            <div className={styles.accordionDescription}>
                                                <p>Description: </p>
                                                <p>{problem.problem_description}</p>
                                            </div>
                                            <div className={styles.accordionDescription}>
                                                <p>Sample Input: </p>
                                                <p>{problem.sample_inpuut}</p>
                                            </div>
                                            <div className={styles.accordionDescription}>
                                                <p>Expected Output: </p>
                                                <p>{problem.expected_output}</p>
                                            </div>
                                            <div className={styles.EDBtnContainer}>
                                                <button className={styles.BTN}><FontAwesomeIcon icon={faPenToSquare} style={{ color: 'blue' }}  /></button>
                                                <button className={styles.BTN}><FontAwesomeIcon icon={faTrashCan} style={{ color: 'red' }}/></button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            )))
                        : (
                            <div className={styles.problemContainer}>
                            <div className={styles.formContainer}>
                            <Form.Group className={`${styles.formGroup} mb-2`} controlId="problem1">
                                <Form.Label className={styles.formLabel}>Problem Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="problem_title"
                                    placeholder="Enter Problem Name"
                                    className={styles.control}
                                    value={tempProblem.problem_title}
                                    onChange={handleProblemChange}
                                />
                            </Form.Group>
                            <Form.Group className={`${styles.formGroup} mb-2`} controlId="problem2">
                                <Form.Label className={styles.formLabel}>Instruction/Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="problem_description"
                                    placeholder="Enter Description"
                                    rows={3}
                                    value={tempProblem.problem_description}
                                    onChange={handleProblemChange}
                                    className={styles.control}
                                />
                            </Form.Group>
                            <Form.Group className={`${styles.formGroup} mb-2`} controlId="sampleInput">
                                <Form.Label className={styles.formLabel}>Sample Input</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="sample_input"
                                    placeholder="Enter Sample Input"
                                    value={tempProblem.sample_input}
                                    onChange={handleProblemChange}
                                    className={styles.control}
                                />
                            </Form.Group>
                            <Form.Group className={`${styles.formGroup} mb-2`} controlId="expectedOutput">
                                <Form.Label className={styles.formLabel}>Expected Output</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="expected_output"
                                    placeholder="Enter Expected Output"
                                    className={styles.control}
                                    value={tempProblem.expected_output}
                                    onChange={handleProblemChange}
                                />
                            </Form.Group>
                            </div>
                            <div className={styles.problemButtons}>
                                <button onClick={cancelAddingPoblem} style={{display: `${formData.coding_problems.length === 0 ? "none" : "block" }`}}>Cancel</button>
                                <button type="button" onClick={handleAddProblem}>{formData.coding_problems.length === 0 || !addingProblem ? "Add Problem" : "New Problem" }</button>
                            </div>
                        </div>
                        )}
                    </Form.Group>
                    <Form.Group className={`${styles.formGroup} mb-2`} controlId="options">
                    </Form.Group>
                </>
            )}
            <div className={styles.canvasButtons}>
            <Button className={styles.cancelCanvas} onClick={() => handleClose()}>Cancel</Button>
            <Button type="submit">Submit</Button>
            </div>
        </Form>
    );
};

export default CreateAssessmentForm;




const SwitchComponent = ({ label, checked, onChange }) => {
    return (
        <Form.Group className="mb-3" controlId="formBasicSwitch">
            <Form.Check 
                type="switch"
                id="custom-switch"
                label={label}
                checked={checked}
                onChange={onChange}
            />
        </Form.Group>
    );
};
