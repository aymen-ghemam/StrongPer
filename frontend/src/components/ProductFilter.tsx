// src/components/ProductFilter.tsx
import { motion } from "framer-motion";

interface ProductFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const ProductFilter = ({
  selectedCategory,
  onCategoryChange,
}: ProductFilterProps) => {
  const categories = [
    { id: "all", name: "All Products", icon: "" },
    { id: "Peripheral", name: "Peripheral", icon: "" },
    { id: "Self-priming", name: "Self-priming", icon: "" },
    { id: "Centrifugal pumps", name: "Centrifugal Pumps", icon: "" },
    { id: "Swimming pool", name: "Swimming Pool", icon: "" },
    { id: "Multi-usage", name: "Multi-usage", icon: "" },
    { id: "DC dot booster pump", name: "DC Booster", icon: "" },
    { id: "Inverter automatic pump", name: "Inverter Auto", icon: "" },
    { id: "Automatic submersible pump", name: "Auto Submersible", icon: "" },
    { id: "Submersible sewage pump", name: "Sewage Pump", icon: "" },
    { id: "Solar pump", name: "Solar Pump", icon: "" },
  ];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 h-fit sticky top-20 border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        Filter Categories
      </h3>

      <div className="space-y-2">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              onCategoryChange(category.id === "all" ? null : category.id)
            }
            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 font-medium ${
              (category.id === "all" && !selectedCategory) ||
              selectedCategory === category.id
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md scale-105"
                : "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="flex-1">{category.name}</span>
            {((category.id === "all" && !selectedCategory) ||
              selectedCategory === category.id) && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto text-sm font-bold bg-white/30 px-2 py-1 rounded-full"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
      >
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-medium">
          {selectedCategory ? `Showing: ${selectedCategory}` : "All products"}
        </p>
        {selectedCategory && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(null)}
            className="w-full mt-3 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold uppercase tracking-wider py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Clear Filter
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProductFilter;
