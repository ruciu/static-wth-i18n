output "URL" {
  value = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "ZONE_ID" {
  value = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
}
