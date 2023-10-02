# -------------------------------------------
# Common Variables
# -------------------------------------------

variable "aws_region" {
  description = "AWS infrastructure region"
  type        = string
  default     = "eu-west-1"
}


variable "tags" {
  description = "Tag map for the resource"
  type        = map(string)
  default     = {}
}

# -------------------------------------------
# CodePipeline
# -------------------------------------------

variable "codepipeline_name" {
  description = "the codepipeline name"
  type        = string
  default     = "tf-test-pipeline"
}

variable "codepipeline_role_arn" {
  description = "ARN of the codepipeline IAM role"
  type        = string
}

variable "codepipeline_bucket_name" {
  description = "s3_bucket_name"
  type        = string
}

variable "bitbuckets3" {
  description = "s3_source_bucket"
  type        = string
}

variable "artifacts_store_type" {
  description = "Artifacts store type"
  type        = string
  default     = "S3"
}

variable "source_provider" {
  description = "source_provider"
  type        = string
  default     = "S3"
}

/*variable "input_artifacts" {
  description = "input_artifacts"
  type        = string
  default     = "tf-code"
}

variable "output_artifacts" {
  description = "output_artifacts"
  type        = string
  default     = "source_output"
}*/


variable "branch_name" {
  description = "branch_name"
  type        = string
  default     = "feature/TPS2021-677-jenkins-execute-great-expectations"
}

variable "detectChanges" {
  description = "flag to detect changes"
  type        = bool
  default     = true
}

variable "output_artifact_format" {
  description = "OutputArtifactFormat"
  type        = string
  default     = "CODE_ZIP"
}

variable "codebuild_project_name" {
  description = "codebuild project name"
  type        = string
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

variable "repository" {
  description = "QS bitbucket repository"
  type        = string
  default     = "e2e-python"
}
