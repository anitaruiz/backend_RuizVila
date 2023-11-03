class ProductManager {
    constructor() {
      this.products = [];
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
  
      console.log(`Producto "${title}" agregado con éxito. ID: ${id}`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(product => product.id === id);
  
      if (!product) {
        console.error("Producto no encontrado");
      } else {
        return product;
      }
    }
  }
  
  // Ejemplo de uso
  const productManager = new ProductManager();
  
  productManager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 19.99,
    thumbnail: "path/to/thumbnail1.jpg",
    code: "P001",
    stock: 50,
  });
  
  productManager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 29.99,
    thumbnail: "path/to/thumbnail2.jpg",
    code: "P002",
    stock: 30,
  });
  
  console.log(productManager.getProducts());
  console.log(productManager.getProductById(1));
  console.log(productManager.getProductById(3));  // Producto no encontrado
  