export enum SHAPETYPE {
	RECTANGLE = 'RECTANGLE',
	CYLINDER = 'CYLINDER',
}

export enum UNITSTYPE {
	CENTIMETRE = 'CM',
	METRE = 'M',
	INCHES = 'IN',
	FEET = 'FT',
}

const centimetreToMetre = 0.01;
const inchesToMetre = 0.0254;
const feetToMetre = 0.3048;
const densityOfResinInKg = 1110;

const convertToMetre = (unit: UNITSTYPE) => {
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

const calculateRectangularVolumeUnits = (
	length: number,
	width: number,
	thickness: number,
	unit: UNITSTYPE,
) => {
	let convertedWidth: number;
	let convertedLength: number;
	let convertedThickness: number;

	const unitInMeters = convertToMetre(unit);

	convertedLength = length * unitInMeters;
	convertedWidth = width * unitInMeters;
	convertedThickness = thickness * unitInMeters;
	return convertedLength * convertedWidth * convertedThickness;
};

const calculateCylinderVolumeUnits = (
	diameter: number,
	thickness: number,
	unit: UNITSTYPE,
) => {
	let convertedDiameter: number;
	let convertedThickness: number;

	const unitInMeters = convertToMetre(unit);
	convertedDiameter = diameter * unitInMeters;
	convertedThickness = thickness * unitInMeters;
	const dividedDiameter = convertedDiameter / 2;

	return Math.PI * dividedDiameter * dividedDiameter * convertedThickness;
};

export const calculateRectangularResinInKg = (
	length: number,
	width: number,
	thickness: number,
	unit: UNITSTYPE,
) => {
	const calculatedVolume = calculateRectangularVolumeUnits(
		length,
		width,
		thickness,
		unit,
	);

	const calculatedResinInKgM3 = Math.trunc(
		calculatedVolume * densityOfResinInKg,
	);
	return checkAndReturnDivsisibleByThree(calculatedResinInKgM3);
};

export const calculateCylinderResinInKg = (
	diameter: number,
	thickness: number,
	unit: UNITSTYPE,
) => {
	const calculatedVolume = calculateCylinderVolumeUnits(
		diameter,
		thickness,
		unit,
	);
	const calculatedResinInKgM3 = Math.trunc(
		calculatedVolume * densityOfResinInKg,
	);
	console.log(calculatedResinInKgM3);

	return checkAndReturnDivsisibleByThree(calculatedResinInKgM3);
};
