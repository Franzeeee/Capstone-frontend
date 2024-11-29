import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import styles from "../../assets/css/components/create-assessment-form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faExclamationCircle, faFile, faFileAlt, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint, faFileWord, faSpinner, faTrashAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import customFetch from "../../utils/fetchApi"
import { toast } from "react-toastify";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CreateAssessmentForm = ({ activeForm, classId, subject, onSubmit, handleClose, editMode = {active: false, data: {}}  }) => {

  const BASE_URL = import.meta.env.VITE_API_URL;


  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time_limit: 0,
    due_date: null,
    points: 0,
    final_assessment: false,
    manual_checking: false,
    coding_problems: editMode.active ? editMode?.data?.coding_problems : [],
    files: [],
  });
  const [timeError, setTimeError] = useState("");
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

  const handleTimeChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, time_limit: value }));

    if (!timeRegex.test(value)) {
      setTimeError("Invalid time format. Please use hh:mm:ss.");
    } else {
      setTimeError("");
    }
  };
  
  const inputRef = useRef(null);

  const [file, setFile] = useState([]);
  
  useEffect(() => {
    if (editMode.active) {
      const newFormat = {
        ...editMode.data,
        due_date: editMode.data.end_date ? editMode.data.end_date : null,
        time_limit: secondsToTime(editMode.data.time_limit),
        coding_problems: editMode.data.coding_problems.map(problem => ({
          ...problem,
          problem_title: problem.title,
          problem_description: problem.description,
        })),
      };
      setFormData(newFormat);
    }
  }, [editMode]);

  const [addingProblem, setAddingProblem] = useState(!editMode.active ? true : false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempProblem, setTempProblem] = useState({
    problem_title: "",
    problem_description: "",
    sample_input: "",
    expected_output: "",
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
    if (
      tempProblem.problem_title &&
      tempProblem.problem_description &&
      tempProblem.expected_output
    ) {
      setFormData((prevData) => ({
        ...prevData,
        coding_problems: [...prevData.coding_problems, tempProblem],
      }));
      setTempProblem({
        problem_title: "",
        problem_description: "",
        sample_input: "",
        expected_output: "",
        points: 100,
      });
      setAddingProblem(false);
    }
  };

  const handleFinalAssessment = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      final_assessment: e.target.checked,
    }));
  };

  const handleManualChecking = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      manual_checking: e.target.checked,
    }));
  };

  const handleGraded = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      points: e.target.checked ? 100 : 0,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeForm === "coding") {
      if (timeError) {
        toast.error("Please correct the time limit before submitting.");
        return;
      }
      const formattedData = {
      ...formData,
      end_date: formData.due_date,
      time_limit: timeToSeconds(formData.time_limit),
      coding_problems: formData.coding_problems.map(problem => ({
        ...problem,
        title: problem.title, // Keep title
        description: problem.description, // Keep description
      })),
    };
    if (editMode) {
      toast.loading("Updating assessment...");
    }else {
      toast.loading("Creating assessment...");
    }
    onSubmit(editMode ? formattedData : formData); // Send formatted data to parent
    } else {
      toast.loading("Creating assessment...");
      const data = new FormData();

    // Ensure all fields are properly populated
      data.append("course_class_id", Number(classId)); // Convert to a number
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("time_limit", formData.time_limit);
      data.append("due_date", formData.due_date); // Send as undefined if null
      data.append("points", formData.points);

      // Append files and log them
      file.forEach((f, index) => {
          data.append(`files[${index}]`, f);
          // console.log(`files[${index}]:`, f); // Log file object to ensure it's attached
      });

      // // Log the entire FormData for inspection
      // for (const [key, value] of data.entries()) {
      //     console.log(`${key}:`, value);
      // }

      // Send the request
      fetch(`${BASE_URL}/activity/logic/upload`, {
          method: 'POST',
          credentials: 'include',
          body: data,
      })
      .then(data => {
        toast.dismiss();
        toast.success("Assessment created successfully");
        handleClose();
      })
      .catch(err => {
        toast.dismiss();
        toast.error("Failed to create assessment");
      })

      }
  };
  

  const addProblem = () => {
    setAddingProblem(true);
  };

  const cancelAddingPoblem = () => {
    setAddingProblem(false);
    setIsEditing(false);
    setTempProblem({
      problem_title: "",
      problem_description: "",
      sample_input: "",
      expected_output: "",
    });
  };

  const handleDeleteProblem = (index) => {
    const newProblems = formData.coding_problems.filter(
      (problem, i) => i !== index
    );
    setFormData((prevData) => ({ ...prevData, coding_problems: newProblems }));
  };

  const handleEditProblem = (index) => {
    setIsEditing(true);
    setTempProblem(formData.coding_problems[index]);
    setAddingProblem(true);
    setEditingIndex(index);
  };
  const handleUpdateProblem = () => {
    if (
      tempProblem.problem_title &&
      tempProblem.problem_description &&
      tempProblem.sample_input &&
      tempProblem.expected_output
    ) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        coding_problems: prevFormData.coding_problems.map((problem, i) =>
          i === editingIndex ? { ...tempProblem } : problem
        ),
      }));

      // Reset editing state and clear tempProblem
      setTempProblem({
        problem_title: "",
        problem_description: "",
        sample_input: "",
        expected_output: "",
      });

      setAddingProblem(false);
      setIsEditing(false);
    }
  };




  const handleDragOver = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          inputRef.current.files = event.dataTransfer.files;
          // console.log("Files dropped:", event.dataTransfer.files);
      }
  };

  const handleFileChange = (event) => {
      if (event.target.files && event.target.files.length > 0) {
          setFile(prev => [...prev, ...event.target.files])
          // console.log("Files selected:", event.target.files);
      }
  }

  const handleRemoveFile = (index) => {
      setFile(prev => prev.filter((_, i) => i !== index
      ))
  }

  const handleLogicSubmit = (e) => {
    e.preventDefault();
  }

  const [generating, setGenerating] = useState(false);

  
  const generateProblem = () => {
    if(formData.title !== "" || formData.description !== "") {
      setGenerating(true);
      const problemForm = new FormData();
      problemForm.append("title", formData.title);
      problemForm.append("description", formData.description);
      problemForm.append('subject', subject);
      customFetch(`/assessment/coding/generate`,{
        method: 'POST',
        contentType: 'application/json',
        body: problemForm
      })
      .then(data => {
        // console.log(convertToProblemObject(data.result));
        const generatedProblem = convertToProblemObject(data.result);
        setTempProblem({
          problem_title: generatedProblem.problemName,
          problem_description: generatedProblem.problemDescription,
          sample_input: generatedProblem.sampleInput,
          expected_output: generatedProblem.sampleOutput,
        })
      })
      .catch(error => {
        console.error('Error:', error.message);
      })
      .finally(() => {
        setGenerating(false);
      }); 
    } else {
      toast.error("Please fill in the title and description first");
    }
    
  }

  return (
    <Form encType="multipart/form-data" onSubmit={handleSubmit}>
      {activeForm === "logic" ? (
        <>
          <Form.Group className={`${styles.formGroup}`} controlId="title">
            <Form.Label className={styles.formLabel}>
              Assessment Title
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              className={styles.control}
            />
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} mb-3`}
            controlId="description"
          >
            <Form.Label className={styles.formLabel}>
              Assessment Description
            </Form.Label>
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

          <Form.Group
            className={`${styles.formGroup} mb-3`}
            controlId="fileUpload"
          >
            <div className={styles.uploadingArea}>
              <div className={styles.uploadBox} onDrop={handleDrop} onDragOver={handleDragOver} onClick={() => inputRef.current && inputRef.current.click()}>
                <FontAwesomeIcon className={styles.uploadIcon} icon={faUpload} />
                <p>Click or Drag and drop file here</p>
                <input 
                  type="file" 
                  ref={inputRef}
                  onChange={(e) => handleFileChange(e)}
                  accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .jpg, .jpeg, .png, .gif, .bmp"
                  multiple
                />
              </div>
              <div className={styles.fileArea}>
                {
                  file && file.map((f, i) => (
                    <div className={styles.fileCard} key={i}>
                      <div>
                        <FontAwesomeIcon className={styles.fileIcon} icon={getFileIcon(f.name)} />
                        <div className={styles.fileInfo}>
                          <p>{f.name}</p>
                          <p>{(f.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveFile(i)} type="button"><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                  ))
                }
              </div>
            </div>
          </Form.Group>

          <Form.Group
            className={`${styles.formGroup} mb-3`}
            controlId="dueDate"
          >
            <Form.Label className={styles.formLabel}>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className={styles.control}
            />
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} mb-2 d-flex flex-column gap-1 w-100`}
            controlId="options"
          >
            <div className="d-flex flex-row align-items-center gap-1">
              <Form.Check
                className="switch-left"
                id="custom-switch-1"
                type="switch"
                label="Final Assessment"
                checked={formData?.final_assessment || false}
                onChange={handleFinalAssessment}
              />
              
              <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id={`tooltip-test`}>Turn this on to set this as a final assessment</Tooltip>}
              >
                <p className={styles.exclamationInfo}><FontAwesomeIcon icon={faExclamationCircle} /></p>
              </OverlayTrigger>
            </div>
            <div className="d-flex flex-row align-items-center gap-1">
              <Form.Check
                className="switch-right"
                id="custom-switch-3"
                type="switch"
                label="Graded Assessment"
                checked={formData?.points === 100}
                onChange={handleGraded}
              />
              <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id={`tooltip-test`}>Turn this on to set the points from 0 to 100</Tooltip>}
              >
                <p className={styles.exclamationInfo}><FontAwesomeIcon icon={faExclamationCircle} /></p>
              </OverlayTrigger>
            </div>
          </Form.Group>

        </>
      ) : (
        <>
          <Form.Group className={`${styles.formGroup} mb-2`} controlId="title1">
            <Form.Label className={styles.formLabel}>
              Assessment Title
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formData.title}
              onChange={handleChange}
              className={styles.control}
            />
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} mb-2`}
            controlId="description1"
          >
            <Form.Label className={styles.formLabel}>
              Assessment Description
            </Form.Label>
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
          <Form.Group
            className={`${styles.formGroup} mb-2`}
            controlId="time_limit"
          >
            <Form.Label className={styles.formLabel}>
              Time Limit (hh:mm:ss)
            </Form.Label>
            <Form.Control
              type="text"
              name="time_limit"
              placeholder="00:00:00"
              value={formData.time_limit}
              onChange={handleTimeChange}
              className={styles.control}
              isInvalid={!!timeError}
            />
            <Form.Control.Feedback type="invalid">{timeError}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} mb-3`}
            controlId="codingProblems"
          >
            <Form.Label className={styles.formLabel}>
              Coding Problem/s
              <FontAwesomeIcon
                style={{
                  display: `${
                    formData.coding_problems.length === 0 ? "none" : "inline"
                  }`,
                }}
                onClick={() => addProblem()}
                className={styles.addProblem}
                icon={faCirclePlus}
              />
              <button type="button" onClick={!generating ? generateProblem : ""} disabled={generating} className={`${styles.generateAssessmentBtn} ${addingProblem ? '' : 'd-none'}`}>Generate Assessment Problems</button>
            </Form.Label>
            {formData.coding_problems.length !== 0 && !addingProblem ? (
              formData.coding_problems.map((problem, index) => (
                <Accordion className={styles.accordion}>
                  <Accordion.Item
                    key={index}
                    eventKey={index}
                    style={{ marginBottom: "5px" }}
                  >
                    <Accordion.Header>{problem.problem_title}</Accordion.Header>
                    <Accordion.Body className={styles.accordionBody}>
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
                        <button
                          type="button"
                          onClick={() => handleEditProblem(index)}
                          className={styles.BTN}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "blue" }}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProblem(index)}
                          className={styles.BTN}
                        >
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            style={{ color: "red" }}
                          />
                        </button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))
            ) : (
              <div className={`${styles.problemContainer} ${generating ? styles.isGenerting : ""}`}>
                <div className={styles.formContainer}>
                  <Form.Group
                    className={`${styles.formGroup} mb-2`}
                    controlId="problem1"
                  >
                    <Form.Label className={styles.formLabel}>
                      Problem Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="problem_title"
                      placeholder="Enter Problem Name"
                      className={styles.control}
                      value={tempProblem.problem_title}
                      onChange={handleProblemChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className={`${styles.formGroup} mb-2`}
                    controlId="problem2"
                  >
                    <Form.Label className={styles.formLabel}>
                      Instruction/Description
                    </Form.Label>
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
                  <Form.Group
                    className={`${styles.formGroup} mb-2`}
                    controlId="sampleInput"
                  >
                    <Form.Label className={styles.formLabel}>
                      Sample Input
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="sample_input"
                      placeholder="Enter Sample Input"
                      value={tempProblem.sample_input}
                      onChange={handleProblemChange}
                      className={styles.control}
                    />
                  </Form.Group>
                  <Form.Group
                    className={`${styles.formGroup} mb-2`}
                    controlId="expectedOutput"
                  >
                    <Form.Label className={styles.formLabel}>
                      Expected Output
                    </Form.Label>
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
                  <button
                    onClick={cancelAddingPoblem}
                    style={{
                      display: `${
                        formData.coding_problems.length === 0 ? "none" : "block"
                      }`,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    style={{ display: `${!isEditing ? "block" : "none"}` }}
                    onClick={handleAddProblem}
                  >
                    {formData.coding_problems.length === 0 || !addingProblem
                      ? "Add Problem"
                      : "New Problem"}
                  </button>
                  <button
                    type="button"
                    style={{ display: `${isEditing ? "block" : "none"}` }}
                    className={styles.saveUpdate}
                    onClick={handleUpdateProblem}
                  >
                    Save Update
                  </button>
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} mb-3`}
            controlId="dueDate"
          >
            <Form.Label className={styles.formLabel}>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className={styles.control}
            />
          </Form.Group>
          <Form.Group
            className={`${styles.formGroup} mb-2 d-flex justify-content-between w-100`}
            controlId="options"
          >
            <div className="d-flex flex-row align-items-center gap-1">
              <Form.Check
                className="switch-left"
                id="custom-switch-1"
                type="switch"
                label="Final Assessment"
                checked={formData?.final_assessment || false}
                onChange={handleFinalAssessment}
              />
              <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-test`}>Turn this on to set this as a final assessment</Tooltip>}
              >
                <p className={styles.exclamationInfo}><FontAwesomeIcon icon={faExclamationCircle} /></p>
              </OverlayTrigger>
            </div>
            <div className="d-flex flex-row align-items-center gap-1">
              <Form.Check
                className="switch-left"
                id="custom-switch-2"
                type="switch"
                label="Manual Checking"
                checked={formData?.manual_checking || false}
                onChange={handleManualChecking}
              />
              <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-test`}>Turn this on to manually check every student submission</Tooltip>}
              >
                <p className={styles.exclamationInfo}><FontAwesomeIcon icon={faExclamationCircle} /></p>
              </OverlayTrigger>
            </div>
            <div className="d-flex flex-row align-items-center gap-1">
              <Form.Check
                className="switch-right"
                id="custom-switch-3"
                type="switch"
                label="Graded Assessment"
                checked={formData?.points === 100}
                onChange={handleGraded}
              />
              <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id={`tooltip-test`}>Turn this on to set the points from 0 to 100</Tooltip>}
              >
                <p className={styles.exclamationInfo}><FontAwesomeIcon icon={faExclamationCircle} /></p>
              </OverlayTrigger>
            </div>
          </Form.Group>
        </>
      )}
      <div className={styles.canvasButtons}>
        <Button className={styles.cancelCanvas} onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button type="submit" disabled={processing} className={styles.Submit}>{processing ? <FontAwesomeIcon icon={faSpinner} spin /> : editMode.active ? "Save" : "Submit"}</Button>
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

const getFileExtension = (fileName) => {
  return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();
};
const getFileIcon = (fileName) => {
  const extension = getFileExtension(fileName);

  // Define icon mapping based on file extension
  switch (extension) {
      case "pdf":
          return faFilePdf;
      case "doc":
      case "docx":
          return faFileWord;
      case "xls":
      case "xlsx":
          return faFileExcel;
      case "ppt":
      case "pptx":
          return faFilePowerpoint;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "bmp":
          return faFileImage;
      default:
          return faFileAlt; // Generic icon for other files
  }
};

function timeToSeconds(time) {
  const parts = time.split(":").map(Number); // Split time and convert to numbers
  if (parts.length === 3) {
      // If format is HH:MM:SS
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
      // If format is MM:SS
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
  } else {
      throw new Error("Invalid time format");
  }
}

function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;


      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

}

function convertToProblemObject(input) {
  // Define the object to hold the structured data
  let problemObject = {};

  // Use regular expressions to match each section (ProblemName, ProblemDescription, etc.)
  const problemNameMatch = input.match(/ProblemName:\s*([^\n]+)/);
  const problemDescriptionMatch = input.match(/ProblemDescription:\s*([\s\S]+?)\nSampleInput:/);
  const sampleInputMatch = input.match(/SampleInput:\s*([\s\S]+?)\nSampleOutput:/);
  const sampleOutputMatch = input.match(/SampleOutput:\s*([\s\S]+)/);

  // Assign the matched content to the object if found, else assign empty string
  problemObject.problemName = problemNameMatch ? problemNameMatch[1].trim() : '';
  problemObject.problemDescription = problemDescriptionMatch ? problemDescriptionMatch[1].trim() : '';
  problemObject.sampleInput = sampleInputMatch ? sampleInputMatch[1].trim() : '';
  problemObject.sampleOutput = sampleOutputMatch ? sampleOutputMatch[1].trim() : '';

  // Clean up the sample output if it's HTML (remove extra newlines)
  if (problemObject.sampleOutput.includes('<!DOCTYPE html>')) {
    problemObject.sampleOutput = problemObject.sampleOutput.trim();
  }

  console.log(problemObject);
  return problemObject;
}