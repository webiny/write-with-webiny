import { SECRET_API_KEY } from '$env/static/private';

/** @type {import('./$types').PageServerLoad} */
export function load() {
    const data = SECRET_API_KEY

    return {
        token: data
    };
  }