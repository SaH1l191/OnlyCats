export const admin = {
	id: 1,
	name: "Admin",
	email: "admin@gmail.com",
	image: "https://avatar.iran.liara.run/public/boy?username=bob",
};

export const user = {
	id: 123,
	email: "user@gmail.com",
	name: "John Doe",
	image: "https://avatar.iran.liara.run/public/boy?username=john",
	isSubscribed: false,
	createdAt: Date.now(),
	updatedAt: Date.now(),
};

export const posts = [
	{
		id: 1,
		text: "Post Content",
		mediaType: "image",
		mediaUrl: "/featured/featured7_.jpg",
		likes: 12,
		isPublic: true,
		createdAt: new Date(),
		comments: [
			{
				id: 1,
				user: admin,
				content: "Comment Content",
				createdAt: new Date(),
			},
		],
	},
	{
		id: 2,
		text: "Post Content",
		mediaType: "image",
		mediaUrl: "/featured/featured2_.jpg",
		likes: 12,
		isPublic: false,
		createdAt: new Date(),
		comments: [
			{
				id: 1,
				user: admin,
				content: "Comment Content",
				createdAt: new Date(),
			},
		],
	},
	{
		id: 3,
		text: "Post Content",
		mediaType: "image",
		mediaUrl: "/featured/featured3_.jpg",
		likes: 12,
		isPublic: false,
		createdAt: new Date(),
		comments: [
			{
				id: 1,
				user: admin,
				content: "Comment Content",
				createdAt: new Date(),
			},
		],
	},
];

export const products = [
	{
		id: "1",
		name: "Product One",
		price: 1999, // in cents $19.99, nice to have for stripe
		image: "/tshirts/1_.jpeg",
		isArchived: false,
	},
	{
		id: "2",
		name: "Product Two",
		price: 2999, // in cents $29.99
		image: "/tshirts/2_.jpeg",
		isArchived: true,
	},
	{
		id: "3",
		name: "Product Three",
		price: 3999, // in cents $39.99
		image: "/tshirts/3_.jpeg",
		isArchived: false,
	},
];