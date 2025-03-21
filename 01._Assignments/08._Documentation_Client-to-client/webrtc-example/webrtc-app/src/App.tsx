import { useEffect, useRef, useState } from "react";
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";
import useWebRTC from "./useWebRtc";

function App() {
  const startButtonRef = useRef<HTMLButtonElement | null>(null);
  const hangupButtonRef = useRef<HTMLButtonElement | null>(null);
  const muteAudButtonRef = useRef<HTMLButtonElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!hangupButtonRef.current || !muteAudButtonRef.current) return;
    hangupButtonRef.current.disabled = true;
    muteAudButtonRef.current.disabled = true;
  }, []);

  const [audiostate, setAudio] = useState(false);

  const { localStreamRef, hangup, socketRef } = useWebRTC({
    startButtonRef,
    hangupButtonRef,
    muteAudButtonRef,
    remoteVideoRef,
  });

  const startB = async () => {
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true },
      });
      if (!localVideoRef.current || !startButtonRef.current || !hangupButtonRef.current || !muteAudButtonRef.current) return;

      localVideoRef.current.srcObject = localStreamRef.current;
      startButtonRef.current.disabled = true;
      hangupButtonRef.current.disabled = false;
      muteAudButtonRef.current.disabled = false;

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
            ref={startButtonRef}
            onClick={startB}
          >
            <FiVideo />
          </button>
          <button
            className="btn-item btn-end"
            ref={hangupButtonRef}
            onClick={hangB}
          >
            <FiVideoOff />
          </button>
          <button
            className="btn-item btn-start"
            ref={muteAudButtonRef}
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
