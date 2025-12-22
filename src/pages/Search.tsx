import { useSearchParams, useNavigate } from "react-router";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../hooks/useCart";
import { useUser } from "../context/UserContext";
import { FaArrowLeft } from "react-icons/fa6";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();

  const query = searchParams.get("query") || "";
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddToCart = (product: (typeof products)[0]) => {
    if (!user) {
      alert("Please register or login to add products to cart.");
      navigate("/register");
      return;
    }
    addToCart({
      index: product.index,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          {filteredProducts.length === 0
            ? `No results found for "${query}"`
            : `Found ${filteredProducts.length} product${
                filteredProducts.length !== 1 ? "s" : ""
              } for "${query}"`}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl mb-8">
              Try searching for a different product
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.index}
                name={product.name}
                price={product.price}
                image={product.image}
                onAdd={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
