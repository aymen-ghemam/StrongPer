import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newsletter: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8"
        >
          <FaArrowLeft /> Back
        </button>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          {/* Notifications */}
          <div className="pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    Email Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("emailNotifications")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.emailNotifications ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.emailNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">
                    SMS Notifications
                  </p>
                  <p className="text-sm text-gray-600">
                    Receive updates via SMS
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("smsNotifications")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.smsNotifications ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.smsNotifications
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">Newsletter</p>
                  <p className="text-sm text-gray-600">
                    Subscribe to our newsletter
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("newsletter")}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                    settings.newsletter ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                      settings.newsletter ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
            <div className="space-y-2 text-gray-600">
              <p>Application Version: 1.0.0</p>
              <p>Last Updated: 2025-01-01</p>
              <p>© 2025 StrongPerformance. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
