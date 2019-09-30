module "website_bucket" {
  source = "./modules/s3-static-website"
  bucket_name = "static-18n"
}

module "cloudfront" {
  source = "./modules/cloudfront"
  ORGIN_ID = "static-with-18n"
  DOMAIN_NAME = module.website_bucket.S3_BUCKET_ADDRESS
  S3_BUCKET_ARN = module.website_bucket.S3_BUCKET_ARN
  S3_BUCKET_ID = module.website_bucket.S3_BUCKET_ID
  VIEWER_REQUEST_ARN = module.edge_lambda.arn
  ORIGIN_RESPONSE_ARN = module.origin_response_lambda.arn
}

module "edge_lambda" {
  source = "./modules/lambda"
  lambda_location = "../lambda"
  aws_region = "us-east-1"
}

module "origin_response_lambda" {
  source = "./modules/lambda"
  lambda_location = "../origin-response-lambda"
  aws_region = "us-east-1"
}