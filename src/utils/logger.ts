// src/utils/logger.ts
export const logInfo = (message: string): void => {
  console.log(`ℹ️ INFO: ${message}`);
};

export const logError = (message: string): void => {
  console.error(`❌ ERROR: ${message}`);
};
