// logger.js
function log(level, component, action, correlationId, message, extra = {}) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    component,
    action,
    correlationId,
    message,
    ...extra
  };
  console.log(JSON.stringify(logEntry));
}

module.exports = {
  info: (component, action, correlationId, message, extra) => log('info', component, action, correlationId, message, extra),
  error: (component, action, correlationId, message, extra) => log('error', component, action, correlationId, message, extra),
};
