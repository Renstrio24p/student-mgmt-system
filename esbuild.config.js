import * as esbuild from 'esbuild';
import LiveServer from 'alive-server';
import { tailwindPlugin } from 'esbuild-plugin-tailwindcss';
import fs from 'fs';
import imagePlugin from 'esbuild-plugin-inline-image';
import copy from 'esbuild-copy-static-files';

const Serve = () => {
    let options = {
        port: 4500,
        host: 'localhost',
        root: 'dist',
        file: 'index.html',
        open: true,
    };
    LiveServer.start(options);
};

const transformHTMLLoader = {
    name: 'transform-html-loader',
    setup(build) {
        build.onLoad({ filter: /\.ts$/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, 'utf8');
            const transformedContents = contents.replace(/\.innerHTML\s*=\s*(["'])(.*?)\1/g, (_, quote, innerHTML) => {
                return `.appendChild(document.createRange().createContextualFragment(${quote}${innerHTML}${quote}).firstChild)`;
            });
            return { contents: transformedContents, loader: 'ts' };
        });
    },
};

const options = {
    entryPoints: ['src/index.ts', 'index.html'],
    allowOverwrite: true,
    bundle: true,
    minify: true,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    splitting: true,
    minifySyntax: true,
    format: 'esm',
    chunkNames: 'src/chunk/index-[hash]',
    outdir: 'dist',
    loader: {
        '.html': 'copy',
        '.css': 'css',
        '.module.css': 'local-css',
        '.jpg': 'file',
        '.svg': 'file',
        '.webp': 'file',
        '.png': 'file',
        '.woff2': 'file',
        '.woff': 'file',
        '.eot': 'file',
        '.ttf': 'file',
        '.ts': 'tsx'
    },
    tsconfig: 'tsconfig.json',
    external: ['/*.webp', '/*.avif', '/*.jpg', '/*.png'],
    plugins: [
        transformHTMLLoader,
        tailwindPlugin({}),
        imagePlugin(),
        copy({
            src: './src/images',
            dest: './dist',
            recursive: true,
        }),
    ]
};

if (!process.argv.includes('--build')) {
    const ctx = await esbuild.context(options);
    await ctx.rebuild();
    ctx.watch();
    Serve();
} else {
    esbuild.build(options);
}
