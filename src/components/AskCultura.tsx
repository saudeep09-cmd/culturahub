import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AskCultura() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Cultura, your AI cultural assistant. Ask me about historical events, art movements, cultural facts, or request recommendations for exhibitions and podcasts!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    const responses = [
      "That's a fascinating topic! The Renaissance period (14th-17th century) was marked by a cultural rebirth in Europe, with masters like Leonardo da Vinci and Michelangelo creating timeless works.",
      "I'd recommend checking out the 'Art History Babes' podcast for engaging discussions about art movements, or visit your local museum's contemporary art section.",
      "Did you know that the Impressionist movement started as a rebellion against traditional academic painting? Artists like Monet and Renoir painted outdoors to capture natural light.",
      "For cultural events, I suggest looking for gallery openings, museum exhibitions, and cultural festivals in your area. Many cities have monthly art walks too!",
      "The Baroque period (1600-1750) was characterized by dramatic lighting, rich colors, and emotional intensity. Think Caravaggio's chiaroscuro technique!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cultural-red-500 to-cultural-gold-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 animate-float"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-xl shadow-2xl border border-cultural-beige-200 z-50 flex flex-col animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-cultural-red-500 to-cultural-gold-500 text-white p-4 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-semibold">Ask Cultura</h3>
            <p className="text-xs opacity-90">Your AI Cultural Assistant</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-cultural-blue-500' 
                  : 'bg-gradient-to-r from-cultural-red-500 to-cultural-gold-500'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-cultural-blue-500 text-white'
                  : 'bg-cultural-beige-100 text-cultural-blue-900'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-cultural-beige-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about art, history, culture..."
            className="flex-1 p-2 border border-cultural-beige-300 rounded-lg focus:ring-2 focus:ring-cultural-red-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-cultural-red-500 to-cultural-gold-500 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}