import React from 'react';
import PropTypes from 'prop-types';
//mui
import { Box, Chip, Stack } from '@mui/material';
import categoryApi from '../../../../api/categoryApi';
FilterViewer.propTypes = {};

//các loại filter
const FILTER_LIST = [
    {
        id: 1,
        getLabel: (filters) =>
            `Độ mới từ ${filters.percent_new_gte || 0}% đến ${filters.percent_new_lte || 100}%`,
        isActive: () => true,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filters) => {
            return filters;
        },
    },
    {
        id: 2,
        getLabel: (filters, categoryName) => {
            return categoryName;
        },
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('category_id'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            if (Object.keys(newFilters).includes('category_id')) delete newFilters['category_id'];
            return { ...newFilters, _page: 1 };
        },
        ontoggle: () => {},
    },
    {
        id: 3,
        getLabel: (filters) =>
            `Khoảng giá từ ${new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.price_gte)} đến ${new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'VND',
            }).format(filters.price_lte)}`,
        isActive: () => true,
        isVisible: (filters) =>
            Object.keys(filters).includes('price_lte') &&
            Object.keys(filters).includes('price_gte'),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            if (
                Object.keys(newFilters).includes('price_lte') &&
                Object.keys(newFilters).includes('price_lte')
            ) {
                delete newFilters.price_gte;
                delete newFilters.price_lte;
            }
            return { ...newFilters, _page: 1 };
        },
        ontoggle: () => {},
    },
    {
        id: 4,
        getLabel: (filters) => filters.province,
        isActive: () => true,
        isVisible: (filters) => filters.province,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            if (newFilters.province) delete newFilters.province;
            return { ...newFilters, _page: 1 };
        },
        ontoggle: () => {},
    },
    {
        id: 5,
        getLabel: (filters) => `Tìm kiếm: ${filters._search}`,
        isActive: () => true,
        isVisible: (filters) => filters._search,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            if (newFilters._search) delete newFilters._search;
            return { ...newFilters, _page: 1 };
        },
        ontoggle: () => {},
    },
];

//nên gán object default để ko bị lỗi
function FilterViewer({ filters = {}, onChange = null }) {
    const [categoryName, setCategoryName] = React.useState('');

    const visibleFilters = React.useMemo(() => {
        return FILTER_LIST.filter((x) => x.isVisible(filters));
    }, [filters]);

    React.useEffect(() => {
        //call api và set category name tương ứng vs id
        setCategoryName('');
        if (filters['category_id']) {
            (async () => {
                try {
                    const categoryId = filters['category_id'];
                    const category = await categoryApi.getCategory(categoryId);
                    setCategoryName(category.category.category_name);
                } catch (error) {
                    console.log('Failt to fetch category by id:', error);
                }
            })();
        }
    }, [filters['category_id']]);

    return (
        <Box paddingTop={1} paddingBottom={4} component="ul">
            <Stack direction="row" flexWrap="wrap">
                {visibleFilters.map((x) => (
                    <li key={x.id}>
                        <Chip
                            sx={{ mt: 1, mr: 1 }}
                            label={x.getLabel(filters, categoryName)}
                            color={x.isActive(filters) ? 'primary' : 'default'}
                            clickable={!x.isRemovable}
                            onClick={
                                x.isRemovable
                                    ? null
                                    : () => {
                                          if (onChange) onChange(x.onToggle(filters));
                                      }
                            }
                            onDelete={
                                x.isRemovable
                                    ? () => {
                                          if (onChange) onChange(x.onRemove(filters));
                                      }
                                    : null
                            }
                        />
                    </li>
                ))}
            </Stack>
        </Box>
    );
}

export default FilterViewer;
