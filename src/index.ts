import { ConfigService } from './config/ConfigService';
import { Logger } from './utils/Logger';
import { WizClient } from './clients/WizClient';
import { SecurityScanner } from './scanners/SecurityScanner';
import dotenv from 'dotenv';

async function main() {
  const logger = new Logger('Main');
  
  try {
    // Load environment variables
    dotenv.config();

    // Initialize configuration
    const configService = new ConfigService();
    const config = await configService.loadConfig();

    // Initialize Wiz client
    const wizClient = new WizClient(config.wiz);

    // Initialize security scanner
    const securityScanner = new SecurityScanner(wizClient);

    // Start scanning
    await securityScanner.startScanning();

    logger.info('Wiz CNAPP initialized successfully');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to initialize Wiz CNAPP: ${errorMessage}`);
    process.exit(1);
  }
}

main();