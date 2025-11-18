<script setup lang="ts">
import {
  Camera,
  CheckCircle2,
  EllipsisVertical,
  CirclePlus,
} from "lucide-vue-next";

const accounts = [
  {
    id: 1,
    name: "Emma Holland",
    email: "emma@gmail.com",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    active: true,
  },
  {
    id: 2,
    name: "Emma Holland (Work)",
    email: "emmawork@gmail.com",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    active: false,
  },
];
</script>

<template>
  <div
    class="grid grid-cols-1 items-start gap-6"
    style="grid-template-columns: 3fr 1.5fr"
  >
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <p class="text-sm text-muted-foreground">
          Manage your personal information and account security.
        </p>
      </CardHeader>

      <CardContent class="space-y-8">
        <div class="space-y-4">
          <h3 class="text-base font-semibold text-foreground">
            User Information
          </h3>

          <form class="space-y-4">
            <FormField v-slot="{ componentField }" name="name">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="text"
                    placeholder="Your name"
                    class="bg-muted border-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    type="email"
                    placeholder="you@example.com"
                    class="bg-muted border-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="pt-2">
              <Button type="submit" class="w-full sm:w-auto"
                >Update Info</Button
              >
            </div>
          </form>
        </div>

        <div class="border-t pt-6 space-y-4">
          <h3 class="text-base font-semibold text-foreground">Password</h3>

          <form class="space-y-4">
            <FormField v-slot="{ componentField }" name="oldPassword">
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    v-bind="componentField"
                    placeholder="Your current password"
                    class="bg-muted border-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="newPassword">
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    v-bind="componentField"
                    placeholder="Choose a new password"
                    class="bg-muted border-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="confirmPassword">
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    v-bind="componentField"
                    placeholder="Confirm your password"
                    class="bg-muted border-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div class="pt-2">
              <Button type="submit" class="w-full sm:w-auto"
                >Update Password</Button
              >
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
    <Card class="overflow-hidden">
      <CardContent class="flex flex-col items-center pb-8">
        <FileUpload v-slot="{ file, handleSelect, isFresh }">
          <label for="user-profile-image" class="relative cursor-pointer group">
            <Avatar class="w-32 h-32 ring-2 ring-primary/20">
              <AvatarImage v-if="file" :src="file" />
              <AvatarFallback
                class="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-semibold"
              >
                UPLOAD
              </AvatarFallback>
            </Avatar>

            <div
              v-if="isFresh"
              class="absolute top-0 left-0 w-32 h-32 rounded-full border-2 border-dashed border-primary animate-spin scale-110"
            />

            <div
              class="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-primary hover:bg-primary/90 transition-all flex justify-center items-center text-primary-foreground shadow-lg group-hover:scale-110 duration-200"
            >
              <Camera class="w-5 h-5" />
            </div>
          </label>

          <Input
            id="user-profile-image"
            type="file"
            class="hidden"
            @change="handleSelect"
          />
        </FileUpload>

        <div class="flex flex-col items-center text-center mt-4">
          <h2 class="text-xl font-bold text-foreground">Nayan Aims</h2>
          <p class="text-sm text-muted-foreground mt-0.5">Nayan@aimsInfo.com</p>
          <div
            class="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium"
          >
            <CheckCircle2 class="w-4 h-4" />
            Active Subscription - Pro Plan
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-3 w-full">
          <Button variant="default"> Manage Subscription </Button>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline">Switch Account</Button>
            </DialogTrigger>

            <DialogContent class="sm:max-w-md rounded-xl">
              <DialogHeader class="text-center">
                <DialogTitle>Manage Accounts</DialogTitle>
                <DialogDescription>
                  Switch accounts or sign in and sign out.
                </DialogDescription>
              </DialogHeader>

              <div class="space-y-3 mt-4">
                <div
                  v-for="account in accounts"
                  :key="account.id"
                  class="flex items-center justify-between px-4 py-3 rounded-xl"
                >
                  <div class="flex items-center gap-3">
                    <div class="relative">
                      <Avatar class="w-10 h-10">
                        <AvatarImage :src="account.image" />
                        <AvatarFallback>{{ account.name[0] }}</AvatarFallback>
                      </Avatar>
                      <span
                        v-if="account.active"
                        class="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-background rounded-full"
                      />
                    </div>
                    <div class="flex flex-col">
                      <span class="font-medium text-sm text-foreground">{{
                        account.name
                      }}</span>
                      <span class="text-xs text-muted-foreground">{{
                        account.email
                      }}</span>
                    </div>
                  </div>

                  <EllipsisVertical class="w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <Button class="w-full mt-4">
                <CirclePlus class="w-4 h-4 mr-2" />
                Add an account
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
