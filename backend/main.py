from flask import *
import psycopg2
from passlib.context import CryptContext
from jose import JWTError, jwt
from json import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "6b4f6ee73021eef5a7ec638de18f83461b91fb0a778033f19111364113bcdfb8"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 45

def get_db():
    return psycopg2.connect(database="twitter_clone",
							user="twitter_clone",
							password="root",
							host="localhost", port="5432")


def verify_password(password, password_hash):
    return pwd_context.verify(password, password_hash)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_password_hash(email):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT password_hash from USERS where email=%s", (email,))
    password_hash = cur.fetchone()
    # if password_hash is None:
    #     raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
    #                         detail="Profile not found")
    return password_hash[0]

def authenticate_profile(email: str, password: str):
    password_hash = get_user_password_hash(email)
    if not verify_password(password, password_hash):
        return False
    return email

def create_access_token(data: dict):
    to_encode = data.copy()
    # expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        profile_id: str = payload.get("sub")
        # if profile_id is None:
        #     raise HTTPException(status_code=401)
        return profile_id
    except JWTError:
        # raise HTTPException(status_code=401)
        pass


@app.route("/login")
def login_for_access_token():
    conn = get_db()
    email = request.form['email']
    password = request.form['password']
    email = authenticate_profile(email, password)

    cur = conn.cursor()
    cur.execute("SELECT id FROM USERS WHERE email=%s", (email,))
    profile_id = cur.fetchone()
    print(profile_id)
    cur.close()
    conn.close()

    access_token = create_access_token(
        data={"sub": str(profile_id[0])}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.route('/')
def index():
	# Connect to the database
	conn = get_db()
	# create a cursor
	cur = conn.cursor()

	# Select all products from the table
	cur.execute('''SELECT id, name, username, bio, email, emailVerified,image,coverImage,profileImage,hashedPassword,createdAt,updatedAt,hasNotification FROM users''')

	# Fetch the data
	rows = cur.fetchall()
    
    # Extract column names from cursor.description
	column_names = [desc[0] for desc in cur.description]
    
    # Convert rows to list of dictionaries
	data = [dict(zip(column_names, row)) for row in rows]

	# close the cursor and connection
	cur.close()
	conn.close()

	return json.dumps(data)


@app.route('/register', methods=['POST'])
def register():
	conn = get_db()

	cur = conn.cursor()

	# Get the data from the form
	data = json.loads(request.data)
	email = data.get('email')
	username = data.get('username')
	name = data.get('name')
	password = data.get('password')

        
	password = get_password_hash(password)

	# Insert the data into the table
	print("//   test:", email, username, name, password)
	cur.execute(
		'''INSERT INTO users 
		(name, username, email, hashedPassword) 
          VALUES (%s, %s, %s, %s)''',
		(name, username, email, password))
        

	# commit the changes
	conn.commit()
        
	# cur.execute('''SELECT id FROM users where email=%s''', (email,))
    
	# id = cur.fetchone()

	# close the cursor and connection
	cur.close()
	conn.close()

	return {}


@app.route('/update', methods=['POST'])
def update():
	conn = psycopg2.connect(database="flask_db",
							user="postgres",
							password="root",
							host="localhost", port="5432")

	cur = conn.cursor()

	# Get the data from the form
	name = request.form['name']
	price = request.form['price']
	id = request.form['id']

	# Update the data in the table
	cur.execute(
		'''UPDATE products SET name=%s,\
		price=%s WHERE id=%s''', (name, price, id))

	# commit the changes
	conn.commit()
	return redirect(url_for('index'))


@app.route('/delete', methods=['POST'])
def delete():
	conn = get_db()
	cur = conn.cursor()

	# Get the data from the form
	id = request.form['id']

	# Delete the data from the table
	cur.execute('''DELETE FROM products WHERE id=%s''', (id,))

	# commit the changes
	conn.commit()

	# close the cursor and connection
	cur.close()
	conn.close()

	return redirect(url_for('index'))


if __name__ == '__main__':
	app.run(debug=True)
