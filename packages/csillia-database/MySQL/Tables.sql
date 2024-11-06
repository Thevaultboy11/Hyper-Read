CREATE TABLE divisions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(255) NOT NULL 
);

CREATE TABLE  users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL, 
    wpm INT DEFAULT NULL , 
    divisionId INT DEFAULT NULL,
    score INT DEFAULT NULL,
    isAdmin INT DEFAULT NULL, 
    FOREIGN KEY (divisionId) REFERENCES divisions(id) ON DELETE CASCADE
);

CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    fileName VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    totalPages INT NOT NULL,
    title VARCHAR(255) NOT NULL, 
    currentPage INT NOT NULL, 
    isRead TINYINT DEFAULT 0, 
    isReadDate DATE, 
    uploadedAt DATE NOT NULL,
    public TINYINT DEFAULT 0, 
    author VARCHAR(255) NULL, 
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE user_progress (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    wpm INT NOT NULL, 
    wpmDate DATE NOT NULL, 
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE login_count (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL, 
    loginDate DATE NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE time_count (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL, 
    timeSpent INT NOT NULL,
    timeDate DATETIME NOT NULL, 
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE library (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    userId INT NOT NULL,
    bookId INT NOT NULL, 
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE
);