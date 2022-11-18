terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.28.0"
    }
  }
}

provider "aws" {
  allowed_account_ids = [var.aws_account]
  region              = var.aws_region
}

data "aws_region" "current" {}

locals {
  common_tags = {
    "Project"     = var.project
    "Environment" = var.environment
    "Provisioner" = "Terraform"
  }
}
