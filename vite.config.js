
import { VitePWA } from 'vite-plugin-pwa';
import AutoImport from 'unplugin-auto-import/vite';
export default {
  plugins: [
    VitePWA({

      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Haushaltsplaner',
        short_name: 'Haushalt',
        description: 'Plane Deinen eigenen Staatshaushalt!',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate',
      devOptions:{
      enabled: true
    }}),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.md$/ // .md
      ],
      dirs: ['./src/**'],
      imports: [
        {
          'start-dom-jsx': ['h', 'Fragment']
        }
      ]
    })
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
