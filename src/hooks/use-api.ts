
"use client"

import { useState, useEffect, useCallback } from 'react';

const API_URL = "https://www.server.hkspeedcouriers.com";

export function useApi<T>(endpoint: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async () => {
        if (endpoint === null) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}${endpoint}`);
            if (!response.ok) {
                const errData = await response.json().catch(() => ({ error: `HTTP error! status: ${response.status}` }));
                throw new Error(errData.error || `HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result);
        } catch (err: any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [endpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const mutate = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, mutate };
}
