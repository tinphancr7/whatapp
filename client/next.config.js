/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_ZEGO_APP_ID: "",
		NEXT_PUBLIC_ZEGO_SERVER: "",
	},
	images: {
		domains: ["www.google.com", "lh3.googleusercontent.com", "localhost"],
	},
};

module.exports = nextConfig;
