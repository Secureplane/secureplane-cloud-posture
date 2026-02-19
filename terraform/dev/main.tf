terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "../modules/vpc"
  environment = "dev"
  vpc_cidr = var.vpc_cidr
}

module "ecs" {
  source = "../modules/ecs"
  environment = "dev"
  vpc_id = module.vpc.vpc_id
}