export type Account = {
  type: "accounts";
  id: string;
  attributes: {
    name: string;
  };
};

export type Project = {
  type: "projects";
  id: string;
  attributes: {
    name: string;
    slug: string;
    account_id: string;
  };
};

export type Token = {
  token: string | null;
  refreshToken: string | null;
};

export type Campaign = {
  type: "campaigns";
  id: string;
  attributes: {
    title: string;
    slug: string;
    short_code: string;
    status: "draft" | "published" | "archived";
    published_at: null | Date;
    project_id: string;
  };
};
