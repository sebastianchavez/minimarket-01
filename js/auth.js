const AuthManager = {
  getUser() {
    const user = localStorage.getItem('minimarket_user');
    return user ? JSON.parse(user) : null;
  },

  setUser(user) {
    localStorage.setItem('minimarket_user', JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem('minimarket_user');
    window.location.href = 'login.html';
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  register(userData) {
    const users = JSON.parse(localStorage.getItem('minimarket_users') || '[]');
    const exists = users.find(u => u.email === userData.email);
    if (exists) return { success: false, message: 'El email ya está registrado' };

    const newUser = { ...userData, id: Date.now(), memberSince: new Date().toISOString().split('T')[0] };
    users.push(newUser);
    localStorage.setItem('minimarket_users', JSON.stringify(users));
    this.setUser(newUser);
    return { success: true, user: newUser };
  },

  login(email, password) {
    const users = JSON.parse(localStorage.getItem('minimarket_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      if (email === 'juan@email.com' && password === '123456') {
        this.setUser(MOCK_USER);
        return { success: true, user: MOCK_USER };
      }
      return { success: false, message: 'Email o contraseña incorrectos' };
    }
    this.setUser(user);
    return { success: true, user };
  },

  getOrders() {
    const orders = localStorage.getItem('minimarket_orders');
    if (orders) return JSON.parse(orders);
    return MOCK_ORDERS;
  },

  saveOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem('minimarket_orders', JSON.stringify(orders));
  },

  getOrderById(orderId) {
    return this.getOrders().find(o => o.id === orderId);
  }
};
