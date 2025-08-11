const { app } = require('@azure/functions');

app.serviceBusQueue('SupplierOrderProcessor', {
    connection: 'SERVICE_BUS_CONNECTION_STRING',
    queueName: 'myinputqueue',
    handler: async (message, context) => {
        context.log('Service bus queue function processed message:', message);
    }
});
