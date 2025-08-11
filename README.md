# CSP-451-Milestone-3

SmartRetail Supplier Sync
Event Type Chosen and Why
We used Azure Service Bus because it provides reliable message delivery, supports topics for publish-subscribe, and helps us build a scalable, decoupled system.

Message Format and Flow
When a product stock drops below the threshold, the backend sends a message to an Azure Service Bus topic.

The message includes product details and a unique correlationId to track it.

An Azure Function listens to this topic, processes the message, and sends an order request to the Supplier API.

The Supplier API logs the request and sends back a confirmation.

Instructions to Deploy and Test
Update your .env file with your Service Bus connection string and topic name.

Run the backend service locally to publish events (e.g., node testPublish.js).

Start the Supplier API microservice using Docker.

Deploy and run the Azure Function to listen to Service Bus messages.

Send test orders by simulating low-stock events and check the logs for confirmation.

Logs Demonstrating Correlation ID Traceability
All services log messages with the same correlationId, allowing us to follow the full flow from event creation in the backend, through the Azure Function, to the Supplier API confirmation.
