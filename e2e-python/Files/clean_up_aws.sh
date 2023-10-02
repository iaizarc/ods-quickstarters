#!/bin/bash

# Pipeline deletion
pipeline_name="tf-test-pipeline"
pipelines=$(aws codepipeline list-pipelines --output json)
pipeline_exists=$(echo "$pipelines" | jq -r --arg pipeline_name "$pipeline_name" '.pipelines[] | select(.name == $pipeline_name) | .name')

if [ -z "$pipeline_exists" ]; then
    echo "Pipeline $pipeline_name does not exist."
else
    echo "Pipeline $pipeline_name exists."
    aws codepipeline delete-pipeline --name $pipeline_name
fi

# CodeBuild project deletion
project_name="CodeBuild-project-test"
project_exists=$(aws codebuild batch-get-projects --names $project_name --output json | jq 'length')

if [ "$project_exists" -ne 0 ]; then
    aws codebuild delete-project --name $project_name
fi

# Roles deletion
# Detach and delete policies if the PipelineRole exists
role_name="test-codeBuildRole"
role_exists=$(aws iam get-role --role-name $role_name --output json | jq 'length')

if aws iam get-role --role-name test-codeBuildRole >/dev/null 2>&1; then
    # Delete the role and policies
    policies_to_delete=($(aws iam list-role-policies --role-name $role_name --query 'PolicyNames[]' --output json | jq -r '.[]'))

    for policy_name in "${policies_to_delete[@]}"; do
        aws iam delete-role-policy --role-name $role_name --policy-name $policy_name
    done

    aws iam delete-role --role-name $role_name
else
    echo "Role 'test-codeBuildRole' does not exist. Skipping deletion."
fi


role_name="test-PipelineRole"
role_exists=$(aws iam get-role --role-name $role_name --output json | jq 'length')

if aws iam get-role --role-name test-codeBuildRole >/dev/null 2>&1; then
    # Delete the role and policies
    policies_to_delete=($(aws iam list-role-policies --role-name $role_name --query 'PolicyNames[]' --output json | jq -r '.[]'))

    for policy_name in "${policies_to_delete[@]}"; do
        aws iam delete-role-policy --role-name $role_name --policy-name $policy_name
    done

    aws iam delete-role --role-name $role_name
else
    echo "Role 'test-codeBuildRole' does not exist. Skipping deletion."
fi

# codeBuildRole
role_name="test-codeBuildRole"
role_exists=$(aws iam get-role --role-name $role_name --output json | jq 'length')
if aws iam get-role --role-name test-codeBuildRole >/dev/null 2>&1; then
    # Delete the role and policies
    policies_to_delete=($(aws iam list-role-policies --role-name $role_name --query 'PolicyNames[]' --output json | jq -r '.[]'))

    for policy_name in "${policies_to_delete[@]}"; do
        aws iam delete-role-policy --role-name $role_name --policy-name $policy_name
    done

    aws iam delete-role --role-name $role_name
else
    echo "Role 'test-codeBuildRole' does not exist. Skipping deletion."
fi

if aws s3api head-bucket --bucket artifacts-e2epython >/dev/null 2>&1; then
    # Delete the objects inside the bucket
    aws s3 rm s3://artifacts-e2epython --recursive
    # Delete the bucket
    aws s3api delete-bucket --bucket artifacts-e2epython
else
    echo "Bucket 'artifacts-e2epython' does not exist. Skipping deletion."
fi
