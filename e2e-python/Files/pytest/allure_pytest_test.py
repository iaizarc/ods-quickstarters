import boto3
import pytest
import allure
import json
import os


def get_terraform_outputs():
    with open('terraform_outputs.json') as file:
        output_json = json.load(file)
    print(output_json)
    bitbucket_s3_name = output_json["bitbucket_s3bucket_name"]["value"]

    return {
        'bitbucket_s3_name': bitbucket_s3_name
    }


def get_env_vars():
    environment = os.environ['ENVIRONMENT']
    env_vars_path = f"environments/{environment}.json"
    with open(env_vars_path, 'r') as file:
        data = json.load(file)
    repository = data['repository']
    branch_name = data['branch_name']

    return [repository, branch_name]


@pytest.fixture(scope="module")
def s3_client():
    client = boto3.client('s3')
    return client


@allure.feature("S3 Tests")
@allure.story("Check File Presence")
def test_s3_file_present(s3_client):

    outputs_tf = get_terraform_outputs()
    env_vars = get_env_vars()

    bucket_name = outputs_tf['bitbucket_s3_name']
    file_key = env_vars[0] + '-' + env_vars[1] + '.zip'

    with allure.step("Check if file exists in S3 bucket"):
        response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix=file_key)
        file_present = 'Contents' in response

        assert file_present, f"File '{file_key}' not found in S3 bucket '{bucket_name}'"
