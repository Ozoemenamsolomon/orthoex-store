export const accountSubLinks = [
	{
		name: 'Overview',
		slug: 'overview',
	},
	{
		name: 'Account Details',
		slug: 'details',
	},
	{
<<<<<<< HEAD
=======
		name: 'Trainings',
		slug: 'trainings',
	},
	{
>>>>>>> efc9d516a1b0483982531c700c19ea7a663b7c20
		name: 'Orders',
		slug: 'orders',
	},
	{
		name: 'Edit Password',
		slug: 'password',
	},
	// {
	// 	name: 'Addresses',
	// 	slug: 'addresses',
	// },
	// {
	// 	name: 'Pending Reviews',
	// 	slug: 'reviews',
	// },
	// {
	// 	name: 'Recently Viewed',
	// 	slug: 'recent',
	// },
	{
		name: 'Account Manager',
		slug: 'manager',
	},
	// {
	// 	name: 'Invite a Friend',
	// 	slug: 'invite',
	// },
	// {
	// 	name: 'Reward Points & Store Wallet',
	// 	slug: 'rewards',
	// },
	// {
	// 	name: 'Newsleter Preferences',
	// 	slug: 'newsletter',
	// },
	// {
	// 	name: 'Request Account Data',
	// 	slug: 'data',
	// },
] as const;

export type TypeOfSlug = typeof accountSubLinks[number]['slug'];

export const isAccountSubLinkSlug = (slug: any): slug is TypeOfSlug =>
	accountSubLinks.map(({ slug }) => slug).includes(slug);
