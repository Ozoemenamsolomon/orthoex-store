export interface TrainingSupbaseDataType {
	id: number;
	created_at: string;
	title: string;
	description: string;
	benefits: string[];
	prerequisites: string;
	trainingFormat: 'ONLINE' | 'ONSITE';
	startDateTime: string;
	endDateTime: string;
	eventPosterImage: string;
	location: string;
	price: number;
	phoneContact: string;
	whatsappContact: string;
	refreshment: boolean;
	starterPack: boolean;
	participants: number;
	extraInformation?: string | null;
	nextTrainingDate?: string | null;
	trainingexperience?: string | null;
	trainingbenefactors?: string[] | null;
	trainingitems?: string | null;
}

//TODO: Remove sample data
export const trainingSampleData:TrainingSupbaseDataType []  = [
	{
		id: 1,
		created_at: "2023-07-21T16:31:31+00:00",
		title: "Resin Jewellery Workshop",
		description: "You'll explore the fascinating world of resin crafting, where liquid resin can be transformed into beautiful jewellery and homewares with dazzling colours and one-of-a-kind designs. Whether you're a novice or a seasoned artist, this workshop offers valuable insights and practical experience to help you create your wearable works of art and equip you with powerful skills to grow your personal income. Join us for an exciting and immersive hands-on session where creativity is unlimited!",
		benefits: [
				"Gain an understanding of the different types of resin, their properties, mixing techniques,   and the tools needed for successful resin crafting.",
				"Experiment with various pigments, powders, and glitters to add dazzling colours and textures to your resin creations.",
				"Master the art of pouring and curing resin to achieve professional-looking jewellery pieces.",
				"Practise the techniques for achieving various jewellery effects and patterns.",
				"Discover techniques for sanding, polishing, and adding protective finishes to your jewellery.",
				"Explore various types of earring findings, posts, and connectors to assemble your wearable art.",
				"You go home with your personalized resin jewellery collection and the knowledge to continue crafting at home."
		],
		prerequisites: "No prior experience is required for this workshop. We welcome participants of all skill levels, from beginners eager to explore a new art form to seasoned crafters looking to enhance their resin crafting techniques. All you need is a passion for creativity and a desire to learn!",
		trainingFormat: "ONSITE",
		startDateTime: "2023-07-29T18:38:11",
		endDateTime: "2023-08-06T18:33:23",
		eventPosterImage: "https://res.cloudinary.com/kachiozo/image/upload/v1692293274/Training/resin_jewelery_vciimi.jpg",
		location: "Lagos",
		price: 20000,
		phoneContact: "+2347030324696",
		whatsappContact: "+2347030324696",
		refreshment: true,
		starterPack: false,
		participants: 15,
		extraInformation: undefined,
		nextTrainingDate: null,
		trainingitems: "[\r\n    \"2kg epoxy resin to make your jewellery.\", \"Hands-On Experience through step-by-step demonstrations and guided practice.\", \"Expert guidance from instructors passionate about resin crafting and eager to help you succeed.\", \"Plenty of choices of pigments, powders and glitters to colour your art.\", \"Access to various grades of sandpaper to finish your work.\", \"Access to a wide selection of earring findings, posts and other components for assembling jewellery.\", \"You will actively participate, collaborate with others, and apply the skills you learn in real-time.\", \"Lunch is provided in this workshop.\" \r\n]",
		trainingbenefactors: null,
		trainingexperience: null
	},
	{
		id: 2,
		created_at: "2023-07-21T16:31:31+00:00",
		title: "Resin Jewellery Workshop",
		description: "You'll explore the fascinating world of resin crafting, where liquid resin can be transformed into beautiful jewellery and homewares with dazzling colours and one-of-a-kind designs. Whether you're a novice or a seasoned artist, this workshop offers valuable insights and practical experience to help you create your wearable works of art and equip you with powerful skills to grow your personal income. Join us for an exciting and immersive hands-on session where creativity is unlimited!",
		benefits: [
				"Gain an understanding of the different types of resin, their properties, mixing techniques,   and the tools needed for successful resin crafting.",
				"Experiment with various pigments, powders, and glitters to add dazzling colours and textures to your resin creations.",
				"Master the art of pouring and curing resin to achieve professional-looking jewellery pieces.",
				"Practise the techniques for achieving various jewellery effects and patterns.",
				"Discover techniques for sanding, polishing, and adding protective finishes to your jewellery.",
				"Explore various types of earring findings, posts, and connectors to assemble your wearable art.",
				"You go home with your personalized resin jewellery collection and the knowledge to continue crafting at home."
		],
		prerequisites: "No prior experience is required for this workshop. We welcome participants of all skill levels, from beginners eager to explore a new art form to seasoned crafters looking to enhance their resin crafting techniques. All you need is a passion for creativity and a desire to learn!",
		trainingFormat: "ONSITE",
		startDateTime: "2023-07-29T18:38:11",
		endDateTime: "2023-08-06T18:33:23",
		eventPosterImage: "https://res.cloudinary.com/kachiozo/image/upload/v1692293274/Training/resin_jewelery_vciimi.jpg",
		location: "Lagos",
		price: 20000,
		phoneContact: "+2347030324696",
		whatsappContact: "+2347030324696",
		refreshment: true,
		starterPack: false,
		participants: 15,
		extraInformation: undefined,
		nextTrainingDate: null,
		trainingitems: "[\r\n    \"2kg epoxy resin to make your jewellery.\", \"Hands-On Experience through step-by-step demonstrations and guided practice.\", \"Expert guidance from instructors passionate about resin crafting and eager to help you succeed.\", \"Plenty of choices of pigments, powders and glitters to colour your art.\", \"Access to various grades of sandpaper to finish your work.\", \"Access to a wide selection of earring findings, posts and other components for assembling jewellery.\", \"You will actively participate, collaborate with others, and apply the skills you learn in real-time.\", \"Lunch is provided in this workshop.\" \r\n]",
		trainingbenefactors: null,
		trainingexperience: null
	},
	{
		id: 3,
		created_at: "2023-07-21T16:31:31+00:00",
		title: "Resin Jewellery Workshop",
		description: "You'll explore the fascinating world of resin crafting, where liquid resin can be transformed into beautiful jewellery and homewares with dazzling colours and one-of-a-kind designs. Whether you're a novice or a seasoned artist, this workshop offers valuable insights and practical experience to help you create your wearable works of art and equip you with powerful skills to grow your personal income. Join us for an exciting and immersive hands-on session where creativity is unlimited!",
		benefits: [
				"Gain an understanding of the different types of resin, their properties, mixing techniques,   and the tools needed for successful resin crafting.",
				"Experiment with various pigments, powders, and glitters to add dazzling colours and textures to your resin creations.",
				"Master the art of pouring and curing resin to achieve professional-looking jewellery pieces.",
				"Practise the techniques for achieving various jewellery effects and patterns.",
				"Discover techniques for sanding, polishing, and adding protective finishes to your jewellery.",
				"Explore various types of earring findings, posts, and connectors to assemble your wearable art.",
				"You go home with your personalized resin jewellery collection and the knowledge to continue crafting at home."
		],
		prerequisites: "No prior experience is required for this workshop. We welcome participants of all skill levels, from beginners eager to explore a new art form to seasoned crafters looking to enhance their resin crafting techniques. All you need is a passion for creativity and a desire to learn!",
		trainingFormat: "ONSITE",
		startDateTime: "2023-07-29T18:38:11",
		endDateTime: "2023-08-06T18:33:23",
		eventPosterImage: "https://res.cloudinary.com/kachiozo/image/upload/v1692293274/Training/resin_jewelery_vciimi.jpg",
		location: "Lagos",
		price: 20000,
		phoneContact: "+2347030324696",
		whatsappContact: "+2347030324696",
		refreshment: true,
		starterPack: false,
		participants: 15,
		extraInformation: undefined,
		nextTrainingDate: null,
		trainingitems: "[\r\n    \"2kg epoxy resin to make your jewellery.\", \"Hands-On Experience through step-by-step demonstrations and guided practice.\", \"Expert guidance from instructors passionate about resin crafting and eager to help you succeed.\", \"Plenty of choices of pigments, powders and glitters to colour your art.\", \"Access to various grades of sandpaper to finish your work.\", \"Access to a wide selection of earring findings, posts and other components for assembling jewellery.\", \"You will actively participate, collaborate with others, and apply the skills you learn in real-time.\", \"Lunch is provided in this workshop.\" \r\n]",
		trainingbenefactors: null,
		trainingexperience: null
	},
]