let products = [
  { 'id': 1, 'name': 'Laptop', 'category': 'Electronics' },
  { 'id': 2, 'name': 'Coffee Maker', 'category': 'Appliances' },
  { 'id': 3, 'name': 'Headphones', 'category': 'Electronics' },
  { 'id': 4, 'name': 'Running Shoes', 'category': 'Footwear' }
]

export function getProducts() {
  return products;
}

export function getProductById(id) {
  return products.find((product) => product.id === id);
}

export function addProduct(product) {
  let newProduct = { id: products.length + 1, ...product };
  products.push(newProduct);
  return newProduct;
}
