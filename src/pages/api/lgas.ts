import { promises as fs } from 'fs';
import { NextApiHandler } from 'next';
import path from 'path';

type LGA = {
	id: number;
	name: string;
	class: string;
	state: number;
};

const handler: NextApiHandler = async (req, res) => {
	const { state } = req.query;

	const filePath = path.join(process.cwd(), 'delivery', 'lgas.json');

	const fileContents = await fs.readFile(filePath, 'utf8');

	const lgas: LGA[] = JSON.parse(fileContents).map(
		({ class: _class, ...lga }: LGA) => lga,
	);

	if (state) {
		const filteredLgas = lgas.filter(lga => lga.state === Number(state));
		return res.status(200).json(filteredLgas);
	}

	res.status(200).json(lgas);
};

export default handler;
