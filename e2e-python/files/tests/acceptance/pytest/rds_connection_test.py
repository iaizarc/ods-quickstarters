import pytest
import allure
import psycopg2
from utils.rds_connector import RDSConnector

# AWS Secrets Manager secret name
secret_name = 'rds!db-4d966cbe-ca1a-40c3-9d94-a38b1ad95980'  # Replace with your actual secret name

# Example of usage:
rds_connector = RDSConnector(
    secret_name=secret_name,
    rds_endpoint='rds-mpe-development-b1139762.cbicmqfj839p.eu-west-1.rds.amazonaws.com',
    dbname='qudampe'
)

@pytest.fixture(scope="module")
def db_connection():
    # Connect to the RDS database before the module
    rds_connector.connect()

    # Yield the cursor for tests to use
    yield rds_connector.cursor

    # Disconnect from the RDS database after the module
    rds_connector.disconnect()

@allure.feature("Database Tests")
@allure.story("Table Retrieval")
def get_tables_test(db_connection):
    """
    Test to retrieve the available tables in the database.
    """
    try:
        db_connection.execute("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';")
        tables = db_connection.fetchall()

        allure.attach("Retrieved Tables", str(tables), allure.attachment_type.TEXT)

        assert len(tables) > 0, "No tables found in the database."

    except psycopg2.Error as e:
        allure.attach("Database Error", str(e), allure.attachment_type.TEXT)
        pytest.fail(f"Error: {e}")
