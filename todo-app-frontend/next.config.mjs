/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/login',
            permanent: true,
          },
        ];
      },
      env: {
        REACT_APP_API: process.env.REACT_APP_API
      },
};

export default nextConfig;
