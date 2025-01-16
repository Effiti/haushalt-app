
import AutoImport from 'unplugin-auto-import/vite';
export default {
  plugins: [
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
