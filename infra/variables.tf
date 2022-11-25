variable "aws_account" {
  description = "the account id used to provision resources"
  type        = string
}

variable "aws_region" {
  description = "the default aws region"
  type        = string
  default     = "us-west-1"
}

variable "project" {
  description = "will be used as a cluster id"
  type        = string
  default     = "mlops-bootcamp-capstone-emails"
}

variable "environment" {
  description = "the infrastructure environment"
  type        = string
  default     = "poc"
}

variable "vpc_id" {
  description = "the VPC ID"
  type        = string
}

variable "cidr_v4" {
  description = "the default VPC subnet"
  type        = string
}

variable "subnet_ids" {
  description = "the subnet IDs"
  type        = list(string)
}
