"use client";

import PageHeader from "@/components/PageHeader";
import ProductForm from "@/components/ProductForm";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const params = useParams();
  const router = useRouter();

  const formatNumbers = (value) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  useEffect(() => {
    setIsLoadingProduct(true);
    fetch("/api/products/" + params.id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data.product);
        setIsLoadingProduct(false);
      })
      .catch((err) => {
        alert("Ocorreu um erro buscando os producto");
        setIsLoadingProduct(false);
        console.log(err);
      });
  }, []);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const productData = {};
    for (const [key, value] of formData.entries()) {
      productData[key] = value;
    }

    fetch("/api/products/" + params.id, {
      method: "PATCH",
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Ocorreu um erro alterando o producto com o id " + params.id
          );
        } else {
          return res.json();
        }
      })
      .then((data) => {
        alert("Producto " + productData.name + " alterado com sucesso");
        setIsLoading(false);
        router.push("/products");
      })
      .catch((err) => {
        alert("Ocorreu um erro alterando o producto com o id " + params.id);
        setIsLoading(false);
      });
  };

  return (
    <>
      <PageHeader title="Editar e Visualizar Producto">
        Aqui você pode visualizar e editar um producto registado no sistema.
      </PageHeader>

      {product && (
        <section className="mt-8 flex gap-4">
          <ProductForm
            product={product}
            onSubmit={handleUpdateProduct}
            isLoading={isLoading}
          />
          <div>
            <ul>
              <li>
                <b>Custo Total(Mzn): </b>
                {formatNumbers(product.totalCost)}
              </li>
              <li>
                <b>Preço Total(Mzn): </b>
                {formatNumbers(product.totalPrice)}
              </li>
              <li>
                <b>Adicionado por: </b>
                {product.user?.firstName + " " + product.user?.lastName}
              </li>
              <li>
                <b>Email do usuário: </b>
                {product.user.email}
              </li>
              <li>
                <b>Criado em: </b>
                {product.createdAt.split("T")[0]}
              </li>
              <li>
                <b>Alterado em: </b>
                {product.updatedAt.split("T")[0]}
              </li>
            </ul>
          </div>
        </section>
      )}

      {isLoadingProduct && (
        <p className="mt-16 text-center">
          <FontAwesomeIcon icon={faCircleNotch} className="animate-spin w-6" />
        </p>
      )}
    </>
  );
}
