export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience {
  jobTitle: string;
  date: string;
  company: string;
  city: string;
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeCustom {
  title: string;
  date: string;
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom[];
}

export type ResumeKey = keyof Resume;

// helper function for backwards-compatibility
export const checkAndFixOldCustom = (custom: any) => {
  if (Array.isArray(custom)) {
    return custom;
  } else {
    console.log("Fixing cache from old version.");
    const customItem: ResumeCustom = {
      title: "",
      date: "",
      descriptions: (custom && custom.descriptions) ? custom.descriptions : [],
    };
    return [customItem];
  }
};
