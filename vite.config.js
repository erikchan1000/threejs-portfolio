import { defineConfig } from 'vite';

export default defineConfig({
  base: '/threejs-portfolio/', // Replace '/portfolio/' with your actual deployment path
  build: {
    outDir: 'dist', // Optional: Specify the output directory
  },
});
