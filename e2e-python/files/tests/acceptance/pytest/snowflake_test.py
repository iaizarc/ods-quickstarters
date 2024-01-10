import snowflake.connector as connector
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa




snowflake_username = "RAUL.DALGAMONNI_ALONSO.EXT@BOEHRINGER-INGELHEIM.COM"

passphrase = "6tROmbCkkjcA"
key = """
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIJ+bYlZUiHBMCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBDTs57dLxvmczG4q+F0Ls9XBIIE
0BUfsSuXDsGAS5Ldebn4EZy1DrVRzLkSlIPkszoHDjwlxKBZNCUhRqzXHdKFiuuI
C+pgonPxPDEgl1slvLybD4uZcP2o8v5rc+CGU6ZGIYCDjnU5vNo5XwU+kIKtRUEE
HUo/YFlsc3mmTi0TR3zStkL/m9hE4bFEH0hHkpYEaSev7q7H8ZCo/ue6140zrJb1
jRatP4mw7/24HZvn4f0UXo9xoAZGSMNx4voFgh9r1Y4/jgA418qw6roEbLC5dHSR
B+dyYS+wtuOFot5JwJ0qRA9L/WnbDgr5Xy3v/tb0oJw8VIvCZ3w22anflEKnrzvk
tgEekWpfFvtKdYCi2lRbNLQK9Uw6MBbCtamvRUcAGIc1KnRWz1vBnlSw8Xf3hDRN
LD2EYyxO+imRIcella76cT4QlYDIu/0RTqNLo4DAgeOMxIZO7mvscvddoS5qlFh6
haT2bh6T21mVvc1mEJ/uUmkbOQ4i9Dt04QFRaol53q8tgyCU9+BE2+8mmmTjaDmw
NmQk2upiyBDoLNyw18U/mTJCWBk+9om3u8RhseTrZRTapCHQZ5X00GfGLteEnfLg
WVcyRsarFnPzjtT0lBVYE2aId+d78C7dTzKU8u7Or6V3NRuDcWSq4TiOZLpGEDoz
G25CD0BTDqYrL3K1LOfQidCZ34iq+dGOLfSsrSa6to3xM5efUYBjmgt9tprGtNjA
GJDC9xY0qnCJgKo8xTx2LL96gHuUVEAWO9LO/PDQ2cnOUSph2/vQh0ki/d6yqNEg
9ovrCUzD9yo3LeQDglfmlcj+/YHwc2oOwaDA8DzTwvHgUnQVT4H7WjL85Eun9dzm
73jBGbWRpefO98LE6U3tlYL6ODo1Bm8UsZOu6W1Erb7q68tBtYC60g0ToYMt7Gqx
rUPp3+sqKEO1QtGanWGphgfvTdvzYo5fjIj9Vz+wsVPZNS2enf4vwZjUI1N3sdzx
xrcVl3mnNxfWQVphKDiXngPN9Sw7ZliFjmhbOfO54IErtbrEMHZvbuf7qVAaRJI1
KiRbSqJEX2NZKNrWYHe9xTx1p7tzTMz7vCz6E53DvikeeF3s2TKJ+Smc9InC+GIO
VNlzR5dh0ICV/qlA7SpoHSFr6MjIZlKxKMbELwyLbiMXR5U+otJlcWOC/eA42AxC
Iqj5QtAMgXhuBAqZyfw6Y439oZJO2G1UqFJ5XNXM/rrFaXsiDYd92q7i4NKA6xf7
vMNQktGYVuic1Ez2qf1iS514u9yvjlqMmzHW596Pqrd3fkhBaB365BiLKqfV8S3e
awhZHZXdQg/cjdG8/SRHIeKON6lioCeBgEQ6n4UG/OTvXxSf8orCNTuP7i1e5UTh
spzunoe2eQNGrWpCznBU1QgK9F8XY79rYYFFtZ3oKXdtJfDfnhRHLjhfhGv6PIjF
UnDcsOao6iSzoOfH9rLUJ8P5jj5elbg0kgj412ukUcP755jWt01/D7QbF3yUpDgp
NNEaW2sbOHSUGJ4vk80Slsg/q7qsbhD+9LqFX4qT+8JARQhyLpykjgrhaFMpl6Py
Lew04M0Wd6H8zu2tOVrWNv1P6dumD1s/FtefDUzqorYyIQtSsvXUOjLkdSh7PGZv
DfT2zbK6+t3XmE7B+oxXHJAAwGUeE3dZKsVdPruH+PIM
-----END ENCRYPTED PRIVATE KEY-----
"""


# Load private key
p_key = serialization.load_pem_private_key(
    bytes(key, encoding="utf-8"),
    password=passphrase.encode(),
    backend=default_backend()
)

snowflake_account = "BI-EMEADEV"
#snowflake_role = "BI-AS-ATLASSIAN-P-GLAMP-TEAM"
snowflake_role = "PUBLIC"

conn = connector.connect(
    user=snowflake_username,
    private_key=p_key,
    account=snowflake_account,
    role=snowflake_role,
)

cursor = conn.cursor()

cursor.execute("""SELECT 1; """)
result = cursor.fetchall()
print(result)
cursor.execute("SELECT CURRENT_ROLE()")
result = cursor.fetchall()
print(result)
cursor.execute(f"""SHOW GRANTS TO USER "{snowflake_username}" """)
result = cursor.fetchall()
print(result)
