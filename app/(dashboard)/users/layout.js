"use client";

import { useSession } from "next-auth/react";

export default function layout({ children }) {
  const { data: session } = useSession();

  if (session?.user.role !== "admin") {
    return (
      <p className="bg-red-500 text-white p-2 mt-8">
        Área Reservada Apenas Para Administradores!
      </p>
    );
  }

  return children;
}
