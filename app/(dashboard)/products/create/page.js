"use client";

import PageHeader from "@/components/PageHeader";
import ProductForm from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAddProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const productData = {};
    for (const [key, value] of formData.entries()) {
      productData[key] = value;
    }

    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Ocorreu um erro criando o producto " + productData.name
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        alert("Producto " + productData.name + " criado com sucesso");
        setIsLoading(false);
        router.push("/products");
      })
      .catch((err) => {
        alert("Ocorreu um erro criando o producto " + productData.name);
        setIsLoading(false);
      });
  };

  return (
    <>
      <PageHeader title="Criar Novo Producto">
        Aqui você pode criar um novo producto.
      </PageHeader>

      <section className="mt-8">
        <ProductForm onSubmit={handleAddProduct} isLoading={isLoading} />
      </section>
    </>
  );
}
