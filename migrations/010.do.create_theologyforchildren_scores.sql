CREATE TABLE theologyforchildren_scores (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY ,
  text TEXT NOT NULL,
  quiz_id INTEGER REFERENCES theologyforchildren_quizes(id),
  user_id INTEGER REFERENCES theologyforchildren_users(id)
);