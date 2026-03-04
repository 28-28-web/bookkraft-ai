'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
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
            setStatus('Please fill in all required fields.');
            return;
        }
        // For now, open mailto link as a simple solution
        const subject = encodeURIComponent(form.subject || 'BookKraft AI Contact');
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
        );
        window.location.href = `mailto:hello@bookkraftai.com?subject=${subject}&body=${body}`;
        setStatus('Opening your email client...');
    }

    return (
        <>
            <div className="legal-page">
                <div className="legal-container" style={{ maxWidth: 640 }}>
                    <h1>Contact Us</h1>
                    <p style={{ color: '#666', marginBottom: '2rem' }}>
                        Have a question, feature request, or need help? We&apos;d love to hear from you.
                    </p>

                    {status && (
                        <div style={{
                            padding: '12px 16px',
                            borderRadius: 8,
                            background: status.includes('required') ? '#fff3f3' : '#f0fdf4',
                            color: status.includes('required') ? '#c53030' : '#166534',
                            marginBottom: '1.5rem',
                            fontSize: '0.9rem'
                        }}>
                            {status}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="form-group">
                            <label htmlFor="contact-name">Name *</label>
                            <input
                                id="contact-name"
                                name="name"
                                type="text"
                                placeholder="Your name"
                                value={form.name}
                                onChange={handleChange}
                                className="auth-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-email">Email *</label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className="auth-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-subject">Subject</label>
                            <input
                                id="contact-subject"
                                name="subject"
                                type="text"
                                placeholder="What is this about?"
                                value={form.subject}
                                onChange={handleChange}
                                className="auth-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contact-message">Message *</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Tell us how we can help..."
                                value={form.message}
                                onChange={handleChange}
                                className="auth-input"
                                rows={6}
                                style={{ resize: 'vertical' }}
                                required
                            />
                        </div>

                        <button type="submit" className="cta-btn" style={{ width: '100%', marginTop: '0.5rem' }}>
                            Send Message
                        </button>
                    </form>

                    <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#faf9f7', borderRadius: 12, textAlign: 'center' }}>
                        <p style={{ fontWeight: 600, marginBottom: 8 }}>Or email us directly</p>
                        <a href="mailto:hello@bookkraftai.com" style={{ color: '#b8860b', fontWeight: 500 }}>
                            hello@bookkraftai.com
                        </a>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
