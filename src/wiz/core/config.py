"""Core configuration management for Wiz."""

import os
import toml
from typing import Dict, Optional

class WizConfig:
    def __init__(self, config_path: Optional[str] = None):
        self.config_path = config_path or os.path.expanduser("~/.wiz/config.toml")
        self.config = self._load_config()
        
    def _load_config(self) -> Dict:
        """Load configuration from TOML file."""
        default_config = {
            "registry": {
                "paths": [],
                "discovery_prefix": None
            },
            "environ": {
                "initial": {},
                "passthrough": []
            },
            "resolver": {
                "maximum_combinations": 10,
                "maximum_attempts": 15
            }
        }
        
        if os.path.exists(self.config_path):
            with open(self.config_path, 'r') as f:
                user_config = toml.load(f)
                default_config.update(user_config)
                
        return default_config
        
    def get_registry_paths(self) -> list:
        """Get configured registry paths."""
        return self.config["registry"]["paths"]
        
    def get_environ_config(self) -> Dict:
        """Get environment configuration."""
        return self.config["environ"]