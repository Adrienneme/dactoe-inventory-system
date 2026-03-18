"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

import myLogo from "@/assets/logo.png"

import { Input } from "@/components/ui/input"

import { ShieldUser } from 'lucide-react';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <img
              src={myLogo}
              alt="Company Logo"
              className="h-20 w-auto object-contain mb-5"
            />
            <h1 className="text-xl font-bold">DactoeShoeHauz Inventory</h1>
            <p className="text-xs mb-5">Enter your credentials to Access Product Management</p>

          </div>
          <Field>
            <FieldLabel htmlFor="email">Username</FieldLabel>
            <Input
              id="username"
              type="username"
              placeholder="KC1234"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="Password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </Field>
          <Field>
            <Button type="submit">LOG IN</Button>
          </Field>
          <FieldSeparator className="mt-6">System Assistance</FieldSeparator>
          <div className="flex justify-center">
            <Field className="inline-block w-fit">
              <Button variant="outline" type="button"
                className="border border-black px-3 rounded hover:bg-gray-400 transition-all group">
                <ShieldUser />
                Contact Administrator
              </Button>
            </Field>
          </div>
        </FieldGroup>
      </form>
      <FieldDescription className="px-35 text-center">

      </FieldDescription>
    </div>
  )
}
