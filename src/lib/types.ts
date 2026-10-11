export type Experience = {
  title: string;
  org: string;
  dates: string;
  bullets: string[];
};

export type Project = {
  name: string;
  url: string;
  blurb: string;
};

export type Education = {
  school: string;
  detail: string;
  dates: string;
};

export type Profile = {
  name: string;
  tagline: string;
  location: string;
  phone?: string;
  email: string;
  github: string;
  linkedin?: string;
  website?: string;
  citizen?: string;
  resumePdf?: string;
  tryhackme: {
    username: string;
    userPublicId?: string;
    userHash?: string;
  };
  summary: string;
  experience: Experience[];
  projects: Project[];
  skills: Record<string, string[]>;
  education: Education[];
  recentRoomsLimit?: number;
};

export type ThmRoom = {
  code: string;
  title: string;
  image: string | null;
  url: string;
  difficulty?: string | null;
  completedAt?: string | null;
  localImage?: string | null;
};

export type ThmData = {
  live: boolean;
  username: string;
  fetchedAt: string;
  stats: {
    streak: string;
    rank: number | string | null;
    badges: number | null;
    completedRooms: number | null;
    level: string | null;
    profileImage?: string | null;
  };
  /** @deprecated use rooms — kept for older caches */
  recentRooms?: ThmRoom[];
  rooms?: ThmRoom[];
};
