# -------------------------------------------
# Common Variables
# -------------------------------------------
variable "region" {
  description = "The AWS region to deploy the resources in."
  default     = "eu-west-1"
}

variable "tags" {
  description = "Tags to be attached to the CodePipeline"
  type        = map(string)
}

# -------------------------------------------
# CodePipeline
# -------------------------------------------

variable "project_name" {
  description = "Unique name for this project"
  type        = string
}

/*variable "source_repo_name" {
  description = "Source repo name of the CodeCommit repository"
  type        = string
}

variable "source_repo_branch" {
  description = "Default branch in the Source repo for which CodePipeline needs to be configured"
  type        = string
}*/

variable "s3_bucket_name" {
  description = "S3 bucket name to be used for storing the artifacts"
  type        = string
}
variable "artifacts_store_type" {
  description = "Artifacts store type"
  type        = string
  default     = "S3"
}

variable "pipeline_name" {
  description = "The name of the CodePipeline."
}
variable "source_repo_name" {
  description = "Source repo name of the CodeCommit repository"
  type        = string
}

variable "branch_name" {
  description = "branch_name"
  type        = string
  default     = ""
}

variable "source_object_key" {
  description = "The S3 object key for the source code."
}

variable "codepipeline_role_arn" {
  description = "ARN of the codepipeline IAM role"
  type        = string
}

variable "kms_key_arn" {
  description = "ARN of KMS key for encryption"
  type        = string
}

variable "stages" {
  description = "List of Map containing information about the stages of the CodePipeline"
  type        = list(map(any))
}