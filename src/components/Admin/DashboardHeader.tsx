import { motion } from "framer-motion";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: "Admin" | "User";
}

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

const DashboardHeader = ({ user, onLogout }: DashboardHeaderProps) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between backdrop-blur-sm"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
          {user?.name?.charAt(0).toUpperCase() || "A"}
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">{user?.name}</h2>
          <p className="text-slate-400 text-sm">{user?.email}</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLogout}
        className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
      >
        <span className="text-lg"></span>
        <span className="font-medium">Logout</span>
      </motion.button>
    </motion.div>
  );
};

export default DashboardHeader;
