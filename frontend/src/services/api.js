/* eslint-disable prettier/prettier */
import axios from 'axios';
const baseUrl = `http://127.0.0.1:8000/api`;

const apiServices = {
  login: async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/login`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },
  register: async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/register`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },
  checkMe: async () => {
    try {
      const storedData = localStorage.getItem('dataLogin'); // Adjust the key if necessary
      // Parse the JSON string to an object
      const parsedData = JSON.parse(storedData);

      // Access the token from the parsed object
      const token = parsedData.token;

      const response = await axios.get(`${baseUrl}/me`, {
        headers: {
          Authorization: `Bearer ${token}` // Set the Authorization header
        }
      });
      return response;
    } catch (err) {
      return err.response;
    }
  },
  getCategories: async () => {
    try {
      const response = await axios.get(`${baseUrl}/categories`);
      return response;
    } catch (err) {
      return err.response;
    }
  },
  postCategory: async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/categories`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },
  updateCategory: async (id, data) => {
    try {
      const response = await axios.put(`${baseUrl}/categories/${id}`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/categories/${id}`);
      return response;
    } catch (err) {
      return err.response;
    }
  },
  getProducts: async () => {
    try {
      const response = await axios.get(`${baseUrl}/product`);
      return response;
    } catch (err) {
      return err.response;
    }
  },

  postProduct: async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/product`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },

  updateProduct: async (id, data) => {
    try {
      const response = await axios.put(`${baseUrl}/product/${id}`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/product/${id}`);
      return response;
    } catch (err) {
      return err.response;
    }
  },
  getOrders: async () => {
    try {
      const response = await axios.get(`${baseUrl}/order`);
      return response;
    } catch (err) {
      return err.response;
    }
  },

  postOrder: async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/order`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },

  updateOrder: async (id, data) => {
    try {
      const response = await axios.put(`${baseUrl}/order/${id}`, data);
      return response;
    } catch (err) {
      return err.response;
    }
  },

  deleteOrder: async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/order/${id}`);
      return response;
    } catch (err) {
      return err.response;
    }
  }
};

export default apiServices;
