const faker = require('faker');
const ProductModel = require('./product.model.js');

function generateMockProducts(quantity) {
  const products = [];
  for (let i = 0; i < quantity; i++) {
    const product = new ProductModel({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      img: faker.image.imageUrl(),
      code: faker.datatype.uuid(),
      stock: faker.datatype.number(),
      category: faker.commerce.department(),
      status: true,
      thumbnails: [faker.image.imageUrl(), faker.image.imageUrl()],
    });
    products.push(product);
  }
  return products;
}

module.exports = generateMockProducts;
