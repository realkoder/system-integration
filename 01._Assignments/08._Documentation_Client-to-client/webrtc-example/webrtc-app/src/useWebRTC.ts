import { useEffect, useRef } from "react";
import { io } from "socket.io-client";


interface Props {
    remoteVideoRef: React.RefObject<HTMLVideoElement | null>
}

interface IIceCandidateMessage {
    type: string;
    candidate: null | string;
    sdpMid: null | string;
    sdpMLineIndex: null | number;
}

const useWebRTC = ({ remoteVideoRef }: Props) => {
    const isConnectedWithPeerRef = useRef(false);
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
            pcRef.current.onicecandidate = (iceEvent) => {
                const message: { type: string; candidate?: string; sdpMid?: string; sdpMLineIndex?: number } = {
                    type: "candidate",
                };
                if (iceEvent.candidate) {
                    message.candidate = iceEvent.candidate.candidate;
                    message.sdpMid = iceEvent.candidate.sdpMid ?? undefined;
                    message.sdpMLineIndex = iceEvent.candidate.sdpMLineIndex ?? undefined;
                }
                socketRef.current.emit("message", message);
            };

            pcRef.current.ontrack = (e) => {
                if (remoteVideoRef.current === null) {
                    console.error("RemoteVideoRef is null - cant establish WEBRTC")
                    return
                }
                remoteVideoRef.current.srcObject = e.streams[0]
            };

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
            pcRef.current.onicecandidate = (iceEvent) => {
                const message: IIceCandidateMessage = {
                    type: "candidate",
                    candidate: null,
                    sdpMid: null,
                    sdpMLineIndex: null
                };
                if (iceEvent.candidate) {
                    message.candidate = iceEvent.candidate.candidate;
                    message.sdpMid = iceEvent.candidate.sdpMid;
                    message.sdpMLineIndex = iceEvent.candidate.sdpMLineIndex;
                }
                socketRef.current.emit("message", message);
            };

            // This is where we handle the incomming streams of data such as video or audio from other RTC participant(s)
            pcRef.current.ontrack = (rtcTrackEvent) => {
                if (remoteVideoRef.current != null) {
                    remoteVideoRef.current.srcObject = rtcTrackEvent.streams[0]
                } else {
                    console.error("remoteVideoRef is null - could not handle incoming stream")
                }
            };

            if (localStreamRef.current === null) {
                console.log("localStreamRef.current is null - offer is not handled");
                return;
            }

            localStreamRef.current.getTracks().forEach((track) => {
                if (pcRef.current === null || localStreamRef.current === null) {
                    console.error(`pcRef.current is null ${pcRef.current === null} - offer could not be handled`)
                    console.error(`localStreamRef.current is null ${localStreamRef.current === null} - offer could not be handled`)
                    return;
                }
                pcRef.current.addTrack(track, localStreamRef.current)
            });

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
                isConnectedWithPeerRef.current = true;
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
    }
    return { localStreamRef, makeCall, hangup, socketRef, isConnectedWithPeerRef };
}

export default useWebRTC;