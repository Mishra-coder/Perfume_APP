const BASE_URL = 'https:

const request = async (endpoint, method = 'GET', data = null) => {
    try {
        const options = {
            method,
            headers: { 'Content-Type': 'application/json' },
        };
        if (data) options.body = JSON.stringify(data);

        const response = await fetch(`${BASE_URL}${endpoint}`, options);

        const text = await response.text();
        let result = {};
        try {
            result = text ? JSON.parse(text) : {};
        } catch (e) {
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${text || 'Unknown error'}`);
        }

        if (!response.ok) throw new Error(result.message || `API Error ${response.status}`);
        return result;
    } catch (err) {
        console.error(`API ${method} ${endpoint} fail:`, err.message);
        throw err;
    }
};

export const api = {
    signup: (name, email, password) => request('/auth/signup', 'POST', { name, email, password }),
    login: (email, password) => request('/auth/login', 'POST', { email, password }),
};
