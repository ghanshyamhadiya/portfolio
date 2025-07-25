import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, Check, X } from 'lucide-react';

// Custom Button component (kept for self-contained example)
const Button = memo(({ children, primary, className, onClick, type, disabled }) => {
  return (
    <motion.button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
        primary
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/20"
          : "bg-gray-800/50 text-white hover:bg-gray-700/50 border border-gray-700/50"
      } ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
});

// Status Message Component for form feedback
const StatusMessage = memo(({ status, message, onClose }) => {
  if (!status) return null;

  const isSuccess = status === 'success';
  const bgColor = isSuccess ? 'bg-green-500/20' : 'bg-red-500/20';
  const borderColor = isSuccess ? 'border-green-500/30' : 'border-red-500/30';
  const textColor = isSuccess ? 'text-green-300' : 'text-red-300';
  const iconBgColor = isSuccess ? 'bg-green-500' : 'bg-red-500';
  const Icon = isSuccess ? Check : X;

  return (
    <motion.div
      className={`mt-6 ${bgColor} border ${borderColor} rounded-lg p-4 flex items-center gap-3 relative`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${iconBgColor} rounded-full p-1 flex-shrink-0`}>
        <Icon className="text-white" size={18} />
      </div>
      <p className={`${textColor} text-sm`}>
        {message}
      </p>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </motion.div>
  );
});

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    console.log("EmailJS would be initialized here in a real app.");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSubmitStatus(null);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 5000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerChildren = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-gray-950 text-gray-100 overflow-hidden font-inter">
      {/* Consistent Background - Start */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle, consistent radial gradients */}
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-purple-600/10 filter blur-[100px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/10 filter blur-[100px]" />
        {/* Unified dot pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }} />
      </div>
      {/* Consistent Background - End */}

      <div className="container mt-8 mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Ready to collaborate or have a question? Reach out and I'll respond as soon as possible!
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Left Column: Send Message Form */}
          <motion.div className="p-4 md:p-6" variants={staggerChildren}>
            <motion.h3
              className="text-2xl font-bold text-white mb-6"
              variants={fadeInUp}
            >
              Send Me a Message
            </motion.h3>

            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fadeInUp}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-5 py-3 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-5 py-3 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-5 py-3 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500"
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full px-5 py-3 bg-gray-900/50 border border-gray-700/50 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 placeholder-gray-500 resize-none"
                ></textarea>
              </motion.div>
              <motion.div variants={fadeInUp}>
                <Button
                  type="submit"
                  primary={true}
                  disabled={isSubmitting}
                  className="w-full py-3"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      Send Message <Send className="ml-1 rotate-90" />
                    </>
                  )}
                </Button>
              </motion.div>
              <AnimatePresence>
                {submitStatus && (
                  <StatusMessage
                    status={submitStatus}
                    message={errorMessage || (submitStatus === 'success' ? "Thanks! Your message has been sent successfully. I'll respond soon." : "Something went wrong. Please try again.")}
                    onClose={() => setSubmitStatus(null)}
                  />
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Right Column: Let's Connect */}
          <motion.div
            className="relative overflow-hidden rounded-xl hidden md:flex flex-col items-center justify-center p-8 md:p-12 text-center bg-gradient-to-br from-purple-900/40 to-indigo-900/40"
            variants={fadeInUp}
          >
            <div className="absolute inset-0 z-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10"
                  style={{
                    width: Math.random() * 200 + 80,
                    height: Math.random() * 200 + 80,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.05, 0.1],
                  }}
                  transition={{
                    duration: Math.random() * 8 + 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            <div className="relative z-20">
              <motion.h3
                className="text-3xl font-bold text-white mb-6"
                variants={fadeInUp}
              >
                Let's Connect
              </motion.h3>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mb-6"></div>
              <p className="text-gray-300 mb-8 max-w-lg leading-relaxed">
                I'm currently available for freelance work or full-time positions.
                If you have a project that you want to get started or need help with
                something, feel free to reach out.
              </p>

              <div className="space-y-4 mb-8">
                <motion.a
                  href="mailto:ghanshyamhadiya013@gmail.com"
                  className="flex items-center justify-center gap-3 text-lg text-purple-300 hover:text-purple-200 transition-colors group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <Mail size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span>ghanshyamhadiya013@gmail.com</span>
                  <ArrowRight size={20} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </motion.a>
              </div>

              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="rounded-full p-1 bg-gradient-to-r from-purple-600 to-indigo-600">
                  <div className="bg-gray-900 rounded-full p-5">
                    <motion.svg
                      className="w-10 h-10 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </motion.svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;