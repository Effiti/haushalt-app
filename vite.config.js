import { VitePWA } from 'vite-plugin-pwa';
import { Mode, plugin as mdPlugin } from "./vite-plugin-markdown-jsx.ts";
import AutoImport from 'unplugin-auto-import/vite';
import MarkdownIt from "markdown-it";
import Footnotes from "markdown-it-footnote";
import { rollupVersion } from 'vite';
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
          'tsx-dom': ['h', 'Fragment']
        }
      ]
    }),
    mdPlugin(
      {
        mode: Mode.REACT,
        markdownIt: MarkdownIt().use(Footnotes)
      }
    )
  ],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  }
}
