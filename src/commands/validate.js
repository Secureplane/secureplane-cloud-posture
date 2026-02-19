const terraform = require('node-terraform');
const logger = require('../utils/logger');
const { loadEnvironmentConfig } = require('../utils/config');

async function validateInfrastructure(environment) {
  try {
    const config = loadEnvironmentConfig(environment);
    logger.info(`Validating infrastructure for ${environment} environment`);
    
    await terraform.init({
      dir: `terraform/${environment}`
    });

    const result = await terraform.validate({
      dir: `terraform/${environment}`
    });

    logger.info('Validation completed successfully');
    return result;
  } catch (error) {
    logger.error(`Validation failed: ${error.message}`);
    throw error;
  }
}

module.exports = { validateInfrastructure };