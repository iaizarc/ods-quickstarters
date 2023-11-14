
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
      name  = "ENVIRONMENT"
      value = var.environment
    }
  }


  source {
    type      = var.source_type
    report_build_status = var.report_build_status
    buildspec = <<-EOT
      version: 0.2

      phases:
        install:
          runtime-versions:
            python: ${var.env_version}

        pre_build:
          commands:
            - pip install -r requirements.txt
            - npm install -g allure-commandline --save-dev

        build:
          commands:
            - python utils/checkpoints_executions.py
            - python -m pytest --alluredir=pytest/test_results --junitxml=pytest/test_results/junit.xml


        post_build:
          commands:
            - great_expectations -y docs build
            - aws s3 cp great_expectations/uncommitted/data_docs/local_site s3://${var.e2e_results_bucket_name}/GX_test_results --recursive
            - python utils/json2JUnit.py

            - aws s3 cp s3://${var.e2e_results_bucket_name}/pytest_results/allure_report/history/ pytest/allure_report/history/ --recursive
            - allure generate pytest/test_results -o pytest/allure_report --clean
            - allure-combine pytest/allure_report
            - aws s3 cp pytest/allure_report/history s3://${var.e2e_results_bucket_name}/pytest_results/history --recursive
            - aws s3 cp pytest/allure_report/complete.html s3://${var.e2e_results_bucket_name}/pytest_results/allure_report/complete.html

            - aws s3 cp great_expectations/uncommitted/validations/junit.xml s3://${var.e2e_results_bucket_name}/junit/GX_junit.xml
            - aws s3 cp pytest/test_results/junit.xml s3://${var.e2e_results_bucket_name}/junit/Pytest_junit.xml


      reports:
        GX_reports:
          files:
            - junit.xml
          base-directory: great_expectations/uncommitted/validations/
          file-format: JUNITXML
        Allure_report:
          files:
            - junit.xml
          base-directory: pytest/test_results/
          file-format: JUNITXML

      EOT
  }
}
