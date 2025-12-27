import React, { useState } from 'react';
import {
    Phone,
    Mail,
    MapPin,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    Send,
    HelpCircle
} from 'lucide-react';

export default function Support() {
    const [openFaq, setOpenFaq] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState(null); // success | error | null

    const faqs = [
        {
            question: "How do I file a new insurance claim?",
            answer: "You can file a new claim by navigating to the 'File New Claims' section in your dashboard. Follow the step-by-step wizard to provide incident details and upload necessary documents."
        },
        {
            question: "How long does it take to process a claim?",
            answer: "Most standard claims are processed within 3-5 business days. Complex claims requiring additional verification may take up to 2 weeks. You can track status in 'Track Claims'."
        },
        {
            question: "Can I update my policy coverage mid-term?",
            answer: "Yes, you can request policy updates through the 'Manage Policies' section. Note that changes to coverage may affect your premium amount."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit/debit cards, net banking, and UPI for premium payments. Auto-debit facilities are also available."
        },
        {
            question: "How do I reset my password?",
            answer: "If you are logged in, go to Settings. If you are locked out, use the 'Forgot Password' link on the login page to receive a reset link via email."
        }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setFormStatus('success');
        setTimeout(() => setFormStatus(null), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto space-y-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold text-green-800">Help & Support Center</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Have a question? We're here to help. browse our FAQs, contact our support team, or send us a message directly.
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                            <Phone className="w-7 h-7" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">Call Us</h3>
                        <p className="text-gray-500 mt-1">Mon-Fri, 9am - 6pm</p>
                        <p className="text-green-700 font-semibold mt-2 text-lg">+1 (800) 123-4567</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                            <Mail className="w-7 h-7" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">Email Support</h3>
                        <p className="text-gray-500 mt-1">We reply within 24 hours</p>
                        <p className="text-blue-700 font-semibold mt-2 text-lg">support@insurai.com</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                            <MapPin className="w-7 h-7" />
                        </div>
                        <h3 className="font-bold text-lg text-gray-800">Headquarters</h3>
                        <p className="text-gray-500 mt-1">Come visit our office</p>
                        <p className="text-purple-700 font-semibold mt-2 text-lg">123 Insurance Blvd, NY</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* FAQ Section */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-50">
                        <div className="flex items-center gap-3 mb-6">
                            <HelpCircle className="w-8 h-8 text-green-600" />
                            <h2 className="text-2xl font-bold text-gray-800">Frequently Asked Questions</h2>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 transition text-left"
                                    >
                                        <span className="font-semibold text-gray-700">{faq.question}</span>
                                        {openFaq === index ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                                    </button>
                                    {openFaq === index && (
                                        <div className="p-4 bg-white text-gray-600 border-t border-gray-100 animate-fadeIn">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-3xl shadow-lg p-8 border border-green-50">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="w-8 h-8 text-green-600" />
                            <h2 className="text-2xl font-bold text-gray-800">Send us a Message</h2>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    rows="4"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-700 shadow-md hover:shadow-xl transition flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                            {formStatus === 'success' && (
                                <p className="text-center text-green-600 font-semibold bg-green-50 p-2 rounded-lg">Message sent successfully! We'll allow get back to you soon.</p>
                            )}
                        </form>
                    </div>
                </div>

                {/* AI Bot Promo */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Need Instant Answers?</h2>
                        <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-8">
                            Our AI-powered assistant is available 24/7 to answer your questions about policies, claims, and coverage instantly.
                        </p>
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-white font-semibold">
                            <span>👇 Click the chat bubble in the bottom right corner!</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
