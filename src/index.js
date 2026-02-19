const { program } = require('commander');
const { validateInfrastructure } = require('./commands/validate');
const { planInfrastructure } = require('./commands/plan');
const { scanSecurity } = require('./commands/security-scan');
const logger = require('./utils/logger');

program
  .version('1.0.0')
  .description('Infrastructure as Code Management System');

program
  .command('validate <environment>')
  .description('Validate Terraform configuration')
  .action(validateInfrastructure);

program
  .command('plan <environment>')
  .description('Generate Terraform plan')
  .action(planInfrastructure);

program
  .command('security-scan <environment>')
  .description('Scan infrastructure for security issues')
  .action(scanSecurity);

program.parse(process.argv);