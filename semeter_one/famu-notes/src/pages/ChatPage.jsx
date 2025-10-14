import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, MessageCircle, User, Users } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, serverTimestamp, doc, setDoc, deleteDoc } from 'firebase/firestore';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const userDocRef = useRef(null);

  // Načti username z localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('chatUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsUsernameSet(true);
    }
  }, []);

  // Track user presence (online status)
  useEffect(() => {
    if (!isUsernameSet || !username) return;

    // Create unique user ID
    const userId = `${username}_${Date.now()}`;
    userDocRef.current = doc(db, 'onlineUsers', userId);

    // Set user as online
    const setOnline = async () => {
      try {
        await setDoc(userDocRef.current, {
          username: username,
          lastSeen: serverTimestamp(),
        });
      } catch (error) {
        console.error('Error setting online status:', error);
      }
    };

    setOnline();

    // Update presence every 30 seconds
    const interval = setInterval(setOnline, 30000);

    // Cleanup - remove user from online list
    return () => {
      clearInterval(interval);
      if (userDocRef.current) {
        deleteDoc(userDocRef.current).catch(console.error);
      }
    };
  }, [isUsernameSet, username]);

  // Listen to online users
  useEffect(() => {
    if (!isUsernameSet) return;

    const onlineUsersRef = collection(db, 'onlineUsers');
    const unsubscribe = onSnapshot(onlineUsersRef, (snapshot) => {
      const users = [];
      const uniqueUsernames = new Set();
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only add unique usernames
        if (!uniqueUsernames.has(data.username)) {
          uniqueUsernames.add(data.username);
          users.push(data.username);
        }
      });
      
      setOnlineUsers(users.sort());
    });

    return () => unsubscribe();
  }, [isUsernameSet]);

  // Real-time listener pro zprávy
  useEffect(() => {
    if (!isUsernameSet) return;

    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(100));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      // Reverse to show oldest first
      setMessages(msgs.reverse());
    });

    return () => unsubscribe();
  }, [isUsernameSet]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSetUsername = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('chatUsername', username.trim());
      setIsUsernameSet(true);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage.trim(),
        username: username,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Chyba při odesílání zprávy:', error);
      alert('Nepodařilo se odeslat zprávu. Zkontroluj připojení.');
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  };

  // Username setup screen
  if (!isUsernameSet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg border-2 border-gray-900 p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-900" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">FAMU Chat</h2>
            <p className="text-gray-600">Zadej svoje jméno pro vstup do chatu</p>
          </div>
          <form onSubmit={handleSetUsername}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Tvoje jméno..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none mb-4"
              maxLength={20}
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Vstoupit do chatu
            </button>
          </form>
          <Link
            to="/"
            className="block text-center mt-4 text-gray-600 hover:text-gray-900"
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-gray-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Zpět na hlavní stránku
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <MessageCircle className="w-10 h-10" />
              <div>
                <h1 className="text-2xl font-bold">💬 FAMU Chat</h1>
                <p className="text-gray-200 text-sm">Real-time komunikace</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-lg">
                <Users className="w-4 h-4" />
                <span>{onlineUsers.length} online</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4" />
                <span>{username}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex gap-4">
        {/* Online Users Sidebar */}
        <div className="hidden md:block w-64 bg-white rounded-lg shadow-lg border-2 border-gray-900 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-900" />
            <h3 className="font-bold text-gray-900">Online ({onlineUsers.length})</h3>
          </div>
          <div className="space-y-2">
            {onlineUsers.map((user, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  user === username ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium truncate">{user}</span>
                {user === username && (
                  <span className="text-xs opacity-75">(ty)</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 bg-white rounded-lg shadow-lg border-2 border-gray-900 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Zatím žádné zprávy. Buď první kdo něco napíše!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.username === username
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {msg.username}
                      </span>
                      <span className={`text-xs ${
                        msg.username === username ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="break-words">{msg.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t-2 border-gray-900 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Napiš zprávu..."
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none"
                disabled={isSending}
              />
              <button
                type="submit"
                disabled={isSending || !newMessage.trim()}
                className="px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Odeslat
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Online Count */}
        <div className="md:hidden fixed bottom-24 right-4 bg-gray-900 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">{onlineUsers.length}</span>
        </div>
      </main>
    </div>
  );
}

export default ChatPage;
