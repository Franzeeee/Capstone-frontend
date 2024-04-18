import React, { useState, useEffect } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from '../assets/css/pages/code-editor.module.css'
import axios from 'axios'; // Import Axios for making HTTP requests

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/python/python';
import 'codemirror/addon/hint/show-hint'; // Import show-hint addon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faBars, faCaretDown, faCaretUp, faClock, faClose, faCopy, faHome, faPaperPlane, faPlay, faRightFromBracket, faRobot, faTriangleCircleSquare, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFile, faFolder, faFolderOpen, faSave } from '@fortawesome/free-regular-svg-icons';

const CodeEditor = () => {
    const [code, setCode] = useState('');
    const [inputValues, setInputValues] = useState('');
    const [output, setOutput] = useState('');
    const [minimize, setMinimize] = useState(false)

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

    const handleAlertCode = async () => {
        try {
            // Compile the code and get the result
            const result = await compileCode(code, inputValues);

            // Display the compilation result
            setOutput(result);
        } catch (error) {
            // Handle compilation errors
            setOutput(error.message);
        }
    };

    const handleInputChange = (event) => {
        setInputValues(event.target.value);
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
                    <div className="logo d-flex align-items-center justify-content-center ">
                        Logo Here
                    </div>
                    <div className="timer">
                        <p className='text-light m-0'><span><FontAwesomeIcon icon={faClock} /></span> 2:00</p>
                        <div className="play">

                        </div>
                    </div>
                    <div className={`${styles.controls}`}>
                        <button onClick={handleAlertCode}>
                            Execute <span><FontAwesomeIcon icon={faPlay} /></span>
                        </button>
                    </div>
                    <div className={`${styles.exit}`} title="Exit Playground">
                        <FontAwesomeIcon icon={faRightFromBracket}/>
                    </div>
                </header>
                <main className={`${styles.main}`}>
                    <div className={`d-flex flex-column ${styles.codeArea}`}>
                        <div className={`${styles.codeEditor}`}>
                            <CodeMirror
                            
                                value={code}
                                options={{
                                    mode: 'python', // Set mode to Python
                                    theme: 'material',
                                    lineNumbers: true,
                                    extraKeys: { 'Ctrl-Space': 'autocomplete' }
                                }}
                                onBeforeChange={(editor, data, value) => {
                                    setCode(value);
                                }}
                                className={`${styles.codeMirror}`}
                            />
                        </div>
                        <div className={` ${styles.outputInput}`}>
                            <div className={`${styles.inputArea}`}>
                                <textarea
                                    value={inputValues}
                                    onChange={handleInputChange}
                                    placeholder="Stdin Inputs"
                                    cols="30"
                                />
                            </div>
                            <div className={`${styles.outputArea}`}>
                                <p className={`${styles.title}`}>Output:</p>
                                {output && <p className='m-0'>{output}</p>}
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
