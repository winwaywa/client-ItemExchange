import './styles.scss';
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import queryString from 'query-string'; // chuyển query thành object

import ProductApi from '../../../../api/productApi';
import ProductList from '../../components/ProductList';
import ProductFilters from '../../components/ProductFilters';
import FilterViewer from '../../components/FilterViewer';
import ProductSort from '../../components/ProductSort';
import ProductSearch from '../../components/ProductSearch';
import ProductsSkeletonList from '../../components/ProductsSkeletonList';
import MenuIcon from '../../../../../images/icon-svg/menu-icon.svg';

ListPage.propTypes = {};

function ListPage(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ page: 1, total: 12, limit: 12 });

    // Khi thay đổi đk lọc -> url thay đổi -> queryParams thay đổi -> useEffect gọi lại -> products thay đổi
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 12,
            _sort: params._sort || 'createdAt:DESC',
            status: 'enable',
        };
    }, [location.search]);
    console.log('queryParams', queryParams);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const data = await ProductApi.getAllProducts(queryParams);
            console.log(data.products);
            setProducts(data.products);
            setPagination(data.pagination);
            setLoading(false);
        })();
    }, [queryParams]);

    //lọc
    const handleFilterChange = (newFilters) => {
        console.log(newFilters);
        const filters = {
            ...queryParams,
            ...newFilters,
            _page: 1, // quay về lại trang 1
        };
        navigate({ search: queryString.stringify(filters) });
    };

    //sắp xếp
    const handleSortChange = (newSortValue) => {
        console.log(newSortValue);
        const filters = {
            ...queryParams,
            _sort: newSortValue,
            _page: 1,
        };
        navigate({ search: queryString.stringify(filters) });
    };

    //search
    const handleSearchChange = (newKeyWord) => {
        console.log(newKeyWord);
        const filters = {
            ...queryParams,
            _search: newKeyWord,
        };
        navigate({ search: queryString.stringify(filters) });
    };

    //filters view
    const setNewFilters = (newFilters) => {
        const filters = {
            ...newFilters,
        };
        navigate({ search: queryString.stringify(filters) });
    };

    // khi chuyển trang
    const handlePageChange = (e, page) => {
        const filters = {
            ...queryParams,
            _page: page,
        };
        navigate({ search: queryString.stringify(filters) });
    };

    return (
        <>
            <input type="checkbox" id="filter-toggle" name="filter-toggle" />
            <label id="filter-btn" htmlFor="filter-toggle">
                <img className="svg-icon" src={MenuIcon} alt="menu-icon" />
            </label>
            <ProductFilters filters={queryParams} onChange={handleFilterChange} />

            <div className="product__main">
                <div className="product__sort-search">
                    <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                    <ProductSearch onChange={handleSearchChange} />
                </div>
                <FilterViewer filters={queryParams} onChange={setNewFilters} />

                {loading ? (
                    <ProductsSkeletonList length={12} />
                ) : (
                    <ProductList products={products} />
                )}

                {products.length === 0 && (
                    <p style={{ textAlign: 'center' }}>Không có sản phẩm nào !</p>
                )}

                {products.length !== 0 && (
                    <Pagination
                        className="product__page"
                        color="primary"
                        count={Math.ceil(pagination.total / pagination.limit)}
                        page={pagination.page}
                        onChange={handlePageChange}
                    ></Pagination>
                )}
            </div>
        </>
    );
}

export default ListPage;
