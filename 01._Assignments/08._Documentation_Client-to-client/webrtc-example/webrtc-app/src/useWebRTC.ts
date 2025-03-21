import { useEffect, useRef } from "react";
import { io } from "socket.io-client";


interface Props {
    startButtonRef: React.RefObject<HTMLButtonElement | null>,
    hangupButtonRef: React.RefObject<HTMLButtonElement | null>,
    muteAudButtonRef: React.RefObject<HTMLButtonElement | null>,
    remoteVideoRef: React.RefObject<HTMLVideoElement | null>
}

const useWebRTC = ({ startButtonRef, hangupButtonRef, muteAudButtonRef, remoteVideoRef }: Props) => {
    const localStreamRef = useRef<MediaStream | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const socketRef = useRef(io("http://localhost:8080", { transports: ["websocket"] }));

    const configuration: RTCConfiguration = {
        iceServers: [
            {
                urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
            },
        ],
        iceCandidatePoolSize: 10,
    };

    useEffect(() => {
        const socket = socketRef.current;

        socket.on("message", (e) => {
            if (!localStreamRef.current) {
                console.log("not ready yet");
                return;
            }
            switch (e.type) {
                case "offer":
                    handleOffer(e);
                    break;
                case "answer":
                    handleAnswer(e);
                    break;
                case "candidate":
                    handleCandidate(e);
                    break;
                case "ready":
                    if (pcRef.current) {
                        console.log("already in call, ignoring");
                        return;
                    }
                    makeCall();
                    break;
                case "bye":
                    if (pcRef.current) {
                        hangup();
                    }
                    break;
                default:
                    console.log("unhandled", e);
                    break;
            }
        });

        // return () => {
        //     console.log("NOW WE CLEAN!")
        //     socket.disconnect(); // Clean up on unmount
        // };
    }, []);

    async function makeCall() {
        try {
            pcRef.current = new RTCPeerConnection(configuration);
            pcRef.current.onicecandidate = (e) => {
                const message: { type: string; candidate?: string; sdpMid?: string; sdpMLineIndex?: number } = {
                    type: "candidate",
                };
                if (e.candidate) {
                    message.candidate = e.candidate.candidate;
                    message.sdpMid = e.candidate.sdpMid ?? undefined;
                    message.sdpMLineIndex = e.candidate.sdpMLineIndex ?? undefined;
                }
                socketRef.current.emit("message", message);
            };

            pcRef.current.ontrack = (e) => (remoteVideoRef.current.srcObject = e.streams[0]);

            if (localStreamRef.current) {
                localStreamRef.current.getTracks().forEach((track) => {
                    if (pcRef.current && localStreamRef.current) {
                        pcRef.current.addTrack(track, localStreamRef.current);
                    }
                });
            }
            const offer = await pcRef.current.createOffer();
            socketRef.current.emit("message", { type: "offer", sdp: offer.sdp });
            await pcRef.current.setLocalDescription(offer);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleOffer(offer: RTCSessionDescriptionInit) {
        if (pcRef.current) {
            console.error("existing peerconnection");
            return;
        }
        try {
            pcRef.current = new RTCPeerConnection(configuration);
            pcRef.current.onicecandidate = (e) => {
                const message = {
                    type: "candidate",
                    candidate: null,
                };
                if (e.candidate) {
                    message.candidate = e.candidate.candidate;
                    message.sdpMid = e.candidate.sdpMid;
                    message.sdpMLineIndex = e.candidate.sdpMLineIndex;
                }
                socketRef.current.emit("message", message);
            };
            pcRef.current.ontrack = (e) => (remoteVideoRef.current.srcObject = e.streams[0]);
            localStreamRef.current.getTracks().forEach((track) => pcRef.current.addTrack(track, localStreamRef.current));
            await pcRef.current.setRemoteDescription(offer);

            const answer = await pcRef.current.createAnswer();
            socketRef.current.emit("message", { type: "answer", sdp: answer.sdp });
            await pcRef.current.setLocalDescription(answer);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleAnswer(answer: RTCSessionDescriptionInit) {
        if (!pcRef.current) {
            console.error("no peerconnection");
            return;
        }
        try {
            await pcRef.current.setRemoteDescription(answer);
        } catch (e) {
            console.log(e);
        }
    }

    async function handleCandidate(candidate: RTCIceCandidateInit) {
        try {
            if (!pcRef.current) {
                console.error("no peerconnection");
                return;
            }
            if (!candidate) {
                await pcRef.current.addIceCandidate(null);
            } else {
                await pcRef.current.addIceCandidate(candidate);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function hangup() {
        if (pcRef.current) {
            pcRef.current.close();
            pcRef.current = null;
        }
        if (localStreamRef.current) {
            localStreamRef.current.getTracks().forEach((track) => track.stop());
            localStreamRef.current = null;
        }
        startButtonRef.current.disabled = false;
        hangupButtonRef.current.disabled = true;
        muteAudButtonRef.current.disabled = true;
    }
    return { localStreamRef, makeCall, hangup, socketRef };
}

export default useWebRTC;