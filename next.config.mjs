/** @type {import('next').NextConfig} */
const nextConfig = {
  
	images: {
		remotePatterns: [
			{
				protocol: process.env.IMAGES_PROTOCOL,
				hostname: process.env.IMAGES_DOMAIN,
			},
		],
	},
};

export default nextConfig;
