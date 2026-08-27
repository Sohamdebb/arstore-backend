const API_BASE = '/api';

class ApiService {
  static getToken() {
    return localStorage.getItem('token');
  }

  static getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  static async request(url, options = {}) {
    const response = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options.headers },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  }

  // Auth
  static async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  static async login(credentials) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  static async getProfile() {
    return this.request('/users/me');
  }

  // Products
  static async getProducts() {
    return this.request('/products');
  }

  static async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  static async searchProducts(keyword) {
    return this.request(`/products/search?keyword=${encodeURIComponent(keyword)}`);
  }

  static async getProductsByCategory(category) {
    return this.request(`/products/category/${encodeURIComponent(category)}`);
  }

  static async getCategories() {
    return this.request('/products/categories');
  }

  static async getBrands() {
    return this.request('/products/brands');
  }

  // Admin
  static async createProduct(product) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  static async updateProduct(id, product) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  static async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }
}

export default ApiService;
