const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

function loadEnvironmentConfig(environment) {
  try {
    const configPath = path.join(process.cwd(), 'config', `${environment}.yaml`);
    const fileContents = fs.readFileSync(configPath, 'utf8');
    return yaml.load(fileContents);
  } catch (error) {
    throw new Error(`Failed to load config for ${environment}: ${error.message}`);
  }
}

module.exports = { loadEnvironmentConfig };