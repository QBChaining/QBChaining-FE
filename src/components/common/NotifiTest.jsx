import React, { useEffect, useState } from "react";
import axios from "axios";

export default function NotifiTest() {
  const evtSource = new EventSource(
    "http://43.200.169.141/api/notification/test",
  );
  console.log(evtSource);
  console.log("2");

  evtSource.addEventListener(
    "helloworld",
    function (evt) {
      console.log("3");
      //   const data = JSON.parse(evt.data);
      const data = evt.data;
      console.log("4");
      console.log(data);
      // Use data here
    },
    false,
  );

  //   const onTest = evt => {
  //     subscribe(evt);
  //   };
  useEffect(evtSource => {}, [evtSource]);
  // ===========
  //   const [process, setProcess] = useState({});
  //   const [message, setMessage] = useState({});
  //   const [listening, setListening] = useState(false);

  //   const statusMessage = {
  //     subscribed: "Subscribed",
  //     unsubscribed: "Unsubscribed",
  //   };

  //   const subscribe = async () => {
  //     const status = listening;
  //     if (!status) {
  //       const events = new EventSource(
  //         "http://43.200.169.141/api/notification/test",
  //       );
  //       console.log("이벤트");
  //       console.log(events);
  //       events.onmessage = event => {
  //         console.log(events.onmessage);
  //         const parsedData = JSON.parse(event.data);
  //         console.log("1");
  //         console.log("jsonData", parsedData);
  //         console.log(event);
  //         switch (parsedData.type) {
  //           case "init-connection":
  //             console.log(parsedData.processId);
  //             setProcess(parsedData.processId);
  //             break;
  //           case "message":
  //             console.log(parsedData.message);
  //             setMessage(parsedData.message);
  //             break;
  //         }
  //       };
  //     } else {
  //       setProcess({});
  //       setMessage({});
  //       //   await axios.delete(
  //       //     `http://43.200.169.141/api/notification/test/${process}`,
  //       //   );
  //     }
  //     setListening(!listening);
  //   };

  return (
    <div>
      <button style={{ width: "100px" }}> 테스트</button>
      {/* <p>{listening ? statusMessage.subscribed : statusMessage.unsubscribed}</p>
      <p>{JSON.stringify(process)}</p>
      <button onClick={subscribe}>
        {listening ? statusMessage.unsubscribed : statusMessage.subscribed}
      </button>
      <br />
      <p>{JSON.stringify(message)}</p> */}
    </div>
  );
}
