/** @type {import('next').NextConfig} */

require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
    nextConfig,
    env: {
        API_URL: process.env.API_URL,
    },
}

/* const removeImports = require('next-remove-imports')()
module.exports = removeImports({}) */
