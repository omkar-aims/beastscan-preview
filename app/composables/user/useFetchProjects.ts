import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import type { ProjectsResponse, UseFetchProjectsReturn } from '@/types/project';

export const useFetchProjects = (): UseFetchProjectsReturn => {
  const data = ref<ProjectsResponse | null>(null);
  const isLoading = ref<boolean>(false);
  const error = ref<Error | null>(null);
  const apiRoutes = useApiRoutes();
  const userStore = useUserStore();

  const fetchProjects = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const accountId = userStore.activeAccountId;

      if (!accountId) {
        throw new Error('No active account ID found. Please select an account.');
      }

      const token = userStore.token.token;

      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const projectsUrl = apiRoutes.projects.replace('[ID]', accountId);

      const response = await $fetch<ProjectsResponse>(projectsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      data.value = response;
      
      if (response.data) {
        userStore.setProjects(response.data);
      }
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    fetchProjects();
  });

  return {
    data,
    isLoading,
    error,
    refetch: fetchProjects,
  };
};