import UIBase from "./base";

export class UIButton extends UIBase {
    private static activeButton: UIButton;

    static getActiveButton() {
        return UIButton.activeButton;
    }

    private isPressed: boolean;
    private isHover: boolean;

    constructor() {
        super();
        this.isHover = false;
        this.isPressed = false;
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

        if ((mx > bx && mx < (bx + sx)) && (my > by && (by + sy)) && !this.isHover) {
            this.isHover = true;
        } else if (this.isHover) {
            this.isHover = false;
        }
        super.onDraw();
    }
}