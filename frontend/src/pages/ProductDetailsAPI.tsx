// src/pages/ProductDetailsAPI.tsx
import { useParams, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaBasketShopping,
  FaStar,
  FaLightbulb,
  FaGaugeHigh,
  FaLeaf,
  FaCheck,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useCart } from "../hooks/useCart";
import { motion } from "framer-motion";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  status: string;
}

const ProductDetailsAPI = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.data);
      } catch (err: unknown) {
        const error = err as Record<string, unknown>;
        const message = (error?.response as Record<string, unknown>)
          ?.data as Record<string, unknown>;
        setError((message?.message as string) || "Failed to fetch product");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center relative overflow-hidden">
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
            }}
          />
        </motion.div>

        <div className="text-center relative z-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-16 h-16 border-4 border-cyan-400 border-r-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-slate-300 text-lg font-semibold">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <div className="text-6xl mb-6 text-red-400">
            <FaCheck className="mx-auto w-24 h-24 opacity-50" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Product Not Found
          </h1>
          <p className="text-slate-300 mb-8 text-lg">
            {error || "The product you're looking for doesn't exist."}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/our-products")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold transition-all shadow-lg hover:shadow-cyan-500/20"
          >
            Back to Products
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      index: 0,
      name: product.name,
      price: product.price,
      image: product.images[0] || "https://via.placeholder.com/300",
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://via.placeholder.com/400?text=No+Image";

  const features = [
    { icon: FaLightbulb, label: "Premium Quality" },
    { icon: FaGaugeHigh, label: "Efficient Performance" },
    { icon: FaCheck, label: "Long Durability" },
    { icon: FaLeaf, label: "Eco-Friendly" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background effects */}
      <motion.div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold mb-12 transition-colors"
        >
          <FaArrowLeft className="w-5 h-5" />
          Back to Products
        </motion.button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Image Section */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-white/10"
            >
              <motion.img
                src={imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              />
            </motion.div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* Category Badge */}
                <div className="inline-block mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold py-2 px-4 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                  <span className="text-slate-300 font-medium">(4.5/5)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-6">
                  <p className="text-5xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.stock > 0 && (
                    <span className="text-sm font-bold text-green-400 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                      In Stock ({product.stock})
                    </span>
                  )}
                  {product.stock === 0 && (
                    <span className="text-sm font-bold text-red-400 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-3">
                    Description
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-base font-medium">
                    {product.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Key Features
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                      >
                        <feature.icon className="w-5 h-5 text-cyan-400 shrink-0" />
                        <span className="text-white font-semibold text-sm">
                          {feature.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg ${
                    addedToCart
                      ? "bg-green-600 text-white"
                      : product.stock === 0
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-cyan-500/20"
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <FaCheck className="w-6 h-6" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <FaBasketShopping className="w-6 h-6" />
                      Add to Cart
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/our-products")}
                  className="w-full border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold py-3 rounded-xl transition-all"
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsAPI;
