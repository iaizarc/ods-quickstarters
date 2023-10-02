output "codebuild_project_name" {
  value       = aws_codebuild_project.build_project.name
  description = "Name of the CodeBuild project"
}
output "codebuild_project_arn" {
  value       = aws_codebuild_project.build_project.arn
  description = "ARN of the CodeBuild project"
}
output "codebuild_project_id" {
  value       = aws_codebuild_project.build_project.id
  description = "ID of the CodeBuild project"
}

output "Pytest_project_name" {
  value       = aws_codebuild_project.Pytest_project.name
  description = "Name of the Pytest project"
}
output "Pytest_project_arn" {
  value       = aws_codebuild_project.GXtesting_project.arn
  description = "ARN of the Pytest project"
}
output "Pytest_project_id" {
  value       = aws_codebuild_project.build_project.id
  description = "ID of the Pytest project"
}

#output "GXtest_project_name" {
#  value       = aws_codebuild_project.build_gx_project.name
#  description = "Name of the Great Expectations project"
#}

output "GXtesting_project_arn" {
  value       = aws_codebuild_project.GXtesting_project.arn
  description = "ARN of the Great Expectations project"
}
output "GXtesting_project_id" {
  value       = aws_codebuild_project.GXtesting_project.id
  description = "ID of the Great Expectations project"
}

output "reporting_project_name" {
  value       = aws_codebuild_project.build_project.name
  description = "Name of the reporting project"
}
output "reporting_project_arn" {
  value       = aws_codebuild_project.build_project.arn
  description = "ARN of the reporting project"
}
output "reporting_project_id" {
  value       = aws_codebuild_project.build_project.id
  description = "ID of the reporting project"
}
