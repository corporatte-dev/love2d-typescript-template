// TODO: Make spring into a template class

const tau = math.pi * 2;
const exp = math.exp;
const sin = math.sin;
const cos = math.cos;
const sqrt = math.sqrt;

const EPSILON = 1e-4;

export class Spring {
	private position: number;
	private frequency: number;
	private goal: number;
	private dampeningRatio: number;

	private velocity: number;

	constructor(
		position: number,
		frequency?: number,
		goal?: number,
		dampening?: number
	) {
		if (frequency === undefined) frequency = 10;
		if (dampening === undefined) dampening = 1;

		if (dampening * frequency < 0) {
			error('Spring does not converge!', 2);
		}

		this.position = position;
		this.frequency = frequency;
		this.goal = goal ? goal : position;
		this.dampeningRatio = dampening;

		this.velocity = 0;
	}

	setGoal(newGoal: number) {
		this.goal = newGoal;
	}

	update(dt: number) {
		const p0 = this.position;
		const v0 = this.velocity;

		let offset = p0 - this.goal;
		let decay = exp(-this.dampeningRatio * this.frequency * dt);

		let newPosition;

		if (this.dampeningRatio === 1) {
			// Critical Dampening

			newPosition =
				(offset * (1 + this.frequency * dt) + v0 * dt) * decay +
				this.goal;
			this.velocity =
				(v0 * (1 - this.frequency * dt) -
					offset * (this.frequency * this.frequency * dt)) *
				decay;
		} else if (this.dampeningRatio < 1) {
			// Underdampening

			let e = 1 - this.dampeningRatio * this.dampeningRatio;
			let c = sqrt(e);
			let y = this.frequency * c;
			let i = cos(y * dt);
			let j = sin(y * dt);

			let z;
			if (c > EPSILON) {
				z = j / c;
			} else {
				let a = dt * this.frequency;
				let a_2 = a * a;
				z = a * (((e * e * a_2 - 20 * e) / 120) * a_2 + 1);
			}

			if (y > EPSILON) {
				y = j / y;
			} else {
				let b = y * y;
				let dt_2 = dt * dt;
				y = dt * ((dt_2 * ((b * b * dt_2) / 20 - b)) / 6 + 1);
			}

			let ze = z * this.dampeningRatio;
			newPosition = (offset * (i + ze) + v0 * y) * decay + this.goal;
			this.velocity =
				(v0 * (i - ze) + offset * (z * this.frequency)) * decay;
		} else {
			// Overdampening
			let x = -this.frequency * this.dampeningRatio;
			let y =
				this.frequency *
				sqrt(this.dampeningRatio * this.dampeningRatio - 1);
			let r1 = x + y;
			let r2 = x - y;

			let co2 = (v0 - offset * r1) / (2 * y);
			let co1 = offset - co2;

			let e1 = co1 * exp(r1 * dt);
			let e2 = co2 * exp(r2 * dt);

			newPosition = e1 + e2 + this.goal;
			this.velocity = e1 * r1 + e2 * r2;
		}

		this.position = newPosition;
		return newPosition;
	}
}
