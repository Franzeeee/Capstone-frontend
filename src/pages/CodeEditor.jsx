import React, { useState, useEffect, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from '../assets/css/pages/code-editor.module.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'
import customFetch from '../utils/fetchApi';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import 'codemirror/addon/hint/show-hint'; // Import show-hint addon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClock, faClose, faCopy, faPaperPlane, faPlay, faRightFromBracket, faRobot, faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFile, faFolder, faFolderOpen, faSave } from '@fortawesome/free-regular-svg-icons';
import fetchToken from '../utils/fetchToken';
import logo from '../assets/img/logoCodelab.png';
import practiceTest from '../assets/img/practice-test.png';
import pythonPng from '../assets/img/Python_logo.png'
import htmlCss from '../assets/img/html-css.png'
import success from '../assets/img/excellent.png'
import fail from '../assets/img/tiger.png'
import html5 from '../assets/img/html-5.png'
import css3 from '../assets/img/css-3.png'
import { faCss3, faCss3Alt, faHtml5, faPython } from '@fortawesome/free-brands-svg-icons';
import swap1 from '../assets/img/Swap1.png'
import swap2 from '../assets/img/swap2.png'
import TimerComponent from '../components/TimerComponent';
import Offcanvas from 'react-bootstrap/Offcanvas';
import QuestionList from '../components/QuestionList';
import ConfirmationModal from '../components/ConfirmationModal';
import { toast, ToastContainer } from 'react-toastify';
import CryptoJS from 'crypto-js';
import WebAssessmentSample from '../components/Modals/WebAssessmentSample';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CodeEditor = ({data, options = {mode: "playground"}}) => {

    const userData = localStorage.getItem('userData');
    const [user, setUser] = useState(JSON.parse(CryptoJS.AES.decrypt(userData, 'capstone').toString(CryptoJS.enc.Utf8)));  

    const [code, setCode] = useState('');
    const [inputValues, setInputValues] = useState('');
    const [output, setOutput] = useState();
    const [minimize, setMinimize] = useState(false);
    const [execute, setExecute] = useState(false);
    const token = localStorage.getItem('API_TOKEN');
    const socketClientRef = useRef(null);
    const [time, setTime] = useState(0)
    const [authToken, setAuthToken] = useState(null)
    const navigate = useNavigate();

    const [testGenLevel, setTestGenLevel] = useState(0);

    const [cheatingData, setCheatingData] = useState({
        exit_fullscreen: 0,
        change_tab: 0,
    });
    
    useEffect(() => {
        if ( mode === "Assessment" && options && options.cheatingData !== null || options.cheatingData !== undefined) {
            setCheatingData({
                exit_fullscreen: options.cheatingData[0],
                change_tab: options.cheatingData[1],
            });
        };

    }, [options, options.cheatingData]);

    // Codes for the modes
    // Code Editor, LessonTest, Lesson Assessments
    const [mode, setMode] = useState(options.mode)
    const { closeOverlay } = options

    useEffect(() => {
        if (options && options.mode) {
            setMode(options.mode);
        }
    }, [options]);

    const closeCodeModal = () => {
        if (closeOverlay) {
          closeOverlay(); // Call the closeOverlay function if it exists
        } else {
            navigate('/dashboard')
        }
    };

    const saveAsPyFile = () => {
        // Prompt the user to enter a filename
        const filename = "script.py";
    
        // Only proceed if the user entered a filename
        if (filename) {
            const blob = new Blob([code], { type: 'text/plain' });
            const link = document.createElement('a');
            
            link.href = URL.createObjectURL(blob);
            link.download = filename;  // Use the user-provided filename
            link.click();
            
            // Clean up the URL object after the download
            URL.revokeObjectURL(link.href);
        }
    };
    

    const openPythonFile = async () => {
        // Check if `showOpenFilePicker` is supported
        if (window.showOpenFilePicker) {
            try {
                // Open a file picker and filter to `.py` files
                const [fileHandle] = await window.showOpenFilePicker({
                    types: [{
                        description: 'Python Files',
                        accept: { 'text/plain': ['.py'] },
                    }],
                    multiple: false // Allow only one file to be selected
                });
                
                // Get the file object from the handle
                const file = await fileHandle.getFile();
                
                // Read the file contents
                const text = await file.text();
                
                // Display the contents or do something with `text`
                console.log("File contents:", text);
                // You could also assign `text` to a variable or an element on the page
                
            } catch (error) {
                console.error('Failed to open the file', error);
            }
        } else {
            // Fallback for browsers that don't support `showOpenFilePicker`
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.py';
            
            // Listen for file selection
            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (file) {
                    const text = await file.text();
                    setCode(text);
                    // Handle file contents here, e.g., display in an editor
                }
            };
            
            // Trigger the file input
            input.click();
        }
    };
    
    const copyToClipboard = () => {
        // Create a new textarea element
        const textarea = document.createElement('textarea');
        textarea.value = code; // Set the value to copy
        document.body.appendChild(textarea); // Append the textarea to the body
        textarea.select(); // Select the textarea
        document.execCommand('copy'); // Copy the selected text
        document.body.removeChild(textarea); // Remove the textarea
        toast('Code copied to clipboard');
    };
    

    // Warn user about losing progress if they try to leave the page
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = 'Your code will be permanently lost if you reload or close the page. Are you sure you want to proceed?';
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    

    // Chat history
    const [chatHistory, setChatHistory] = useState([]);

    const [userMessage, setUserMessage] = useState('');

    const handleMessageInput = (e) => {
        setUserMessage(e.target.value);
    }

    const [challangeDetails, setChallangeDetails] = useState({
        language: '',
        difficulty: '',
        time: 0,
        withAssistance: null,
    });

    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);


    useEffect(() => {
        if (timer <= 0 || !isActive) return;

        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(intervalId);
                    setIsCorrect(false);
                    startPractice();
                    setChallangeDetails(prevState => ({
                        ...prevState,
                        withAssistance: true
                    }));
                    return 0; // Ensures the timer stops at 0
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer, isActive]);

    const handleReset = () => {
        setIsActive(false);
        setTimer(0); // Reset to 2 minutes
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const [problem, setProblem] = useState("")
    const [generating, setGenerating] = useState(false)

    const resetChallange = () => {
        setChallangeDetails({
            language: '',
            difficulty: '',
            time: 0,
            withAssistance: false,
        });
    }

    const generateProblem = () => {
        
        const msgData = new FormData();
        let prompt = `Create a coding challenge for ${challangeDetails.language} at ${challangeDetails.difficulty} level.(no hints)`

        msgData.append('userMessage', prompt);
        customFetch('/receiveMessage', {
            method: 'POST',
            contentType: 'application/json',
            body: msgData
        })
        .then(data => {
            setProblem(data.message)
            setIsActive(true)
        })
        .catch(error => console.error(error))
        .finally(() => {
            setGenerating(false)
        })
    }

    const setLanguage = (language) => {
        setChallangeDetails(prevState => ({...prevState, language: language}));
    }

    const setDifficulty = (difficulty) => {
        setChallangeDetails(prevState => ({
            ...prevState,
            difficulty: difficulty
        }));
    };

    const handleTime = (time) => {
        setChallangeDetails(prevState => ({...prevState, time: time}));
        setTimer(time * 60)
    }

    const setWithAssistance = (withAssistance) => {
        setChallangeDetails(prevState => ({
            ...prevState,
            withAssistance: withAssistance
        }));
    };


    const handleSendMessage = () => {
        // Add the user's message to the chat history
        setChatHistory(prevChatHistory => [
            ...prevChatHistory, 
            { 'user': 1, 'message': userMessage }
        ]);
        setUserMessage('');
    
        const msgData = new FormData()
        msgData.append('userMessage', userMessage)
        customFetch('/receiveMessage', {
            method: 'POST',
            body: msgData
        })
        .then(data => {
            // Add the response message to the chat history
            setChatHistory(prevChatHistory => [
                ...prevChatHistory, 
                { 'user': 0, 'message': data.message }
            ]);
        })
        .catch(error => console.error(error));
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && userMessage) {
            handleSendMessage();
        }
    }

    useEffect(() => {
        fetchAuthToken();
    }, []);
    

    const initializeSocket = () => {
        const client = webstomp.over(
            new SockJS("https://api.jdoodle.com/v1/stomp"),
            { heartbeat: false, debug: true }
        );
        client.connect({}, onWsConnection, onWsConnectionFailed);
        socketClientRef.current = client;
    };

    const onWsConnection = () => {

        fetchAuthToken();

        const socketClient = socketClientRef.current;

        if (!socketClient) {
            console.error('WebSocket client is null or undefined');
            return;
        }

        socketClient.subscribe('/user/queue/execute-i', message => {
            const messageBody = message.body;
            const statusCode = parseInt(message.headers.statusCode);
        
            if (statusCode === 200) {
                setTime(prev => prev + 1)
                setOutput(prev => prev + messageBody);
            } else if (statusCode === 204) {
                setOutput(prevOutput => prevOutput + '\n <--------- End of execution ---------->\n');
                setExecute(false);
            }else if(statusCode === 400){
                setOutput("Notice: Expired Token. Please re-run the program.")
                setExecute(false)
            }
        });
        

        let script = code;

        let data = JSON.stringify({
            script: script,
            language: "python3",
            versionIndex: 3,
        });

        socketClient.send(
            "/app/execute-ws-api-token",
            data,
            {
                message_type: "execute",
                token: token,
            }
        );
    };

    const onWsConnectionFailed = (e) => {
        console.log("connection failed");
    };

    const handleInput = (event) => {
        const socketClient = socketClientRef.current;
        // Ensure socketClient is not null before proceeding
        if (!socketClient) {
            console.error('WebSocket client is null or undefined');
            return;
        }
        let key = event.key;
        if (event.key === "Enter") {
            key = "\n";
            // Prevent the default behavior of adding a new line in the textarea
        }
        socketClient.send("/app/execute-ws-api-token", key, {
            message_type: "input",
        });
    };

    useEffect(() => {
        // Ensure CodeMirror is rendered only once by removing additional instances
        const extraCodeMirrors = document.querySelectorAll('.CodeMirror');
        if (extraCodeMirrors.length > 1) {
            extraCodeMirrors.forEach((element, index) => {
                if (index === 0) {
                    element.remove();
                }
            });
        }
    }, []);

    const compileCode = async (code, input) => {
        // Define the compiler API endpoint
        const compilerApiUrl = 'https://online-code-compiler.p.rapidapi.com/v1/';

        // Define request options
        const options = {
            method: 'POST',
            url: compilerApiUrl,
            headers: {
                'contcentert-type': 'application/json',
                'X-RapidAPI-Key': 'b3e4824fb9msh01176d2848430cbp1ef336jsnaa7b7d95fae0',
                'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            },
            data: {
                language: 'python3',
                version: 'latest',
                code: code,
                input: input
            }
        };

        // Make an HTTP POST request to the compiler API
        return axios.request(options)
            .then(response => {
                // Check if the request was successful
                if (response.status === 200) {
                    // Return the compilation result
                    setOutput(response.data.output)
                    setExecute(false)
                    return response.data.output;
                } else {
                    throw new Error('Compilation failed. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error compiling code:', error);
                throw new Error('An error occurred. Please try again later.');
            });
    };

    const handleExecute = async () => {

        if(!isInteractive) {
            setExecute(true)
            compileCode(code, inputValues)
            return;
        }
        // const fetchAuthToken = async () => {
        //     try {
        //         const clientId = '80d7f4c9e24d6d17354e31f6301d1203';
        //         const clientSecret = 'fe056deb985c4743825673d246460922f68d5bcfa3eb935955618127527d92bf';
                
        //         const data = await getAuthToken(clientId, clientSecret);
        //         setAuthToken(data);
        //     } catch (error) {
        //         console.error('Error getting auth token:', error);
        //     }
        // }; 

        // fetchAuthToken();

        setExecute(true);
        setOutput("")
        // Initialize WebSocket connection
        initializeSocket();
    };

    const handleInputChange = (event) => {
        setInputValues(event.target.value);
    };

    const terminate = () => {
        const socketClient = socketClientRef.current;
    
        // Check if the socket client exists and is connected
        if (socketClient && socketClient.connected) {
            // Disconnect the socket client
            socketClient.disconnect(() => {
                // Once disconnected, update the output state
                setOutput(prev => prev.concat("\n <---------- Execution Terminated ---------->"));
            });
            setExecute(false);
        } else {
            // If the socket client is not yet established or connected,
            // wait for it to be established and then terminate
            socketClient.connect({}, () => {
                // After the connection is established, terminate the connection
                terminate();
            });
        }
    };

    const [isInteractive, setIsInteractive] = useState(true);
    const handleIteractive = () => {
        setIsInteractive(!isInteractive);
    }

    const handleGetHighlightedCode = () => {
        const editor = document.querySelector('.CodeMirror').CodeMirror; // Get the CodeMirror instance
        if (editor) {
            const highlightedCode = editor.getSelection(); // Get the selected text
            console.log('Highlighted code:', highlightedCode);
        } else {
            console.log('CodeMirror instance not found');
        }
    };

    const startPractice = () => {
        setTestGenLevel(prev => prev + 1) 
        setChallangeDetails(prevState => ({
            ...prevState,
            withAssistance: false
        }));
        if(testGenLevel == 4) {
            setIde(challangeDetails?.language === 'python' ? 0 : 1)
            setGenerating(true)
            generateProblem()
        }
    }
    const prevOption = () => {
        setTestGenLevel(prev => prev - 1)
        if(testGenLevel == 1){
            resetChallange()
            setWithAssistance(true)
        }
    }

    const newChallange = () => {
        setTestGenLevel(0)
        resetChallange()
        setChallangeDetails(prevState => ({
            ...prevState,
            withAssistance: true
        }));
    }

    const assisted = () => {
        setTestGenLevel(prev => prev + 1)
        setWithAssistance(true)
    }

    const submitCode = () => {
        if(code === "" && challangeDetails?.language === 'python') {
            alert("Please provide a code to evaluate.")
            return;
        } else if( challangeDetails?.language === 'html_css' && htmlCode === "") {
            alert("Please provide the Web Development code to evaluate.")
            return;
        }
        const messageData = new FormData();

        let codeToSend = challangeDetails?.language === 'python' ? code : htmlCode + cssCode;

        let prompt = `Evaluate the following code based on the problem description. If the code solves the problem correctly, return "Correct". If the code is incorrect, incomplete, or no code is provided, return "Wrong". Code: "${codeToSend}" Problem: "${problem}"`;
        messageData.append('userMessage', prompt);
        customFetch('/receiveMessage', {
            method: 'POST',
            contentType: 'application/json',
            body: messageData
        })
        .then(data => {
            setIsCorrect(data.message === "Correct");
            startPractice();
            setTimer(0)
            setChallangeDetails(prevState => ({
                ...prevState,
                withAssistance: true
            }));
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {

    }, [testGenLevel])


    const [ide, setIde] = useState(0);

    const handleIde = () => {
        setIde(prevIde => (prevIde === 0 ? 1 : 0));
    };

    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');

    const htmlRef = useRef(null);
    const cssRef = useRef(null);
    const iframeRef = useRef(null);

    const run = () => {
        const htmlCodeValue = htmlRef.current.value; // Access HTML textarea value via ref
        const cssCodeValue = cssRef.current.value;   // Access CSS textarea value via ref
        const iframe = iframeRef.current;
    
        // Update state based on the content
        setHtmlCode(htmlCodeValue);
        setCssCode(cssCodeValue);
        if (iframe && iframe.contentDocument) {
            iframe.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</syle>";  // Set the HTML content
            }
        };

        const openIframeInNewTab = () => {
            // Create a new window
            const newWindow = window.open('Output', '_blank');
            if (newWindow) {
              // Write the HTML content to the new window
                newWindow.document.open();
                newWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <title>Output</title>
                    </head>
                    <body>
                    ${htmlCode + "<style>" + cssCode + "</syle>"}
                    </body>
                    </html>
                `);
                newWindow.document.close();
                }
        };


        // Off canvas
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [assessmentTimer, setAssessmentTimer] = useState(mode === 'playground' ? 0 : data?.time_limit || 0);
        const [assessmentData, setAssessmentData] = useState(data?.coding_problems.map((problem, index) => ({
            id: index,
            problem_id: problem.id,
            title: problem.title,
            description: problem.description,
            code: "",
            isActive: index === 0,
            testCase: {
                input: problem.sample_input || "",
                output: problem.expected_output || ""
            }
        })) || null);


        const [activeAssessment, setActiveAssessment] = useState(
            mode === 'Assessment' ? assessmentData.find(assessment => assessment.isActive) : null
        );

        
        useEffect(() => {
            if (mode === 'Assessment') {
                const isWeb = activeAssessment?.testCase.output.includes('<!DOCTYPE');

                setIde(isWeb ? 1 : 0);
            }
        }, [activeAssessment]);

        const handleChangeAssessment = (id) => {
            if (id >= assessmentData.length) return; // Stop if id is not valid
            setActiveAssessment(assessmentData.find(assessment => assessment.id === id));
            setAssessmentData(prevData => 
                prevData.map(assessment => 
                    assessment.id === id 
                    ? { ...assessment, isActive: true } 
                    : { ...assessment, isActive: false }
                )
            );

            setCode(assessmentData.find(assessment => assessment.id === id).code);
        };

        const handlePreviosAssessment = () => {
            const index = activeAssessment.id - 1;
            if (index >= 0) {
                handleChangeAssessment(index);
            }
        }

        const updateCode = (newCode) => {
            setCode(newCode);
            
            if(mode === 'Assessment') {
                setAssessmentData(prevData => 
                    prevData.map(assessment => 
                        assessment.id === activeAssessment.id 
                        ? { ...assessment, code: newCode } 
                        : assessment
                    )
                );
            }
        };

        const [showSubmitModal, setShowSubmitModal] = useState(false);


        const openModal = () => {
            setShowSubmitModal(true);
        }
    
        const handleCloseSubmitModal = () => {
            setShowSubmitModal(false);
        }


        const [pauseTimer, setPauseTimer] = useState(false);

    const [assessmentStats, setAssessmentStats] = useState({
        problemSolved: 0,
        OverallPoints: 0,
        currentRank: 0,
        timeConsumed: null,
    });

    const handleTimeConsumed = (time) => {
        if(timeConsumed === null){
            setAssessmentStats(prevState => ({
                ...prevState,
                timeConsumed: time - data.time_limit
            }));
            console.log(time)
        }
    };

    const [submissionTime, setSubmissionTime] = useState(null);
    const submissionTimeRef = useRef(null)

    const handleSubmissionTime = (time) => {
        if(submissionTime === null){
            setSubmissionTime(time);
            submissionTimeRef.current = time;
        }
    };


    const submitAssessment = async () => {
        options.timesup();
        const allProblemsAndCodes = assessmentData.map(assessment => ({
            codingProblem: assessment.description,
            code: assessment.code,
            problem_id: problem.id
        }));
    
        setPauseTimer(true);
        openModal();
        let allSuccessful = true;
        let totalScore = 0;
        const maxScorePerItem = 100;
        let assessmentCount = allProblemsAndCodes.length;

        let submissionFeedback = "";

        const updatedAssessmentData = [...assessmentData];
    
        for (const [index, assessment] of allProblemsAndCodes.entries()) {
            const { codingProblem, code } = assessment;

            const formData = new FormData();
            formData.append('codingProblem', codingProblem);
            formData.append('code', code);
    
            try {
                const response = await customFetch('/submission/autocheck', {
                    method: 'POST',
                    body: formData,
                });
    
                if (response && response.message) {
    
                    // Extract the score from the response message if it's included as "Total Score: X points"
                    const scoreMatch = response.message.match(/Total Score: (\d+)/);
                    const feedback = response.message.match(/Feedback: (.+)/);
                    const feedback2 = parseFeedback(response.message);
                    
                    const fb = feedback2.feedback;
                    
                    if (scoreMatch) {
                        const score = parseInt(scoreMatch[1], 10);
                        totalScore += score; // Add score to the total 
                        submissionFeedback += fb;

                        updatedAssessmentData[index] = { ...updatedAssessmentData[index], score };
                    }
                } else {
                    allSuccessful = false;
                    console.error("Unexpected response structure:", response);
                }
            } catch (error) {
                console.error('Error submitting assessment:', error.message);
                allSuccessful = true;
            }
        }
        // Calculate GWA as a percentage
        const gwa = (totalScore / (assessmentCount * maxScorePerItem)) * 100;
    
        // Final feedback to the user
        if(allSuccessful) {

            const timeConsumed = data.time_limit - submissionTimeRef.current; // Access the time from ref
            handleCloseSubmitModal();

            customFetch('/submission/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activity_id: data.id,
                    score: parseInt(gwa.toFixed(2), 10),
                    status: 'graded',
                    time_taken: timeConsumed,
                    feedback: submissionFeedback,
                    exit_fullscreen: cheatingData.exit_fullscreen,
                    change_tab: cheatingData.change_tab,
                    coding_problem_codes: updatedAssessmentData.map(assessment => ({
                        problem_id: assessment.problem_id,
                        code: assessment.code,
                        score: assessment.score,
                    })),
                }),
            })
                .then(response => {
                    options.setRank({rank: response.rank});
                    options.setSubmissionData(response.submission);
                    options.setFeedback({feedback: submissionFeedback});
                })
                .catch(error => {
                    console.error('Error:', error.message);
                })
                .finally(() => {
                    options.closeEditor();
                    document.exitFullscreen();
                    setAssessmentData([]);
                    options.finished()
                    options.setTimeTaken(timeConsumed)
                });

        } else {
            console.log("Some submissions failed. Check the console for details.");
        }
        
    };

    
    const finishedAssessmentTimer = () => {
        setAssessmentTimer(0);
        options.timesup();
        // closeOverlay();
        submitAssessment()
    };

    const [showWebSample, setShowWebSample] = useState(false);

    const handleShowWebSample = () => {
        setShowWebSample(true);
    };

    const handleCloseWebSample = () => {
        setShowWebSample(false);
    };
    

    return (
        <div className={`code-editor container-fluid p-0 m-0 vh-100 d-flex ${styles.container}`}>
            <ToastContainer />
            <ConfirmationModal show={showSubmitModal} 
                    handleClose={handleClose} 
                    modalData={{spin: true, 
                            confirmText: "View Result", 
                            icon: faSpinner, 
                            hideCancel: true, 
                            iconColor: '#4c00d9', 
                            title: 'Submitting Code', 
                            body: "Please wait, submitting code...",
                            disableConfirm: true,
                            hideConfirm: true
                            }}
                    />
            <Offcanvas show={showWebSample} onHide={handleCloseWebSample} placement="top" className={`${styles.offcanvas} ${styles.webSample}`}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sample Output</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <WebAssessmentSample webCode={activeAssessment?.testCase?.output} />
                </Offcanvas.Body>
            </Offcanvas>
            <nav className={`${styles.nav} ${mode !== "playground" ? 'd-none' : ""}`}>
                <p><FontAwesomeIcon icon={faBars} className={`${styles.icon}`}/></p>
                <ul className='d-flex flex-column mt-3 gap-3'>
                    {/* <li title='New Project'><FontAwesomeIcon icon={faFile} className={`${styles.icon}`}/></li> */}
                    <li onClick={openPythonFile}>
                        <OverlayTrigger placement="right" overlay={<Tooltip id={`tooltip-test`}>Open File</Tooltip>}>
                            <FontAwesomeIcon icon={faFolderOpen} className={`${styles.icon}`}/>
                        </OverlayTrigger>
                    </li>
                    <li onClick={saveAsPyFile}>
                        <OverlayTrigger placement="right" overlay={<Tooltip id={`tooltip-test`}>Save Code</Tooltip>}>
                            <FontAwesomeIcon icon={faSave} className={`${styles.icon}`}/>
                        </OverlayTrigger>
                    </li>
                    <li onClick={copyToClipboard}>
                        <OverlayTrigger placement="right" overlay={<Tooltip id={`tooltip-test`}>Copy</Tooltip>}>
                            <FontAwesomeIcon icon={faCopy} className={`${styles.icon}`}/>
                        </OverlayTrigger>
                    </li>
                    <li className={`position-relative ${styles.language}`}>
                    {/* <img src={ide === 0 ? swap2 : swap1} alt="" /> */}
                        <FontAwesomeIcon icon={faPython} className={`${styles.icon}`} title='IDE: Python'></FontAwesomeIcon>
                        <ul className={`${styles.selectLanguage}`}>
                            <label htmlFor="">Select Language</label>
                            <li onClick =  {() => setIde(0)}> <img src={pythonPng} className={`${styles.pythonLogo}`} alt="" /> Python</li>
                            <li onClick =  {() => setIde(1)}> <FontAwesomeIcon icon={faHtml5} className={`${styles.icon} ${styles.html}`} title='IDE: Python'> </FontAwesomeIcon><FontAwesomeIcon  icon={faCss3Alt} className={`${styles.icon} ${styles.css} ml-1`} title='IDE: Python'></FontAwesomeIcon>  HTML and CSS</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <section className={`w-100 d-flex flex-column ${styles.section}`}>
                <header>
                <div className={`position-relative logo d-flex align-items-center justify-content-center ${styles.logo} ${mode !== "playground" ? 'd-none' : 'justify-content-end'}`}>
                        <img src={logo} alt="CodeLab Logo" onClick={() => navigate('/dashboard')}/>
                    </div>
                    <div className={`${styles.clockLogo} ${mode !== "playground" ? 'd-none' : ''}`}>
                        <p className={`m-0 ${styles.timer}`}><span><FontAwesomeIcon icon={faClock} /></span> {formatTime(timer)}</p>
                        {/* <div className="play">
                        </div> */}
                    </div>
                    <div className={`${styles.controls}`}>
                        <button onClick={execute ? terminate : handleExecute} className={`${execute && styles.execute} ${ide !== 1 ? '' : 'd-none'}`}>
                            {execute ? "Terminate" : "Execute"} <span><FontAwesomeIcon icon={execute ? faSpinner : faPlay} spin={execute && true}/></span>
                        </button>
                    </div>
                    { mode === 'Assessment' && (
                        <TimerComponent 
                            time={data.time_limit} 
                            pause={pauseTimer} 
                            finishedTime={finishedAssessmentTimer}
                            onPause={(remainingTime) => handleSubmissionTime(remainingTime)}
                        />
                    )
                    }
                    <div className={`${styles.exit} cursor-pointer ${mode === 'Assessment' && 'd-none'}`} title={mode === 'playground' ? 'Exit Playground' : "Close Editor"} onClick={() => closeCodeModal()}>
                        <FontAwesomeIcon icon={ mode === 'playground' ? faRightFromBracket : faClose}/>
                    </div>
                </header>
                <main className={`${styles.main}`}>
                    <div className={` ${ide == 0 ? "d-flex" : "d-none"} flex-column ${styles.codeArea}`}>

                        <div className={`${styles.codeEditor}`}>
                            <CodeMirror
                                value={code}
                                options={{
                                    mode: 'python',
                                    theme: 'default',
                                    lineNumbers: true,
                                    extraKeys: {
                                        "Enter": (cm) => {
                                            // Custom behavior here
                                            // To insert a new line as default, you can call:
                                            cm.replaceSelection("\n", "end");
                                        }
                                    }
                                }}
                                onBeforeChange={(editor, data, value) => {
                                    updateCode(value);
                                }}
                                className={`${styles.codeMirror}`}
                                
                            />
                        </div>
                        <div className={` ${styles.outputInput}`}>
                            <div className={`${styles.inputArea}`}>
                            <div className={`${styles.switchContainer} position-absolute`}>
                                <div className={`${styles.switch} ${isInteractive ? styles.active : ''}`} onClick={handleIteractive}>
                                </div>
                                <p className='text-black'>Interactive</p>
                            </div>
                                <textarea
                                    value={inputValues}
                                    onChange={handleInputChange}
                                    placeholder="Stdin Inputs"
                                    cols="30"
                                    disabled={isInteractive}
                                />
                            </div>
                            <div className={`${styles.outputArea}`}>
                                <p className={`${styles.title}`}>Output:</p>
                                {output && <textarea readOnly={!isInteractive} onChange={(e) => setOutput(e.target.value)} onKeyPress={handleInput} className='m-0' value={output} />}
                            </div>
                        </div>

                    </div>
                     {/* Web Dev IDE */}

                        <div className={`${ide == 1 ? "d-flex" : "d-none"} flex-column ${styles.webIDE}`}>
                            <div className={`${styles.webOutput}`}> 
                                <label><FontAwesomeIcon icon={faPlay}></FontAwesomeIcon> Ouput</label>
                                <iframe id='0' title="Preview" ref={iframeRef} ></iframe>
                            </div>
                            <div className={`${styles.containerIDE}`}>
                                <div>
                                    <div className={`${styles.languageTab}`}>
                                        <div>
                                            <img src={html5} alt="html logo" />
                                            <p className='m-0'>HTML</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.codingInput}`}>
                                        <textarea ref={htmlRef} onKeyUp={run} id="html-code"></textarea>
                                    </div>
                                </div>
                                <div>
                                    <div className={`${styles.languageTab}`}>
                                        <div>
                                            <img src={css3} alt="html logo" />
                                            <p className='m-0'>CSS</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.codingInput}`}>
                                        <textarea ref={cssRef} onKeyUp={run} id="css-code"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div className={`${mode === 'Assessment' ? styles.aiArea : "d-none"}`}>
                        {
                            mode === 'Assessment' && (
                                <div className={`${styles.assessmentContainer}`}>
                            <div className={`${styles.assessmentHeader}`}>
                                <button onClick={() => handlePreviosAssessment()}>
                                    Back
                                </button>
                                <p>
                                    Lesson Assessment
                                </p>
                                <button onClick={() => handleChangeAssessment(activeAssessment.id + 1)}>
                                    Next
                                </button>
                            </div>
                            { activeAssessment && (
                                <div className={`${styles.assessmentContent}`}>
                                <div className={`${styles.problemTitle}`}>
                                    <p>{activeAssessment.id + 1}. {activeAssessment.title}</p>
                                    {/* <p>{activeAssessment.description}</p> */}
                                    {activeAssessment.description.replace(/\\n/g, '\n').split('\n').map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                                </div>
                                <div className={`${styles.sampleIO}`}>
                                    
                                    {
                                        activeAssessment.testCase.input === "" ? "" : (
                                            <>
                                                <p>Sample Input: </p>
                                                <ul>
                                                    {activeAssessment.testCase.input.split('\n').map((line, index) => (
                                                        <li key={index}>{line}</li>
                                                    ))}
                                                </ul>
                                            </>
                                        )
                                    }
                                    
                                    {
                                        activeAssessment.testCase.output === "" ? "" : (
                                            <>
                                            <p>Expected Output: </p>
                                                <ul>
                                                    {
                                                        activeAssessment.testCase.output.includes("DOCTYPE") ? (
                                                            <button className={styles.webButton} onClick={handleShowWebSample}>View Web Output</button>
                                                        ) : (
                                                            activeAssessment.testCase.output.split('\n').map((line, index) => (
                                                                <li key={index}>{line}</li>
                                                            ))
                                                        )
                                                    }
                                                </ul>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                            )}
                            <div className={`${styles.assessmentFooter}`}>
                                <div className={`${styles.assessmentBtns}`}>
                                    <button onClick={() => setShow(true)}>
                                        Problems ({assessmentData.length})
                                    </button>
                                </div>
                                <div onClick={submitAssessment} className={`${styles.submitButton}`}>
                                    Submit
                                </div>
                            </div>
                        </div>
                            )
                        }
                    </div>
                    <div className={`${styles.aiArea} ${mode === "LessonTest" || mode === "Assessment" ? 'd-none' : ''}`}>
                        <div className={`${styles.task}`}>
                        <div className={`${styles.taskBox} ${testGenLevel !== 0 ? styles.alignStart : ''}`}>
                            {testGenLevel === 0 ? (
                                <>
                                    <img src={practiceTest} alt="Practice Test" className={`${styles.practiceTest}`} />
                                    <button className={`${styles.firstButton}`} onClick={startPractice}>Start Practice Test</button>
                                </>
                            ) : (
                                testGenLevel === 1 && (
                                    <>
                                        <p className={`${styles.colorBlack}`}>Choose a language</p>
                                        <div className={`${styles.option1Container}`}>
                                            <div className={`${styles.langguageOption} ${challangeDetails.language == 'python' ? styles.selectedLanguage : ''}`} onClick={() => setLanguage("python")}>
                                                <img src={pythonPng} alt="" />
                                                <p>Python</p>
                                            </div>
                                            <div className={`${styles.langguageOption} ${challangeDetails.language == 'html_css' ? styles.selectedLanguage : ''}`} onClick={() => setLanguage("html_css")}>
                                                <img src={htmlCss} alt="" />
                                                <p>Basic Web Development</p>
                                            </div>
                                        </div>
                                        <div className={`${styles.controller}`}>
                                            <button onClick={prevOption}>Cancel</button>
                                            <button disabled={challangeDetails.language == ""} className={`${challangeDetails.language == '' && styles.notAvailable}`} onClick={challangeDetails.language !== "" && startPractice}>Next</button>
                                        </div>
                                    </>
                                )
                            )}
                            {testGenLevel === 2 && (
                                <>
                                    <p className={`${styles.colorBlack}`}>Choose difficulty level</p>
                                    <div className={`${styles.option1Container}`}>
                                        <div className={`${styles.levelOption} ${challangeDetails.difficulty === 'easy' ? styles.selectedLanguage : ''}`}
                                        onClick={() => setDifficulty("easy")}>
                                            <p>Easy</p>
                                        </div>
                                        <div className={`${styles.levelOption} ${challangeDetails.difficulty === 'medium' ? styles.selectedLanguage : ''}`}
                                        onClick={() => setDifficulty("medium")}>
                                            <p>Medium</p>
                                        </div>
                                        <div className={`${styles.levelOption} ${challangeDetails.difficulty === 'hard' ? styles.selectedLanguage : ''}`}
                                        onClick={() => setDifficulty("hard")}>
                                            <p>Hard</p>
                                        </div>
                                        <div className={`${styles.levelOption} ${challangeDetails.difficulty === 'mastery' ? styles.selectedLanguage : ''}`}
                                        onClick={() => setDifficulty("mastery")}>
                                            <p>Mastery</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.controller}`}>
                                        <button onClick={prevOption}>Cancel</button>
                                        <button className={`${challangeDetails.difficulty == '' && styles.notAvailable}`} onClick={startPractice}>Next</button>
                                    </div>
                                </>
                            )}
                            {testGenLevel === 3 && (
                                <>
                                    <p className={`${styles.colorBlack}`}>Set time limit</p>
                                    <div className={`${styles.option1Container}`}>
                                        <div className={`${styles.levelOption} ${challangeDetails.time === 2 ? styles.selectedLanguage : ''}`}
                                        onClick={() => handleTime(2)}>
                                            <p>02:00 minutes</p>
                                        </div>
                                        <div className={`${styles.levelOption} ${challangeDetails.time === 5 ? styles.selectedLanguage : ''}`}
                                        onClick={() => handleTime(5)}>
                                            <p>05:00 minuets</p>
                                        </div>
                                        <div className={`${styles.levelOption} ${challangeDetails.time === 10 ? styles.selectedLanguage : ''}`}
                                        onClick={() => handleTime(10)}>
                                            <p>10:00 minutes</p>
                                        </div>
                                        <div className={`${styles.levelOption} ${challangeDetails.time === 30 ? styles.selectedLanguage : ''}`}
                                        onClick={() => handleTime(30)}>
                                            <p>30:00 minutes</p>
                                        </div>
                                    </div>
                                    <div className={`${styles.controller}`}>
                                        <button onClick={prevOption}>Cancel</button>
                                        <button disabled={challangeDetails.time == 0} onClick={startPractice}>Next</button>
                                    </div>
                                </>
                            )}
                            {testGenLevel === 4 && (
                                <>
                                    <p className={`${styles.colorBlack}`}>Turn on AI chat assistance?</p>
                                    <div className={`${styles.reminder}`}>
                                        <p>
                                        <span>NOTE</span>: Turning off AI assistance may challenge you to solve coding problems independently, which is essential for mastering core concepts. 
                                        Proceed to disable AI if you wish to promote deeper learning through hands-on practice.
                                        </p>
                                    </div>
                                    <div className={`${styles.controller}`}>
                                        <button onClick={assisted}>Yes</button>
                                        <button onClick={startPractice}>No</button>
                                    </div>
                                </>
                            )}
                            {
                                testGenLevel === 5 && 
                                <>
                                    <p className={`${styles.colorBlack}`}>Coding Challange</p>
                                    <div className={`${styles.option1Container} ${problem !== '' && !generating ? styles.challangeTextContainer : ""}`}>
                                        {
                                            generating ? ( 
                                            <>
                                                <FontAwesomeIcon className={`${styles.loader}`} icon={faSpinner } spin={true} color='black' size='2x'/>
                                                <p className={`${styles.challangeText}`}>Generating Challange...</p>
                                            </> ) :
                                            (
                                                <>
                                                    <div className={`${styles.problemContainer}`}>
                                                        <p className={`${styles.problem}`}>{problem}</p>
                                                    </div>
                                                </> 
                                            )
                                        }
                                    </div>
                                    <div className={`${styles.controller}`}>
                                        <button className={`${styles.submitCode} ${generating ? styles.disabledSubmitBtn : ""}`} disabled={generating} onClick={submitCode}>Submit Code</button>
                                    </div>
                                </>
                            }
                            {
                                testGenLevel === 6 && 
                                <>
                                    <p className={`${styles.colorBlack} text-center`}>{isCorrect ? "Congartulations! You aced the challange." : "Sorry You Fail. Try again."}</p>
                                    <div className={`${styles.option1Container}`}>
                                        <img src={isCorrect ? success : fail} alt="" className={`${ isCorrect ? styles.successGif : styles.failGif}`}/>
                                    </div>
                                    <div className={`${styles.controller}`}>
                                        <button className={`${styles.submitCode}`} onClick={newChallange}>Take Again</button>
                                    </div>
                                </>
                            }
                        </div>
                        </div>
                        <div className={`${styles.aiBot} ${minimize && styles.minimize} ${challangeDetails.withAssistance == false ? styles.hideBot : ''}`}>
                            <div className={`${styles.chatHead}`}>
                                <p className='m-0 text-black'>Ask help to CodeLab AI</p>
                                {/* <FontAwesomeIcon icon={minimize ?faCaretUp : faCaretDown} onClick={() => setMinimize(!minimize)} className={`${styles.closeIcon}`}/> */}
                            </div>

                            {/* Chat content */}
                            <div className={`${styles.chatContent}`}>
                                {/* Chat Sample */}
                                {chatHistory.length > 0 && 
                                    chatHistory.map((chat, index) => {
                                        return (
                                            <div key={index} className={`${styles.message} ${chat.user === 0 ? styles.modelResponse : styles.response}`}>
                                                <div className={`${styles.user}`}>
                                                    <FontAwesomeIcon icon={chat.user === 0 ? faRobot : faUser}/>
                                                </div>
                                                <div className={`${styles.messageContent}`}>
                                                    <p className={`m-0 ${styles.userName}`}>{chat.user === 0 ? 'AI' : 'USER'}</p>
                                                    <p className={`m-0 ${styles.usermessage}`}>{chat.message}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <div className={`${styles.chatbox}`}>
                                <input type="text" name="" id="" value={userMessage} onChange={handleMessageInput} onKeyPress={handleKeyPress}/>
                                <FontAwesomeIcon icon={faPaperPlane} title="Send" className={`${styles.sendIcon}`} onClick={handleSendMessage}/>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Questions  List</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className={`${styles.offCanvasBody}`}>
                    <QuestionList data={assessmentData} handleChangeAssessment={handleChangeAssessment}/>
                </Offcanvas.Body>
            </Offcanvas>

        </div>
    );
};

export default CodeEditor;

function parseFeedback(input) {
    // Define the object to hold the structured data
    let feedbackObject = {};

    // Use regular expressions to extract Score and Feedback
    const scoreMatch = input.match(/Score:\s*(\d+)/);  // Extracts the score as a number
    const feedbackMatch = input.match(/Feedback:\s*(.*)/);  // Extracts the feedback text

    // Assign the matched content to the object if found, else assign empty string
    feedbackObject.score = scoreMatch ? parseInt(scoreMatch[1].trim()) : 0;  // Default to 0 if no score
    feedbackObject.feedback = feedbackMatch ? feedbackMatch[1].trim() : '';

        return feedbackObject;
    }
const fetchAuthToken = async () => {
    try {
        const data = await fetchToken();
        return data; // Optionally return data if you need it
    } catch (error) {
        console.error('Error getting auth token:', error);
    }
};
