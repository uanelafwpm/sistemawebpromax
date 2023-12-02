import PageHeader from "@/components/PageHeader";
import UsersTable from "@/components/UsersTable";
import React from "react";

export default function page() {
  return (
    <>
      <PageHeader title="Lista de Usuários">
        Aqui você pode listar e visualizar os usuários registados no sistema.
      </PageHeader>

      <section className="mt-8">
        <UsersTable />
      </section>
    </>
  );
}
