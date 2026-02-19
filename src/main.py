#!/usr/bin/env python3
import click
from infrastructure.terraform_manager import TerraformManager
from utils.logger import setup_logger
from utils.config import load_config

logger = setup_logger()

@click.group()
def cli():
    """Infrastructure as Code Management CLI"""
    pass

@cli.command()
@click.argument('environment')
def validate(environment):
    """Validate Terraform configuration"""
    config = load_config(environment)
    tf_manager = TerraformManager(environment, config)
    tf_manager.validate()

@cli.command()
@click.argument('environment')
def plan(environment):
    """Generate Terraform plan"""
    config = load_config(environment)
    tf_manager = TerraformManager(environment, config)
    tf_manager.plan()

@cli.command()
@click.argument('environment')
def security_scan(environment):
    """Run security scan on infrastructure"""
    config = load_config(environment)
    tf_manager = TerraformManager(environment, config)
    tf_manager.security_scan()

if __name__ == '__main__':
    cli()