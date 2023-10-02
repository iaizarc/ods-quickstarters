locals {
  terraform-data = {
    id               = local.id
    name             = var.name
    tags             = local.tags
    data_bucket_name = var.data_bucket_name
    cf_stack_outputs = aws_cloudformation_stack.cft-s3.outputs
  }
}

resource "local_file" "terraform-data" {
  filename = "${path.module}/.terraform-data.json"
  content  = jsonencode(local.terraform-data)
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
  name          = var.name
  template_body = file("${path.module}/cfn-templates/cfs3.json")
  tags          = local.tags
}
