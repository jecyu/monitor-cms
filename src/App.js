import React, { useEffect, useRef } from "react";
import "rrweb-player/dist/style.css";
import rrwebPlayer from "rrweb-player";

function App() {
  const rePlayerRef = useRef();
  const handleFetch = async () => {
    const response = await fetch("/events");
    const data = await response.json();
    handleSetEvents(data);
  };

  const handleSetEvents = (events) => {
    rePlayerRef.current = new rrwebPlayer({
      target: document.body, // customizable root element
      props: {
        events: events,
        liveMode: true,
      },
    });
  };

  const handleDestroy = () => {
    if (rePlayerRef.current) {
      const replayer = rePlayerRef.current.getReplayer();
      replayer.destroy();
      // 目前没有找到销毁 replayer 的方法，所以只能通过移除 DOM 来销毁
      const rrplayer = document.querySelectorAll(".rr-player");
      rrplayer.forEach((item) => {
        item.remove();
      });
    }
  };

  console.log(" rePlayerRef.current ->", rePlayerRef.current);

  return (
    <div>
      <h1>User Behavior and Error Stack</h1>
      <button onClick={handleFetch}>Fetch Events</button>
      <button onClick={handleDestroy}>Destroy</button>
    </div>
  );
}

export default App;
