export type Profile = {
  name: string;
  initials: string;
  role: string;
  city: string;
  email: string;
  phone: string;
  stack: string[];
};

export type Service = {
  title: string;
  text: string;
};

export type CaseStudy = {
  number: string;
  title: string;
  scope: string;
  text: string;
};

export type StackGroup = {
  title: string;
  items: string[];
};
