CREATE TABLE role (
   id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   role TEXT NOT NULL UNIQUE
);

CREATE TABLE users (
   id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
   username TEXT NOT NULL,
   email TEXT NOT NULL UNIQUE,
   password TEXT NOT NULL,
   active BOOLEAN NOT NULL,
   role_id BIGINT NOT NULL,
   study_duration_id BIGINT,
   initial_form BOOLEAN NOT NULL DEFAULT(false),
   CONSTRAINT fk_role_user FOREIGN KEY(role_id) REFERENCES role
);

CREATE TABLE revoked_token (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    token TEXT NOT NULL UNIQUE,
    revoked_at TIMESTAMP NOT NULL
);

CREATE TABLE area (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL
);

CREATE TABLE user_area (
    user_id BIGINT NOT NULL,
    area_id BIGINT NOT NULL,
    CONSTRAINT fk_user_area_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_area_area FOREIGN KEY(area_id) REFERENCES area(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, area_id)
);


CREATE TABLE reason (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL
);

CREATE TABLE user_reason (
    user_id BIGINT NOT NULL,
    reason_id BIGINT NOT NULL,
    CONSTRAINT fk_user_area_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_reason_reason FOREIGN KEY(reason_id) REFERENCES reason(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, reason_id)
);

CREATE TABLE study_day (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    week_day VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE user_day (
    user_id BIGINT NOT NULL,
    week_day_id BIGINT NOT NULL,
    CONSTRAINT fk_user_area_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_study_day FOREIGN KEY(week_day_id) REFERENCES study_day(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, week_day_id)
);

CREATE TABLE study_duration (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    duration VARCHAR(50) NOT NULL UNIQUE,
    image TEXT NOT NULL
);

ALTER TABLE users
ADD CONSTRAINT fk_user_study_duration FOREIGN KEY(study_duration_id) REFERENCES study_duration(id) ON DELETE CASCADE;

ALTER TABLE users
ADD avatar TEXT;

ALTER TABLE users
ADD banner TEXT;

ALTER TABLE users
ADD color TEXT;

CREATE TABLE chapter (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    area_id BIGINT NOT NULL,
    title TEXT NOT NULL,
    CONSTRAINT fk_area FOREIGN KEY(area_id) REFERENCES area(id) ON DELETE CASCADE
);

ALTER TABLE chapter
ADD color TEXT NOT NULL DEFAULT '#424242';

CREATE TABLE lesson (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    chapter_id BIGINT NOT NULL,
    exercise_category_id BIGINT NOT NULL,
    title TEXT NOT NULL,
    CONSTRAINT fk_exercise_category FOREIGN KEY(exercise_category_id) REFERENCES exercise_category(id) ON DELETE CASCADE,
    CONSTRAINT fk_chapter FOREIGN KEY(chapter_id) REFERENCES chapter(id) ON DELETE CASCADE
);

CREATE TABLE exercise_category (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL,
    CONSTRAINT chk_exercise_category CHECK (name IN ('MAIN', 'SECONDARY', 'ADVERGAME', 'BOSS'))
);

CREATE TABLE exercise (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    lesson_id BIGINT NOT NULL,
    exercise_type TEXT NOT NULL,
    statement TEXT NOT NULL,
    image TEXT,
    CONSTRAINT fk_lesson FOREIGN KEY(lesson_id) REFERENCES lesson(id) ON DELETE CASCADE
);

CREATE TABLE exercise_option (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    exercise_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    correct BOOLEAN,
    correct_order INTEGER,
    category TEXT,
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercise(id) ON DELETE CASCADE
);

CREATE TABLE user_answer(
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    answer TEXT NOT NULL,
    correct BOOLEAN NOT NULL,
    answer_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercise(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);