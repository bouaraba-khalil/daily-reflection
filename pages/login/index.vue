<script setup lang="ts">
definePageMeta({
  layout: "login",
});
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { toast } from "~/components/ui/toast";

const router = useRouter();
const cookie = useCookie("Authorization");
if (cookie.value) {
  router.push("/app");
}

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string({ message: "email is required" })
      .email({ message: "email is required" }),
    password: z
      .string({ message: "password is required" })
      .min(6, { message: "password is too short" }),
  })
);

const { isSubmitting, handleSubmit, setFieldError } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await $fetch("/api/v1/login", {
      method: "POST",
      body: values,
    });
    router.push("/app");
  } catch (e: any) {
    const errors = e?.data?.errors;
    if (Array.isArray(errors)) {
      errors.forEach((error) => {
        setFieldError(error?.path, error?.message);
        if (
          typeof error?.path === "string" &&
          typeof error?.message === "string"
        )
          toast({
            description: error?.message,
            variant: "destructive",
          });
      });
    }
  }
});
</script>

<template>
  <div v-if="cookie"><Loader /></div>
  <Card v-else class="w-[350px]">
    <CardHeader>
      <CardTitle>🚀 Login</CardTitle>
      <CardDescription>Connect and commit to yourself</CardDescription>
    </CardHeader>
    <CardContent>
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="shadcn"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex justify-end py-6">
          <Button :disabled="isSubmitting" type="submit">Login</Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
