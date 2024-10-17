
import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";

function App() {
  const [keyLogs, setKeyLogs] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('keyLog', data => {
      setKeyLogs(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <h1>Keylogger</h1>
      <div>{keyLogs}</div>
    </div>
  );
}

export default App;
