const axios = require('axios');

module.exports = async function (context, message) {
  const correlationId = message.correlationId || 'N/A';

  // Log message receipt with correlationId
  context.log({
    timestamp: new Date().toISOString(),
    component: "azure-function-subscriber",
    action: "messageReceived",
    correlationId,
    message
  });

  try {
    // Supplier API endpoint
    const supplierApiUrl = 'http://4.239.96.47:3001/order';

    // Pass the correlationId in the POST body too
    const response = await axios.post(supplierApiUrl, message);

    context.log({
      action: "supplierApiResponse",
      correlationId,
      response: response.data
    });
  } catch (error) {
    context.log.error({
      action: "supplierApiError",
      correlationId,
      error: error.message
    });

    // Throw error to enable retry mechanism
    throw error;
  }

  context.done();
};
