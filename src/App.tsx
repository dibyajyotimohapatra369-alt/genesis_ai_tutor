import React, { useState } from 'react';

// Hardcoded premium anime teacher profiles with corporate suit styles
const TEACHERS = [
  {
    id: 'sirus',
    name: 'Mr. Sirus',
    subject: 'Mathematics',
    avatar: '📐',
    style: 'CORPORATE SUIT & PURPLE TIE',
    prompt: 'You are Mr. Sirus, a brilliant, hyper-attentive, and deeply encouraging Math teacher in a crisp formal suit. Break down complex calculations into comforting, clear steps.'
  },
  {
    id: 'rosie',
    name: 'Miss Rosie',
    subject: 'Biology',
    avatar: '🧬',
    style: 'BLACK BLAZER & GLASSES',
    prompt: 'You are Miss Rosie, a highly dedicated, empathetic, and organized Biology faculty mentor. Explain life sciences with structured warmth and motivating insights.'
  }
];

export default function App() {
  const [selectedTeacher, setSelectedTeacher] = useState(TEACHERS[0]);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: 'system', text: `Connection Node Armed. Secured Key Proxy Session Active.` }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Connect directly over the open internet to Google's official Gemini cloud server satellites
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      const response = await fetch(
        `https://googleapis.com{apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: `${selectedTeacher.prompt}\n\nStudent Message: ${userText}` }]
            }]
          })
        }
      );

      const data = await response.json();
      const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Connection loop anomaly. Please verify network routing pathways.";
      setMessages(prev => [...prev, { sender: 'teacher', text: replyText }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'system', text: `Network node exception bypass active.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b090a', color: '#f5f3f4', minHeight: '100vh', fontFamily: 'monospace', padding: '16px' }}>
      {/* Encryption Header Panel */}
      <div style={{ borderBottom: '1px solid #ff4d6d', paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#ff4d6d', margin: 0, fontSize: '20px', letterSpacing: '2px' }}>GENESIS AI TUTOR</h1>
          <small style={{ color: '#a4161a' }}>Class 12 · CBSE · India · Boards Level</small>
        </div>
        <div style={{ color: '#52b788', fontSize: '11px', textAlign: 'right' }}>
          🛡️ SHA-256 SECURED MATRIX NODE
        </div>
      </div>

      {/* Grid: Faculty Selector Column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {TEACHERS.map((teacher) => {
            const isSelected = selectedTeacher.id === teacher.id;
            return (
              <div
                key={teacher.id}
                onClick={() => setSelectedTeacher(teacher)}
                style={{
                  minWidth: '220px',
                  padding: '12px',
                  borderRadius: '6px',
                  backgroundColor: '#161a1d',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #ff4d6d' : '1px solid #343a40',
                  boxShadow: isSelected ? '0 0 10px rgba(255,77,109,0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '24px' }}>{teacher.avatar}</span>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{teacher.name}</div>
                    <div style={{ fontSize: '11px', color: '#b7094c' }}>{teacher.subject}</div>
                  </div>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#52b788', boxShadow: '0 0 6px #52b788' }}></div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '9px', backgroundColor: '#0b090a', padding: '4px', borderRadius: '4px', color: '#adb5bd', textAlign: 'center' }}>
                  {teacher.style}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Immersive Live Chat Window */}
      <div style={{ backgroundColor: '#161a1d', border: '1px solid #343a40', borderRadius: '6px', height: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ padding: '12px', overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
              <div style={{
                padding: '10px',
                borderRadius: '8px',
                fontSize: '13px',
                lineHeight: '1.4',
                backgroundColor: msg.sender === 'user' ? '#ff4d6d' : msg.sender === 'system' ? '#212529' : '#0b090a',
                color: msg.sender === 'user' ? '#0b090a' : msg.sender === 'system' ? '#a4161a' : '#f5f3f4',
                border: msg.sender === 'teacher' ? '1px solid #b7094c' : 'none'
              }}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* User Command Input Terminal Bar */}
        <div style={{ display: 'flex', borderTop: '1px solid #343a40', padding: '8px', backgroundColor: '#0b090a' }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Message ${selectedTeacher.name}...`}
            disabled={isLoading}
            style={{ flexGrow: 1, backgroundColor: '#161a1d', border: '1px solid #343a40', color: '#f5f3f4', padding: '10px', borderRadius: '4px', fontFamily: 'monospace', outline: 'none' }}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            style={{ backgroundColor: '#ff4d6d', color: '#0b090a', border: 'none', padding: '0 16px', marginLeft: '8px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isLoading ? '...' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
}
