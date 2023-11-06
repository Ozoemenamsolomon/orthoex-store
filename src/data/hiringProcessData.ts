export interface HiringDataType {
	title: string;
	description: string;
}

export const hiringData: HiringDataType[] = [
	{
		title: 'Apply & initial call',
		description:
			'Because we employ people, not resumes, our hiring process starts with a 30-minute call with Human Resources, during which we learn about what motivates you',
	},
	{
		title: 'Assessment test',
		description:
			'Some of our positions will require you to complete a case study or assessment test. The purpose of the exercise is to get us familiar with your thought process. ',
	},
	{
		title: 'Meet the team',
		description:
			'In this stage, you will meet your manager and the team during which you are expected to share your case study. ',
	},
	{
		title: 'Decision',
		description:
			'The hiring team will meet and decide on hiring you based on the feedbacks during the interview',
	},
];
