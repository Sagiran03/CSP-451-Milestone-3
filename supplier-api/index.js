require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('/order', (req, res) => {
  const { correlationId, productId, quantity, threshold } = req.body;

  // Structured log with correlationId and request details
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    component: 'supplier-api',
    action: 'receivedOrder',
    correlationId,
    productId,
    quantity,
    threshold
  }));

  // Simulate order confirmation response
  res.json({
    status: 'confirmed',
    correlationId,
    message: `Order for product ${productId} confirmed by supplier.`
  });
});

app.listen(port, () => {
  console.log(`Supplier API listening on port ${port}`);
});
