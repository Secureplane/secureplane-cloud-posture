"""Command line interface for Wiz."""

import argparse
import sys
from typing import List
from .core.config import WizConfig
from .registry.resolver import PackageResolver

def main(args: List[str] = None) -> int:
    """Main entry point for Wiz CLI."""
    if args is None:
        args = sys.argv[1:]
        
    parser = argparse.ArgumentParser(description="Wiz package management tool")
    parser.add_argument("command", choices=["use", "list", "search"])
    parser.add_argument("packages", nargs="*", help="Package requests")
    
    args = parser.parse_args(args)
    config = WizConfig()
    
    if args.command == "use":
        resolver = PackageResolver(config.config)
        environment = resolver.resolve_packages(args.packages)
        return 0
        
    return 0

if __name__ == "__main__":
    sys.exit(main())