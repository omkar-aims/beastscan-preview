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
