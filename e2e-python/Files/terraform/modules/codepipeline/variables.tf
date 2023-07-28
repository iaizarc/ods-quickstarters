variable "aws_region" {
  description = "The AWS region to deploy the resources in."
}

variable "bucket_name" {
  description = "The name of the S3 bucket for the CodePipeline."
}

variable "pipeline_name" {
  description = "The name of the CodePipeline."
}

variable "build_project_name" {
  description = "The name of the CodeBuild project."
}

variable "pipeline_role_name" {
  description = "The name of the IAM role for the CodePipeline."
}

variable "codebuild_role_name" {
  description = "The name of the IAM role for the CodeBuild project."
}

variable "source_object_key" {
  description = "The S3 object key for the source code."
}