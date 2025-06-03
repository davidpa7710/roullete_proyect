import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi App Vite',
        short_name: 'App',
        description: 'Mi app Vite Vanilla convertida en PWA',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#42a5f5',
        icons: [
          {
            src: 'roullete_proyect/public/logo.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'roullete_proyect/public/logo (1).svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
