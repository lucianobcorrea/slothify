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
    exercise_type TEXT NOT NULL,
    title TEXT NOT NULL,
    CONSTRAINT fk_exercise_category FOREIGN KEY(exercise_category_id) REFERENCES exercise_category(id) ON DELETE CASCADE,
    CONSTRAINT fk_chapter FOREIGN KEY(chapter_id) REFERENCES chapter(id) ON DELETE CASCADE,
    CONSTRAINT chk_exercise_type CHECK (exercise_type IN ('DRAG_AND_DROP', 'SORTING', 'MULTIPLE_CHOICE'))
);

CREATE TABLE explanation (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    title TEXT NOT NULL,
    objective TEXT NOT NULL,
    example TEXT NOT NULL,
    tip TEXT,
    lesson_id BIGINT NOT NULL,
    CONSTRAINT fk_lesson FOREIGN KEY(lesson_id) REFERENCES lesson(id) ON DELETE CASCADE
);

CREATE TABLE key_point (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    explanation_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    CONSTRAINT fk_explanation FOREIGN KEY(explanation_id) REFERENCES explanation(id) ON DELETE CASCADE
);

CREATE TABLE exercise_category (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    image TEXT NOT NULL,
    CONSTRAINT chk_exercise_category CHECK (name IN ('SIMPLE_LEVEL', 'INTERACTIVE_LEVEL', 'ADVERGAME', 'BOSS'))
);

CREATE TABLE exercise (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    lesson_id BIGINT NOT NULL,
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

CREATE TABLE user_answer (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    answer TEXT NOT NULL,
    correct BOOLEAN NOT NULL,
    answer_date TIMESTAMP NOT NULL,
    CONSTRAINT fk_lesson FOREIGN KEY(lesson_id) REFERENCES lesson(id) ON DELETE CASCADE,
    CONSTRAINT fk_exercise FOREIGN KEY(exercise_id) REFERENCES exercise(id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE lesson
ADD sequence INTEGER NOT NULL DEFAULT 1;

CREATE TABLE user_course_progress (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    area_id BIGINT NOT NULL,
    completed_exercises INTEGER NOT NULL DEFAULT 0,
    last_unlocked_lesson_id BIGINT,
    CONSTRAINT fk_user_course_progress_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_course_progress_area FOREIGN KEY(area_id) REFERENCES area(id) ON DELETE CASCADE,
    CONSTRAINT fk_user_course_progress_lesson FOREIGN KEY(last_unlocked_lesson_id) REFERENCES lesson(id) ON DELETE CASCADE,
    UNIQUE (user_id, area_id)
);

CREATE TABLE level (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    level_number INTEGER NOT NULL UNIQUE,
    required_xp INTEGER NOT NULL,
    color TEXT NOT NULL
);

ALTER TABLE users
ADD COLUMN current_xp INTEGER NOT NULL DEFAULT 0;

ALTER TABLE users
ADD COLUMN level_id BIGINT DEFAULT 1,
ADD CONSTRAINT fk_users_level
    FOREIGN KEY (level_id)
    REFERENCES level(id);

ALTER TABLE user_answer
ADD COLUMN already_answered BOOLEAN NOT NULL DEFAULT FALSE;

CREATE TABLE ranking (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    times_in_first_place INTEGER NOT NULL DEFAULT 0,
    times_in_second_place INTEGER NOT NULL DEFAULT 0,
    times_in_third_place INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

ALTER TABLE users
ADD COLUMN coins INTEGER NOT NULL DEFAULT 100;

CREATE TABLE item (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    item_type TEXT NOT NULL,
    subtype TEXT,
    value INTEGER NOT NULL,
    rarity TEXT NOT NULL,
    duration INTEGER,
    CONSTRAINT chk_rarity CHECK (rarity IN ('COMMON', 'UNCOMMON', 'RARE')),
    CONSTRAINT chk_item_type CHECK (item_type IN ('COSMETIC', 'UTILITY')),
    CONSTRAINT chk_subtype CHECK (
        (item_type = 'UTILITY' AND subtype IN ('XP_POTION', 'OFFENSIVE_POTION'))
        OR
        (item_type = 'COSMETIC' AND subtype IN ('BANNER', 'AVATAR'))
    )
);

CREATE TABLE shop (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    item_id BIGINT NOT NULL,
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE user_item (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE user_used_item (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    effect_end_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES item(id)
);

CREATE TABLE user_data (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    completed_multiple_choice_exercises INTEGER NOT NULL DEFAULT 0,
    completed_sorting_exercises INTEGER NOT NULL DEFAULT 0,
    completed_drag_and_drop_exercises INTEGER NOT NULL DEFAULT 0,
    completed_total_exercises INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE achievement (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    xp_reward INTEGER,
    coins_reward INTEGER,
    required_exercises INTEGER,
    required_multiple_choice_exercises INTEGER,
    required_sorting_exercises INTEGER,
    required_drag_and_drop_exercises INTEGER,
    required_xp INTEGER,
    required_user_level INTEGER
);

CREATE TABLE user_achievement (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    achievement_id BIGINT NOT NULL,
    data_achieved TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (achievement_id) REFERENCES achievement(id)
);

CREATE TABLE user_daily_data (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    completed_multiple_choice_exercises INTEGER NOT NULL DEFAULT 0,
    completed_sorting_exercises INTEGER NOT NULL DEFAULT 0,
    completed_drag_and_drop_exercises INTEGER NOT NULL DEFAULT 0,
    completed_total_exercises INTEGER NOT NULL DEFAULT 0,
    total_xp INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE challenge (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    name TEXT NOT NULL,
    xp_reward INTEGER,
    coins_reward INTEGER,
    required_exercises INTEGER,
    required_multiple_choice_exercises INTEGER,
    required_sorting_exercises INTEGER,
    required_drag_and_drop_exercises INTEGER,
    required_xp INTEGER
);

CREATE TABLE user_daily_challenge (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    challenge_id BIGINT NOT NULL,
    collected BOOLEAN NOT NULL DEFAULT false,
    completed BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (challenge_id) REFERENCES challenge(id)
);

CREATE TABLE offensive (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    offensive INTEGER NOT NULL DEFAULT 0,
    last_offensive INTEGER NOT NULL DEFAULT 0,
    last_offensive_day TIMESTAMP,
    lost_offensive_day TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE user_daily_data
ADD COLUMN study_time_seconds INTEGER DEFAULT 0;

ALTER TABLE user_daily_data
ADD COLUMN study_time_reward BOOLEAN DEFAULT false;

ALTER TABLE explanation
ALTER COLUMN example TYPE TEXT;

ALTER TABLE explanation
ALTER COLUMN tip TYPE TEXT;

CREATE TABLE password_reset_token (
    id BIGINT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    user_id BIGINT NOT NULL,
    token VARCHAR(100) NOT NULL,
    expiration TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);