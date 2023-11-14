
variable "results_s3_bucket_name" {
  description = "the results s3 bucket to apply the policy"
  type        = string
}

variable "results_s3_bucket_arn" {
  description = "arn_for_the_results_s3_policy"
  type        = string
}

variable "account_id" {
  description = "AWS account id"
  type        = string
}
