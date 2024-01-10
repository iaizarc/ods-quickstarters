import psycopg2
import boto3
import json

class RDSConnector:
    def __init__(self, secret_name, rds_endpoint, dbname):
        self.secret_name = secret_name
        self.rds_endpoint = rds_endpoint
        self.dbname = dbname
        self.connection = None
        self.cursor = None
    def _get_db_credentials(self):
        client = boto3.client('secretsmanager')

        try:
            response = client.get_secret_value(SecretId=self.secret_name)
            secret_data = response['SecretString']
            return json.loads(secret_data)

        except Exception as e:
            print(f"Error retrieving secret: {e}")
            raise

    def connect(self):
        credentials = self._get_db_credentials()
        db_params = {
            'host': self.rds_endpoint,
            'port': 5432,
            'dbname': self.dbname,
            'user': credentials['username'],
            'password': credentials['password'],
        }

        try:
            self.connection = psycopg2.connect(**db_params)
            self.cursor = self.connection.cursor()
        except psycopg2.Error as e:
            print(f"Error: {e}")
            raise

    def disconnect(self):
        if self.cursor:
            self.cursor.close()
        if self.connection:
            self.connection.close()

