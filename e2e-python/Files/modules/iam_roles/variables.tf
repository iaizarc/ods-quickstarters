variable "pipeline_role_name" {
  description = "role_name"
  type        = string
  default     = "test-PipelineRole"
}
variable "codebuild_role_name" {
  description = "role_name"
  type        = string
  default     = "test-codeBuildRole"
}

variable "pipeline_policy_name" {
  description = "Codepipeline_policy_name"
  type        = string
  default     = "codepipeline_policy"
}
variable "codebuild_policy_name" {
  description = "Codebuild_policy_name"
  type        = string
  default     = "codebuild_policy"
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
