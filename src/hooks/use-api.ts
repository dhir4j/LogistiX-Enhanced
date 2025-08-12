
"use client"

import { useState, useEffect, useCallback } from 'react';
import { useSession } from './use-session';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useApi<T>(endpoint: string | null) {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const { session } = useSession();

    const fetchData = useCallback(async () => {
        if (endpoint === null) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (session?.email) {
            headers['X-User-Email'] = session.email;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, { headers });
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
    }, [endpoint, session]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    const mutate = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, mutate };
}

    