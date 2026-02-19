"""Package definition management."""

import json
from typing import Dict, Optional

class PackageDefinition:
    def __init__(self, identifier: str, version: Optional[str] = None):
        self.identifier = identifier
        self.version = version
        self.data = {}
        
    def load_from_file(self, filepath: str) -> None:
        """Load package definition from JSON file."""
        with open(filepath, 'r') as f:
            self.data = json.load(f)
            
    def validate(self) -> bool:
        """Validate package definition."""
        required_fields = ["identifier"]
        return all(field in self.data for field in required_fields)
        
    def get_requirements(self) -> list:
        """Get package requirements."""
        return self.data.get("requirements", [])