import { SHAPETYPE, UNITSTYPE } from 'pages/calculator';

const centimetreToMetre = 0.01;
const inchesToMetre = 0.0254;
const feetToMetre = 0.3048;
const densityOfResinInKg = 1110;

const convertToMetre = (unit: string) => {
	return unit === UNITSTYPE.CENTIMETRE
		? centimetreToMetre
		: unit === UNITSTYPE.INCHES
		? inchesToMetre
		: unit === UNITSTYPE.FEET
		? feetToMetre
		: 1;
};

const checkAndReturnDivsisibleByThree = (value: number) => {
	if (value % 3 === 0) {
		return value;
	} else {
		let newValue = value;
		while (newValue % 3 !== 0) {
			newValue++;
		}
		return newValue;
	}
};

const calculateVolumeUnits = (
	shape: SHAPETYPE,
	thickness: number,
	unit: string,
	length?: number,
	width?: number,
	diameter?: number,
) => {
	let calculatedVolume: number;
	let convertedLength: number;
	let convertedWidth: number;
	let convertedThickness: number;
	let convertedDiameter: number;

	const unitInMeters = convertToMetre(unit);

	if (shape === SHAPETYPE.RECTANGLE) {
		convertedLength = length! * unitInMeters;
		convertedWidth = width! * unitInMeters;
		convertedThickness = thickness * unitInMeters;
		calculatedVolume = convertedLength * convertedWidth * convertedThickness;
	} else {
		convertedDiameter = diameter! * unitInMeters;
		convertedThickness = thickness * unitInMeters;
		const dividedDiameter = convertedDiameter / 2;
		calculatedVolume =
			Math.PI * dividedDiameter * dividedDiameter * convertedThickness;
	}

	return calculatedVolume;
};

export const calculateResinInKg = (
	shape: SHAPETYPE,
	thickness: number,
	unit: string,
	length?: number,
	width?: number,
	diameter?: number,
) => {
	let calculatedVolume: number;
	if (shape === SHAPETYPE.RECTANGLE) {
		calculatedVolume = calculateVolumeUnits(
			SHAPETYPE.RECTANGLE,
			thickness,
			unit,
			length,
			width,
		);
	} else {
		calculatedVolume = calculateVolumeUnits(
			SHAPETYPE.CYLINDER,
			thickness,
			unit,
			diameter,
		);
	}

	const calculatedResinInKgM3 = Math.trunc(
		calculatedVolume * densityOfResinInKg,
	);

	return checkAndReturnDivsisibleByThree(calculatedResinInKgM3);
};

export const calculateAndSetProduct = (
	shape: SHAPETYPE,
	thickness: number,
	unit: string,
	length?: number,
	width?: number,
	diameter?: number,
) => {
	const resinInKg = calculateResinInKg(
		shape,
		thickness,
		unit,
		length,
		width,
		diameter,
	);
	const partA = (2 / 3) * resinInKg;
	const partB = (1 / 3) * resinInKg;
	const halfResinInKg = resinInKg / 2;

	return { partA, partB, halfResinInKg };
};
