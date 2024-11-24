const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        },
        {
          id: 'categories',
          title: 'Categories',
          type: 'item',
          icon: 'feather icon-folder',
          url: '/categories'
        },
        {
          id: 'products',
          title: 'Products',
          type: 'item',
          icon: 'feather icon-package',
          url: '/products'
        },
        {
          id: 'orders',
          title: 'Orders',
          type: 'item',
          icon: 'feather icon-shopping-cart',
          url: '/orders'
        }
      ]
    }
  ]
};

export default menuItems;
