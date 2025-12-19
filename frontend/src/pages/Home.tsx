import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import {
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineLightBulb,
  HiCog6Tooth,
  HiWrenchScrewdriver,
  HiRocketLaunch,
  HiArrowRight,
} from "react-icons/hi2";
import {
  FaChevronDown,
  FaBox,
  FaTruck,
  FaHeadset,
  FaCertificate,
  FaLeaf,
  FaUsers,
  FaAward,
} from "react-icons/fa6";

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    satisfaction: 0,
  });

  const faqs = [
    {
      question: "What types of pumps do you offer?",
      answer:
        "We offer a wide range of industrial and domestic pumps including peripheral, self-priming, centrifugal, submersible, solar, and multi-purpose pumps designed for various applications.",
    },
    {
      question: "How long has Strong Performance been in business?",
      answer:
        "Strong Performance has been a trusted manufacturer of high-quality water pumps for over 10 years, serving thousands of customers worldwide with reliable and durable solutions.",
    },
    {
      question: "What maintenance is required for industrial pumps?",
      answer:
        "Regular maintenance includes checking for leaks, lubricating bearings, inspecting seals, and ensuring proper water levels. We recommend professional servicing annually to maximize pump lifespan.",
    },
    {
      question: "Can I get technical support for installation?",
      answer:
        "Yes! Our team provides comprehensive installation guides and technical support. Contact our support team for detailed installation instructions or professional installation services.",
    },
    {
      question: "What warranty do you provide?",
      answer:
        "All our pumps come with a standard 2-year warranty covering manufacturing defects. Extended warranties are available for additional protection.",
    },
    {
      question: "Do you offer custom pump solutions?",
      answer:
        "Absolutely! We can design custom pump solutions tailored to your specific industrial or domestic needs. Contact our sales team to discuss your requirements.",
    },
  ];

  const services = [
    {
      icon: FaBox,
      title: "Premium Quality Pumps",
      description: "High-performance pumps built with precision engineering",
    },
    {
      icon: FaTruck,
      title: "Fast Shipping",
      description: "Reliable delivery within 2-3 business days",
    },
    {
      icon: FaHeadset,
      title: "Expert Support",
      description: "24/7 technical assistance and consultation",
    },
    {
      icon: FaCertificate,
      title: "Certified & Tested",
      description: "All products meet international standards",
    },
    {
      icon: FaLeaf,
      title: "Eco-Friendly",
      description: "Energy-efficient solutions for sustainability",
    },
    {
      icon: HiRocketLaunch,
      title: "Innovation Leaders",
      description: "Cutting-edge technology for industrial use",
    },
  ];

  const stats = [
    { icon: FaUsers, stat: "50K+", label: "Happy Customers", delay: 0 },
    { icon: FaBox, stat: "500+", label: "Premium Products", delay: 0.2 },
    { icon: FaAward, stat: "99%", label: "Satisfaction", delay: 0.4 },
  ];

  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin");
    }
  }, [user, navigate]);

  // Counter animation
  useEffect(() => {
    const duration = 2000;
    const start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        customers: Math.floor(50 * progress),
        products: Math.floor(500 * progress),
        satisfaction: Math.floor(99 * progress),
      });

      if (progress === 1) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-blue-50/30 to-slate-100 relative overflow-hidden">
      {/* Animated Background Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20"
        >
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-12"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-slate-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Industrial Excellence in{" "}
              <span className="bg-linear-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                Water Pumping
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Premium pumps engineered for reliability, efficiency, and
              performance
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow"
          >
            {[
              {
                title: "High Quality",
                description: "Premium materials and craftsmanship",
                icon: HiOutlineCheckCircle,
              },
              {
                title: "Durable Design",
                description: "Built to last for years",
                icon: HiOutlineShieldCheck,
              },
              {
                title: "Energy Efficient",
                description: "Advanced technology reduces consumption",
                icon: HiOutlineLightBulb,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="text-center p-6 rounded-xl transition-all"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* What We Offer Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/50"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiCog6Tooth className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                What We Offer
              </h2>
              <HiCog6Tooth className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Comprehensive solutions for all your industrial pumping needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Animated LED border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-linear-to-r from-blue-600/50 to-transparent bg-clip-border opacity-0 group-hover:opacity-100 animate-led-border transition-opacity" />

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors"
                >
                  <service.icon className="w-6 h-6 text-blue-600" />
                </motion.div>
                <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-2">
                  {service.title}
                </h3>
                <p className="relative z-10 text-slate-600">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Modern Stats Section - Redesigned 2026 Style */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card Container */}
                <div className="relative p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/50 text-center overflow-hidden hover:shadow-lg transition-all">
                  {/* Animated LED border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-linear-to-r from-blue-600/40 via-blue-400/20 to-transparent bg-clip-border opacity-0 group-hover:opacity-100 animate-led-border transition-opacity" />

                  {/* Floating background element */}
                  <motion.div
                    className="absolute -top-12 -right-12 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <motion.div
                    className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-br from-blue-600/20 to-blue-400/20 border border-blue-600/30 mb-6 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </motion.div>

                  {/* Stat number with counter animation */}
                  <motion.p
                    className="relative z-10 text-5xl md:text-6xl font-black text-blue-600 mb-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {item.label === "Happy Customers"
                      ? `${counters.customers}K+`
                      : item.label === "Premium Products"
                      ? `${counters.products}+`
                      : `${counters.satisfaction}%`}
                  </motion.p>

                  {/* Stat label */}
                  <p className="relative z-10 text-slate-600 font-semibold text-lg">
                    {item.label}
                  </p>

                  {/* Underline animation */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-blue-600 to-blue-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.6, delay: item.delay + 0.3 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/50"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiWrenchScrewdriver className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                Frequently Asked Questions
              </h2>
              <HiWrenchScrewdriver className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Everything you need to know about our products and services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group"
              >
                <button
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === index ? null : index)
                  }
                  className="w-full relative p-6 rounded-xl bg-white/70 backdrop-blur-sm border border-slate-200/50 hover:border-blue-300/50 transition-all text-left group-hover:shadow-md overflow-hidden"
                >
                  {/* Animated LED border on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-linear-to-r from-blue-600/40 to-transparent bg-clip-border opacity-0 group-hover:opacity-100 animate-led-border transition-opacity" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="font-semibold text-lg text-slate-900">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="w-5 h-5 text-blue-600" />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 bg-slate-50/50 border-t border-slate-200/50 text-slate-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-200/50"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <HiCog6Tooth className="w-8 h-8 text-blue-600" />
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">
                About Us
              </h2>
              <HiCog6Tooth className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Discover our story and commitment to excellence
            </p>
          </motion.div>

          {/* About Content Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl border-2 border-slate-200/50 p-8 md:p-12 mb-20 relative overflow-hidden bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.05)",
                  "0 0 40px rgba(59, 130, 246, 0.4), inset 0 0 25px rgba(59, 130, 246, 0.1)",
                  "0 0 20px rgba(59, 130, 246, 0.2), inset 0 0 15px rgba(59, 130, 246, 0.05)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none rounded-3xl"
            />

            <div className="relative z-10 space-y-8">
              {/* Company Story */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <HiCog6Tooth className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    Our Story
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Founded in 2003, Strong Performance has been revolutionizing
                  the water pumping industry for over 10 years. What started as
                  a small manufacturing unit has grown into a trusted global
                  brand serving thousands of customers across industrial,
                  agricultural, and domestic sectors. Our commitment to
                  excellence, innovation, and customer satisfaction has made us
                  a leader in premium pump solutions.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <HiRocketLaunch className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    Our Mission
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  To deliver world-class, energy-efficient, and reliable pump
                  solutions that empower industries and communities worldwide.
                  We strive to set new standards in manufacturing excellence,
                  customer service, and environmental responsibility.
                </p>
              </motion.div>

              {/* Industrial Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaHeadset className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                    Industrial Expertise
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  With deep expertise in industrial applications, we manufacture
                  pumps for agriculture, water supply, sewage management,
                  mining, construction, and renewable energy sectors. Our
                  engineering team continuously innovates to meet evolving
                  market demands and environmental standards.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <motion.h3
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-black text-slate-900 text-center mb-12"
            >
              Why Choose Us?
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: HiOutlineCheckCircle,
                  title: "Quality Assurance",
                  description:
                    "Every pump undergoes rigorous testing before delivery",
                },
                {
                  icon: HiOutlineShieldCheck,
                  title: "Reliability",
                  description:
                    "Trusted by industries worldwide for consistent performance",
                },
                {
                  icon: HiOutlineLightBulb,
                  title: "Innovation",
                  description:
                    "Continuous R&D for cutting-edge pump technology",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="p-6 md:p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-lg transition-all group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors"
                  >
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-slate-600 text-sm md:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl bg-white/70 backdrop-blur-sm border border-slate-200/50 text-center overflow-hidden group hover:shadow-lg transition-all"
          >
            {/* Animated LED border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-linear-to-r from-blue-600/40 via-blue-400/20 to-transparent bg-clip-border opacity-0 group-hover:opacity-100 animate-led-border transition-opacity" />

            {/* Background floating elements */}
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200/15 rounded-full blur-3xl"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-200/15 rounded-full blur-3xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Ready to Experience Excellence?
              </h2>
              <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                Explore our complete range of premium industrial pumps and find
                the perfect solution for your needs.
              </p>

              <Link
                to="/our-products"
                className="group/btn inline-block relative"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-10 py-4 rounded-lg font-bold text-lg transition-all overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 rounded-lg bg-linear-to-r from-blue-600 to-blue-500" />
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-linear-to-r from-blue-600 to-blue-500 bg-clip-border animate-led-border opacity-50" />
                  <span className="relative flex items-center gap-2 text-white">
                    Browse Our Collection
                    <HiArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
