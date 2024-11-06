INSERT INTO divisions (name)
    VALUES ("Bronze"),
    ("Silver"),
    ("Crystal"),
    ("Elite"),
    ("Gold"); 

INSERT INTO users (email, password, firstName, lastName, wpm, divisionId, score, isAdmin)
    VALUES ("test@gmail.com", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", "test", "PasswordIs_test", 150, 1, 0, 0);

INSERT INTO users (email, password, firstName, lastName, wpm, divisionId, score, isAdmin)
		VALUES ("admin@admin.com", "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08", "test", "PasswordIs_test", 150, 1, 0, 1); 
    
INSERT INTO user_progress (wpm, wpmDate, userId)
    VALUES (100, "2023-04-01", 1); 

INSERT INTO login_count (userId, loginDate)
    VALUES (1, "2023-03-04"),
    (1, "2023-03-05"),
    (1, "2023-03-06"),
    (1, "2023-03-07");  

INSERT INTO time_count (userId, timeSpent, timeDate)
    VALUES (1, 240, "2023-12-12");