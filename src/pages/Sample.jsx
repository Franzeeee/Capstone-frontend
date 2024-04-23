import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkLoggedIn } from "../utils/auth";

function Sample() {
  const [output, setOutput] = useState("");
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRE9PRExFIiwic3ViIjoiV1MtQVBJLVRPS0VOIiwiY2xpZW50LWlkIjoiZGFiODU3YzgxNzJlMmZjZjRkN2I5NDNlMjZiNjcxM2YiLCJpYXQiOjE3MTM0NTY2ODQsImV4cCI6MTcxMzQ1Njg2NH0.75kybtZ6QCcdxc6PGCrQzigdoDpmOOQB8nAZzl7irIs"
  const socketClientRef = useRef("null")
  const [messageBody, setMessageBody] = useState("")
  const [initialRun, setInitialRun] = useState(true)
  const navigate = useNavigate();


  useEffect(()=> {
    const checkLoginStatus = async () => {
      const loggedIn = await checkLoggedIn();
      if (loggedIn) {
        console.log("User is logged in");
      } else {
        navigate('/login')
      }
    }
    checkLoginStatus();
  },[]);

  useEffect(() => {

    const apiCredentials = {
      clientId: "dab857c8172e2fcf4d7b943e26b6713f",
      clientSecret: "20ea5e30a6e4dbe7928ee2df3c852706de38e63a2b64b4bee7ba9a0761ef0321"
    }
    // axios.post('https://api.jdoodle.com/v1/auth-token', JSON.stringify(apiCredentials))
    //       .then(response => {
    //         setToken(response.data)
    //       })
    //       .catch(error => console.error("Error fetching token: ", error))
    

    const initializeSocket = () => {
      const client = webstomp.over(
        new SockJS("https://api.jdoodle.com/v1/stomp"),
        { heartbeat: false, debug: true }
      );
      client.connect({}, onWsConnection, onWsConnectionFailed);

      console.log("Client: ", client)
      socketClientRef.current = client;
    };

    const onWsConnection = () => {
      console.log("connection succeeded");

      const socketClient = socketClientRef.current;

      if (!socketClient) {
        console.error('WebSocket client is null or undefined');
        console.log(socketClient)
        return;
      }

      socketClient.subscribe('/user/queue/execute-i', message => {
        const messageBody = message.body;
        const statusCode = parseInt(message.headers.statusCode);
  
        if (statusCode === 200) {
          console.log('Received message:', messageBody);
          if(initialRun){
            setOutput(prevOutput => prevOutput + messageBody);
            setInitialRun(true)
          }else{
            setOutput(prevOutput => prevOutput + messageBody + '\n');
          }
        } else if (statusCode === 204) {
          setOutput(prevOutput => prevOutput + ' <--------- End of execution ---------->\n');
        }
      });

      let script = `def sum():
    num1 = int(input("Enter num 1: "))
    num2 = int(input("Enter num 2: "))
    total = num1 + num2
    print("Sum:", total)

sum()`;

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
        },
        () => console.log("Message sent")
      );
    };

    const onWsConnectionFailed = (e) => {
      console.log("connection failed");
      console.log(e);
    };

    if (!socketClientRef.current) {
      initializeSocket();
    }

    // Clean up the socket connection on component unmount
    return () => {
      const socketClient = socketClientRef.current;
      if (socketClient) {
        socketClient.disconnect(() => console.log("Socket disconnected"));
      }
    };
  }, []);
  
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
  
  
  return (
    <div>
      
      <h1>Output</h1>
      <textarea
        rows="5"
        cols="100"
        id="result"
        value={output} // Use defaultValue instead of value
        onKeyPress={handleInput}
        onChange={(e) => setOutput(e.target.value)}
      ></textarea>

    </div>
  );
}

export default Sample;
