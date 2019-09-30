resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "${var.DOMAIN_NAME} origin access identity"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    origin_id   = var.ORGIN_ID
    domain_name = var.DOMAIN_NAME

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.ORGIN_ID

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    lambda_function_association {
      event_type   = "viewer-request"
      lambda_arn   = var.VIEWER_REQUEST_ARN
      include_body = false
    }

    lambda_function_association {
      event_type   = "origin-response"
      lambda_arn   = var.ORIGIN_RESPONSE_ARN
      include_body = false
    }
  }

  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}