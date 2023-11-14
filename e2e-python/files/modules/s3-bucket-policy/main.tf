resource "aws_s3_bucket_policy" "allow_access_from_another_account" {
  bucket = var.results_s3_bucket_name
  policy = data.aws_iam_policy_document.allow_s3_get_objects.json
}

data "aws_iam_policy_document" "allow_s3_get_objects" {
  statement {
    sid       = ""
    principals {
      type        = "AWS"
      identifiers = [var.account_id]
    }
    actions   = ["s3:GetObject"]
    resources = [
      var.results_s3_bucket_arn,
      "${var.results_s3_bucket_arn}/*",
    ]
    effect    = "Allow"
  }
}

