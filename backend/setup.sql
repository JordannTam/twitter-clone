-- User table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), 
    username VARCHAR(255),
    bio VARCHAR(255),
    email VARCHAR(255),
    emailVerified VARCHAR(255),
    image VARCHAR(255),
    coverImage VARCHAR(255),
    profileImage VARCHAR(255),
    hashedPassword VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hasNotification BOOLEAN
);

-- Follow Table
CREATE TABLE follows (
    id1 SERIAL NOT NULL,
    id2 SERIAL NOT NULL,
    FOREIGN KEY (id1) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id2) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (id1, id2)
);

-- Post Table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    body TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId SERIAL,
    image VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    postId SERIAL,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Comment Table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    body TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId SERIAL,
    postId SERIAL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Notification Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    body TEXT,
    userId SERIAL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


ALTER table users owner to twitter_clone;
ALTER table follows owner to twitter_clone;
ALTER table posts owner to twitter_clone;
ALTER table likes owner to twitter_clone;
ALTER table comments owner to twitter_clone;
ALTER table notifications owner to twitter_clone;


INSERT INTO users (id, name, username, bio, email, hashedpassword) VALUES (1, 'jordan', 'jordan', 'Hello World', 'jordan@test.com', 'password');