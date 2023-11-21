import json
import glob
import xml.etree.ElementTree as ET
import xml.dom.minidom as minidom
import datetime
import os


folder_name = "great_expectations"
output_path = folder_name + "/uncommitted/validations/junit.xml"
jsons_location_path = folder_name + "/uncommitted/validations/**/*.json"

json_files = glob.glob(jsons_location_path, recursive=True)

root = ET.Element("testsuites", name="GreatExpectationsResults")

total_tests = 0
total_failures = 0

for json_file_path in json_files:

    with open(json_file_path, "r") as json_file:
        data = json.load(json_file)

    validation_time = datetime.datetime.strptime(data["meta"]["validation_time"], "%Y%m%dT%H%M%S.%fZ")
    ge_load_time = datetime.datetime.strptime(data["meta"]["batch_markers"]["ge_load_time"], "%Y%m%dT%H%M%S.%fZ")
    execution_time = validation_time - ge_load_time

    testsuite = ET.SubElement(
        root, "testsuite",
        id=data["meta"]["run_id"]["run_name"],
        name=data["meta"]["expectation_suite_name"],
        tests=str(data['statistics']['evaluated_expectations']),
        failures=str(data['statistics']['unsuccessful_expectations']),
        time=str(execution_time.total_seconds())
    )
    total_tests += data["statistics"]["evaluated_expectations"]
    total_failures += data["statistics"]["unsuccessful_expectations"]

    for idx, result in enumerate(data["results"], start=1):
        testcase = ET.SubElement(
            testsuite,
            "testcase",
            id=result["expectation_config"]["kwargs"]["batch_id"],
            name=result["expectation_config"]["expectation_type"]
        )
        if not result["success"]:
            failure = ET.SubElement(
                testcase,
                "failure",
                message=result["exception_info"]["exception_message"]
            )
            failure.text = "\n          " + result["exception_info"]["exception_traceback"] + "\n      "

root.set("tests", str(total_tests))
root.set("failures", str(total_failures))
tree = ET.ElementTree(root)

with open(output_path, 'wb') as f:
    f.write(minidom.parseString(ET.tostring(root)).toprettyxml(encoding="utf-8"))
