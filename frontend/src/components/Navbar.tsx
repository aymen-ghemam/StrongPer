import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { VscAccount } from "react-icons/vsc";
import { TiHomeOutline } from "react-icons/ti";
import { HiFingerPrint } from "react-icons/hi";
import { FaBasketShopping } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";

import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const handleSmoothScroll = (path: string, sectionId?: string) => {
    navigate(path);
    setIsMenuOpen(false);

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const menuItems = [
    {
      label: "My Orders",
      icon: FaBasketShopping,
      action: () => {
        navigate("/my-orders");
        setIsMenuOpen(false);
      },
    },
    {
      label: "Cart",
      icon: FaBasketShopping,
      action: () => {
        setIsCartDrawerOpen(true);
        setIsMenuOpen(false);
      },
    },
    {
      label: "Profile",
      icon: VscAccount,
      action: () => {
        navigate("/profile");
        setIsMenuOpen(false);
      },
    },
    ...(user?.isAdmin
      ? [
          {
            label: "Admin Dashboard",
            icon: null,
            action: () => {
              navigate("/admin");
              setIsMenuOpen(false);
            },
          },
        ]
      : []),
    {
      label: "Settings",
      icon: null,
      action: () => {
        navigate("/settings");
        setIsMenuOpen(false);
      },
    },
    ...(user
      ? [
          {
            label: "Logout",
            icon: null,
            action: handleLogout,
          },
        ]
      : []),
  ];

  return (
    <>
      <nav
        style={{
          background:
            "linear-gradient(105deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        }}
        className="text-white p-4 shadow-lg sticky top-0 z-30"
      >
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-1 whitespace-nowrap"
          >
            <HiFingerPrint /> StrongPerformance
          </Link>

          {/* Nav Links - Desktop */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <div className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center hover:text-blue-300 transition gap-1 font-medium"
              >
                <TiHomeOutline className="text-lg" /> Home
              </Link>
              <button
                onClick={() => handleSmoothScroll("/", "about-us")}
                className="flex items-center hover:text-blue-300 transition gap-1 font-medium cursor-pointer"
              >
                About Us
              </button>
              {!user && (
                <Link
                  to="/register"
                  className="flex items-center hover:text-blue-300 transition gap-1 font-medium"
                >
                  <VscAccount className="text-lg" /> Register
                </Link>
              )}
            </div>

            {/* Kebab Menu - Only show when logged in */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition"
                >
                  <BsThreeDots className="text-xl" />
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {menuItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition text-left"
                        >
                          {item.icon && item.icon.name !== "() => null" ? (
                            <item.icon className="w-5 h-5" />
                          ) : null}
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </nav>

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
    </>
  );
};

export default Navbar;
