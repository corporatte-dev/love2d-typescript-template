import { getX, getY } from "love.mouse";
import { Signal } from "../signal";
import UIBase from "./base";
import { UDim2 } from "./data";
import { isInBounds, mousePos, UDimToPixels } from "./util";
import { getHeight, getWidth } from "love.graphics";
import { colorFromBytes, RGB } from "love.math";

export default class UIFrame extends UIBase {
    public readonly mouseEnter: Signal<[UIFrame]>;
    public readonly mouseLeave: Signal<[UIFrame]>;

    private mouseEntered: boolean = false;

    public backgroundTransparency: number = 0;
    public backgroundColor: RGB = colorFromBytes(255, 255, 255) as LuaMultiReturn<RGB>;
    public rotation: number = 0;

    constructor() {
        super();
        this.mouseLeave = new Signal<[UIFrame]>();
        this.mouseEnter = new Signal<[UIFrame]>();

        this.size = UDim2.fromOffset(100, 100);
        this.position = new UDim2(0, 0, 0, 0);
    }

    onDraw(): void {
        super.onDraw();

        love.graphics.setColor(this.backgroundColor);

        const positionLimits: [number, number] = [getWidth(), getHeight()];
        const positionOrigin: [number, number] = [0, 0];

        if (this.parent) {
            positionOrigin[0] = this.parent.getAbsolutePosition()[0];
            positionOrigin[1] = this.parent.getAbsolutePosition()[1];
            positionLimits[0] = positionOrigin[0] + this.parent.getAbsoluteSize()[0];
            positionLimits[1] = positionOrigin[1] + this.parent.getAbsoluteSize()[1];
        }

        if (isInBounds(positionOrigin, this.getAbsoluteSize(), mousePos) && !this.mouseEntered) {
            this.mouseEntered = true;
            this.mouseEnter.fire(this);
        } else if (!isInBounds(positionOrigin, this.getAbsoluteSize(), mousePos) && this.mouseEntered) {
            this.mouseEntered = false;
            this.mouseLeave.fire(this);
        }

        love.graphics.rectangle(
            "fill",
            positionOrigin[0] + UDimToPixels(this.position.X, positionLimits[0]),
            positionOrigin[1] + UDimToPixels(this.position.Y, positionLimits[1]),
            this.getAbsoluteSize()[0],
            this.getAbsoluteSize()[1]
        );
    }
}