import { useState } from "react";
import { FaEnvelope, FaPhone, FaLocationDot, FaPaperPlane } from "react-icons/fa6";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name.trim()) {
            tempErrors.name = "Name is required";
        } else if (formData.name.trim().length < 3) {
            tempErrors.name = "Name must be at least 3 characters";
        }

        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Please enter a valid email address";
        }

        if (!formData.subject.trim()) {
            tempErrors.subject = "Subject is required";
        } else if (formData.subject.trim().length < 4) {
            tempErrors.subject = "Subject must be at least 4 characters";
        }

        if (!formData.message.trim()) {
            tempErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            tempErrors.message = "Message must be at least 10 characters";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitted(true);
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
                setTimeout(() => setSubmitted(false), 5000);
            }, 1200);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
                    Get in <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
                </h1>
                <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                    Have questions about our premium products or need help? Send us a message and our support team will respond within 24 hours.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Contact Information */}
                <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
                        
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-violet-600/10 border border-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center shrink-0">
                                    <FaEnvelope className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-sm font-medium">Email Us</p>
                                    <p className="text-white font-semibold mt-1">support@eshop.com</p>
                                    <p className="text-zinc-500 text-xs mt-0.5">24/7 client response desk</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-cyan-600/10 border border-cyan-500/20 text-cyan-400 rounded-2xl flex items-center justify-center shrink-0">
                                    <FaPhone className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-sm font-medium">Call Us</p>
                                    <p className="text-white font-semibold mt-1">+91 8848 100 200</p>
                                    <p className="text-zinc-500 text-xs mt-0.5">Mon - Fri: 9:00 AM to 6:00 PM</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-fuchsia-600/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-2xl flex items-center justify-center shrink-0">
                                    <FaLocationDot className="text-xl" />
                                </div>
                                <div>
                                    <p className="text-zinc-400 text-sm font-medium">Visit Us</p>
                                    <p className="text-white font-semibold mt-1">Giga Tower, InfoPark Phase II</p>
                                    <p className="text-zinc-500 text-xs mt-0.5">Kochi, Kerala, India - 682030</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-zinc-800/80">
                        <div className="bg-gradient-to-br from-violet-600/10 to-cyan-500/5 border border-violet-500/10 rounded-2xl p-5 text-center">
                            <span className="text-violet-400 text-sm font-semibold uppercase tracking-wider block mb-1">Response Guarantee</span>
                            <p className="text-zinc-400 text-xs">We typically respond to all online queries in less than 2 hours.</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                    {submitted && (
                        <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 z-10 animate-fade-in text-center">
                            <div className="w-20 h-20 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce">
                                🎉
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-zinc-400 max-w-sm">
                                Thank you for reaching out. We have received your message and will be in touch shortly!
                            </p>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-zinc-400 mb-2 font-medium">Your Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Jane Doe"
                                    className={`w-full bg-zinc-800/50 border ${errors.name ? "border-red-500/50 focus:border-red-500" : "border-zinc-700/60 focus:border-violet-500"} rounded-2xl px-5 py-4 outline-none transition-all text-white placeholder-zinc-500`}
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-2.5 ml-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm text-zinc-400 mb-2 font-medium">Your Email *</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="jane@example.com"
                                    className={`w-full bg-zinc-800/50 border ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-zinc-700/60 focus:border-violet-500"} rounded-2xl px-5 py-4 outline-none transition-all text-white placeholder-zinc-500`}
                                />
                                {errors.email && <p className="text-red-400 text-xs mt-2.5 ml-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2 font-medium">Subject *</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="How can we help?"
                                className={`w-full bg-zinc-800/50 border ${errors.subject ? "border-red-500/50 focus:border-red-500" : "border-zinc-700/60 focus:border-violet-500"} rounded-2xl px-5 py-4 outline-none transition-all text-white placeholder-zinc-500`}
                            />
                            {errors.subject && <p className="text-red-400 text-xs mt-2.5 ml-1">{errors.subject}</p>}
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-400 mb-2 font-medium">Your Message *</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Write your detailed description here..."
                                className={`w-full bg-zinc-800/50 border ${errors.message ? "border-red-500/50 focus:border-red-500" : "border-zinc-700/60 focus:border-violet-500"} rounded-3xl px-5 py-4 outline-none transition-all text-white resize-y placeholder-zinc-500`}
                            />
                            {errors.message && <p className="text-red-400 text-xs mt-2.5 ml-1">{errors.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 text-white font-bold px-8 py-4.5 rounded-3xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 shrink-0"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <FaPaperPlane /> Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
