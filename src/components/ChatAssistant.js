'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CHAT_TREE } from '@/lib/chatTree';

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentNode, setCurrentNode] = useState('root');
    const messagesEndRef = useRef(null);
    const router = useRouter();
    const [visited, setVisited] = useState(false);

    // Initialize on mount
    useEffect(() => {
        const savedNode = sessionStorage.getItem('bk_chat_node');
        const savedMessages = sessionStorage.getItem('bk_chat_messages');
        const hasVisited = localStorage.getItem('bk_chat_visited');

        if (hasVisited) setVisited(true);

        if (savedNode && savedMessages) {
            setCurrentNode(savedNode);
            try { setMessages(JSON.parse(savedMessages)); } catch { /* ignore */ }
        } else {
            const node = CHAT_TREE.root;
            setMessages([{ role: 'assistant', content: node.message, options: node.options }]);
        }
    }, []);

    // Save state
    useEffect(() => {
        if (messages.length > 0) {
            sessionStorage.setItem('bk_chat_node', currentNode);
            sessionStorage.setItem('bk_chat_messages', JSON.stringify(messages));
        }
    }, [currentNode, messages]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function handleOpen() {
        setIsOpen(true);
        if (!visited) {
            setVisited(true);
            localStorage.setItem('bk_chat_visited', 'true');
        }
    }

    function handleOptionClick(option) {
        // Add user message
        const newMessages = [...messages, { role: 'user', content: option.label }];

        if (option.toolLink) {
            setMessages(newMessages);
            router.push(option.toolLink);
            setIsOpen(false);
            return;
        }

        if (option.next) {
            const node = CHAT_TREE[option.next];
            if (node) {
                newMessages.push({ role: 'assistant', content: node.message, options: node.options });
                setCurrentNode(option.next);
            }
        }

        setMessages(newMessages);
    }

    function handleStartOver() {
        const node = CHAT_TREE.root;
        setMessages([{ role: 'assistant', content: node.message, options: node.options }]);
        setCurrentNode('root');
        sessionStorage.removeItem('bk_chat_node');
        sessionStorage.removeItem('bk_chat_messages');
    }

    const lastMessage = messages[messages.length - 1];

    return (
        <>
            {/* Floating button */}
            <button className="chat-fab" onClick={handleOpen} aria-label="Chat assistant">
                📖 Need help?
                {!visited && <span className="chat-fab-dot" />}
            </button>

            {/* Chat panel */}
            {isOpen && (
                <div className="chat-panel">
                    <div className="chat-header">
                        <div className="chat-header-info">
                            <span className="chat-avatar">📖</span>
                            <span className="chat-header-title">BookKraft Assistant</span>
                        </div>
                        <div className="chat-header-actions">
                            <button className="chat-start-over" onClick={handleStartOver}>Start Over</button>
                            <button className="chat-close" onClick={() => setIsOpen(false)}>✕</button>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`chat-bubble chat-${msg.role}`}>
                                {msg.content.split('\n').map((line, j) => (
                                    <p key={j}>{line}</p>
                                ))}
                            </div>
                        ))}

                        {/* Options for last assistant message */}
                        {lastMessage?.role === 'assistant' && lastMessage.options && (
                            <div className="chat-options">
                                {lastMessage.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        className={`chat-option-btn ${opt.toolLink ? 'chat-option-cta' : ''}`}
                                        onClick={() => handleOptionClick(opt)}
                                    >
                                        {opt.label}
                                        {opt.toolPrice && <span className="chat-price-badge">{opt.toolPrice}</span>}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            )}
        </>
    );
}
