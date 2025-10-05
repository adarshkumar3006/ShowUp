import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const AdminForm = ({ entityName, fields, apiUrl }) => {
  const { token } = useUser();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(apiUrl, {
        headers: {
          "x-auth-token": token,
        },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || `Failed to fetch ${entityName}`);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await axios.put(`${apiUrl}/${editingItem.id}`, formData, {
          headers: {
            "x-auth-token": token,
          },
        });
        alert(`${entityName} updated successfully!`);
      } else {
        await axios.post(apiUrl, formData, {
          headers: {
            "x-auth-token": token,
          },
        });
        alert(`${entityName} added successfully!`);
      }
      setFormData({});
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || `Failed to save ${entityName}`);
    }
  };

  const onEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });
      alert(`${entityName} deleted successfully!`);
      fetchItems();
    } catch (err) {
      console.error(err.response.data);
      alert(err.response.data.message || `Failed to delete ${entityName}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage {entityName}</h1>

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">
          {editingItem ? `Edit ${entityName}` : `Add New ${entityName}`}
        </h2>
        <form onSubmit={onSubmit}>
          {fields.map((field) => (
            <div className="mb-4" key={field.name}>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                name={field.name}
                id={field.name}
                value={formData[field.name] || ""}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {editingItem ? "Update" : "Add"} {entityName}
          </button>
          {editingItem && (
            <button
              type="button"
              onClick={() => {
                setEditingItem(null);
                setFormData({});
              }}
              className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* List Items */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Existing {entityName}</h2>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-3 last:border-b-0"
            >
              <span className="text-gray-700 font-medium mb-2 sm:mb-0">
                {fields.map((field) => item[field.name]).join(" - ")}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-full text-sm transition duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-full text-sm transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminForm;
