locals {
  account_id = data.aws_caller_identity.current.account_id

}

data "aws_caller_identity" "current" {}


module "s3_artifacts_bucket" {
  source                  = "./modules/s3-bucket"

#  codepipeline_bucket     = var.codepipeline_bucket_name
#  artifacts_bucket        = var.artifacts_bucket_name
  //s3_versioning-cp        = var.s3_versioning-cp
  //s3_versioning-artifacts = var.s3_versioning-artifacts
  local_id = local.id
  projectId = var.projectId
  environment = var.environment
  repository = var.repository
  branch_name = var.branch_name
}

module "codebuild_terraform" {
  depends_on           = [ module.iam_roles ]
  source               = "./modules/codebuild"

  /*build_project_name   = var.build_project_name
  testing_project_name = var.testing_project_name
  buildspec_path       = var.buildspec_path*/

  codebuild_role_arn   = module.iam_roles.codebuild_role_arn
  codepipeline_bucket_name = module.s3_artifacts_bucket.cp_bucket_name
  e2e_results_bucket = module.s3_artifacts_bucket.results_artifacts_bucket_name
  local_id = local.id
  projectId = var.projectId
  environment = var.environment
  repository = var.repository
  branch_name = var.branch_name

}

module "iam_roles" {
  source                = "./modules/iam_roles"

/*  pipeline_role_name    = var.pipeline_role_name
  codebuild_role_name   = var.codebuild_role_name
  pipeline_policy_name  = var.pipeline_policy_name
  codebuild_policy_name = var.codebuild_policy_name*/
  local_id = local.id
  projectId = var.projectId
  environment = var.environment
}

module "codepipeline_terraform" {
  /*depends_on = [
    module.codebuild_terraform,
    module.s3_artifacts_bucket,
    module.iam_roles
  ]*/
  source                 = "./modules/codepipeline"

  //codepipeline_name      = var.codepipeline_name
  codepipeline_role_arn = module.iam_roles.codepipeline_role_arn
  codepipeline_bucket_name = module.s3_artifacts_bucket.cp_bucket_name
  bitbuckets3 = module.s3_artifacts_bucket.bitbuckets3_name
  codebuild_project_name = module.codebuild_terraform.codebuild_project_name
  local_id = local.id
  projectId = var.projectId
  environment = var.environment
  repository = var.repository
  branch_name = var.branch_name

  /*full_repository_id     = var.full_repository_id
  branch_name            = var.branch_name*/
}
module "s3-bucket-policy" {
  source                 = "./modules/s3-bucket-policy"

  results_s3_bucket_name = module.s3_artifacts_bucket.results_artifacts_bucket_name
  s3_bucket_arn = module.s3_artifacts_bucket.results_artifacts_bucket_arn

}

