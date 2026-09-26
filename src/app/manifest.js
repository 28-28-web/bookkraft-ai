export default function manifest() {
    return {
        name: 'BookKraft AI',
        short_name: 'BookKraft',
        description: 'EPUB & Kindle formatting tools for indie authors.',
        start_url: '/',
        display: 'standalone',
        background_color: '#f4eee1',
        theme_color: '#0f0e0c',
        icons: [
            { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
    };
}
