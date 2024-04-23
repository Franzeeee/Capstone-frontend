import React, { useState, useEffect, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from '../assets/css/pages/code-editor.module.css';
import axios from 'axios'; // Import Axios for making HTTP requests
import token from '../utils/token';
import { useNavigate } from 'react-router-dom'

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import 'codemirror/addon/hint/show-hint'; // Import show-hint addon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faBars, faCaretDown, faCaretUp, faClock, faClose, faCopy, faHome, faPaperPlane, faPlay, faRightFromBracket, faRobot, faSpinner, faTriangleCircleSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFile, faFolder, faFolderOpen, faSave } from '@fortawesome/free-regular-svg-icons';
import getAuthToken from '../utils/fetchToken';
import logo from '../assets/img/logo.png';

const CodeEditor = () => {
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

    useEffect(() => {
        const fetchAuthToken = async () => {
            try {
                const clientId = 'dab857c8172e2fcf4d7b943e26b6713f'; // Provide your clientId
                const clientSecret = '20ea5e30a6e4dbe7928ee2df3c852706de38e63a2b64b4bee7ba9a0761ef0321'; // Provide your clientSecret
                
                const data = await getAuthToken(clientId, clientSecret);
                setAuthToken(data);
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
                setOutput("Warning: Expired Token. Please rerun the program.")
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
                'content-type': 'application/json',
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
                const clientSecret = '74d8130f970462b618aba4bdb77a8b07c5c67c35601fd857960a1659129d4556';
                
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

    const [isInteractive, setIsInteractive] = useState(false);
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

    return (
        <div className={`code-editor container-fluid p-0 m-0 vh-100 d-flex ${styles.container}`}>
            <nav className={`${styles.nav}`}>
                <p><FontAwesomeIcon icon={faBars} className={`${styles.icon}`}/></p>
                <ul className='d-flex flex-column gap-3'>
                    <li title='New Project'><FontAwesomeIcon icon={faFile} className={`${styles.icon}`}/></li>
                    <li title='Open Project'><FontAwesomeIcon icon={faFolderOpen} className={`${styles.icon} ${styles.folderIcon}`}/></li>
                    <li title='Save'><FontAwesomeIcon icon={faSave} className={`${styles.icon}`}/></li>
                    <li title='Copy'><FontAwesomeIcon icon={faCopy} className={`${styles.icon}`}/></li>
                </ul>
            </nav>
            <section className={`w-100 d-flex flex-column ${styles.section}`}>
                <header>
                    <div className={` position-relative logo d-flex align-items-center justify-content-center ${styles.logo}`}>
                        <img src={logo} alt="CodeLab Logo" onClick={() => navigate('/')}/>
                    </div>
                    <div className="timer">
                        <p className='text-light m-0'><span><FontAwesomeIcon icon={faClock} /></span> 2:00</p>
                        <div className="play">

                        </div>
                    </div>
                    <div className={`${styles.controls}`}>
                        <button onClick={execute ? terminate : handleExecute} className={`${execute && styles.execute}`}>
                            {execute ? "Terminate" : "Execute"} <span><FontAwesomeIcon icon={execute ? faSpinner : faPlay} spin={execute && true}/></span>
                        </button>
                    </div>
                    <div className={`${styles.exit}`} title="Exit Playground">
                        <FontAwesomeIcon icon={faRightFromBracket} onClick={() => navigate('/')}/>
                    </div>
                </header>
                <main className={`${styles.main}`}>
                    <div className={`d-flex flex-column ${styles.codeArea}`}>
                        <div className={`${styles.codeEditor}`}>
                            <CodeMirror
                                value={code}
                                options={{
                                    mode: 'python',
                                    theme: 'material',
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
                                    setCode(value);
                                }}
                                className={`${styles.codeMirror}`}
                                
                            />
                        </div>
                        <div className={` ${styles.outputInput}`}>
                            <div className={`${styles.inputArea}`}>
                            <div className={`${styles.switchContainer} position-absolute`}>
                                <div className={`${styles.switch} ${isInteractive ? styles.active : ''}`} onClick={handleIteractive}>
                                </div>
                                <p className='text-light'>Interactive</p>
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
                    <div className={`${styles.aiArea}`}>
                        <div className={`${styles.task}`}>
                        </div>
                        <div className={`${styles.aiBot} ${minimize && styles.minimize}`}>
                            <div className={`${styles.chatHead}`}>
                                <p className='m-0'>Challange Generator AI</p>
                                <FontAwesomeIcon icon={minimize ?faCaretUp : faCaretDown} onClick={() => setMinimize(!minimize)} className={`${styles.closeIcon}`}/>
                            </div>

                            {/* Chat content */}
                            <div className={`${styles.chatContent}`}>
                                {/* Chat Sample */}
                                <div className={`${styles.message}`}>
                                    <div className={`${styles.user}`}>
                                        <FontAwesomeIcon icon={faRobot} />
                                    </div>
                                    <div className={`${styles.messageContent}`}>
                                        <p className={`m-0 ${styles.userName}`}>AI</p>
                                        <p className='m-0'>This is a message</p>
                                    </div>
                                </div>

                                <div className={`${styles.message} ${styles.response}`}>
                                    <div className={`${styles.user}`}>
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                    <div className={`${styles.messageContent}`}>
                                        <p className={`m-0 ${styles.userName}`}>USER</p>
                                        <p className='m-0'>This is a resposnse message from user</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.chatbox}`}>
                                <input type="text" name="" id="" />
                                <FontAwesomeIcon icon={faPaperPlane} className={`${styles.sendIcon}`}/>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default CodeEditor;
