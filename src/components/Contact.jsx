import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, Check, X, Code } from 'lucide-react'; // Switched to lucide-react for icons

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
  const Icon = isSuccess ? Check : X; // Using Lucide Check and X

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
        <X size={16} /> {/* Using Lucide X */}
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
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Dummy emailjs init to avoid runtime error in Canvas without actual EmailJS setup
  // In a real application, replace this with your actual emailjs.init('YOUR_PUBLIC_KEY');
  useEffect(() => {
    console.log("EmailJS would be initialized here in a real app.");
    // emailjs.init('BpiqXCZe24GyY1hc9'); // Uncomment and use your public key
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
    setSubmitStatus(null); // Clear previous status

    const templateParams = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    try {
      // Simulate EmailJS send or replace with actual EmailJS call
      // await emailjs.send('service_qig13fs', 'template_huvdi7a', templateParams, 'BpiqXCZe24GyY1hc9');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form

    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send your message. Please try again later.');
    } finally {
      setIsSubmitting(false);
      // Automatically clear status message after a few seconds
      setTimeout(() => {
        setSubmitStatus(null);
        setErrorMessage('');
      }, 5000);
    }
  };

  // Animation variants
  const sectionVariants = {
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-20 bg-gray-900 text-gray-100 overflow-hidden font-inter">
      {/* Background elements for subtle glow and pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-indigo-600/10 filter blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 rounded-full bg-purple-600/10 filter blur-[120px]" />
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '-20px -20px',
          opacity: 0.1,
          transform: 'perspective(1000px) rotateX(20deg) translateY(-50px)', // Less aggressive perspective
          transformOrigin: 'center top'
        }} />
      </div>

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
          variants={sectionVariants}
        >
          {/* Left Column: Send Message Form */}
          <motion.div
            className="p-4 md:p-6"
            variants={staggerChildren}
          >
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
                  rows={5} // Adjusted rows for compactness
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
                      Send Message <Send className="ml-1 rotate-90" /> {/* Using Lucide Send */}
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
            className="relative overflow-hidden rounded-xl hidden md:flex flex-col items-center justify-center p-8 md:p-12 text-center bg-gradient-to-br from-purple-900/40 to-indigo-900/40" // Applied gradient directly
            variants={fadeInUp} // Changed from fadeInLeft for consistency in animations
          >
            {/* Abstract animated background elements */}
            <div className="absolute inset-0 z-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-gradient-to-r from-purple-600/10 to-indigo-600/10" // Reduced opacity for subtlety
                  style={{
                    width: Math.random() * 200 + 80, // Smaller elements
                    height: Math.random() * 200 + 80,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1], // Less aggressive scale
                    opacity: [0.1, 0.05, 0.1], // Even more subtle opacity changes
                  }}
                  transition={{
                    duration: Math.random() * 8 + 8, // Slightly faster movement
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

              {/* Contact Info Items (Simplified & Prominent) */}
              <div className="space-y-4 mb-8">
                <motion.a
                  href="mailto:ghanshyamhadiya013@gmail.com"
                  className="flex items-center justify-center gap-3 text-lg text-purple-300 hover:text-purple-200 transition-colors group"
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                >
                  <Mail size={24} className="text-purple-400 group-hover:scale-110 transition-transform" /> {/* Using Lucide Mail */}
                  <span>ghanshyamhadiya013@gmail.com</span>
                  <ArrowRight size={20} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" /> {/* Using Lucide ArrowRight */}
                </motion.a>
                {/* Add other contact info if needed here, e.g., phone, location */}
                {/* Example for Phone (if desired): */}
                {/*
                <motion.div
                  className="flex items-center justify-center gap-3 text-lg text-indigo-300"
                  variants={fadeInUp}
                >
                  <Phone size={24} className="text-indigo-400" />
                  <span>+91 12345 67890</span>
                </motion.div>
                */}
              </div>

              {/* Animated icon (kept and refined) */}
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
