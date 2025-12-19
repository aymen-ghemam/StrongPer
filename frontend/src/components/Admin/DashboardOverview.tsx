import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../../utils/api";

interface StatsData {
  totalUsers: number;
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalRevenue: number;
}

interface StatCardProps {
  label: string;
  value: string | number;
  color: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: { name: string };
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const DashboardOverview = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/admin/stats");
        setStats(response.data.data.stats);
        setRecentProducts(response.data.data.recentProducts);
        setRecentUsers(response.data.data.recentUsers);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Loading statistics...</div>
      </div>
    );
  }

  const StatCard = ({ label, value, color }: StatCardProps) => (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-gradient-to-br ${color} rounded-xl p-6 text-white shadow-lg`}
    >
      <p className="text-sm font-medium opacity-90">{label}</p>
      <p className="text-3xl font-bold mt-2">{value.toLocaleString()}</p>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          label="Total Users"
          value={stats?.totalUsers || 0}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          label="Total Products"
          value={stats?.totalProducts || 0}
          color="from-purple-500 to-purple-600"
        />
        <StatCard
          label="Total Categories"
          value={stats?.totalCategories || 0}
          color="from-pink-500 to-pink-600"
        />
        <StatCard
          label="Total Orders"
          value={stats?.totalOrders || 0}
          color="from-green-500 to-green-600"
        />
        <StatCard
          label="Total Revenue"
          value={`$${stats?.totalRevenue?.toFixed(2) || "0.00"}`}
          color="from-yellow-500 to-yellow-600"
        />
      </div>

      {/* Recent Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm"
      >
        <h3 className="text-white font-bold text-lg mb-4">Recent Products</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-300">
            <thead className="border-b border-slate-700">
              <tr>
                <th className="text-left py-2">Product Name</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {recentProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-3">{product.name}</td>
                  <td className="py-3">{product.category?.name || "N/A"}</td>
                  <td className="py-3">${product.price.toFixed(2)}</td>
                  <td className="py-3">{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Users */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm"
      >
        <h3 className="text-white font-bold text-lg mb-4">Recent Users</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-slate-300">
            <thead className="border-b border-slate-700">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {recentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "Admin"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
