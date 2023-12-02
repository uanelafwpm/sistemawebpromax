import PageHeader from "@/components/PageHeader";
import ProductsTable from "@/components/ProductsTable";
import React from "react";

export default function page() {
  return (
    <>
      <PageHeader title="Lista de Productos">
        Aqui você pode listar e visualizar os productos registados no sistema.
      </PageHeader>

      <section className="mt-8">
        <ProductsTable />
      </section>
    </>
  );
}
