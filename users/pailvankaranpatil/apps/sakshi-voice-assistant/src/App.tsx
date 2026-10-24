import { useState, useEffect, useRef, useCallback } from 'react';
import './styles.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'sakshi';
  timestamp: Date;
}

// Speech Recognition types
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: 'नमस्कार! मी Sakshi, तुमची voice assistant. मला काहीही विचारा! 🙏',
      sender: 'sakshi',
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [language, setLanguage] = useState<'mr-IN' | 'en-IN'>('mr-IN');
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdRef = useRef(1);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimText]);

  const addMessage = useCallback((text: string, sender: 'user' | 'sakshi') => {
    setMessages((prev) => [
      ...prev,
      { id: msgIdRef.current++, text, sender, timestamp: new Date() },
    ]);
  }, []);

  const speak = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [language]);

  const generateResponse = useCallback((input: string): string => {
    const lower = input.toLowerCase();
    const isMarathi = /[\u0900-\u097F]/.test(input);

    if (/namaskar|नमस्कार|hello|hi|hey|नमस्ते/i.test(lower)) {
      return isMarathi
        ? 'नमस्कार! मी Sakshi. मी तुम्हाला कशी मदत करू शकते?'
        : 'Hello! I\'m Sakshi. How can I help you today?';
    }
    if (/kasa|kashi|कसं|कशी|केसा|how are you/i.test(lower)) {
      return isMarathi
        ? 'मी छान आहे, धन्यवाद! तुम्ही कसे आहात? 😊'
        : 'I\'m doing great, thank you! How are you? 😊';
    }
    if (/वेळ|time|टाइम|किती वाजले/i.test(lower)) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(isMarathi ? 'mr-IN' : 'en-IN', {
        hour: '2-digit', minute: '2-digit',
      });
      return isMarathi
        ? `आत्ता ${timeStr} वाजले आहेत.`
        : `It's currently ${timeStr}.`;
    }
    if (/तारीख|date|डेट|आज|काय दिवस/i.test(lower)) {
      const now = new Date();
      const dateStr = now.toLocaleDateString(isMarathi ? 'mr-IN' : 'en-IN', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
      return isMarathi
        ? `आज ${dateStr} आहे.`
        : `Today is ${dateStr}.`;
    }
    if (/नाव|name|तुला काय|who are you|काय नाव/i.test(lower)) {
      return isMarathi
        ? 'माझे नाव Sakshi आहे! मी तुमची voice assistant आहे. 🌸'
        : 'My name is Sakshi! I\'m your voice assistant. 🌸';
    }
    if (/धन्यवाद|thanks|thank you|मेहेरबानी/i.test(lower)) {
      return isMarathi
        ? 'तुमचे स्वागत आहे! आणखी काही मदत हवी असल्यास सांगा. 😊'
        : 'You\'re welcome! Let me know if you need anything else. 😊';
    }
    if (/bye|बाय|चल|जातो|good night|शुभ रात्री/i.test(lower)) {
      return isMarathi
        ? 'पुन्हा भेटू! तुमचा दिवस शुभ जावो! 👋'
        : 'See you again! Have a great day! 👋';
    }
    if (/joke|विनोद|hasव|हसव|funny|मजेशीर/i.test(lower)) {
      const jokes = isMarathi
        ? [
            'एकदा काय झालं... Teacher: तुझं नाव काय? Student: Sakshi! Teacher: अरे, माझं नाव विचारलं! 😄',
            'Doctor: तुम्हाला रोज व्यायाम करा. Patient: पण डॉक्टर, मी remote चालवतो तो व्यायाम नाही का? 😂',
            'Teacher: पाण्याचे रासायनिक सूत्र काय? Student: H2O! Teacher: थंड पाण्याचे? Student: HIce! 😄',
          ]
        : [
            'Why did the developer go broke? Because they used up all their cache! 😄',
            'I told my computer I needed a break. Now it won\'t stop sending me Kit-Kat ads! 😂',
            'Why do programmers prefer dark mode? Because light attracts bugs! 😄',
          ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    if (/weather|हवामान|पाऊस|गार|उष्ण/i.test(lower)) {
      return isMarathi
        ? 'मला सध्या real-time हवामान माहिती नाही, पण तुम्ही yourphone.com/weather वर पाहू शकता! 🌤️'
        : 'I don\'t have real-time weather data right now, but you can check your favorite weather app! 🌤️';
    }
    if (/काय करू|what can you|help|मदत|features/i.test(lower)) {
      return isMarathi
        ? 'मी हे करू शकते:\n🕐 वेळ आणि तारीख सांगणे\n😄 विनोद सांगणे\n💬 तुमच्याशी गप्पा मारणे\n🎤 तुमचे बोलणे ऐकणे\n\nमला काहीही विचारा!'
        : 'I can do:\n🕐 Tell time and date\n😄 Tell jokes\n💬 Have conversations\n🎤 Listen to your voice\n\nAsk me anything!';
    }
    if (/love|प्रेम|छान|सुंदर|beautiful|awesome|great/i.test(lower)) {
      return isMarathi
        ? 'खूप खूप धन्यवाद! तुम्ही खूप छान आहात! 💖'
        : 'Thank you so much! You\'re amazing too! 💖';
    }
    return isMarathi
      ? `तुम्ही "${input}" असं विचारलंत. मी अजून शिकत आहे, पण मी तुम्हाला वेळ, तारीख, विनोद यांमध्ये मदत करू शकते! 🌟`
      : `You said "${input}". I'm still learning, but I can help with time, date, jokes, and more! 🌟`;
  }, []);

  const handleUserInput = useCallback((text: string) => {
    addMessage(text, 'user');
    const response = generateResponse(text);
    setTimeout(() => {
      addMessage(response, 'sakshi');
      speak(response.replace(/[🙏😊😄😂🌸👋🌤️💖🌟🎤💬🕐]/g, ''));
    }, 500);
  }, [addMessage, generateResponse, speak]);

  const initRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onstart = () => {
      setIsListening(true);
      setInterimText('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      setInterimText(interim);
      if (final) {
        setInterimText('');
        handleUserInput(final.trim());
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setInterimText('');
      if (event.error === 'not-allowed') {
        addMessage('माफ करा, microphone access denied आहे. Browser settings मध्ये allow करा.', 'sakshi');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimText('');
    };

    return recognition;
  }, [language, handleUserInput, addMessage]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      const recognition = initRecognition();
      if (recognition) {
        recognitionRef.current = recognition;
        try {
          recognition.start();
        } catch (e) {
          console.error('Recognition start error:', e);
        }
      }
    }
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement;
    if (input.value.trim()) {
      handleUserInput(input.value.trim());
      input.value = '';
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'mr-IN' ? 'en-IN' : 'mr-IN'));
  };

  return (
    <div className="app-container">
      <div className="bg-gradient" />

      <header className="header">
        <div className="header-left">
          <div className="avatar">
            <span className="avatar-text">S</span>
            <div className={`avatar-ring ${isSpeaking ? 'speaking' : ''}`} />
          </div>
          <div>
            <h1 className="title">Sakshi</h1>
            <p className="subtitle">
              {isListening ? '🎤 ऐकत आहे...' : isSpeaking ? '🔊 बोलत आहे...' : '● तयार आहे'}
            </p>
          </div>
        </div>
        <button className="lang-toggle" onClick={toggleLanguage}>
          {language === 'mr-IN' ? 'EN' : 'मरा'}
        </button>
      </header>

      <div className="chat-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-bubble">
              <p className="message-text">{msg.text}</p>
              <span className="message-time">
                {msg.timestamp.toLocaleTimeString(language === 'mr-IN' ? 'mr-IN' : 'en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}

        {interimText && (
          <div className="message user">
            <div className="message-bubble interim">
              <p className="message-text">{interimText}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="controls-area">
        <div className={`voice-orb ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}>
          <button className="mic-button" onClick={toggleListening} disabled={!supported}>
            {isListening ? (
              <div className="wave-container">
                <div className="wave wave-1" />
                <div className="wave wave-2" />
                <div className="wave wave-3" />
                <div className="wave wave-4" />
                <div className="wave wave-5" />
              </div>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </button>
        </div>

        {!supported && (
          <p className="not-supported">
            तुमच्या browser मध्ये Speech Recognition support नाही. Chrome वापरा.
          </p>
        )}
      </div>

      <form className="text-input-form" onSubmit={handleTextSubmit}>
        <input
          type="text"
          placeholder={language === 'mr-IN' ? 'इथे टाइप करा...' : 'Type here...'}
          className="text-input"
        />
        <button type="submit" className="send-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default App;
