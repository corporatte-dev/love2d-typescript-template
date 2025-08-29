import { getX, getY } from 'love.mouse';
import { UDim } from './data';

function floor(num: number) {
	return math.floor(num);
}

export function UDimToPixels(dimensions: UDim, parentAbsSize: number): number {
	return dimensions.Offset + floor(parentAbsSize * dimensions.Scale);
}

export function isInBounds(
	pos: [number, number],
	size: [number, number],
	targetPos: [number, number]
): boolean {
	return (
		targetPos[0] > pos[0] &&
		targetPos[0] < pos[0] + size[0] &&
		targetPos[1] < pos[1] &&
		targetPos[1] < pos[1] + size[1]
	);
}

export const mousePos: [number, number] = [getX(), getY()];
