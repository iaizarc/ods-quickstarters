output "cp_bucket_arn" {
  value       = aws_s3_bucket.codepipeline_bucket.arn
  description = "The ARN of the S3 Bucket"
}

output "cp_bucket_name" {
  value       = aws_s3_bucket.codepipeline_bucket.bucket
  description = "The Name of the S3 Bucket"
}
output "cp_bucket_id" {
  value       = aws_s3_bucket.codepipeline_bucket.id
  description = "The ID of the S3 Bucket"
}

output "results_artifacts_bucket_arn" {
  value       = aws_s3_bucket.results_artifacts_bucket.arn
  description = "The ARN of the results artifacts S3 Bucket"
}
output "results_artifacts_bucket_name" {
  value       = aws_s3_bucket.results_artifacts_bucket.bucket
  description = "The Name of the results artifacts S3 Bucket"
}
output "results_artifacts_bucket_id" {
  value       = aws_s3_bucket.results_artifacts_bucket.id
  description = "The ID of the results artifacts S3 Bucket"
}

output "bitbuckets3_arn" {
  value       = aws_s3_bucket.bitbuckets3.arn
  description = "The ARN of the bitbucket S3 Bucket"
}
output "bitbuckets3_name" {
  value       = aws_s3_bucket.bitbuckets3.bucket
  description = "The Name of the bitbucket S3 Bucket"
}
output "bitbuckets3_id" {
  value       = aws_s3_bucket.bitbuckets3.id
  description = "The ID of the bitbucket S3 Bucket"
}
