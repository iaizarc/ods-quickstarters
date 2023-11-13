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

locals {
  unique_name = var.name

  cf_stack_name = "cft-s3"

  tags = merge(local.common_tags, {
    DeploymentDate        = formatdate("YYYYMMDD", timestamp())
    InitialDeploymentDate = time_static.deployment.rfc3339
  })
}

resource "time_static" "deployment" {}

resource "aws_cloudformation_stack" "cft-s3" {
  name          = "${var.name}-${local.id}"
  template_body = file("${path.module}/cfn-templates/cfs3.json")
  tags          = local.tags
}
