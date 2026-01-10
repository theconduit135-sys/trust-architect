import React, { useEffect, useRef, useState } from 'react';
import { LiveClient } from '../services/liveClient';
import { Mic, MicOff, Loader2 } from 'lucide-react';

export const VoiceMode: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("Click to consult with the Estate Planning Advisor.");
  
  const clientRef = useRef<LiveClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const nextStartTimeRef = useRef(0);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    return () => {
      clientRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, []);

  const playQueue = () => {
    if (!audioContextRef.current || audioQueueRef.current.length === 0 || isPlayingRef.current) return;
    isPlayingRef.current = true;
    const buffer = audioQueueRef.current.shift()!;
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    
    const start = Math.max(audioContextRef.current.currentTime, nextStartTimeRef.current);
    source.start(start);
    nextStartTimeRef.current = start + buffer.duration;
    
    source.onended = () => {
      isPlayingRef.current = false;
      playQueue();
    };
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    clientRef.current = new LiveClient({
      onConnect: () => {
        setIsConnecting(false);
        setIsConnected(true);
        setTranscript("Listening... Ask about asset protection or trusts.");
      },
      onDisconnect: () => {
        setIsConnected(false);
        setTranscript("Session ended.");
      },
      onError: (err) => {
        console.error(err);
        setIsConnecting(false);
        setTranscript("Connection error.");
      },
      onAudioData: (buffer) => {
        audioQueueRef.current.push(buffer);
        if (!isPlayingRef.current) playQueue();
      },
      onTranscription: (text, isUser, isFinal) => {
        if (!isUser && isFinal) setTranscript(text);
      },
      onInterrupted: () => {
        audioQueueRef.current = [];
        isPlayingRef.current = false;
        nextStartTimeRef.current = 0;
      }
    });
    await clientRef.current.connect();
  };

  const handleDisconnect = () => {
    clientRef.current?.disconnect();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-slate-100 rounded-2xl border border-slate-200 card-realistic">
      <div className="mb-8 relative">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${
          isConnected ? 'bg-indigo-100 ring-4 ring-indigo-50 shadow-lg' : 'bg-slate-200'
        }`}>
          {isConnected ? (
            <Mic className="w-12 h-12 text-indigo-600 animate-pulse" />
          ) : (
            <MicOff className="w-12 h-12 text-slate-400" />
          )}
        </div>
      </div>
      
      <div className="text-center mb-8 max-w-md px-4">
        <p className="text-slate-600 text-lg font-medium min-h-[3rem]">
          {transcript}
        </p>
      </div>

      <button
        onClick={isConnected ? handleDisconnect : handleConnect}
        disabled={isConnecting}
        className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
          isConnected 
            ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 card-realistic' 
            : 'btn-realistic-indigo'
        }`}
      >
        {isConnecting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isConnected ? (
          <span>End Consultation</span>
        ) : (
          <span>Start Voice Session</span>
        )}
      </button>
    </div>
  );
};