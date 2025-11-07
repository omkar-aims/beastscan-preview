<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { updatePasswordSchema } from "~/schemas/auth";

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(updatePasswordSchema),
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    successMessage.value = 'Your password has been updated successfully'
    resetForm()

    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (error) {
    errorMessage.value = 'Failed to update password. Please try again.'
  } finally {
    isSubmitting.value = false
  }
})
</script>

<template>
  <div
    class="flex h-full w-full items-center justify-center bg-background text-foreground"
  >
    <Card class="w-full max-w-md shadow-lg border border-border">
      <CardHeader class="text-center">
        <CardTitle class="text-2xl font-bold text-primary">
          Update Password
        </CardTitle>
        <CardDescription class="text-secondary">
          Enter your current password and choose a new one
        </CardDescription>
      </CardHeader>

      <CardContent>
        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-4 rounded-md border border-primary/30 bg-primary/10 p-4 text-sm text-primary"
        >
          {{ successMessage }}
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-4 rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {{ errorMessage }}
        </div>

        <form @submit="onSubmit" class="space-y-6">
          <FormField v-slot="{ componentField }" name="currentPassword">
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="newPassword">
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput v-bind="componentField" />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="confirmPassword">
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <PasswordInput v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            <span v-if="isSubmitting">Updating Password...</span>
            <span v-else>Update Password</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
