import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiCog6Tooth,
} from "react-icons/hi2";
import { FaArrowRight, FaHeadset } from "react-icons/fa6";
import logo from "../Images/logo.jpg";

const About = () => {
  const features = [
    {
      icon: HiOutlineCheckCircle,
      title: "Quality Assurance",
      description: "Every pump undergoes rigorous testing before delivery",
    },
    {
      icon: HiOutlineShieldCheck,
      title: "Reliability",
      description: "Trusted by industries worldwide for consistent performance",
    },
    {
      icon: HiOutlineCheckCircle,
      title: "Innovation",
      description: "Continuous R&D for cutting-edge pump technology",
    },
  ];

  const stats = [
    { value: "20+", label: "Years in Industry" },
    { value: "50K+", label: "Global Customers" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Customer Support" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-blue-50 to-white pointer-events-none" />
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header with Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <motion.img
            src={logo}
            alt="Strong Performance"
            className="h-14 w-14 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          />
          <h1 className="text-4xl md:text-5xl font-black text-navy">
            About Strong Performance
          </h1>
        </motion.div>

        {/* LED-Style Animated Border Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl border-4 border-blue-400 p-12 mb-20 relative overflow-hidden shadow-2xl"
          style={{
            boxShadow:
              "0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)",
          }}
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)",
                "0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 25px rgba(59, 130, 246, 0.2)",
                "0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 15px rgba(59, 130, 246, 0.1)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
          />

          <div className="relative z-10">
            {/* Company Story */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <HiCog6Tooth className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-black text-navy">Our Story</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Founded in 2003, Strong Performance has been revolutionizing the
                water pumping industry for over two decades. What started as a
                small manufacturing unit has grown into a trusted global brand
                serving thousands of customers across industrial, agricultural,
                and domestic sectors. Our commitment to excellence, innovation,
                and customer satisfaction has made us a leader in premium pump
                solutions.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaArrowRight className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-black text-navy">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To deliver world-class, energy-efficient, and reliable pump
                solutions that empower industries and communities worldwide. We
                strive to set new standards in manufacturing excellence,
                customer service, and environmental responsibility.
              </p>
            </motion.div>

            {/* Industrial Expertise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaHeadset className="w-8 h-8 text-blue-600" />
                <h2 className="text-3xl font-black text-navy">
                  Industrial Expertise
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                With deep expertise in industrial applications, we manufacture
                pumps for agriculture, water supply, sewage management, mining,
                construction, and renewable energy sectors. Our engineering team
                continuously innovates to meet evolving market demands and
                environmental standards.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-navy text-center mb-12"
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl bg-linear-to-br from-blue-50 to-white border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-4"
                >
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </motion.div>
                <h3 className="text-xl font-bold text-navy mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 p-12 rounded-2xl bg-linear-to-r from-blue-600 to-blue-400 text-white shadow-xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.p
                className="text-3xl md:text-4xl font-black mb-2"
                whileInView={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.p>
              <p className="text-lg font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center p-12 rounded-2xl bg-white border-2 border-blue-200 shadow-lg"
        >
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
            Ready to Experience Excellence?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Explore our complete range of premium industrial pumps and find the
            perfect solution for your needs.
          </p>
          <Link
            to="/our-products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-400 text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-blue-400/30 transition-all hover:scale-105"
          >
            Browse Our Collection
            <FaArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
