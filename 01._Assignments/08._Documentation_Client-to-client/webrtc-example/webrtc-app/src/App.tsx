import { useRef, useState } from "react";
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";
import useWebRTC from "./useWebRTC";
import './App.css';

function App() {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const [audiostate, setAudio] = useState(false);

  const { localStreamRef, hangup, socketRef, isConnectedWithPeerRef } =
    useWebRTC({
      remoteVideoRef,
    });

  const startB = async () => {
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true },
      });
      if (!localVideoRef.current) return;

      localVideoRef.current.srcObject = localStreamRef.current;

      socketRef.current.emit("message", { type: "ready" });
    } catch (err) {
      console.log(err);
    }
  };

  const hangB = async () => {
    hangup();
    socketRef.current.emit("message", { type: "bye" });
  };

  const muteAudio = () => {
    if (localVideoRef.current) {
      if (audiostate) {
        localVideoRef.current.muted = true;
        setAudio(false);
      } else {
        localVideoRef.current.muted = false;
        setAudio(true);
      }
    }
  };

  return (
    <>
      <main className="container  ">
        <div className="video bg-main">
          <video
            ref={localVideoRef}
            className="video-item"
            autoPlay
            playsInline
            src=" "
          ></video>
          <video
            ref={remoteVideoRef}
            className="video-item"
            autoPlay
            playsInline
            src=" "
          ></video>
        </div>

        <div className="btn">
          <button
            className="btn-item btn-start"
            disabled={isConnectedWithPeerRef.current}
            onClick={startB}
          >
            <FiVideo />
          </button>
          <button
            className="btn-item btn-end"
            disabled={!isConnectedWithPeerRef.current}
            onClick={hangB}
          >
            <FiVideoOff />
          </button>
          <button
            className="btn-item btn-start"
            disabled={!isConnectedWithPeerRef.current}
            onClick={muteAudio}
          >
            {audiostate ? <FiMic /> : <FiMicOff />}
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
