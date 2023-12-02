"use client";

import { useEffect, useState } from "react";
import ProductTableRow from "./ProductTableRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  useEffect(() => {
    setIsLoadingProducts(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setIsLoadingProducts(false);
      })
      .catch((err) => {
        alert("Ocorreu um erro buscando os productos");
        setIsLoadingProducts(false);
        console.log(err);
      });
  }, []);

  const handleDeleteProduct = (id, setIsDeleting) => {
    setIsDeleting(true);
    fetch("/api/products/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Ocorreu um erro deletando o producto com o id " + id
          );
        } else {
          return res;
        }
      })
      .then((data) => {
        setIsDeleting(false);
        const newProduct = products.filter((product) => product._id !== id);
        setProducts(newProduct);
      })
      .catch((err) => {
        alert("Ocorreu um erro deletando o producto com o id " + id);
        setIsDeleting(false);
        console.log(err);
      });
  };

  return (
    <>
      <p className="mb-4">Usuários totais: {products?.length}</p>
      <table className="w-full">
        <thead className="bg-zinc-700 text-white">
          <tr className="text-left">
            <th></th>
            <th className="p-2">Nome</th>
            <th>Categoria</th>
            <th>Qtd</th>
            <th>Custo(Mzn)</th>
            <th>Custo/Total</th>
            <th>Preço(Mzn)</th>
            <th>Preço/Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, i) => {
              return (
                <ProductTableRow
                  key={product._id}
                  i={i + 1}
                  product={product}
                  handleDeleteProduct={handleDeleteProduct}
                />
              );
            })}
        </tbody>
      </table>
      {isLoadingProducts && (
        <p className="mt-16 text-center">
          <FontAwesomeIcon icon={faCircleNotch} className="animate-spin w-6" />
        </p>
      )}
    </>
  );
}
