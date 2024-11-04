import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import styles from "../../assets/css/components/create-assessment-form.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faFile, faFileAlt, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint, faFileWord, faTrashAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import customFetch from "../../utils/fetchApi"
import { toast } from "react-toastify";

const CreateAssessmentForm = ({ activeForm, classId, onSubmit, handleClose, editMode = {active: false, data: {}}  }) => {

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    time_limit: 0,
    due_date: null,
    points: 100,
    coding_problems: editMode.active ? editMode.data.coding_problems : [],
    files: [],
  });
  
  const inputRef = useRef(null);

  const [file, setFile] = useState([]);
  
  useEffect(() => {
    if (editMode.active) {
      const newFormat = {
        ...editMode.data,
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
      tempProblem.sample_input &&
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeForm === "coding") {
      const formattedData = {
      ...formData,
      coding_problems: formData.coding_problems.map(problem => ({
        ...problem,
        title: problem.title, // Keep title
        description: problem.description, // Keep description
      })),
    };
    onSubmit(editMode ? formattedData : formData); // Send formatted data to parent
    } else {

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
          console.log(`files[${index}]:`, f); // Log file object to ensure it's attached
      });

      // Log the entire FormData for inspection
      for (const [key, value] of data.entries()) {
          console.log(`${key}:`, value);
      }

      // Send the request
      fetch(`${BASE_URL}/activity/logic/upload`, {
          method: 'POST',
          body: data,
      })
      .then(data => {
        toast.success("Assessment created successfully");
        handleClose();
      })
      .catch(err => console.log("Error:", err));



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
          console.log("Files dropped:", event.dataTransfer.files);
      }
  };

  const handleFileChange = (event) => {
      if (event.target.files && event.target.files.length > 0) {
          setFile(prev => [...prev, ...event.target.files])
      }
  }

  const handleRemoveFile = (index) => {
      setFile(prev => prev.filter((_, i) => i !== index
      ))
  }

  const handleLogicSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    console.log("file", file);
  }

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      files: file,
    }))
  }, [file])

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
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className={styles.control}
            />
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
              onChange={handleChange}
              className={styles.control}
            />
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
              <div className={styles.problemContainer}>
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
            className={`${styles.formGroup} mb-2 d-flex justify-content-between w-100`}
            controlId="options"
          >
            <div className="d-flex flex-column">
              <Form.Check
                className="switch-left"
                id="custom-switch-1"
                type="switch"
                label="Final Assessment"
              />
              <Form.Check
                className="switch-left"
                id="custom-switch-2"
                type="switch"
                label="Manual Checking"
              />
            </div>
            <div className="d-flex flex-column">
              <Form.Check
                className="switch-right"
                id="custom-switch-3"
                type="switch"
                label="Graded"
              />
              <Form.Check
                className="switch-right"
                id="custom-switch-4"
                type="switch"
                label="Manual Checking"
              />
            </div>
          </Form.Group>
        </>
      )}
      <div className={styles.canvasButtons}>
        <Button className={styles.cancelCanvas} onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button type="submit" className={styles.Submit}>{editMode.active ? "Save" : "Submit"}</Button>
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