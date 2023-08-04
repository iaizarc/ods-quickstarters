/*terraform {
  required_version = "~> 1.3.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.5.0"
    }
  }
}*/

provider "aws" {
  region = "eu-west-1"  # Replace with your desired AWS region
}

resource "aws_codepipeline" "codepipeline" {
  name     = "tf-test-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.codepipeline_bucket.bucket
    type     = "S3"

    /*encryption_key {
      id   = data.aws_kms_alias.s3kmskey.arn
      type = "KMS"
    }*/
  }
  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeStarSourceConnection"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        ConnectionArn    = "arn:aws:codestar-connections:eu-west-1:578819039127:connection/38f881b3-968e-4c5a-8107-ea7ff2c8ada8" //aws_codestarconnections_connection.ods_qs.arn
        FullRepositoryId = "iaizarc/ods-quickstarters"
        BranchName       = "feature/terraform-jenkins-agent"
        DetectChanges    = true
        OutputArtifactFormat = "CODE_ZIP"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["build_output"]
      version          = "1"
      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
      }
    }
  }

}

resource "aws_codestarconnections_connection" "ods_qs" {
  name          = "MyConnection"
  provider_type = "GitHub"
}

resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "test-itxaro-bucket"
}
resource "aws_s3_bucket_versioning" "s3versioning" {
  bucket = aws_s3_bucket.codepipeline_bucket.id

  versioning_configuration {
    status = "Enabled"
  }
}
/*resource "aws_s3_bucket_acl" "codepipeline_bucket_acl" {
  bucket = aws_s3_bucket.codepipeline_bucket.id
  acl    = "private"
}*/


data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "codepipeline_role" {
  name               = "test-PipelineRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role" "codebuild_role" {
  name = "test-codeBuildRole"//var.codebuild_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "codebuild.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_codebuild_project" "build_project" {
  name          = "CodeBuild-project-test"       //var.build_project_name
  service_role  = aws_iam_role.codebuild_role.arn
  build_timeout = "5"

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/standard:5.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"

    environment_variable {
      name  = "PYTHON_VERSION"
      value = "3.9"
      //type = ""
    }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = file("buildspec.yml")
  }
}

data "aws_iam_policy_document" "codepipeline_policy" {
   statement {
    sid       = ""
    actions   = ["cloudwatch:*", "s3:*", "codebuild:*"]
    resources = ["*"]
    effect    = "Allow"
  }
  statement {
    sid       = ""
    actions   = ["codestar-connections:UseConnection"]
    resources = ["*"]
    effect    = "Allow"
  }



  /*
  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketVersioning",
      "s3:PutObjectAcl",
      "s3:PutObject",
    ]

    resources = [
      aws_s3_bucket.codepipeline_bucket.arn,
      "${aws_s3_bucket.codepipeline_bucket.arn}*//*"
    ]
  }*/

/*  statement {
    effect    = "Allow"
    actions   = ["codestar-connections:UseConnection"]
    resources = [aws_codestarconnections_connection.ods_qs.arn]
  }*/

/*  statement {
    effect = "Allow"

    actions = [
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
    ]

    resources = ["*"]
  }*/
}
data "aws_iam_policy_document" "codebuild_policy" {
  statement {
    sid       = ""
    actions   = ["logs:*", "s3:*", "codebuild:*", "secretsmanager:*", "iam:*"]
    resources = ["*"]
    effect    = "Allow"
  }
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name   = "codepipeline_policy"
  role   = aws_iam_role.codepipeline_role.id
  policy = data.aws_iam_policy_document.codepipeline_policy.json
}
resource "aws_iam_role_policy" "codebuild_policy" {
  name   = "codebuild_policy"
  role   = aws_iam_role.codebuild_role.id
  policy = data.aws_iam_policy_document.codebuild_policy.json
}




/*data "aws_kms_alias" "s3kmskey" {
  name = "alias/myKmsKey"
}*/

//        OAuthToken = "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"//var.github_token  # Create a variable for your GitHub access token
