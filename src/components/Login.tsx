"use client"

import * as React from 'react'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"


const loginSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  password: z.string().min(1, "Şifre alanı boş bırakılamaz."),
})

export default function Login() {
  const router = useRouter()
  const [isPending, setIsPending] = React.useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setIsPending(true)

      const result = await signIn("credentials", {
        email: value.email,
        password: value.password,
        callbackUrl: '/',
        redirect: true
      })

      setIsPending(false)

      if (result?.error) {
        toast.error("Giriş başarısız!", {
          description: "E-posta veya şifre hatalı.",
        })
      } else {
        toast.success("Giriş başarılı!", {
          description: "Yönlendiriliyor...",
        })

      }
    },
  })

  return (
    <div className="container">
      <form
        className="space-y-6 w-full max-w-lg mx-auto p-6 border rounded-lg shadow-sm bg-card"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <div className="flex flex-col gap-2 text-center mb-4">
          <h1 className="text-xl lg:text-3xl font-bold">Giriş Yap</h1>
        </div>

        <FieldGroup>
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className="text-xl">E-posta</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="email"
                    className="text-xl py-4 px-2"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <form.Field
            name="password"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name} className="text-xl">Şifre</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="current-password"
                    className="text-xl py-4 px-2"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <Button type="submit" size='lg' className="w-full text-xl cursor-pointer py-5" disabled={isPending}>
            {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}