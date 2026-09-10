import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../public/UserContext";
import axios from "axios";
import { Pencil } from "lucide-react"; // edit icon

function Profile() {
  const { user, setUser } = useContext(UserContext); // ✅ assume setUser bhi diya hua hai
  const [image, setImage] = useState(user?.image || "https://i.pravatar.cc/150?img=12");
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");

  // Handle file change (image upload)
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl); // preview

      try {
        // Upload image ka URL ya base64 backend ko bhejna padega
        // Abhi simple file se preview ke liye url set kiya
        console.log(user._id);
        const res = await axios.put(`http://localhost:3000/update/image/${user._id}`, {
          image: previewUrl, // 👈 ideally yaha aapko Cloudinary ya backend upload karna hoga
        });
        setUser(res.data.user); // context update
      } catch (err) {
        console.error("Image update error:", err);
      }
    }
  };

  // Handle name save
  const handleNameSave = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/update/name/${user._id}`, {
        name: newName,
      });
      setUser(res.data.user);
      setIsEditingName(false);
    } catch (err) {
      console.error("Name update error:", err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col md:flex-col items-center gap-6 bg-white shadow-xl rounded-2xl p-6 md:p-8 md:mt-8 w-full md:h-[342px]"
    >
      {/* Profile Image */}
      <div className="relative">
        <label htmlFor="profile-upload">
          <motion.img
            src={image}
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-blue-500 object-cover shadow-md cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </label>

        {/* Edit Icon (Bottom-right corner) */}
        <label
          htmlFor="profile-upload"
          className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-700"
        >
          <Pencil size={16} />
        </label>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="profile-upload"
        />
      </div>

      {/* User Data */}
      <div className="flex flex-col text-center md:text-left">
        {/* Editable Name */}
        {isEditingName ? (
          <div className="flex items-center gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-2 py-1 rounded"
            />
            <button
              onClick={handleNameSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditingName(false)}
              className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {user?.name || "User"}
            <Pencil
              size={18}
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsEditingName(true)}
            />
          </motion.h2>
        )}

        <motion.p
          className="text-gray-500 text-sm md:text-base"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {user?.email || "example@example.com"}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Profile;