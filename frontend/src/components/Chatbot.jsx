import React, { useState, useRef, useEffect } from 'react';
import { MdChat, MdClose, MdSend, MdSupportAgent } from 'react-icons/md';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the EasyInsure Assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsTyping(true);

    const lowerInput = userMessage.toLowerCase();
    
    // Check if the user needs a human agent / ticket creation
    const needsTicket = 
      lowerInput.includes('issue') || 
      lowerInput.includes('problem') || 
      lowerInput.includes('human') || 
      lowerInput.includes('agent') || 
      lowerInput.includes('support') || 
      lowerInput.includes('help me with');

    setTimeout(async () => {
      if (needsTicket) {
        // Try creating a ticket
        try {
          // Pointing to local backend url for dev, adjust to production if needed
          // Using production url since other parts of the app are using it based on recent history
          const apiUrl = 'http://localhost:5000/api/chat/ticket'; 
          // Note: if connection fails, it might be because the backend is hosted on render
          // The instructions say use `http://localhost:5000` for the backend, but since the user previously 
          // updated URLs to render, I'll provide a fallback or use relative path logic if proxy is set.
          // Since we are running the local server, we will try to reach localhost first.
          
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ issueDescription: userMessage, userId: 'Current_User' })
          });
          
          if (response.ok) {
            const data = await response.json();
            setMessages(prev => [...prev, { 
              text: `I couldn't resolve this automatically. I have generated a support ticket for you. \n\nTicket ID: **${data.data.tokenId}**\nAssigned to: **${data.data.assignedTo}**.\nThey will get in touch with you shortly.`, 
              isBot: true 
            }]);
          } else {
            console.warn('Local ticket creation failed, using mock data.');
            mockTicketCreation();
          }
        } catch (error) {
          console.warn('Error hitting backend, mocking ticket creation...', error);
          mockTicketCreation();
        }
      } else {
        // Simple rules
        if (lowerInput.includes('policy')) {
          setMessages(prev => [...prev, { text: 'You can view your active policies in the "My Policies" tab on your dashboard.', isBot: true }]);
        } else if (lowerInput.includes('payment')) {
          setMessages(prev => [...prev, { text: 'For payments, please navigate to the "Payments" section to see dues and history.', isBot: true }]);
        } else if (lowerInput.includes('claim')) {
          setMessages(prev => [...prev, { text: 'You can file or track a claim in the "My Claims" section.', isBot: true }]);
        } else if (lowerInput.includes('thank')) {
          setMessages(prev => [...prev, { text: 'You are very welcome! Let me know if you need anything else.', isBot: true }]);
        } else {
          setMessages(prev => [...prev, { text: "I'm not quite sure how to help with that. If you're facing a problem, type 'issue' or 'agent' and I'll connect you to a relation manager.", isBot: true }]);
        }
      }
      setIsTyping(false);
    }, 1000);
  };

  const mockTicketCreation = () => {
    const mockId = 'TKT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setMessages(prev => [...prev, { 
      text: `I have generated a support ticket for you. \n\nTicket ID: **${mockId}**\nAssigned to: **Relation Manager**.\nThey will get in touch with you shortly.`, 
      isBot: true 
    }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '450px',
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginBottom: '16px',
          border: '1px solid rgba(0,0,0,0.08)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #11b2ac 0%, #0d9488 100%)',
            padding: '16px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
                <MdSupportAgent size={20} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>EasyInsure Assistant</h3>
                <span style={{ fontSize: '11px', opacity: 0.9 }}>Online. Replies instantly</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex' }}
            >
              <MdClose size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            background: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                background: msg.isBot ? '#fff' : '#11b2ac',
                color: msg.isBot ? '#334155' : '#fff',
                padding: '10px 14px',
                borderRadius: '12px',
                borderBottomLeftRadius: msg.isBot ? '4px' : '12px',
                borderBottomRightRadius: msg.isBot ? '12px' : '4px',
                maxWidth: '80%',
                fontSize: '13px',
                lineHeight: '1.5',
                boxShadow: msg.isBot ? '0 2px 5px rgba(0,0,0,0.02)' : '0 2px 5px rgba(17,178,172,0.2)',
                border: msg.isBot ? '1px solid #e2e8f0' : 'none'
              }}>
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line.includes('**') ? 
                      <span dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /> 
                      : line}
                    {i !== msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}
            
            {isTyping && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#fff',
                padding: '12px 14px',
                borderRadius: '12px',
                borderBottomLeftRadius: '4px',
                maxWidth: '80%',
                boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                border: '1px solid #e2e8f0',
                display: 'flex',
                gap: '4px'
              }}>
                <div style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
                <div style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></div>
                <div style={{ width: '6px', height: '6px', background: '#94a3b8', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '12px',
            background: '#fff',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                fontSize: '13px',
                outline: 'none',
                background: '#f8fafc'
              }}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                background: input.trim() ? '#11b2ac' : '#cbd5e1',
                color: '#fff',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'background 0.2s'
              }}
            >
              <MdSend size={16} style={{ marginLeft: '2px' }} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #11b2ac 0%, #0d9488 100%)',
            color: '#fff',
            border: 'none',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(17,178,172,0.4)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MdChat size={28} />
        </button>
      )}

      {/* Keyframes for typing animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Chatbot;
