import Cookies from 'js-cookie';

export const csrfFetch = async (url, options = {}) => {
    // set options.method to 'GET' if there is no method
    options.method = options.method || 'GET';
    // set options.headers to an empty object if there is no headers
    options.headers = options.headers || {};

    // if the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json", and set the "XSRF-TOKEN" header to the value of the
    // "XSRF-TOKEN" cookie
    if (options.method.toUpperCase() !== 'GET') {
        if (!options.headers["Content-Type"] && !(options.body instanceof FormData)) {
            options.headers["Content-Type"] = "application/json";
        }
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    };
    // call the default window's fetch with the url and the options passed in
    return await window.fetch(url, options);
};

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
};
