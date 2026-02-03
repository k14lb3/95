/** @type {import('next').NextConfig} */
export default {
  reactCompiler: true,
  images: {
    qualities: [100],
  },
  rewrites: () => {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};
