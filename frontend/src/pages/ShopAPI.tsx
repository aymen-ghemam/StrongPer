// src/pages/ShopAPI.tsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import api from "../utils/api";

interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: { _id: string; name: string } | string;
  images: string[];
  stock: number;
  status: string;
}

interface ApiResponse {
  data: {
    products: Product[];
    total: number;
    page: number;
    pages: number;
  };
}

const ShopAPI = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  // Get category ID from URL params
  const categoryIdFromUrl = searchParams.get("category");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categoryIdFromUrl || ""
  );

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params: Record<string, string> = { limit: "100" };

        if (searchQuery) {
          params.q = searchQuery;
        }

        // If a category ID is selected, add it to the filter
        if (selectedCategoryId) {
          params.category = selectedCategoryId;
        }

        const response = await api.get<ApiResponse>("/products", { params });
        setProducts(response.data.data.products);
      } catch (err: unknown) {
        const error = err as Record<string, unknown>;
        const message = (error?.response as Record<string, unknown>)
          ?.data as Record<string, unknown>;
        setError((message?.message as string) || "Failed to fetch products");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategoryId]);

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId) {
      setSelectedCategoryId(categoryId);
      navigate(`/shop?category=${categoryId}`);
    } else {
      setSelectedCategoryId("");
      navigate("/shop");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const selectedCategoryName =
    categories.find((c) => c._id === selectedCategoryId)?.name ||
    "All Categories";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-linear-to-br from-blue-50 to-cyan-50 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {selectedCategoryName}
          </h1>
          <p className="text-xl text-gray-600">
            Discover our premium pump collection
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category
          </label>
          <select
            value={selectedCategoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-900 focus:border-blue-600 focus:outline-none shadow-md"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="Search for pumps..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-blue-600 focus:outline-none text-gray-900 placeholder-gray-500 transition-all shadow-md"
          />
        </motion.div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8">
          {/* Products Grid */}
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                  <p className="text-gray-600 mt-4">Loading products...</p>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-xl text-gray-600">No products found</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {products.map((product, index) => {
                  const categoryName =
                    typeof product.category === "object" &&
                    product.category !== null
                      ? product.category.name
                      : typeof product.category === "string"
                      ? product.category
                      : "Uncategorized";

                  return (
                    <motion.a
                      key={product._id}
                      href={`/product/${product._id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.5 }}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden bg-gray-100 h-64">
                        <img
                          src={
                            product.images[0] ||
                            "https://via.placeholder.com/300"
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                          {categoryName}
                        </div>

                        {product.stock === 0 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <p className="text-white font-bold text-lg">
                              Out of Stock
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Price & Stock */}
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-2xl font-bold bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            ${product.price.toFixed(2)}
                          </p>

                          {product.stock > 0 && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                              In Stock
                            </span>
                          )}
                        </div>

                        <button className="w-full bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-2 rounded-lg transition-all transform group-hover:shadow-lg">
                          View Details
                        </button>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopAPI;
