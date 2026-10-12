import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, 
  User, Users, History, MessageSquare, Send, ShieldCheck, 
  Radio, Sparkles, CheckCircle2
} from 'lucide-react';

function App() {
  // Navigation tabs: 'contacts' | 'dialpad' | 'history'
  const [activeTab, setActiveTab] = useState('contacts');

  // Audio State & Hardware
  const [micPermission, setMicPermission] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Call Status State: 'idle' | 'calling' | 'connected'
  const [callState, setCallState] = useState('idle');
  const [activeContact, setActiveContact] = useState(null);
  const [callDuration, setCallDuration] = useState(0);

  // Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'System', text: 'Call session initiated via WebRTC encrypted audio.', time: '10:00 AM' }
  ]);
  const [newMsg, setNewMsg] = useState('');

  // Audio Stream Refs
  const localStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Sample Contacts
  const [contacts] = useState([
    { id: '1', name: 'Alex Johnson', role: 'Support Supervisor', status: 'online', avatar: '👨‍💼', phone: '101' },
    { id: '2', name: 'Sarah Connor', role: 'Operations Agent', status: 'online', avatar: '👩‍💻', phone: '102' },
    { id: '3', name: 'David Miller', role: 'Network Engineer', status: 'busy', avatar: '👨‍🔧', phone: '103' },
    { id: '4', name: 'Priya Sharma', role: 'ACD Dispatcher', status: 'online', avatar: '👩‍💼', phone: '104' },
  ]);

  // Call History
  const [callHistory, setCallHistory] = useState([
    { id: 'h1', name: 'Alex Johnson', type: 'incoming', duration: '03:42', time: 'Today, 2:15 PM' },
    { id: 'h2', name: 'David Miller', type: 'missed', duration: '00:00', time: 'Today, 1:04 PM' },
    { id: 'h3', name: 'Sarah Connor', type: 'outgoing', duration: '12:18', time: 'Yesterday, 5:30 PM' },
  ]);

  // --- Step 1: Request Microphone & Setup Real Audio Analyser ---
  const startMicrophone = async () => {
    try {
      // 100% Free browser WebRTC mediaDevices API
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }, 
        video: false 
      });

      localStreamRef.current = stream;
      setMicPermission(true);

      // Setup Web Audio API to detect real microphone volume activity
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const checkVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        // Calculate average volume level
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round(average * 1.6)));
        animationFrameRef.current = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    } catch (err) {
      console.error('Microphone access denied:', err);
      alert('Microphone access is needed for audio calling. Please allow mic permission in your browser!');
    }
  };

  // Stop / cleanup microphone
  const stopMicrophone = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) audioContextRef.current.close();
    setMicPermission(false);
    setAudioLevel(0);
  };

  // Toggle Mute
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    } else {
      setIsMuted(!isMuted);
    }
  };

  // Start Call Simulation / Preparation for Go Signaling
  const initiateCall = (contact) => {
    setActiveContact(contact);
    setCallState('calling');
    if (!micPermission) {
      startMicrophone();
    }

    // Simulate answering in 2 seconds (In Step 2, Go WebSocket will send the real WebRTC answer!)
    setTimeout(() => {
      setCallState('connected');
      setCallDuration(0);
      timerIntervalRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }, 2000);
  };

  // End Call
  const endCall = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (activeContact && callDuration > 0) {
      const mins = Math.floor(callDuration / 60).toString().padStart(2, '0');
      const secs = (callDuration % 60).toString().padStart(2, '0');
      setCallHistory([
        {
          id: Date.now().toString(),
          name: activeContact.name,
          type: 'outgoing',
          duration: `${mins}:${secs}`,
          time: 'Just now'
        },
        ...callHistory
      ]);
    }
    setCallState('idle');
    setActiveContact(null);
    setCallDuration(0);
  };

  // Format seconds to mm:ss
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // Send In-call Chat Message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        sender: 'Narasimman',
        text: newMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setNewMsg('');
  };

  useEffect(() => {
    return () => {
      stopMicrophone();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070b12] text-gray-100 flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="h-16 border-b border-gray-800/80 bg-[#0a0f1d]/90 px-6 flex items-center justify-between backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-black text-white shadow-lg shadow-cyan-500/20">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
              PulseRTC <span className="text-[10px] uppercase font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded-full">Voice VoIP</span>
            </h1>
            <p className="text-[11px] text-gray-400">WebRTC Encrypted Peer-to-Peer Calling</p>
          </div>
        </div>

        {/* User Identity & Audio Hardware Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-gray-300">Agent: <strong className="text-white">Narasimman</strong> (Ext: 101)</span>
          </div>

          {!micPermission ? (
            <button
              onClick={startMicrophone}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-600/50 hover:bg-cyan-900/40 transition-colors flex items-center gap-1.5"
            >
              <Mic className="w-3.5 h-3.5 text-cyan-400" />
              <span>Enable Microphone</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Mic Active ({audioLevel}% Volume)</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Contacts, Dialpad & History (4 cols) */}
        <div className="lg:col-span-4 flex flex-col rounded-2xl bg-[#0d1322] border border-gray-800 overflow-hidden shadow-xl">
          {/* Tab Selection */}
          <div className="flex border-b border-gray-800 bg-[#090d18]">
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'contacts' ? 'border-cyan-400 text-cyan-400 bg-gray-800/20' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Contacts</span>
            </button>
            <button
              onClick={() => setActiveTab('dialpad')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'dialpad' ? 'border-cyan-400 text-cyan-400 bg-gray-800/20' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Dialpad</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                activeTab === 'history' ? 'border-cyan-400 text-cyan-400 bg-gray-800/20' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'contacts' && (
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Available Extensions</div>
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-3 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-gray-700 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-xl relative">
                        {contact.avatar}
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0d1322] ${
                            contact.status === 'online' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        ></span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {contact.name}
                        </h4>
                        <div className="text-xs text-gray-400">Ext: {contact.phone} • {contact.role}</div>
                      </div>
                    </div>

                    <button
                      disabled={callState !== 'idle'}
                      onClick={() => initiateCall(contact)}
                      className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all disabled:opacity-40 disabled:pointer-events-none"
                      title="Audio Call"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'dialpad' && (
              <div className="text-center py-4">
                <div className="mb-4 p-3 rounded-xl bg-gray-900 border border-gray-800 text-xl font-mono tracking-widest text-white">
                  102
                </div>
                <div className="grid grid-cols-3 gap-3 max-w-[240px] mx-auto mb-6">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                    <button
                      key={digit}
                      className="h-12 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-lg font-bold text-white transition-colors active:scale-95"
                    >
                      {digit}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => initiateCall(contacts[1])}
                  disabled={callState !== 'idle'}
                  className="w-full py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95 disabled:opacity-40"
                >
                  <Phone className="w-4 h-4" />
                  <span>Start Audio Call</span>
                </button>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-2.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">Recent Call Logs</div>
                {callHistory.map((h) => (
                  <div key={h.id} className="p-3 rounded-xl bg-gray-900/50 border border-gray-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{h.name}</div>
                      <div className="text-gray-400 text-[11px] mt-0.5">{h.time}</div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        h.type === 'incoming' ? 'bg-emerald-950/60 text-emerald-300' :
                        h.type === 'outgoing' ? 'bg-cyan-950/60 text-cyan-300' : 'bg-rose-950/60 text-rose-300'
                      }`}>
                        {h.type}
                      </span>
                      <div className="text-gray-400 text-[11px] mt-1 font-mono">{h.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center / Right: Active Call Stage & In-Call Chat (8 cols) */}
        <div className="lg:col-span-8 flex flex-col rounded-2xl bg-[#0d1322] border border-gray-800 overflow-hidden shadow-xl">
          
          {/* Main Calling Stage */}
          <div className="relative flex-1 min-h-[420px] p-8 flex flex-col items-center justify-center bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] overflow-hidden">
            
            {/* Background Ambient Glow */}
            <div className="absolute w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>

            {callState === 'idle' ? (
              <div className="text-center max-w-sm z-10">
                <div className="w-20 h-20 rounded-full bg-gray-800/80 border border-gray-700/60 flex items-center justify-center text-3xl mx-auto mb-4 text-cyan-400">
                  🎧
                </div>
                <h3 className="text-xl font-bold text-white">Audio VoIP Engine Ready</h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Select a contact on the left to initiate a low-latency WebRTC peer-to-peer audio call.
                </p>

                {/* Real-time Mic Activity Test Bar */}
                <div className="mt-6 p-4 rounded-xl bg-gray-900/80 border border-gray-800 text-left">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-gray-300">Live Microphone Test</span>
                    <span className="font-mono text-cyan-400">{audioLevel}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-75 rounded-full"
                      style={{ width: `${audioLevel}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    Speak into your mic: The bar bounces to your real voice frequency!
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center z-10 flex flex-col items-center">
                
                {/* Caller Pulsing Avatar */}
                <div className="relative mb-6">
                  {/* Expanding sound wave rings when speaking */}
                  {audioLevel > 15 && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
                      <div className="absolute -inset-4 rounded-full bg-indigo-500/15 animate-pulse"></div>
                    </>
                  )}
                  
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 p-1 relative z-10 shadow-2xl shadow-cyan-500/30">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center text-4xl">
                      {activeContact?.avatar || '👤'}
                    </div>
                  </div>
                </div>

                {/* Contact Name & Call Status */}
                <h3 className="text-2xl font-bold text-white tracking-tight">{activeContact?.name}</h3>
                <div className="text-xs text-cyan-400 font-medium mt-1">
                  {callState === 'calling' ? 'Ringing peer...' : 'Encrypted Audio Call Connected'}
                </div>

                {/* Call Duration Timer */}
                <div className="mt-3 px-4 py-1 rounded-full bg-gray-900/80 border border-gray-800 text-sm font-mono text-gray-300">
                  {callState === 'calling' ? '00:00' : formatTime(callDuration)}
                </div>

                {/* Live Voice Audio Waveform Bars */}
                {callState === 'connected' && (
                  <div className="flex items-center gap-1.5 h-10 mt-6">
                    <div className="w-1.5 bg-cyan-400 rounded-full wave-bar"></div>
                    <div className="w-1.5 bg-indigo-400 rounded-full wave-bar"></div>
                    <div className="w-1.5 bg-purple-400 rounded-full wave-bar"></div>
                    <div className="w-1.5 bg-cyan-400 rounded-full wave-bar"></div>
                    <div className="w-1.5 bg-sky-400 rounded-full wave-bar"></div>
                  </div>
                )}
              </div>
            )}

            {/* In-Call Action Control Bar */}
            {callState !== 'idle' && (
              <div className="mt-8 flex items-center gap-4 z-20">
                {/* Mute Button */}
                <button
                  onClick={toggleMute}
                  className={`p-4 rounded-full transition-all ${
                    isMuted ? 'bg-rose-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  }`}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                {/* Speaker Toggle */}
                <button
                  onClick={() => setIsDeafened(!isDeafened)}
                  className={`p-4 rounded-full transition-all ${
                    isDeafened ? 'bg-amber-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                  }`}
                  title={isDeafened ? 'Enable Sound' : 'Deafen'}
                >
                  {isDeafened ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                {/* End Call Button */}
                <button
                  onClick={endCall}
                  className="p-4 rounded-full bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-lg shadow-rose-600/30 active:scale-95"
                  title="End Audio Call"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Row: In-Call Real-Time Chat Panel */}
          <div className="border-t border-gray-800 p-4 bg-[#090d18]">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>In-Call Real-Time Text Chat</span>
            </div>

            <div className="h-28 overflow-y-auto space-y-2 mb-3 pr-2">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="text-xs">
                  <span className="font-semibold text-cyan-400">{msg.sender}</span>
                  <span className="text-[10px] text-gray-500 ml-1.5">({msg.time}):</span>
                  <span className="text-gray-300 ml-2">{msg.text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Type a message during call..."
                className="flex-1 px-4 py-2 rounded-xl bg-gray-900 border border-gray-700/80 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
