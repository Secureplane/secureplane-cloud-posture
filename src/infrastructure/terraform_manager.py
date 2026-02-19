import os
from python_terraform import Terraform
from utils.logger import setup_logger

logger = setup_logger()

class TerraformManager:
    def __init__(self, environment, config):
        self.environment = environment
        self.config = config
        self.tf_dir = f"terraform/{environment}"
        self.tf = Terraform(working_dir=self.tf_dir)

    def validate(self):
        """Validate Terraform configuration"""
        logger.info(f"Validating {self.environment} infrastructure")
        try:
            self.tf.init()
            return_code, stdout, stderr = self.tf.validate()
            if return_code == 0:
                logger.info("Validation successful")
            else:
                logger.error(f"Validation failed: {stderr}")
        except Exception as e:
            logger.error(f"Validation error: {str(e)}")
            raise

    def plan(self):
        """Generate Terraform plan"""
        logger.info(f"Generating plan for {self.environment}")
        try:
            self.tf.init()
            return_code, stdout, stderr = self.tf.plan()
            if return_code == 0:
                logger.info("Plan generated successfully")
            else:
                logger.error(f"Plan generation failed: {stderr}")
        except Exception as e:
            logger.error(f"Plan error: {str(e)}")
            raise

    def security_scan(self):
        """Run security scan on infrastructure"""
        logger.info(f"Running security scan for {self.environment}")
        try:
            for tool in self.config['security']['scanning']['tools']:
                self._run_security_tool(tool)
        except Exception as e:
            logger.error(f"Security scan error: {str(e)}")
            raise

    def _run_security_tool(self, tool):
        """Run specific security scanning tool"""
        logger.info(f"Running {tool} scan")
        if tool == 'checkov':
            os.system(f"checkov -d {self.tf_dir} --framework terraform")
        elif tool == 'tfsec':
            os.system(f"tfsec {self.tf_dir}")
        else:
            logger.warning(f"Unsupported security tool: {tool}")