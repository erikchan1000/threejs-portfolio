import { defineConfig } from 'vite';

export default defineConfig({
  base: '/threejs-portfolio/', // Replace '/portfolio/' with your actual deployment path
  build: {
    outDir: 'build', // Optional: Specify the output directory
  },
});
