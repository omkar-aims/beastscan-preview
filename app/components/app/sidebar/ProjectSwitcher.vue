<script setup lang="ts">
import { ChevronsUpDown, Plus, FolderKanban } from "lucide-vue-next";
import { useSidebar } from "~/components/ui/sidebar";

const { isMobile } = useSidebar();

const userStore = useUserStore();
</script>

<template>
  <SidebarMenu v-if="userStore.projects">
    <Dialog>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <SidebarMenuButton
              class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <FolderKanban class="size-4" />
              </div>
              <div
                class="grid flex-1 text-left text-sm leading-tight select-none"
              >
                <span class="truncate font-semibold">
                  {{ userStore.activeProject?.attributes.name }}
                </span>
                <span class="text-xs opacity-60 data-[state=open]:opacity-100">
                  {{ userStore.activeProject?.attributes.slug }}
                </span>
              </div>
              <ChevronsUpDown class="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            :side="isMobile ? 'bottom' : 'right'"
            :side-offset="4"
          >
            <DropdownMenuLabel class="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>

            <DropdownMenuItem
              v-for="project in userStore.projects"
              :key="project.attributes.slug"
              class="font-medium gap-2 p-2 cursor-pointer"
              @click="() => userStore.setActiveProject(project.id)"
              >{{ project.attributes.name }}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem class="px-2 gap-2 cursor-pointer" as-child>
              <DialogTrigger
                class="w-full text-left flex items-center gap-2 group"
              >
                <Plus class="size-4 group-hover:text-white" />
                Add Project
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>

        <Form>
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input class="bg-white" v-bind="componentField" />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          </FormField>
        </Form>

        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="outline"> Cancel </Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </SidebarMenu>
</template>
