<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { forgotPasswordSchema } from '~/schemas/auth'

useHead({
  title: "Forgot Password",
});

definePageMeta({
  layout: false,
});

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')



const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(forgotPasswordSchema),
})

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Here you would call your actual API endpoint
    // await $fetch('/api/forgot-password', {
    //   method: 'POST',
    //   body: {
    //     email: values.email,
    //   },
    // })
    
    successMessage.value = `A password reset link has been sent to ${values.email}. Please check your inbox.`
    resetForm()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 10000)
  } catch (error) {
    errorMessage.value = 'Failed to send reset email. Please try again or contact support.'
  } finally {
    isSubmitting.value = false
  }
})
</script>
<template>
 <div class="w-full min-h-dvh lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12 bg-card">
      <div class="mx-auto grid gap-6 w-sm max-w-sm">
        <div class="grid gap-1 text-center">
          <AppLogo />
          <h1 class="text-3xl font-bold">Forgot Password</h1>
        </div>

        <Alert v-if="status === 'error'" class="flex items-start gap-3">
          <Icon name="lucide:circle-alert" class="text-lg text-destructive" />
          <AlertDescription class="text-destructive">
            Invalid email or password
          </AlertDescription>
        </Alert>

       <form @submit="onSubmit" class="space-y-6">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button type="submit" class="w-full" :disabled="isSubmitting">
            <span v-if="isSubmitting">Sending Email...</span>
            <span v-else>Send Reset Link</span>
          </Button>

          <div class="text-center text-sm">
            <NuxtLink
              to="/login"
              class="text-primary hover:underline font-medium"
            >
              Back to Login
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
    <div class="relative hidden bg-primary lg:block overflow-hidden w-full">
      <NuxtImg
        class="w-full absolute -right-[25%] top-1/2 -translate-y-1/2 scale-125 -rotate-3 rounded"
        alt="Image"
        src="/auth-hero.png"
      />
    </div>
  </div>
</template>