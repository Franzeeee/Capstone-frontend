import React, { useState, useEffect, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from '../assets/css/pages/code-editor.module.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import token from '../utils/token';
import { useNavigate } from 'react-router-dom'
import { customFetch } from '../utils/api';

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

const CodeEditor = ({options = {mode: "playground"}}) => {
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
        const filename = 'script.py';
        const blob = new Blob([code], { type: 'text/plain' });
        const link = document.createElement('a');
        
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    
        // Clean up the URL object after the download
        URL.revokeObjectURL(link.href);
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
    const [isCorrect, setIsCorrect] = useState();

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
        
        let prompt = `Create a coding challenge for ${challangeDetails.language} at ${challangeDetails.difficulty} level.(no hints)`

        customFetch('/receiveMessage', {
            method: 'POST',
            body: JSON.stringify({ "userMessage": prompt })
        })
        .then(response => response.json())
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
    
        customFetch('/receiveMessage', {
            method: 'POST',
            body: JSON.stringify({ "userMessage": userMessage })
        })
        .then(response => response.json())
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
        const fetchAuthToken = async () => {
            try {
                const data = await fetchToken();
            } catch (error) {
                console.error('Error getting auth token:', error);
            }
        }; 

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
        const fetchAuthToken = async () => {
            try {
                const clientId = '80d7f4c9e24d6d17354e31f6301d1203';
                const clientSecret = 'fe056deb985c4743825673d246460922f68d5bcfa3eb935955618127527d92bf';
                
                const data = await getAuthToken(clientId, clientSecret);
                setAuthToken(data);
            } catch (error) {
                console.error('Error getting auth token:', error);
            }
        }; 

        fetchAuthToken();

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
            setGenerating(true)
            generateProblem()
        }
    }
    const prevOption = () => {
        setTestGenLevel(prev => prev - 1)
        if(testGenLevel == 1){
            resetChallange()
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
        if(code === "") {
            alert("Please provide a code to evaluate.")
            return;
        }
        let prompt = `Evaluate the following code based on the problem description. If the code solves the problem correctly, return "Correct". If the code is incorrect, incomplete, or no code is provided, return "Wrong". Code: "${code}" Problem: "${problem}"`;
        customFetch('/receiveMessage', {
            method: 'POST',
            body: JSON.stringify({ "userMessage": prompt })
        })
        .then(response => response.json())
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

        const [assessmentTimer, setAssessmentTimer] = useState(0);
        const [assessmentData, setAssessmentData] = useState([
            {
                id: 0,
                isActive: true,
                title: "Print Hello Mars!",
                description: "Write a code that will print 'Hello Mars!'",
                testCase: {
                    input: "",
                    output: "Hello Mars!"
                },
                code: "",
            },
            {
                id: 1,
                isActive: false,
                title: "Add two integers",
                description: "Write a code that will add two integers",
                testCase: {
                    input: "Enter num1: 2\nEnter num2: 3",
                    output: "5"
                },
                code: "",
            },
            
        ]);

        const [activeAssessment, setActiveAssessment] = useState(assessmentData.find(assessment => assessment.isActive));

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

        const finishedAssessmentTimer = () => {
            setAssessmentTimer(0);
            alert("Time's up! Please submit your code.");
        };

    return (
        <div className={`code-editor container-fluid p-0 m-0 vh-100 d-flex ${styles.container}`}>
            <nav className={`${styles.nav}`}>
                <p><FontAwesomeIcon icon={faBars} className={`${styles.icon}`}/></p>
                <ul className='d-flex flex-column mt-3 gap-3'>
                    {/* <li title='New Project'><FontAwesomeIcon icon={faFile} className={`${styles.icon}`}/></li> */}
                    <li title='Open Project'><FontAwesomeIcon icon={faFolderOpen} className={`${styles.icon} ${styles.folderIcon}`}/></li>
                    <li title='Save' onClick={openIframeInNewTab}><FontAwesomeIcon icon={faSave} className={`${styles.icon}`}/></li>
                    <li title='Copy' onClick={handleIde}><FontAwesomeIcon icon={faCopy} className={`${styles.icon}`}/></li>
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
                        <button onClick={execute ? terminate : handleExecute} className={`${execute && styles.execute}`}>
                            {execute ? "Terminate" : "Execute"} <span><FontAwesomeIcon icon={execute ? faSpinner : faPlay} spin={execute && true}/></span>
                        </button>
                    </div>
                    { mode === 'Assessment' && (
                        <TimerComponent time={5} finishedTime={finishedAssessmentTimer}/>
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
                                    <p>{activeAssessment.description}</p>
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
                                    <p>Expected Output: </p>
                                    {
                                        activeAssessment.testCase.output === "" ? "" : (
                                            <ul>
                                                {activeAssessment.testCase.output.split('\n').map((line, index) => (
                                                    <li key={index}>{line}</li>
                                                ))}
                                            </ul>
                                        )
                                    }
                                </div>
                            </div>
                            )}
                            <div className={`${styles.assessmentFooter}`}>
                                <div className={`${styles.assessmentBtns}`}>
                                    <button onClick={() => setShow(true)}>
                                        Questions
                                    </button>
                                    <button>
                                        Test Cases
                                    </button>
                                </div>
                                <div className={`${styles.submitButton}`}>
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
                                    <div className={`${styles.option1Container}`}>
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
                                        <button className={`${styles.submitCode}`} disabled={generating} onClick={submitCode}>Submit Code</button>
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
                        <div className={`${styles.aiBot} ${minimize && styles.minimize} ${challangeDetails.withAssistance == false && styles.hideBot}`}>
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
                                                    <p className='m-0'>{chat.message}</p>
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