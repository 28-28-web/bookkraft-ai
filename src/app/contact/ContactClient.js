'use client';

import { useState } from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function ContactClient() {
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

            {/* SEO Content */}
            <section style={{
                maxWidth: 560,
                margin: '0 auto',
                padding: '0 24px 80px',
            }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    Contact Book Kraft AI
                </h2>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 20 }}>
                    Have a question about our tools? Found a bug? Want to suggest a feature? We read every message and respond personally — no automated replies.
                </p>

                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    What You Can Reach Us About
                </h2>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 20 }}>
                    Tool issues or unexpected errors. Feature requests or suggestions. Questions about pricing or your account. General feedback about Book Kraft AI. We&apos;re a small team building tools for authors and editors — so your feedback actually shapes what we build next.
                </p>

                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    What to Expect
                </h2>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 20 }}>
                    We typically respond within 1-2 business days. If your question is urgent, mention it in the subject line and we&apos;ll prioritize it.
                </p>

                <p style={{ color: '#666', lineHeight: 1.7 }}>
                    Not ready to reach out yet? Browse our{' '}
                    <Link href="/free-tools" style={{ color: '#b8860b', fontWeight: 500, textDecoration: 'none' }}>
                        free tools
                    </Link>
                    {' '}or check the{' '}
                   <a href="https://blog.bookkraftai.com" style={{ color: '#b8860b', fontWeight: 500, textDecoration: 'none' }}>
                     blog
                   </a>
                    {' '}for answers to common questions.
                </p>

                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12, marginTop: 32 }}>
                    What we can help with
                </h2>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 12 }}>
                    <strong style={{ color: '#333' }}>Tool errors and unexpected behavior</strong> — if something didn&apos;t work the way you expected, tell us what you uploaded and what happened. We can usually reproduce the issue and fix it.
                </p>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 12 }}>
                    <strong style={{ color: '#333' }}>Questions about your specific EPUB</strong> — if your file is getting rejected by KDP or Apple Books and you&apos;re not sure why, describe the error message you got. We&apos;ll point you to the right check or tool.
                </p>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 12 }}>
                    <strong style={{ color: '#333' }}>Feature requests</strong> — we build what authors actually need. If there&apos;s a formatting step you keep doing manually that should be a tool, we want to hear it.
                </p>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 24 }}>
                    <strong style={{ color: '#333' }}>Account and billing</strong> — credit balance issues, payment questions, or anything related to your subscription. Include your account email so we can look it up.
                </p>

                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    What we can&apos;t help with
                </h2>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 12 }}>
                    Writing or editing your book content — we handle the technical formatting side, not the manuscript itself.
                </p>
                <p style={{ color: '#666', lineHeight: 1.7, marginBottom: 24 }}>
                    KDP account suspensions or policy violations — those go through Amazon&apos;s author support directly.
                </p>

                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    Response time
                </h2>
                <p style={{ color: '#666', lineHeight: 1.7 }}>
                    We typically reply within 1–2 business days. For anything urgent — a launch deadline, a time-sensitive rejection — say so in the subject line and we&apos;ll prioritize it. We don&apos;t use automated replies, so the response you get is from a real person who read your message.
                </p>
            </section>

            <Footer />
        </>
    );
}