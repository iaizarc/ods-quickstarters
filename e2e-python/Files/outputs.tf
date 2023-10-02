
output "codebuild_name" {
  value       = module.codebuild_terraform.codebuild_project_name
  description = "The Name of the Codebuild Project"
}

output "codebuild_arn" {
  value       = module.codebuild_terraform.codebuild_project_arn
  description = "The ARN of the Codebuild Project"
}

output "codepipeline_name" {
  value       = module.codepipeline_terraform.aws_codepipeline_name
  description = "The Name of the CodePipeline"
}

output "codepipeline_arn" {
  value       = module.codepipeline_terraform.aws_codepipeline_arn
  description = "The ARN of the CodePipeline"
}

output "iam_arn_cp" {
  value       = module.iam_roles.codepipeline_role_arn
  description = "The ARN of the IAM Role used by the CodePipeline"
}

output "iam_arn_cb" {
  value       = module.iam_roles.codebuild_role_arn
  description = "The ARN of the IAM Role used by the CodePipeline"
}

/*output "kms_arn" {
  value       = module.codepipeline_kms.arn
  description = "The ARN of the KMS key used in the codepipeline"
}*/

output "bitbuckets3_name" {
  value       = module.s3_artifacts_bucket.bitbuckets3_name
  description = "The Name of the bitbucket S3 Bucket"
}


output "stack_name" {
  description = "The name of the stack."
  value       = var.name
}

output "meta_environment" {
  description = "The type of the environment."
  value       = var.meta_environment
}
