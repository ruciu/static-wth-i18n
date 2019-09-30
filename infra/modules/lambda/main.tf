resource "random_string" "random_lambda_name" {
  length = 4
  special = false
}

locals {
  lambda_name = "${path.module}/lambda${random_string.random.result}.zip"
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = var.lambda_location
  output_path = local.lambda_name
}

resource "aws_lambda_function" "i18n_lambda" {
  filename      = local.lambda_name
  source_code_hash = filebase64sha256(local.lambda_name)
  function_name = "i18n${random_string.random_lambda_name.result}"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"

  runtime = "nodejs10.x"
  depends_on = [ data.archive_file.lambda_zip ]
  publish = true

}