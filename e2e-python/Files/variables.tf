/*
# CodeBuild
variable "build_project_name" {}
variable "build_timeout" {}
variable "artifacts_type" {}
variable "environment_compute_type" {}
variable "environment_image" {}
variable "environment_type" {}
variable "image_pull_credentials_type" {}
variable "source_type" {}
variable "env_version" {}

# CodePipeline
variable "codepipeline_name" {}
variable "artifacts_store_type" {}
variable "artifacts_store_type" {}
variable "source_provider" {}

# iam_roles
variable "pipeline_role_name" {}
variable "codebuild_role_name" {}
variable "codepipeline_policy_name" {}
variable "codebuild_policy_name" {}

# s3
variable "codepipeline_bucket_name" {}
variable "e2e_results_bucket_name" {}
variable "bitbucket_source_bucket_name" {}
variable "s3_versioning_cp" {}
variable "s3_versioning_bitbuckets3" {}
variable "s3_versioning_results" {}
*/



variable "name" {
  description = "The name of the stack."
  type        = string
  default     = "stack-aws-quickstarter-test"
}

variable "meta_environment" {
  description = "The type of the environment. Can be any of DEVELOPMENT, EVALUATION, PRODUCTIVE, QUALITYASSURANCE, TRAINING, VALIDATION."
  type        = string
  default     = "DEVELOPMENT"
}

variable "data_bucket_name" {
  description = "The name of the S3 data bucket."
  type        = string
  default     = "quickstarter"
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

variable "repository" {
  description = "QS bitbucket repository"
  type        = string
  default = "e2e-python"
}

variable "branch_name" {
  description = "repository branch_name"
  type        = string
  default     = "master"
}
