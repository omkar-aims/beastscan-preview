export interface ProjectAttributes {
  name: string;
  slug: string;
  account_id: string;
}

export interface Project {
  type: string;
  id: string;
  attributes: ProjectAttributes;
}

export interface ProjectsMeta {
  page: number;
  per_page: number;
  total: number;
}

export interface ProjectsResponse {
  data: Project[];
  meta: ProjectsMeta;
}

export interface UseFetchProjectsReturn {
  data: Ref<ProjectsResponse | null>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
  refetch: () => Promise<void>;
}