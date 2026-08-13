import { getCollection, getDoc } from "./store";

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
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    tiktok: string;
  };
};

export function getTeams(): Promise<Team[]> {
  return getCollection<Team>("teams.json");
}

export async function getTeamBySlug(slug: string): Promise<Team | undefined> {
  const teams = await getTeams();
  return teams.find((t) => t.slug === slug);
}

export function getNews(): Promise<NewsItem[]> {
  return getCollection<NewsItem>("news.json");
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const news = await getNews();
  return news.find((n) => n.slug === slug);
}

export function getSchedule(): Promise<ScheduleRow[]> {
  return getCollection<ScheduleRow>("schedule.json");
}

export function getCommittee(): Promise<CommitteeMember[]> {
  return getCollection<CommitteeMember>("committee.json");
}

export async function getCommitteeMemberBySlug(
  slug: string
): Promise<CommitteeMember | undefined> {
  const committee = await getCommittee();
  return committee.find((m) => m.slug === slug);
}

export function getMentors(): Promise<Mentor[]> {
  return getCollection<Mentor>("mentors.json");
}

export function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  return getCollection<GalleryAlbum>("galleries.json");
}

export async function getGalleryAlbumBySlug(
  slug: string
): Promise<GalleryAlbum | undefined> {
  const albums = await getGalleryAlbums();
  return albums.find((a) => a.slug === slug);
}

export function getPartners(): Promise<PartnersDoc> {
  return getDoc<PartnersDoc>("partners.json");
}

export function getSettings(): Promise<SiteSettings> {
  return getDoc<SiteSettings>("settings.json");
}

export function getRegistrations(): Promise<Registration[]> {
  return getCollection<Registration>("registrations.json");
}
