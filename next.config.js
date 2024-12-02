/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'], // 👈 HERE
  },
}

export default nextConfig
