export interface Camera {
	x: number;
	y: number;
	scale: number;
	rot: number;

	new (
		x?: number,
		y?: number,
		zoom?: number,
		rotation?: number,
		smoother?: () => [number, number]
	): Camera;

	lookAt(x: number, y: number): Camera;
	move(dx: number, dy: number): Camera;

	position(): [number, number];

	rotate(phi: number): Camera;
	rotateTo(phi: number): Camera;

	zoom(mul: number): Camera;
	zoomTo(zoom: number): Camera;

	attach(
		x?: number,
		y?: number,
		w?: number,
		h?: number,
		noclip?: boolean
	): void;
	detach(): void;

	draw(...args: any): void;

	lockPosition(x: number, y: number, smoother?: () => [number, number]): void;

	lockWindow(
		x: number,
		y: number,
		x_min: number,
		x_max: number,
		y_min: number,
		y_max: number
	): void;
}
