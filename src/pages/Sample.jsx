import React, { useState, useEffect } from "react";

function Sample() {
  const [output, setOutput] = useState("");
  const [socketClient, setSocketClient] = useState(null);

  useEffect(() => {
    const initializeSocket = () => {
      const client = webstomp.over(
        new SockJS("https://api.jdoodle.com/v1/stomp"),
        { heartbeat: false, debug: true }
      );
      client.connect({}, onWsConnection, onWsConnectionFailed);
      setSocketClient(client);
    };

    const onWsConnection = () => {
      console.log("connection succeeded");

      if (!socketClient) {
        console.error('WebSocket client is null or undefined');
        console.log(socketClient)
        return;
      }

      socketClient.subscribe("/user/queue/execute-i", (message) => {
        let msgId = message.headers["message-id"];
        let msgSeq = parseInt(msgId.substring(msgId.lastIndexOf("-") + 1));

        let statusCode = parseInt(message.headers.statusCode);

        if (statusCode === 201) {
          return;
        }

        let t0;
        try {
          t0 = performance.now();
          while (
            performance.now() - t0 < 2500 &&
            msgSeq !== msgSeq
          ) {}
        } catch (e) {}

        if (statusCode === 204) {
          //executionTime = message.body
        } else if (statusCode === 500 || statusCode === 410) {
          //server error
          console.log("server error");
        } else if (statusCode === 206) {
          //outputFiles = JSON.parse(message.body)
          //returns file list - not supported in this custom api
        } else if (statusCode === 429) {
          //Daily limit reached
          console.log("daily limit reached");
        } else if (statusCode === 400) {
          //Invalid request - invalid signature or token expired - check the body for details
          console.log(
            "invalid request - invalid signature or token expired"
          );
        } else if (statusCode === 401) {
          //Unauthorised request
          console.log("Unauthorised request");
        } else {
          setOutput((prevOutput) => prevOutput + message.body);
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
          token:
          "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRE9PRExFIiwic3ViIjoiV1MtQVBJLVRPS0VOIiwiY2xpZW50LWlkIjoiZGFiODU3YzgxNzJlMmZjZjRkN2I5NDNlMjZiNjcxM2YiLCJpYXQiOjE3MTM0MDc5ODYsImV4cCI6MTcxMzQwODE2Nn0.VjFfum2QTh8H2-TjzxWVo7eaIGUhhsDfkAmntYZ79k4",
        },
        () => console.log("Message sent")
      );
    };

    const onWsConnectionFailed = (e) => {
      console.log("connection failed");
      console.log(e);
    };

    if (!socketClient) {
      initializeSocket();
    }

    // Clean up the socket connection on component unmount
    return () => {
      if (socketClient) {
        socketClient.disconnect(() => console.log("Socket disconnected"));
      }
    };
  }, [socketClient]);

  const handleInput = (event) => {
    let key = event.key;
    if (event.key === "Enter") {
      key = "\n";
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
        defaultValue={output} // Use defaultValue instead of value
        onKeyPress={handleInput}
      ></textarea>

    </div>
  );
}

export default Sample;
