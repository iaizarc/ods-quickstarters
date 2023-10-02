/*
# CodeBuild
variable "build_project_name" {}
variable "testing_project_name" {}
variable "project_descr" {}
variable "codebuild_role_arn" {}
variable "build_timeout" {}
variable "artifacts_type" {}
variable "environment_compute_type" {}
variable "environment_image" {}
variable "environment_type" {}
variable "image_pull_credentials_type" {}
variable "source_type" {}
variable "buildspec_path" {}

# CodePipeline
variable "codepipeline_name" {}
variable "codepipeline_role_arn" {}
variable "s3_bucket_id" {}
variable "s3_artifacts_bucket_id" {}
variable "artifacts_store_type" {}
variable "source_provider" {}
variable "input_artifacts" {}
variable "output_artifacts" {}
variable "full_repository_id" {}
variable "branch_name" {}
variable "detectChanges" {}
variable "output_artifact_format" {}

# iam_roles
variable "pipeline_role_name" {}
variable "codebuild_role_name" {}
variable "pipeline_policy_name" {}
variable "codebuild_policy_name" {}

# s3
variable "codepipeline_bucket_name" {}
variable "artifacts_bucket_name" {}
variable "s3_versioning-cp" {}
variable "s3_versioning-artifacts" {}
*/


//---------------------------------------------
variable "name" {
  description = "The name of the stack."
  type        = string
  default     = "stack-aws-quickstarter"
}

variable "meta_environment" {
  description = "The type of the environment. Can be any of DEVELOPMENT, EVALUATION, PRODUCTIVE, QUALITYASSURANCE, TRAINING, VALIDATION."
  type        = string
  default     = "DEVELOPMENT"
}

# ---------------------------------------------
# S3 Bucket Variables
# ---------------------------------------------

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
  default     = "e2e-python"
}
variable "branch_name" {
  description = "repository branch_name"
  type        = string
  default     = "feature/TPS2021-677-jenkins-execute-great-expectations"  //"master"
}
