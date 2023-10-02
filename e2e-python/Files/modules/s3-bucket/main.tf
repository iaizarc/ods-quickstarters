resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "${var.projectId}-e2e-s3-${var.aws_region}-${var.codepipeline_bucket_name}-${var.local_id}"
}
resource "aws_s3_bucket_versioning" "s3versioning-cp" {
  bucket = aws_s3_bucket.codepipeline_bucket.id

  versioning_configuration {
    status = var.s3_versioning-cp
  }
}

resource "aws_s3_bucket" "results_artifacts_bucket" {
  bucket = "${var.projectId}-e2e-s3-${var.aws_region}-${var.e2e_results_bucket}-${var.local_id}"
}
resource "aws_s3_bucket_versioning" "s3versioning-artfcs" {
  bucket = aws_s3_bucket.results_artifacts_bucket.id

  versioning_configuration {
    status = var.s3_versioning-artifacts
  }
}
/*data "aws_iam_policy_document" "s3bucket_policy" {
  statement {
    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = ["s3:GetObject"]

    //resources = ["*"]
    resources = [
      aws_s3_bucket.results_artifacts_bucket.arn,
      "${aws_s3_bucket.results_artifacts_bucket.arn}*//*",
    ]
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.results_artifacts_bucket.id
  policy = data.aws_iam_policy_document.s3bucket_policy.json
}*/

resource "aws_s3_bucket" "bitbuckets3" {
  bucket = "${var.projectId}-e2e-s3-${var.aws_region}-${var.bitbuckets3_name}-${var.local_id}"
}

resource "aws_s3_bucket_versioning" "s3versioning-bucket" {
  bucket = aws_s3_bucket.bitbuckets3.id

  versioning_configuration {
    status = var.s3_versioning-bitbuckets3
  }
}

