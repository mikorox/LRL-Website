import { query } from "./db";

type TeamRow = {
  slug: string;
  name: string;
  city: string;
  logo: string;
  color_primary: string;
  color_secondary: string;
  tagline: string;
  bio: string;
  social_instagram: string;
  social_facebook: string;
  social_youtube: string;
  social_tiktok: string;
  squad: { name: string; role: string }[] | string;
  partners: string[] | string;
};

type NewsRow = {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
};

type ScheduleDbRow = {
  id: string;
  date: string;
  time: string;
  fixture: string;
  boat_class: string;
};

type CommitteeRow = {
  id: string;
  slug: string;
  name: string;
  position: string;
  bio: string;
  photo_url: string;
};

type MentorRow = {
  id: string;
  team: string;
  name: string;
  former_club: string;
  achievements: string;
  bio: string;
  photo_url: string;
};

type GalleryAlbumRow = {
  id: string;
  slug: string;
  title: string;
  date: string;
  cover_image: string;
};

type GalleryPhotoRow = {
  id: string;
  album_id: string;
  url: string;
  caption: string;
};

type PartnerRow = {
  id: string;
  tier: "title" | "poweredBy" | "broadcast" | "associate";
  name: string;
  logo_url: string;
  url: string;
};

type RegistrationRow = {
  id: string;
  submitted_at: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  side: string;
  discipline: string;
  role: string;
  profile_picture_url: string;
  nic_passport_url: string;
};

type DocumentRow = {
  id: string;
  title: string;
  description: string;
  file_url: string;
};

type SettingsRow = {
  site_name: string;
  tagline: string;
  hero_line1: string;
  hero_line2: string;
  hero_subtitle: string;
  hero_media_type: "none" | "image" | "video";
  hero_media_url: string;
  registration_heading: string;
  registration_subtitle: string;
  championship_date: string;
  venue: string;
  contact_email: string;
  contact_address: string;
  franchise_password_hash: string;
  social_instagram: string;
  social_facebook: string;
  social_youtube: string;
  social_tiktok: string;
};

// mysql2 returns JSON columns already parsed on modern drivers, but parse
// defensively in case a column comes back as a raw string.
function parseJsonColumn<T>(value: T | string, fallback: T): T {
  if (typeof value !== "string") return value ?? fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function teamFromRow(r: TeamRow): Team {
  return {
    slug: r.slug,
    name: r.name,
    city: r.city,
    logo: r.logo,
    colorPrimary: r.color_primary,
    colorSecondary: r.color_secondary,
    tagline: r.tagline,
    bio: r.bio || "",
    socials: {
      instagram: r.social_instagram,
      facebook: r.social_facebook,
      youtube: r.social_youtube,
      tiktok: r.social_tiktok,
    },
    squad: parseJsonColumn(r.squad, []),
    partners: parseJsonColumn(r.partners, []),
  };
}

function newsFromRow(r: NewsRow): NewsItem {
  return {
    id: r.id,
    slug: r.slug,
    date: r.date,
    title: r.title,
    excerpt: r.excerpt || "",
    content: r.content || "",
    image: r.image,
  };
}

function scheduleFromRow(r: ScheduleDbRow): ScheduleRow {
  return { id: r.id, date: r.date, time: r.time, fixture: r.fixture, boatClass: r.boat_class };
}

function committeeFromRow(r: CommitteeRow): CommitteeMember {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    position: r.position,
    bio: r.bio || "",
    photoUrl: r.photo_url,
  };
}

function mentorFromRow(r: MentorRow): Mentor {
  return {
    id: r.id,
    team: r.team,
    name: r.name,
    formerClub: r.former_club,
    achievements: r.achievements,
    bio: r.bio || "",
    photoUrl: r.photo_url,
  };
}

function documentFromRow(r: DocumentRow): BrandDocument {
  return { id: r.id, title: r.title, description: r.description, fileUrl: r.file_url };
}

function settingsFromRow(r: SettingsRow): SiteSettings {
  return {
    siteName: r.site_name,
    tagline: r.tagline,
    heroLine1: r.hero_line1,
    heroLine2: r.hero_line2,
    heroSubtitle: r.hero_subtitle || "",
    heroMediaType: r.hero_media_type,
    heroMediaUrl: r.hero_media_url,
    registrationHeading: r.registration_heading,
    registrationSubtitle: r.registration_subtitle || "",
    championshipDate: r.championship_date,
    venue: r.venue,
    contactEmail: r.contact_email,
    contactAddress: r.contact_address,
    franchisePasswordHash: r.franchise_password_hash || "",
    socials: {
      instagram: r.social_instagram,
      facebook: r.social_facebook,
      youtube: r.social_youtube,
      tiktok: r.social_tiktok,
    },
  };
}

export type Team = {
  slug: string;
  name: string;
  city: string;
  logo: string;
  colorPrimary: string;
  colorSecondary: string;
  tagline: string;
  bio: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
  squad: { name: string; role: string }[];
  partners: string[];
};

export type NewsItem = {
  id: string;
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
};

export type ScheduleRow = {
  id: string;
  date: string;
  time: string;
  fixture: string;
  boatClass: string;
};

export type CommitteeMember = {
  id: string;
  slug: string;
  name: string;
  position: string;
  bio: string;
  photoUrl: string;
};

export type Mentor = {
  id: string;
  team: string;
  name: string;
  formerClub: string;
  achievements: string;
  bio: string;
  photoUrl: string;
};

export type GalleryPhoto = {
  id: string;
  url: string;
  caption: string;
};

export type GalleryAlbum = {
  id: string;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  photos: GalleryPhoto[];
};

export type PartnerEntry = {
  id: string;
  name: string;
  logoUrl: string;
  url: string;
};

export type PartnersDoc = {
  title: PartnerEntry[];
  poweredBy: PartnerEntry[];
  broadcast: PartnerEntry[];
  associate: PartnerEntry[];
};

export type BrandDocument = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
};

export type Registration = {
  id: string;
  submittedAt: string;
  name: string;
  age: string;
  gender: string;
  weight: string;
  side: string;
  discipline: string;
  role: string;
  profilePictureUrl: string;
  nicPassportUrl: string;
};

export type SiteSettings = {
  siteName: string;
  tagline: string;
  heroLine1: string;
  heroLine2: string;
  heroSubtitle: string;
  heroMediaType: "none" | "image" | "video";
  heroMediaUrl: string;
  registrationHeading: string;
  registrationSubtitle: string;
  championshipDate: string;
  venue: string;
  contactEmail: string;
  contactAddress: string;
  franchisePasswordHash: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
};

export async function getTeams(): Promise<Team[]> {
  const rows = await query<TeamRow[]>("SELECT * FROM teams ORDER BY sort_order ASC");
  return rows.map(teamFromRow);
}

export async function getTeamBySlug(slug: string): Promise<Team | undefined> {
  const rows = await query<TeamRow[]>("SELECT * FROM teams WHERE slug = ? LIMIT 1", [slug]);
  return rows[0] ? teamFromRow(rows[0]) : undefined;
}

export async function getNews(): Promise<NewsItem[]> {
  const rows = await query<NewsRow[]>("SELECT * FROM news ORDER BY seq DESC");
  return rows.map(newsFromRow);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const rows = await query<NewsRow[]>("SELECT * FROM news WHERE slug = ? LIMIT 1", [slug]);
  return rows[0] ? newsFromRow(rows[0]) : undefined;
}

export async function getSchedule(): Promise<ScheduleRow[]> {
  const rows = await query<ScheduleDbRow[]>("SELECT * FROM schedule ORDER BY seq ASC");
  return rows.map(scheduleFromRow);
}

export async function getCommittee(): Promise<CommitteeMember[]> {
  const rows = await query<CommitteeRow[]>("SELECT * FROM committee ORDER BY seq ASC");
  return rows.map(committeeFromRow);
}

export async function getCommitteeMemberBySlug(
  slug: string
): Promise<CommitteeMember | undefined> {
  const rows = await query<CommitteeRow[]>(
    "SELECT * FROM committee WHERE slug = ? LIMIT 1",
    [slug]
  );
  return rows[0] ? committeeFromRow(rows[0]) : undefined;
}

export async function getMentors(): Promise<Mentor[]> {
  const rows = await query<MentorRow[]>("SELECT * FROM mentors ORDER BY seq ASC");
  return rows.map(mentorFromRow);
}

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  const albumRows = await query<GalleryAlbumRow[]>(
    "SELECT * FROM gallery_albums ORDER BY seq DESC"
  );
  const photoRows = await query<GalleryPhotoRow[]>(
    "SELECT * FROM gallery_photos ORDER BY seq DESC"
  );
  return albumRows.map((a) => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    date: a.date,
    coverImage: a.cover_image,
    photos: photoRows
      .filter((p) => p.album_id === a.id)
      .map((p) => ({ id: p.id, url: p.url, caption: p.caption })),
  }));
}

export async function getGalleryAlbumBySlug(
  slug: string
): Promise<GalleryAlbum | undefined> {
  const albums = await getGalleryAlbums();
  return albums.find((a) => a.slug === slug);
}

export async function getPartners(): Promise<PartnersDoc> {
  const rows = await query<PartnerRow[]>("SELECT * FROM partners ORDER BY tier ASC, seq ASC");
  const doc: PartnersDoc = { title: [], poweredBy: [], broadcast: [], associate: [] };
  for (const r of rows) {
    doc[r.tier].push({ id: r.id, name: r.name, logoUrl: r.logo_url, url: r.url });
  }
  return doc;
}

export async function getSettings(): Promise<SiteSettings> {
  const rows = await query<SettingsRow[]>("SELECT * FROM settings WHERE id = 1 LIMIT 1");
  return settingsFromRow(rows[0]);
}

export async function getRegistrations(): Promise<Registration[]> {
  const rows = await query<RegistrationRow[]>("SELECT * FROM registrations ORDER BY seq DESC");
  return rows.map((r) => ({
    id: r.id,
    submittedAt: r.submitted_at,
    name: r.name,
    age: r.age,
    gender: r.gender,
    weight: r.weight,
    side: r.side,
    discipline: r.discipline,
    role: r.role,
    profilePictureUrl: r.profile_picture_url,
    nicPassportUrl: r.nic_passport_url,
  }));
}

export async function getBrandDocuments(): Promise<BrandDocument[]> {
  const rows = await query<DocumentRow[]>("SELECT * FROM brand_documents ORDER BY seq DESC");
  return rows.map(documentFromRow);
}

export async function getFranchiseDocuments(): Promise<BrandDocument[]> {
  const rows = await query<DocumentRow[]>("SELECT * FROM franchise_documents ORDER BY seq DESC");
  return rows.map(documentFromRow);
}
