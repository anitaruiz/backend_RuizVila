const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.readData();
  }

  readData() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  writeData(data) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2), 'utf8');
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    // Validar campos obligatorios
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    // Validar código único
    if (this.products.some(product => product.code === code)) {
      console.error("El código ya está en uso");
      return;
    }

    // Crear un producto con id autonumérico
    const id = this.products.length + 1;
    const product = { id, title, description, price, thumbnail, code, stock };

    // Agregar el producto al arreglo
    this.products.push(product);

    // Guardar en el archivo
    this.writeData(this.products);

    console.log(`Producto "${title}" agregado con éxito. ID: ${id}`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      console.error("Not found");
    } else {
      return product;
    }
  }

  updateProduct(productId, updatedFields) {
    const index = this.products.findIndex(product => product.id === productId);

    if (index !== -1) {
      const updatedProduct = { ...this.products[index], ...updatedFields };
      this.products[index] = updatedProduct;

      // Guardar en el archivo
      this.writeData(this.products);
    }
  }

  deleteProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);

    // Guardar en el archivo
    this.writeData(this.products);
  }
}

// Ejemplo de uso:

const productManager = new ProductManager('products.json');

// Agregar un producto
productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 19.99,
  thumbnail: '/path/to/image1.jpg',
  code: 'P001',
  stock: 100,
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const productIdToFind = 1;
const foundProduct = productManager.getProductById(productIdToFind);
console.log('Producto con ID', productIdToFind, ':', foundProduct);

// Actualizar un producto por ID
const productIdToUpdate = 1;
const updatedFields = { price: 25.99, stock: 90 };
productManager.updateProduct(productIdToUpdate, updatedFields);

// Eliminar un producto por ID
const productIdToDelete = 1;
productManager.deleteProduct(productIdToDelete);