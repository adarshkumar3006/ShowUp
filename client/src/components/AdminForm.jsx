import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

const AdminForm = ({ entityName, fields, apiUrl }) => {
  const { token } = useUser();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [popup, setPopup] = useState({
    show: false,
    message: "",
    onConfirm: null,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(apiUrl, {
        headers: { "x-auth-token": token },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      setPopup({
        show: true,
        message: err.response?.data?.message || `Failed to fetch ${entityName}`,
        onConfirm: null,
      });
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(apiUrl, formData, {
        headers: { "x-auth-token": token },
      });
      setItems([...items, res.data]);
      setFormData({});
      setPopup({
        show: true,
        message: `${entityName} added successfully!`,
        onConfirm: null,
      });
    } catch (err) {
      console.error(err.response?.data || err);
      setPopup({
        show: true,
        message: err.response?.data?.message || `Failed to save ${entityName}`,
        onConfirm: null,
      });
    }
  };

  const onDelete = (id) => {
    setPopup({
      show: true,
      message: `Are you sure you want to delete this ${entityName}?`,
      onConfirm: async () => {
        try {
          await axios.delete(`${apiUrl}/${id}`, {
            headers: { "x-auth-token": token },
          });
          setItems(items.filter((item) => item.id !== id));
          setPopup({
            show: true,
            message: `${entityName} deleted successfully!`,
            onConfirm: null,
          });
        } catch (err) {
          console.error(err.response?.data || err);
          setPopup({
            show: true,
            message:
              err.response?.data?.message || `Failed to delete ${entityName}`,
            onConfirm: null,
          });
        }
      },
    });
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-6">Manage {entityName}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Add New {entityName}</h2>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Add {entityName}
          </button>
        </form>
      </div>

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

      {popup.show && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-6 w-96 text-center">
            <p className="mb-6 text-gray-800 font-medium">{popup.message}</p>
            <div className="flex justify-center gap-4">
              {popup.onConfirm ? (
                <>
                  <button
                    onClick={() => {
                      popup.onConfirm();
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() =>
                      setPopup({ show: false, message: "", onConfirm: null })
                    }
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded transition-colors duration-300"
                  >
                    No
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    setPopup({ show: false, message: "", onConfirm: null })
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
                >
                  OK
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminForm;
