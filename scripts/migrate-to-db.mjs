// One-time migration: load data/*.json into the SQL database.
// Usage: node --env-file=.env.local scripts/migrate-to-db.mjs
import { readFile } from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";

const DATA_DIR = path.join(process.cwd(), "data");

async function readJson(file) {
  const raw = await readFile(path.join(DATA_DIR, file), "utf-8");
  return JSON.parse(raw);
}

async function main() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // settings.json (single row, id=1)
  const settings = await readJson("settings.json");
  await conn.execute(
    `INSERT INTO settings (id, site_name, tagline, hero_line1, hero_line2, hero_subtitle,
       hero_media_type, hero_media_url, registration_heading, registration_subtitle,
       championship_date, venue, contact_email, contact_address, franchise_password_hash,
       social_instagram, social_facebook, social_youtube, social_tiktok)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
       site_name=VALUES(site_name), tagline=VALUES(tagline), hero_line1=VALUES(hero_line1),
       hero_line2=VALUES(hero_line2), hero_subtitle=VALUES(hero_subtitle),
       hero_media_type=VALUES(hero_media_type), hero_media_url=VALUES(hero_media_url),
       registration_heading=VALUES(registration_heading), registration_subtitle=VALUES(registration_subtitle),
       championship_date=VALUES(championship_date), venue=VALUES(venue),
       contact_email=VALUES(contact_email), contact_address=VALUES(contact_address),
       franchise_password_hash=VALUES(franchise_password_hash),
       social_instagram=VALUES(social_instagram), social_facebook=VALUES(social_facebook),
       social_youtube=VALUES(social_youtube), social_tiktok=VALUES(social_tiktok)`,
    [
      settings.siteName, settings.tagline, settings.heroLine1, settings.heroLine2,
      settings.heroSubtitle, settings.heroMediaType, settings.heroMediaUrl,
      settings.registrationHeading, settings.registrationSubtitle, settings.championshipDate,
      settings.venue, settings.contactEmail, settings.contactAddress,
      settings.franchisePasswordHash || "", settings.socials.instagram,
      settings.socials.facebook, settings.socials.youtube, settings.socials.tiktok,
    ]
  );
  console.log("settings: migrated");

  // teams.json (order preserved via array index)
  const teams = await readJson("teams.json");
  for (let i = 0; i < teams.length; i++) {
    const t = teams[i];
    await conn.execute(
      `INSERT INTO teams (slug, sort_order, name, city, logo, color_primary, color_secondary,
         tagline, bio, social_instagram, social_facebook, social_youtube, social_tiktok, squad, partners)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         sort_order=VALUES(sort_order), name=VALUES(name), city=VALUES(city), logo=VALUES(logo),
         color_primary=VALUES(color_primary), color_secondary=VALUES(color_secondary),
         tagline=VALUES(tagline), bio=VALUES(bio), social_instagram=VALUES(social_instagram),
         social_facebook=VALUES(social_facebook), social_youtube=VALUES(social_youtube),
         social_tiktok=VALUES(social_tiktok), squad=VALUES(squad), partners=VALUES(partners)`,
      [
        t.slug, i, t.name, t.city, t.logo, t.colorPrimary, t.colorSecondary, t.tagline, t.bio,
        t.socials.instagram, t.socials.facebook, t.socials.youtube, t.socials.tiktok,
        JSON.stringify(t.squad || []), JSON.stringify(t.partners || []),
      ]
    );
  }
  console.log(`teams: migrated ${teams.length}`);

  // news.json (unshift => newest first => insert in reverse so seq ASC matches oldest-first insert)
  const news = await readJson("news.json");
  for (const n of [...news].reverse()) {
    await conn.execute(
      `INSERT INTO news (id, slug, date, title, excerpt, content, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE slug=VALUES(slug), date=VALUES(date), title=VALUES(title),
         excerpt=VALUES(excerpt), content=VALUES(content), image=VALUES(image)`,
      [n.id, n.slug, n.date, n.title, n.excerpt, n.content, n.image]
    );
  }
  console.log(`news: migrated ${news.length}`);

  // schedule.json (push => oldest first => insert in original order)
  const schedule = await readJson("schedule.json");
  for (const s of schedule) {
    await conn.execute(
      `INSERT INTO schedule (id, date, time, fixture, boat_class)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE date=VALUES(date), time=VALUES(time), fixture=VALUES(fixture),
         boat_class=VALUES(boat_class)`,
      [s.id, s.date, s.time, s.fixture, s.boatClass]
    );
  }
  console.log(`schedule: migrated ${schedule.length}`);

  // committee.json (push => oldest first => insert in original order)
  const committee = await readJson("committee.json");
  for (const c of committee) {
    await conn.execute(
      `INSERT INTO committee (id, slug, name, position, bio, photo_url)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE slug=VALUES(slug), name=VALUES(name), position=VALUES(position),
         bio=VALUES(bio), photo_url=VALUES(photo_url)`,
      [c.id, c.slug, c.name, c.position, c.bio, c.photoUrl]
    );
  }
  console.log(`committee: migrated ${committee.length}`);

  // mentors.json (original order)
  const mentors = await readJson("mentors.json");
  for (const m of mentors) {
    await conn.execute(
      `INSERT INTO mentors (id, team, name, former_club, achievements, bio, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE team=VALUES(team), name=VALUES(name), former_club=VALUES(former_club),
         achievements=VALUES(achievements), bio=VALUES(bio), photo_url=VALUES(photo_url)`,
      [m.id, m.team, m.name, m.formerClub, m.achievements, m.bio, m.photoUrl]
    );
  }
  console.log(`mentors: migrated ${mentors.length}`);

  // galleries.json (albums unshift => newest first; photos also unshift per-album)
  const albums = await readJson("galleries.json");
  let photoCount = 0;
  for (const a of [...albums].reverse()) {
    await conn.execute(
      `INSERT INTO gallery_albums (id, slug, title, date, cover_image)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE slug=VALUES(slug), title=VALUES(title), date=VALUES(date),
         cover_image=VALUES(cover_image)`,
      [a.id, a.slug, a.title, a.date, a.coverImage]
    );
    for (const p of [...a.photos].reverse()) {
      await conn.execute(
        `INSERT INTO gallery_photos (id, album_id, url, caption)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE url=VALUES(url), caption=VALUES(caption)`,
        [p.id, a.id, p.url, p.caption]
      );
      photoCount++;
    }
  }
  console.log(`gallery: migrated ${albums.length} albums, ${photoCount} photos`);

  // partners.json (push per tier => oldest first => insert in original order)
  const partners = await readJson("partners.json");
  for (const tier of ["title", "poweredBy", "broadcast", "associate"]) {
    for (const p of partners[tier] || []) {
      await conn.execute(
        `INSERT INTO partners (id, tier, name, logo_url, url)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE tier=VALUES(tier), name=VALUES(name), logo_url=VALUES(logo_url),
           url=VALUES(url)`,
        [p.id, tier, p.name, p.logoUrl, p.url]
      );
    }
  }
  console.log("partners: migrated");

  // registrations.json (unshift => newest first => insert in reverse)
  const registrations = await readJson("registrations.json");
  for (const r of [...registrations].reverse()) {
    await conn.execute(
      `INSERT INTO registrations (id, submitted_at, name, age, gender, weight, side, discipline, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE submitted_at=VALUES(submitted_at), name=VALUES(name), age=VALUES(age),
         gender=VALUES(gender), weight=VALUES(weight), side=VALUES(side),
         discipline=VALUES(discipline), role=VALUES(role)`,
      [r.id, r.submittedAt, r.name, r.age, r.gender, r.weight, r.side, r.discipline, r.role]
    );
  }
  console.log(`registrations: migrated ${registrations.length}`);

  // brand/franchise documents (unshift => newest first => insert in reverse)
  for (const [file, table] of [
    ["brand-documents.json", "brand_documents"],
    ["franchise-documents.json", "franchise_documents"],
  ]) {
    const docs = await readJson(file);
    for (const d of [...docs].reverse()) {
      await conn.execute(
        `INSERT INTO ${table} (id, title, description, file_url)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description),
           file_url=VALUES(file_url)`,
        [d.id, d.title, d.description, d.fileUrl]
      );
    }
    console.log(`${table}: migrated ${docs.length}`);
  }

  await conn.end();
  console.log("Done.");
}

main().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
