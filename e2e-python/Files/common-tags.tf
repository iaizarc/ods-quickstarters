locals {
  common_tags = {
    BusinessApplicationName = upper(var.meta_business_application_name)
    BusinessServiceName     = upper(var.meta_business_service_name)
  }
}

variable "meta_business_application_name" {
  description = "The name of the business application system."
  type        = string
  default     = "BI-IS-TESTPG"
}

variable "meta_business_service_name" {
  description = "The name of the business service."
  type        = string
  default     = "BI-IS-TESTPG"
}
