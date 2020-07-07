CREATE TABLE theologyforchildren_verses (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    content TEXT NOT NULL,
    notes TEXT,
    chapterId INTEGER REFERENCES theologyforchildren_chapters(id)
);