-- Lanka Rowing League — MySQL/MariaDB schema
-- Mirrors the shapes in src/lib/data.ts. Ordering columns (`seq`) exist
-- because the old file-based store relied on array position (unshift =
-- newest-first, push = oldest-first); each table's seq is read in the
-- direction that replicates the original behavior.

CREATE TABLE IF NOT EXISTS settings (
  id TINYINT UNSIGNED PRIMARY KEY,
  site_name VARCHAR(255) NOT NULL DEFAULT '',
  tagline VARCHAR(255) NOT NULL DEFAULT '',
  hero_line1 VARCHAR(255) NOT NULL DEFAULT '',
  hero_line2 VARCHAR(255) NOT NULL DEFAULT '',
  hero_subtitle TEXT,
  hero_media_type VARCHAR(16) NOT NULL DEFAULT 'none',
  hero_media_url VARCHAR(500) NOT NULL DEFAULT '',
  registration_heading VARCHAR(255) NOT NULL DEFAULT '',
  registration_subtitle TEXT,
  championship_date VARCHAR(64) NOT NULL DEFAULT '',
  venue VARCHAR(255) NOT NULL DEFAULT '',
  contact_email VARCHAR(255) NOT NULL DEFAULT '',
  contact_address VARCHAR(255) NOT NULL DEFAULT '',
  franchise_password_hash VARCHAR(255) NOT NULL DEFAULT '',
  social_instagram VARCHAR(500) NOT NULL DEFAULT '',
  social_facebook VARCHAR(500) NOT NULL DEFAULT '',
  social_youtube VARCHAR(500) NOT NULL DEFAULT '',
  social_tiktok VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS teams (
  slug VARCHAR(64) PRIMARY KEY,
  sort_order INT NOT NULL DEFAULT 0,
  name VARCHAR(255) NOT NULL DEFAULT '',
  city VARCHAR(255) NOT NULL DEFAULT '',
  logo VARCHAR(500) NOT NULL DEFAULT '',
  color_primary VARCHAR(16) NOT NULL DEFAULT '',
  color_secondary VARCHAR(16) NOT NULL DEFAULT '',
  tagline VARCHAR(500) NOT NULL DEFAULT '',
  bio TEXT,
  social_instagram VARCHAR(500) NOT NULL DEFAULT '',
  social_facebook VARCHAR(500) NOT NULL DEFAULT '',
  social_youtube VARCHAR(500) NOT NULL DEFAULT '',
  social_tiktok VARCHAR(500) NOT NULL DEFAULT '',
  squad JSON,
  partners JSON
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS news (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  date VARCHAR(64) NOT NULL DEFAULT '',
  title VARCHAR(500) NOT NULL DEFAULT '',
  excerpt TEXT,
  content LONGTEXT,
  image VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq DESC (newest first, matches old unshift)

CREATE TABLE IF NOT EXISTS schedule (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  date VARCHAR(64) NOT NULL DEFAULT '',
  time VARCHAR(64) NOT NULL DEFAULT '',
  fixture VARCHAR(500) NOT NULL DEFAULT '',
  boat_class VARCHAR(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq ASC (matches old push)

CREATE TABLE IF NOT EXISTS committee (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL DEFAULT '',
  position VARCHAR(255) NOT NULL DEFAULT '',
  bio TEXT,
  photo_url VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq ASC (matches old push)

CREATE TABLE IF NOT EXISTS mentors (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  team VARCHAR(255) NOT NULL DEFAULT '',
  name VARCHAR(255) NOT NULL DEFAULT '',
  former_club VARCHAR(255) NOT NULL DEFAULT '',
  achievements VARCHAR(500) NOT NULL DEFAULT '',
  bio TEXT,
  photo_url VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq ASC

CREATE TABLE IF NOT EXISTS gallery_albums (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL DEFAULT '',
  date VARCHAR(64) NOT NULL DEFAULT '',
  cover_image VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq DESC (matches old unshift)

CREATE TABLE IF NOT EXISTS gallery_photos (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  album_id CHAR(36) NOT NULL,
  url VARCHAR(500) NOT NULL DEFAULT '',
  caption VARCHAR(500) NOT NULL DEFAULT '',
  FOREIGN KEY (album_id) REFERENCES gallery_albums(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq DESC (matches old unshift of newly-added photos)

CREATE TABLE IF NOT EXISTS partners (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  tier VARCHAR(16) NOT NULL,
  name VARCHAR(255) NOT NULL DEFAULT '',
  logo_url VARCHAR(500) NOT NULL DEFAULT '',
  url VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq ASC within each tier (matches old push)

CREATE TABLE IF NOT EXISTS registrations (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  submitted_at VARCHAR(64) NOT NULL DEFAULT '',
  name VARCHAR(255) NOT NULL DEFAULT '',
  age VARCHAR(16) NOT NULL DEFAULT '',
  gender VARCHAR(16) NOT NULL DEFAULT '',
  weight VARCHAR(16) NOT NULL DEFAULT '',
  side VARCHAR(32) NOT NULL DEFAULT '',
  discipline VARCHAR(32) NOT NULL DEFAULT '',
  role VARCHAR(255) NOT NULL DEFAULT '', -- comma-separated; multiple roles can be selected
  profile_picture_url VARCHAR(500) NOT NULL DEFAULT '',
  nic_passport_url VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq DESC (matches old unshift)

CREATE TABLE IF NOT EXISTS brand_documents (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  title VARCHAR(500) NOT NULL DEFAULT '',
  description VARCHAR(1000) NOT NULL DEFAULT '',
  file_url VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq DESC (matches old unshift)

CREATE TABLE IF NOT EXISTS franchise_documents (
  id CHAR(36) PRIMARY KEY,
  seq BIGINT UNSIGNED AUTO_INCREMENT UNIQUE,
  title VARCHAR(500) NOT NULL DEFAULT '',
  description VARCHAR(1000) NOT NULL DEFAULT '',
  file_url VARCHAR(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
-- display order: seq DESC (matches old unshift)
