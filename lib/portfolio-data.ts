export interface Project {
		id: string;
		title: string;
		description: string;
		url: string;
		status: "live" | "wip" | "archived" | "student-project";
		image: string;
		images?: string[]; // Multiple images for hover carousel
		tags?: string[];
		year?: string;
		company?: string;
	}

export interface SocialLink {
		platform: "github" | "twitter" | "linkedin" | "email";
		url: string;
		label: string;
	}

export interface Company {
		name: string;
		logo?: string;
		logoGradient?: string;
		logoRotation?: number;
		url?: string;
		role?: string;
		period?: string;
		description?: string;
	}

export interface ProfileData {
		name: string;
		title: string;
		tagline: string;
		subtitle: string;
		location: string;
		bio: string;
		extendedBio: string;
	}

export interface Education {
		institution: string;
		degree: string;
		period: string;
		location?: string;
	}

export const profile: ProfileData = {
	name: "Nico Epp",
	title: "Full-Stack Developer & Co-Founder",
	tagline: "Crafting digital experiences from idea to scale.",
	subtitle: "Full-Stack Developer & Co-Founder",
	location: "Göppingen, Germany",
	bio: "I'm a full-stack developer passionate about building products that solve real problems. With experience across e-commerce platforms, data visualization tools, and IoT solutions, I focus on creating intuitive user experiences backed by solid engineering.",
	extendedBio: `I'm a full-stack developer based in Germany with a passion for building products that matter. I love taking ideas from concept to production—whether that's a cashback platform serving hundreds of users or a side project that scratches my own itch.

My journey started with curiosity about how things work, which led me to study computer science and eventually co-found Paroot Cashback. Building a startup taught me more than any course ever could: from handling payment integrations to designing systems that scale.

I'm particularly interested in developer tools, e-commerce, and anything that makes people's lives a bit easier. When I'm not shipping features, you'll find me exploring new technologies, contributing to open source, or dreaming up the next side project.`,
};

export const education: Education[] = [
	{
		institution: "Esslingen University of Applied Sciences",
		degree: "Bachelor of Engineering",
		period: "Oct. 2021 - Aug. 2025",
		location: "Esslingen, Germany",
	},
];

export const previousCompanies: Company[] = [
	{
		name: "Paroot Cashback",
		logo: "/logos/paroot.jpg",
		logoRotation: -12,
		role: "Co-Founder & Full-Stack Developer",
		period: "2022 - 2025",
		description:
			"Built full-stack cashback platform with 270+ partner retailers",
	},
	{
		name: "hydra newmedia",
		logo: "/logos/hydra_newmedia.jpeg",
		logoRotation: 8,
		role: "Working Student",
		period: "Sep. 2023 - Feb. 2024",
		description: "Web development and client projects",
	},
];

export const projects: Project[] = [
	{
		id: "indie-wrapped",
		title: "IndieWrapped",
		company: "IndieWrapped",
		description:
			"Year in review for indie hackers. Visualize your progress and celebrate your wins with AI-powered insights.",
		url: "https://indiewrapped.com",
		status: "live",
		image: "/projects/indiewrapped/indiewrapped.jpg",
		images: [
			"/projects/indiewrapped/indiewrapped-1.jpg",
			"/projects/indiewrapped/indiewrapped-2.jpg",
			"/projects/indiewrapped/indiewrapped-3.jpg",
			"/projects/indiewrapped/indiewrapped-4.jpg",
			"/projects/indiewrapped/indiewrapped-5.jpg",
		],
		tags: ["Next.js", "Grok AI", "Tailwind CSS"],
		year: "2025",
	},
	{
		id: "fast-domain",
		title: "FastDomain",
		company: "FastDomain",
		description:
			"Real-time domain price comparison across multiple registrars. Find the best deals for your domain names.",
		url: "https://fastdomain.io",
		status: "wip",
		image: "/projects/fastdomain/fastdomain-1.jpg",
		images: [
			"/projects/fastdomain/fastdomain.mp4",
			"/projects/fastdomain/fastdomain-1.jpg",
			"/projects/fastdomain/fastdomain-2.jpg",
		],
		tags: [
			"Next.js",
			"TypeScript",
			"tRPC",
			"Tailwind CSS",
			"PostgreSQL",
			"Polar",
			"Better-Auth",
		],
		year: "2025",
	},
	{
		id: "launch-express",
		title: "Launch Express",
		company: "Launch Express",
		description:
			"Production-ready Next.js boilerplate with authentication, payments, and database integration. Ship faster, build smarter.",
		url: "https://github.com/Niggo2k/launch-express-website",
		status: "live",
		image: "/projects/launch-express/launch-express-1.png",
		tags: ["Next.js", "Stripe", "Better-Auth", "Tailwind CSS"],
		year: "2024",
	},
	{
		id: "paroot-cashback",
		title: "Paroot Cashback",
		company: "Paroot",
		description:
			"Full-stack cashback platform connecting consumers with 270+ partner retailers. Processed hundreds of transactions with automated reward systems.",
		url: "",
		status: "live",
		image: "/projects/paroot/paroot-1.jpg",
		images: [
			"/projects/paroot/paroot-1.jpg",
			"/projects/paroot/paroot-2.jpeg",
			"/projects/paroot/paroot-3.jpeg",
		],
		tags: ["Laravel", "Vue.js", "MySQL", "Stripe"],
		year: "2022 - 2025",
	},
	{
		id: "adapt2move-mobile",
		title: "Adapt2Move Mobility Application",
		description:
			"Mobile application for the Adapt2Move project. It allows users to track their mobility and receive notifications about their activities.",
		url: "https://github.com/adapt2move/mobilityapp",
		status: "student-project",
		image: "",
		tags: ["Vue.js", "TypeScript", "Tailwind CSS", "Ionic"],
		year: "2025",
	},
	{
		id: "mobile-applications",
		title: "Mobile Chat Application",
		description:
			"Mobile chat application built with Vue.js and Vite. It uses a combination of websockets and traditional HTTP requests to communicate with the server.",
		url: "https://github.com/Benjamin-Baunach/Mobile_Applications",
		status: "student-project",
		image: "/projects/launch-express.png",
		tags: ["Vue.js", "Vite", "Tailwind CSS", "JavaScript"],
		year: "2024",
	},
	{
		id: "smart-parcel-box",
		title: "Smart Parcel Box",
		description:
			"IoT-enabled smart parcel box with mobile web app for secure package delivery management. University project.",
		url: "https://github.com/Niggo2k/smart-parcel-box",
		status: "student-project",
		image: "",
		tags: ["Next.js", "Tailwind CSS", "Photon"],
		year: "2024",
	},
	{
		id: "homematic-dashboard",
		title: "Homematic Dashboard",
		description:
			"Modern control interface for Homematic smart home devices. Real-time status monitoring and device control.",
		url: "https://github.com/Niggo2k/hm-next",
		status: "live",
		image: "",
		tags: ["Next.js", "REST API", "Tailwind CSS", "Docker"],
		year: "2023",
	},
	{
		id: "occupancy-planner",
		title: "Occupancy Planner",
		description:
			"Occupancy Planner is a web application that helps users plan their occupancy for a given area. It uses a combination of machine learning and traditional algorithms to determine the best occupancy for a given area.",
		url: "https://github.com/Occupancy-Planner-Team1/Occupancy-Planner",
		status: "student-project",
		image: "",
		tags: ["React", "Spring Boot", "PostgreSQL", "Docker", "Keycloak"],
		year: "2023",
	},
];

export const socialLinks: SocialLink[] = [
	{
		platform: "github",
		url: "https://github.com/Niggo2k",
		label: "GitHub",
	},
	{
		platform: "twitter",
		url: "https://x.com/made_by_nico",
		label: "Twitter/X",
	},
	{
		platform: "linkedin",
		url: "https://linkedin.com/in/nicoepp",
		label: "LinkedIn",
	},
	{
		platform: "email",
		url: "mailto:hello@nico.dev",
		label: "Email",
	},
];
