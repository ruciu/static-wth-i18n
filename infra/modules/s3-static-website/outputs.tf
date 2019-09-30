output "S3_BUCKET_ADDRESS" {
  value = "${aws_s3_bucket.bucket.bucket_domain_name}"
}

output "S3_BUCKET_ID" {
  value = "${aws_s3_bucket.bucket.id}"
}

output "S3_BUCKET_ARN" {
  value = "${aws_s3_bucket.bucket.arn}"
}