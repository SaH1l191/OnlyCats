/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
		remotePatterns: [{ hostname: "res.cloudinary.com" }],
		 domains: ['lh3.googleusercontent.com'],
	},
    
};

export default nextConfig;
