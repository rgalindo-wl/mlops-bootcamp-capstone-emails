# File managed by module.terraform_state_backend in backend.tf
terraform {
  required_version = ">= 1.2.4"

  backend "s3" {
    region   = "us-west-1"
    bucket   = "mlops-poc-terraform-state"
    key      = "terraform.tfstate"
    profile  = ""
    role_arn = ""
    encrypt  = "true"
  }
}
