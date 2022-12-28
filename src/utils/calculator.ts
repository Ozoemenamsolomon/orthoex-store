import { UNITSTYPE } from 'pages/calculator';

const centimetreToMetre = 0.01;
const inchesToMetre = 0.0254;
const feetToMetre = 0.3048;
const densityOfResinInKg = 1110;

const convertUnits = (
	length: number,
	width: number,
	thickness: number,
	unit: string,
) => {
	let convertedWidth: number;
	let convertedLength: number;
	let convertedThickness: number;
	let convertToMetre =
		unit === UNITSTYPE.CENTIMETRE
			? centimetreToMetre
			: unit === UNITSTYPE.INCHES
			? inchesToMetre
			: unit === UNITSTYPE.FEET
			? feetToMetre
			: 1;

	convertedLength = length * convertToMetre;
	convertedWidth = width * convertToMetre;
	convertedThickness = thickness * convertToMetre;
	// console.log({ convertedLength, convertedWidth, convertedThickness });
	return { convertedLength, convertedWidth, convertedThickness };
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

export const calculateRectangularResinInKg = (
	length: number,
	width: number,
	thickness: number,
	unit: string,
) => {
	const { convertedLength, convertedWidth, convertedThickness } = convertUnits(
		length,
		width,
		thickness,
		unit,
	);

	const calculatedResinInKgM3 = Math.trunc(
		convertedLength * convertedWidth * convertedThickness * densityOfResinInKg,
	);
	// console.log(checkAndReturnDivsisibleByThree(calculatedResinInKgM3));
	return checkAndReturnDivsisibleByThree(calculatedResinInKgM3);
};

export const calculateCylinderResinInKg = (
	length: number,
	width: number,
	thickness: number,
	unit: string,
) => {
	const { convertedLength, convertedWidth, convertedThickness } = convertUnits(
		length,
		width,
		thickness,
		unit,
	);

	const calculatedResinInKgM3 = Math.trunc(
		convertedLength * convertedWidth * convertedThickness * densityOfResinInKg,
	);
	// console.log(checkAndReturnDivsisibleByThree(calculatedResinInKgM3));
	return checkAndReturnDivsisibleByThree(calculatedResinInKgM3);
};
