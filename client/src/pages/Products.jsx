import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ProductFilters from '../components/common/ProductFilters';
import ProductGrid from '../components/common/ProductGrid';
import SearchBar from '../components/common/SearchBar';

const Products = () => {
    const [filter, setFilter] = useState('All products');
    const [query, setQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState([0, 1000]);
    const [priceSort, setPriceSort] = useState('');

    return (
        <div className="w-full flex flex-col items-center">
            <Helmet>
                <title>Products</title>
            </Helmet>
            <SearchBar setQuery={setQuery} />
            <ProductFilters
                filter={filter}
                setFilter={setFilter}
                priceSort={priceSort}
                setPriceSort={setPriceSort}
                setPriceFilter={setPriceFilter}
            />
            <ProductGrid
                query={query}
                filter={filter}
                priceFilter={priceFilter}
                priceSort={priceSort}
            />
        </div>
    );
};

export default Products;
