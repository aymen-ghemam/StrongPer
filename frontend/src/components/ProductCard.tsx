"use client";

import { FaBasketShopping, FaHeart, FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  name: string;
  price: number;
  image: string;
  onAdd: () => void;
  category?: string;
  rating?: number;
}

const ProductCard = ({
  name,
  price,
  image,
  onAdd,
  category = "Premium",
  rating = 4.5,
}: Props) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  };

  const imageVariants = {
    hidden: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: { duration: 0.4 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.2, duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={containerVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 aspect-square">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            variants={imageVariants}
          />

          {/* Category Badge */}
          <motion.div
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            variants={badgeVariants}
            className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
          >
            {category}
          </motion.div>

          {/* Rating Badge */}
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <FaStar className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              {rating}
            </span>
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <FaHeart
              className={`w-5 h-5 transition-colors duration-200 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
              }`}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex flex-col grow p-5">
          {/* Product Name */}
          <h2 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 leading-tight">
            {name}
          </h2>

          {/* Price Section */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              ${price}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
              ${(price * 1.15).toFixed(2)}
            </span>
            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full font-semibold">
              -13%
            </span>
          </div>

          {/* Stock Status */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                In Stock
              </span>
              <span className="text-xs font-bold text-green-600 dark:text-green-400">
                15 left
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              />
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onAdd}
            className="w-full mt-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FaBasketShopping className="w-4 h-4" />
            Add to Cart
          </motion.button>

          {/* View Details Link */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-2 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 py-2 rounded-xl font-semibold transition-all duration-200"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
