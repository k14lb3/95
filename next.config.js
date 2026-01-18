/** @type {import('next').NextConfig} */
export default {
  reactCompiler: true,
  rewrites: () => {
    return [
      {
        source: '/:path*',
        destination: '/',
      },
    ];
  },
};
