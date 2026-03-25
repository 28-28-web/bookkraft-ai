'use client';

import { useState } from 'react';
import Footer from '@/components/Footer';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            setStatus('error');
            return;
        }
        const subject = encodeURIComponent(form.subject || 'BookKraft AI Contact');
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:hello@bookkraftai.com?subject=${subject}&body=${body}`;
        setStatus('success');
    }
    return (
        <>
            <div style={{
                maxWidth: 560,
                margin: '0 auto',
                padding: '80px 24px 60px',
                minHeight: '70vh'
            }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: 8
                }}>Contact Us</h1>
                <p style={{
                    color: '#666',
                    marginBottom: 32,
                    fontSize: '1rem',
                    lineHeight: 1.6
                }}>
                    Have a question, feature request, or need help? We&apos;d love to hear from you.
                </p>

                {status === 'error' && (
                    <div style={{
                        padding: '12px 16px',
                        borderRadius: 8,
                        background: '#fff3f3',
                        color: '#c53030',
                        marginBottom: 20,
                        fontSize: '0.9rem'
                    }}>
                        Please fill in all required fields.
                    </div>
                )}

                {status === 'success' && (
                    <div style={{
                        padding: '12px 16px',
                        borderRadius: 8,
                        background: '#f0fdf4',
                        color: '#166534',
                        marginBottom: 20,
                        fontSize: '0.9rem'
                    }}>
                        Opening your email client...
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{
                            display: 'block',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: '#333',
                            marginBottom: 6
                        }}>Name *</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: '1rem',
                                background: '#faf9f7',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{
                            display: 'block',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: '#333',
                            marginBottom: 6
                        }}>Email *</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: '1rem',
                                background: '#faf9f7',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{
                            display: 'block',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: '#333',
                            marginBottom: 6
                        }}>Subject</label>
                        <input
                            name="subject"
                            type="text"
                            placeholder="What is this about?"
                            value={form.subject}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: '1rem',
                                background: '#faf9f7',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label style={{
                            display: 'block',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            color: '#333',
                            marginBottom: 6
                        }}>Message *</label>
                        <textarea
                            name="message"
                            placeholder="Tell us how we can help..."
                            value={form.message}
                            onChange={handleChange}
                            rows={6}
                            required
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                fontSize: '1rem',
                                background: '#faf9f7',
                                outline: 'none',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button type="submit" style={{
                        width: '100%',
                        padding: '14px 24px',
                        background: '#1a1a1a',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }}
                        onMouseEnter={e => e.target.style.background = '#333'}
                        onMouseLeave={e => e.target.style.background = '#1a1a1a'}
                    >
                        Send Message
                    </button>
                </form>

                <div style={{
                    marginTop: 40,
                    padding: 24,
                    background: '#faf9f7',
                    borderRadius: 12,
                    textAlign: 'center'
                }}>
                    <p style={{ fontWeight: 600, marginBottom: 8, color: '#333' }}>Or email us directly</p>
                    <a href="mailto:hello@bookkraftai.com" style={{
                        color: '#b8860b',
                        fontWeight: 500,
                        textDecoration: 'none'
                    }}>
                        hello@bookkraftai.com
                    </a>
                </div>
            </div>
            <Footer />
        </>
    );
}
