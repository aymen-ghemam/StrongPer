import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import api from "../../utils/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  createdAt: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users", {
        params: { limit: 100 },
      });
      setUsers(response.data.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (
    userId: string,
    newRole: "Admin" | "User"
  ) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/admin/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading) {
    return <div className="text-slate-400">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white text-2xl font-bold">User Management</h2>
        <p className="text-slate-400 text-sm mt-1">
          Total Users: {users.length}
        </p>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm overflow-x-auto"
      >
        <table className="w-full text-sm text-slate-300">
          <thead className="border-b border-slate-700">
            <tr>
              <th className="text-left py-3 px-2">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Role</th>
              <th className="text-left py-3 px-2">Joined</th>
              <th className="text-left py-3 px-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-slate-700/20 transition-colors"
              >
                <td className="py-3 px-2 font-medium text-white">
                  {user.name}
                </td>
                <td className="py-3 px-2">{user.email}</td>
                <td className="py-3 px-2">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value as "Admin" | "User"
                      )
                    }
                    className="bg-slate-700 text-white rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="py-3 px-2 text-xs text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-2">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30 transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {users.length === 0 && (
        <div className="text-center py-12 text-slate-400">No users found.</div>
      )}
    </div>
  );
};

export default UserManagement;
