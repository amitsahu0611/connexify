import React from 'react';
import {
  User,
  Clock,
  Mail,
  Phone,
  Briefcase,
  Calendar
} from 'lucide-react';

const UserProfile = () => {
  const data = JSON.parse(localStorage.getItem("userData"));

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">User data not available.</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRoleName = (roleId) => {
    const roles = {
      0: 'Superadmin',
      1: 'Manager',
      2: 'Admin',
      3: 'Caller'
    };
    return roles[roleId] || 'User';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-12">
            <div className="flex items-center">
              <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-blue-600">{data.initials || "NA"}</span>
              </div>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white">{data.name || "Unnamed User"}</h1>
                <div className="flex items-center mt-2 text-blue-100">
                  <Briefcase className="h-5 w-5 mr-2" />
                  <span>{getRoleName(data.role_id)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{data.email || "N/A"}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800">{data.phone || "N/A"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Member Since</p>
                      <p className="text-gray-800">{formatDate(data.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="text-gray-800">{formatDate(data.updatedAt)}</p>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="mt-6 bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-800">Account Status</h2>
                </div>
                <div className={`px-4 py-2 rounded-full ${
                  data.active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {data.active ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
