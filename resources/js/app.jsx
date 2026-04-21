import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import { route } from '../../vendor/tightenco/ziggy/dist/index.esm.js';
const LazyToastContainer = lazy(() => import('react-toastify').then(mod => {
    import('react-toastify/dist/ReactToastify.css');
    return { default: mod.ToastContainer };
}));

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        // Keep Ziggy in sync with Inertia page changes so route().current() stays accurate.
        const syncZiggy = (page) => {
            if (page?.props?.ziggy) {
                window.Ziggy = {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location, window.location.origin),
                };
            }
        };

        syncZiggy(props.initialPage);
        window.route = route;

        // Sync Ziggy on successful page navigation (after re-render)
        document.addEventListener('inertia:success', (event) => {
            syncZiggy(event.detail.page);
        });

        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <Suspense fallback={null}>
                    <LazyToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </Suspense>
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
