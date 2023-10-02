
variable "results_s3_bucket_name" {
  description = "the results s3 bucket to apply the policy"
  type        = string
}

variable "s3bucket_policy_name" {
  description = "name_for_the_s3bucket_policy"
  type        = string
  default     = "results_s3bucket_policy"
}

variable "s3_bucket_arn" {
  description = "arn_for_the_s3bucket_policy"
  type        = string
}

