variable "codepipeline_bucket_name" {
  type = string
  default = "cpplartifacts"
}

variable "bitbuckets3_name" {
  description = "Source bitbucket s3 bucket name"
  type = string
  default = "src-bitbucket"
}

variable "e2e_results_bucket" {
  description = "s3_bucket_for_results_artifacts"
  type        = string
  default = "test-results"
}

variable "s3_versioning-cp" {
  description = "s3 versioning"
  type        = string
  default     = "Enabled"
}

variable "s3_versioning-bitbuckets3" {
  description = "s3 versioning"
  type        = string
  default     = "Enabled"
}

variable "s3_versioning-artifacts" {
  description = "s3 versioning"
  type        = string
  default     = "Enabled"
}

variable "local_id" {
  description = "id for unique s3buckets "
  type        = string
}

variable "projectId" {
  description = "EDP project name"
  type        = string
  default     = "testpg"
}

variable "environment" {
  description = "The project  execution environment."
  type        = string
  default     = "dev"
}

variable "aws_region" {
  description = "AWS infrastructure region"
  type        = string
  default     = "eu-west-1"
}

variable "repository" {
  description = "QS bitbucket repository"
  type        = string
  default     = "e2e-python"
}

variable "branch_name" {
  description = "repository branch_name"
  type        = string
  default     = "feature/TPS2021-677-jenkins-execute-great-expectations"  //"master"
}
