output "codepipeline_bucket_name" {
  value       = aws_s3_bucket.codepipeline_bucket.bucket
  description = "The name of the S3 bucket used by the CodePipeline."
}

output "codepipeline_arn" {
  value       = aws_codepipeline.codepipeline.arn
  description = "The ARN of the created CodePipeline."
}

output "codebuild_project_arn" {
  value       = aws_codebuild_project.build_project.arn
  description = "The ARN of the created CodeBuild project."
}