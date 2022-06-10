import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter(),
        prerender: {
            enabled: true,
            default: true,
            crawl: true,
            entries: ["*"],
            onError: "continue"
        },
        files: {
            lib: "./src/lib"
        }
    }
};

export default config;
