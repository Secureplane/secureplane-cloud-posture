"""Setup script for Wiz deployment."""

import os
import shutil
from setuptools import setup, find_packages

def copy_config():
    """Copy default configuration."""
    config_dir = os.path.expanduser("~/.wiz")
    if not os.path.exists(config_dir):
        os.makedirs(config_dir)
    shutil.copy("config/wiz.toml", os.path.join(config_dir, "config.toml"))

setup(
    name="wiz",
    version="1.0.0",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "toml>=0.10.2",
        "typing-extensions>=4.0.0"
    ],
    entry_points={
        "console_scripts": [
            "wiz=wiz.cli:main"
        ]
    }
)