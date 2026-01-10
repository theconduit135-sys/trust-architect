import React, { useEffect, useRef, useState } from 'react';
import { LiveClient } from '../services/liveClient';
import { Mic, MicOff, Loader2, ChevronDown, Shield } from 'lucide-react';

export const VoiceWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("Aurelius Legal Strategy AI initialized.");
  
  const clientRef = useRef<LiveClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    // Standard 24000Hz output for Gemini
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    return () => {
      if (clientRef.current) {
          clientRef.current.disconnect();
          clientRef.current = null;
      }
      audioContextRef.current?.close();
    };
  }, []);

  const scheduleAudio = (buffer: AudioBuffer) => {
    if (!audioContextRef.current) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    
    const currentTime = audioContextRef.current.currentTime;
    // Rock-solid scheduling: if nextStartTime is in the past, start at currentTime
    const start = Math.max(currentTime, nextStartTimeRef.current);
    
    source.start(start);
    nextStartTimeRef.current = start + buffer.duration;
    
    activeSourcesRef.current.add(source);
    source.onended = () => {
      activeSourcesRef.current.delete(source);
    };
  };

  const stopAllAudio = () => {
    activeSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (e) {
        // Source already stopped
      }
    });
    activeSourcesRef.current.clear();
    
    if (audioContextRef.current) {
      nextStartTimeRef.current = audioContextRef.current.currentTime;
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setIsOpen(true);
    
    if (clientRef.current) {
        await clientRef.current.disconnect();
        clientRef.current = null;
    }
    
    clientRef.current = new LiveClient({
      onConnect: () => {
        setIsConnecting(false);
        setIsConnected(true);
        setTranscript("I am listening. What assets are we protecting today?");
      },
      onDisconnect: () => {
        setIsConnected(false);
        setTranscript("Session ended.");
        setIsConnecting(false);
      },
      onInterrupted: () => {
        stopAllAudio();
        setTranscript("Listening...");
      },
      onError: (err) => {
        console.error(err);
        setIsConnecting(false);
        setIsConnected(false);
        setTranscript("Connection error. Please try again.");
      },
      onAudioData: (buffer) => {
        scheduleAudio(buffer);
      },
      onTranscription: (text, isUser, isFinal) => {
        if (!isUser && isFinal) setTranscript(text);
      }
    });
    
    try {
        await clientRef.current.connect();
    } catch (e) {
        console.error("Connection failed", e);
        setIsConnecting(false);
        setTranscript("Failed to connect to audio service.");
    }
  };

  const handleDisconnect = async () => {
    setIsConnected(false);
    setIsConnecting(false);
    setTranscript("Session ended.");
    stopAllAudio();

    if (clientRef.current) {
        try {
            await clientRef.current.disconnect();
        } catch (e) {
            console.error("Disconnect error", e);
        }
        clientRef.current = null;
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      
      {isOpen && (
        <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scale-in origin-bottom-right">
            <div className="bg-brandBlue-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-orange-500 p-1.5 rounded-lg">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">Aurelius Legal AI</h3>
                        <div className="flex items-center space-x-1">
                            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`}></span>
                            <span className="text-[10px] text-brandBlue-200">{isConnected ? 'Live Strategy Session' : 'Standby'}</span>
                        </div>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                    <ChevronDown className="w-5 h-5" />
                </button>
            </div>

            <div className="h-64 bg-slate-50 p-6 overflow-y-auto custom-scrollbar flex flex-col justify-end">
                <p className={`text-base leading-relaxed ${isConnected ? 'text-slate-800 font-medium' : 'text-slate-400 italic'}`}>
                    {isConnecting ? "Establishing secure line..." : transcript}
                </p>
                {isConnected && (
                    <div className="mt-6 flex justify-center">
                        <div className="flex items-center space-x-1.5">
                            <div className="w-1.5 h-6 bg-orange-400 animate-[bounce_1s_infinite_ease-in-out]"></div>
                            <div className="w-1.5 h-10 bg-orange-500 animate-[bounce_1s_infinite_0.1s_ease-in-out]"></div>
                            <div className="w-1.5 h-7 bg-orange-400 animate-[bounce_1s_infinite_0.2s_ease-in-out]"></div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 bg-white border-t border-slate-100">
                {!isConnected ? (
                    <button 
                        onClick={handleConnect}
                        disabled={isConnecting}
                        className="w-full btn-primary py-3.5 flex items-center justify-center space-x-2 shadow-lg"
                    >
                        {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
                        <span>Start Consultation</span>
                    </button>
                ) : (
                    <button 
                        className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-3.5 rounded-full font-bold text-sm border border-red-200 transition-colors flex items-center justify-center space-x-2"
                        onClick={handleDisconnect}
                     >
                        <MicOff className="w-5 h-5" />
                        <span>End Session</span>
                    </button>
                )}
            </div>
        </div>
      )}

      {!isOpen && (
        <button
            onClick={toggleOpen}
            className="group flex items-center justify-center w-14 h-14 bg-brandBlue-900 text-white rounded-full shadow-orange-500/20 shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-orange-500 relative"
        >
            <Mic className="w-6 h-6 group-hover:text-orange-400 transition-colors" />
        </button>
      )}
    </div>
  );
};