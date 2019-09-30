data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${var.S3_BUCKET_ARN}/*"]

    principals {
      type        = "AWS"
      identifiers = [ aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn ]
    }
  }

  statement {
    actions   = ["s3:ListBucket"]
    resources = [ var.S3_BUCKET_ARN ]

    principals {
      type        = "AWS"
      identifiers = [ aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn ]
    }
  }
}

resource "aws_s3_bucket_policy" "s3_policy" {
  bucket = var.S3_BUCKET_ID
  policy = data.aws_iam_policy_document.s3_policy.json
}
