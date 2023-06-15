import AppMenu from "../components/AppMenu";
import ProductDetail from "../components/ProductDetail";
import React, { useState } from 'react';

function calcularUnidades() {
    let carrito = []; // Contiene los datos de los productos y las unidades
    // Recuperar carrito previo
    if (sessionStorage['carrito']) {
        carrito = JSON.parse(sessionStorage['carrito']);
    }

    let totalUnidades = 0;

    for (let item of carrito) {
        totalUnidades += item.unidades;
    }

    return totalUnidades;
}

function ProductDetailPage() {
    const [badgeContent, setBadgeContent] = useState(calcularUnidades());

    const handleAddProduct = () => {
        setBadgeContent(calcularUnidades());
    };

    return (
        <>
            <AppMenu badgeContent={badgeContent} />
            <ProductDetail handleAddProduct={handleAddProduct} />
        </>
    );
}

export default ProductDetailPage;