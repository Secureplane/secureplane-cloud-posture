import yaml
import os
from pathlib import Path

def load_config(environment):
    """Load environment-specific configuration"""
    config_path = Path(f"config/{environment}.yaml")
    try:
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)
    except FileNotFoundError:
        raise Exception(f"Configuration not found for environment: {environment}")
    except yaml.YAMLError as e:
        raise Exception(f"Error parsing configuration: {str(e)}")