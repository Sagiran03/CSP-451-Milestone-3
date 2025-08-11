// inventoryService.js
const { publishLowStockEvent } = require('./services/eventPublisher');

async function updateInventory(productId, soldQty) {
  const product = await db.products.find(productId);
  product.stock -= soldQty;
  await db.products.save(product);

  if (product.stock < product.threshold) {
    await publishLowStockEvent(productId, product.stock, product.threshold);
  }
}
