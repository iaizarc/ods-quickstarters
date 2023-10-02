
resource "aws_codebuild_project" "build_project" {
  name          = "${var.projectId}-e2e-cb-${var.aws_region}-${var.codebuild_project_name}-${var.local_id}" //"CodeBuild-project-test"
  service_role  = var.codebuild_role_arn
  build_timeout = var.build_timeout

  artifacts {
    type = var.artifacts_type
  }

  environment {
    compute_type                = var.environment_compute_type
    image                       = var.environment_image
    type                        = var.environment_type
    image_pull_credentials_type = var.image_pull_credentials_type

    environment_variable {
      name  = var.env_name_interpreter // ${var.env_name_interpreter} ??
      value = var.env_version
    }
    environment_variable {
      name  = var.env_name_repository
      value = var.repository
    }
    environment_variable {
      name  = var.env_name_branch
      value = var.branch_name
    }
  }

  source {
    type      = var.source_type
    //buildspec = file("${var.buildspec_path}")
    report_build_status = var.report_build_status
    buildspec = <<-EOT
      version: 0.2

      phases:
        install:
          runtime-versions:
            python: 3.9

        pre_build:
          commands:
            - pip install -r requirements.txt
        build:
          commands:
            - great_expectations checkpoint run person_checkpoint
        post_build:
          commands:
            - great_expectations -y docs build #--site-name s3_bucket
            - aws s3 cp great_expectations/uncommitted/data_docs/local_site s3://${var.e2e_results_bucket}/GX_test_results --recursive
            - python json2JUnit.py


      reports:
        GX_reports:
          files:
            - junit.xml
          base-directory: great_expectations/uncommitted/validations/person_validation_suite/
          file-format: JUNITXML

      EOT
  }
}


resource "aws_codebuild_project" "Pytest_project" {
  name = "${var.projectId}-e2e-cb-${var.aws_region}-${var.Pytest_project_name}-${var.local_id}"
  description = "CodeBuild project for running tests"
  service_role  = var.codebuild_role_arn
  build_timeout = 60

  artifacts {
    type = var.artifacts_type
  }
  environment {
    compute_type                = var.environment_compute_type
    image                       = var.environment_image
    type                        = var.environment_type
    image_pull_credentials_type = var.image_pull_credentials_type

    environment_variable {
      name  = var.env_name_interpreter
      value = var.env_version
    }
  }

  source {
    type      = var.source_type
    //buildspec = file("buildspec.yml")
    buildspec = <<-EOT
      version: 0.2

      phases:
        test:
          commands:
            - pytest <test/path/or_file.py> # Replace with the appropriate test directory

      artifacts:
        files:
          - junit-test-results.xml
      EOT
  }
}


resource "aws_codebuild_project" "GXtesting_project" {
  name          = "${var.projectId}-e2e-cb-${var.aws_region}-${var.GXtest_project_name}-${var.local_id}"
  service_role  = var.codebuild_role_arn

  artifacts {
    type = var.artifacts_type
  }

  environment {
    compute_type                = var.environment_compute_type
    image                       = var.environment_image
    type                        = var.environment_type
    image_pull_credentials_type = var.image_pull_credentials_type

    environment_variable {
      name  = var.env_name_interpreter // ${var.env_name_interpreter} ??
      value = var.env_version
    }
  }

  source {
    type      = var.source_type
    //buildspec = file("${var.buildspec_path}")
    buildspec = <<-EOT
      version: 0.2

      phases:
        install:
          runtime-versions:
            python: 3.9

        build:
          commands:
            - ls
            - great_expectations checkpoint run person_checkpoint
        post_build:
          commands:
            - great_expectations docs build

        artifacts:
          files:
            - uncommitted/data_docs/**
      EOT
  }
}

resource "aws_codebuild_project" "reporting_project" {
  name          = "${var.projectId}-e2e-cb-${var.aws_region}-${var.GX_reporting_project_name}-${var.local_id}"
  service_role  = var.codebuild_role_arn
  build_timeout = 60

  artifacts {
    type = var.artifacts_type
  }

  environment {
    compute_type                = var.environment_compute_type
    image                       = var.environment_image
    type                        = var.environment_type
    image_pull_credentials_type = var.image_pull_credentials_type

    environment_variable {
      name  = var.env_name_interpreter
      value = var.env_version
    }
  }

  source {
    type      = var.source_type
    //buildspec = file("${var.buildspec_path}")
    report_build_status = var.report_build_status
    buildspec = <<-EOT
      version: 0.2

      phases:
        allure:
          files:
          - allure-report/**

        post_build:
          commands:
            - aws s3 sync allure-report/ s3://... # Replace with the appropriate S3 bucket path
            - aws s3 sync GX ... # Replace with the appropriate S3 bucket path
      EOT
  }
}

#
#resource "aws_codebuild_project" "build_gx_project" {
#  name          = "${var.GXtest_project_name}-${var.local_id}" //"CodeBuild-project-test"
#  service_role  = var.codebuild_role_arn
#  build_timeout = var.build_timeout
#
#  artifacts {
#    type = var.artifacts_type
#  }
#
#  environment {
#    compute_type                = var.environment_compute_type
#    image                       = var.environment_image
#    type                        = var.environment_type
#    image_pull_credentials_type = var.image_pull_credentials_type
#
#    environment_variable {
#      name  = var.env_name_interpreter // ${var.env_name_interpreter} ??
#      value = var.env_version
#    }
#    environment_variable {
#      name  = var.env_name_repository
#      value = var.repository
#    }
#    environment_variable {
#      name  = var.env_name_branch
#      value = var.branch_name
#    }
#  }
#
#  source {
#    type      = var.source_type
#    report_build_status = var.report_build_status
#    buildspec = <<-EOT
#      version: 0.2
#
#      phases:
#        install:
#          runtime-versions:
#            python: 3.9
#
#        build:
#          commands:
#            - ls
#            - great_expectations checkpoint run person_checkpoint
#      EOT
#  }
#}
