import { getHeight, getWidth, setColor } from 'love.graphics';
import { RGBA } from 'love.math';
import { Signal } from '../signal';
import { UIFrame } from './frame';
import { UIBase } from './interface';

export class UIButton extends UIFrame {
	private static activeButton: UIButton;

	public autoButtonColor: boolean;

	public mouseHover: Signal<[UIButton]>;
	public mouseLeave: Signal<[UIButton]>;
	public mousePressBegan: Signal<[UIButton]>;
	public mousePressEnded: Signal<[UIButton]>;

	static getActiveButton() {
		return UIButton.activeButton;
	}

	private backgroundColorHolder: RGBA;
	private isPressed: boolean;
	private isHover: boolean;
	private hasClicked: boolean;

	constructor(parent?: UIBase) {
		super(parent);
		this.isHover = false;
		this.isPressed = false;
		this.hasClicked = false;

		this.autoButtonColor = true;

		this.backgroundColorHolder = this.backgroundColor;

		this.mouseHover = new Signal<[UIButton]>();
		this.mouseLeave = new Signal<[UIButton]>();
		this.mousePressBegan = new Signal<[UIButton]>();
		this.mousePressEnded = new Signal<[UIButton]>();
	}

	/**
	 * Returns wether or not the mouse is actively on the button.
	 */
	getMouseHovering(): boolean {
		return this.isHover;
	}

	onDraw(): void {
		const [mx, my] = love.mouse.getPosition();
		const [bx, by] = this.getAbsolutePosition();
		const [sx, sy] = this.getAbsoluteSize();

		const inBounds: boolean =
			mx > bx && mx < bx + sx && my > by && my < by + sy;

		const isClicked = love.mouse.isDown(1);

		if (this.isHover && isClicked && !this.hasClicked) {
			this.hasClicked = true;
			this.mousePressBegan.fire(this);
		}

		if (!isClicked && this.hasClicked) {
			this.hasClicked = false;
			this.mousePressEnded.fire(this);
		}

		if (inBounds && this.isHover === false && !this.hasClicked) {
			this.isHover = true;
			this.mouseHover.fire(this);
		} else if (!inBounds && this.isHover) {
			this.isHover = false;
			this.mouseLeave.fire(this);
		}

		super.onDraw();

		// We draw the button coloring after the button frame is rendered
		if (this.autoButtonColor) {
			if (this.isHover && !this.hasClicked) {
				setColor(0, 0, 0, 0.15);
			} else if (!this.isHover) {
				setColor(0, 0, 0, 0);
			}

			if (this.hasClicked) {
				setColor(1, 1, 1, 0.3);
			}

			const positionLimits: [number, number] = [getWidth(), getHeight()];
			const positionOrigin: [number, number] = [0, 0];

			if (this.parent) {
				positionOrigin[0] = bx;
				positionOrigin[1] = by;
				positionLimits[0] = positionOrigin[0] + sx;
				positionLimits[1] = positionOrigin[1] + sy;
			}

			love.graphics.rectangle(
				'fill',
				positionOrigin[0] +
					this.position.X.Offset +
					this.position.X.Scale * positionLimits[0],
				positionOrigin[1] +
					this.position.Y.Offset +
					this.position.Y.Scale * positionLimits[1],
				sx,
				sy
			);
		}
	}
}
