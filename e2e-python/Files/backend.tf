terraform {
  backend "s3" {
    bucket = "bitfstate03"
    region = "eu-west-1"
    acl    = "bucket-owner-full-control"
  }
}
