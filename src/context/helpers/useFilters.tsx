import React from 'react'
import { useState } from "react";

export type Filter = {
    currency: any,
    continent: any
}

export default function useFilters() {
    const [filters, _updateFilter] = useState<Partial<Filter>>({
        currency: undefined,
        continent: undefined
    });

    const updateFilter = (filterType: keyof Filter, value: any[]) => {
        _updateFilter(prev => ({
            ...prev, [filterType]: value.length ? {
                in: value.map(x => x.code),
            } : undefined
        }));
    };

    return {
        models: { filters },
        operations: { updateFilter },
    };
}