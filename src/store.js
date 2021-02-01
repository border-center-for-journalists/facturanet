import { writable } from 'svelte/store';
import { navigate } from "svelte-routing";
import queryString from "query-string";

export const InvoiceQuery = function() {
    const query = queryString.parse(location.search);
    const { subscribe, set } = writable(query);
    return {
        subscribe,
        navigate : params => {
            const url = Object.keys(params).length !== 0 ? '?'+new URLSearchParams(params).toString() : '/';
            set(params);
            navigate(url, { replace: false });
        }
    }
}()

