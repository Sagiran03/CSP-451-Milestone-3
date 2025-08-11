require('dotenv').config();
const { ServiceBusClient } = require('@azure/service-bus');
const { v4: uuidv4 } = require('uuid');

const connectionString = process.env.SERVICE_BUS_CONNECTION;
const topicName = process.env.SERVICE_BUS_TOPIC;

async function publishLowStockEvent(productId, quantity, threshold) {
  const client = new ServiceBusClient(connectionString);
  const sender = client.createSender(topicName);
  const correlationId = uuidv4();

  const messageBody = {
    productId,
    quantity,
    threshold,
    eventType: 'product.below_threshold',
    timestamp: new Date().toISOString(),
    correlationId
  };

  // Structured log including correlationId
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    component: 'backend',
    action: 'publishLowStockEvent',
    correlationId,
    productId,
    quantity,
    threshold
  }));

  await sender.sendMessages({
    body: messageBody,
    contentType: 'application/json',
    correlationId,  // <-- important: set correlationId as message metadata
    applicationProperties: { source: 'backend-service' }
  });

  await sender.close();
  await client.close();

  return correlationId;
}

module.exports = { publishLowStockEvent };
