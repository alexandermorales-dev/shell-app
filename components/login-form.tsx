"use client";

import { cn } from "@/lib/utils";
import { signInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useActionState } from "react";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction] = useActionState(signInAction, null);

  return (
    <form
      action={formAction}
      className={cn("flex flex-col gap-5", className)}
      {...props}
    >
      <div className="grid gap-1.5">
        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
          Correo electrónico
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-lg border-gray-200 bg-gray-50 focus:bg-white text-sm transition-colors"
        />
      </div>

      <div className="grid gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Contraseña
          </Label>
          <Link
            href="/auth/forgot-password"
            className="text-xs hover:underline underline-offset-4 transition-colors"
            style={{ color: 'var(--primary-blue)' }}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 rounded-lg border-gray-200 bg-gray-50 focus:bg-white text-sm transition-colors"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full h-11 rounded-lg text-sm font-semibold text-white mt-1 transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--primary-blue)' }}
      >
        Iniciar sesión
      </Button>
    </form>
  );
};
