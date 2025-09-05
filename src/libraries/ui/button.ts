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

		if (!this.isHover && !this.hasClicked) {
			this.backgroundColorHolder = this.backgroundColor;
		}

		const inBounds: boolean =
			mx > bx && mx < bx + sx && my > by && my < by + sy;

		const isClicked = love.mouse.isDown(1);

		if (this.isHover && isClicked && !this.hasClicked) {
			this.hasClicked = true;
			this.backgroundColor = [
				this.backgroundColorHolder[0] + 0.2,
				this.backgroundColorHolder[1] + 0.2,
				this.backgroundColorHolder[2] + 0.2,
			];
			this.mousePressBegan.fire(this);
		}

		if (!isClicked && this.hasClicked) {
			this.hasClicked = false;
			this.backgroundColor[0] = this.backgroundColorHolder[0];
			this.backgroundColor[1] = this.backgroundColorHolder[1];
			this.backgroundColor[2] = this.backgroundColorHolder[2];
			this.mousePressEnded.fire(this);
		}

		if (inBounds && this.isHover === false && !this.hasClicked) {
			this.isHover = true;
			this.mouseHover.fire(this);
			if (this.autoButtonColor) {
				this.backgroundColor[0] = math.max(
					0,
					this.backgroundColorHolder[0] - 0.15
				);
				this.backgroundColor[1] = math.max(
					0,
					this.backgroundColorHolder[1] - 0.15
				);
				this.backgroundColor[2] = math.max(
					0,
					this.backgroundColorHolder[2] - 0.15
				);
			}
		} else if (!inBounds && this.isHover) {
			this.isHover = false;
			this.mouseLeave.fire(this);
			if (this.autoButtonColor) {
				this.backgroundColor[0] = math.min(
					1,
					this.backgroundColorHolder[0] + 0.15
				);
				this.backgroundColor[1] = math.min(
					1,
					this.backgroundColorHolder[1] + 0.15
				);
				this.backgroundColor[2] = math.min(
					1,
					this.backgroundColorHolder[2] + 0.15
				);
			}
		}

		super.onDraw();
	}
}
