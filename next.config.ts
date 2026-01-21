import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	experimental: {
		viewTransition: true,
		optimizePackageImports: [
			"@phosphor-icons/react",
			"@central-icons-react/round-filled-radius-3-stroke-2",
			"@central-icons-react/round-outlined-radius-3-stroke-2",
			"framer-motion",
		],
	},
	images: {
		formats: ["image/avif", "image/webp"],
		qualities: [100, 75, 50, 25],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
	},
};

export default withBundleAnalyzer(nextConfig);
