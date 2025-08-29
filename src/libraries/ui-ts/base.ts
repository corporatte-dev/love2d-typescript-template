import { getHeight, getWidth } from "love.graphics";
import { UDim2 } from "./data";
import { OnDraw } from "../../types/system";

export default class UIBase implements OnDraw {
    public size: UDim2;
    public position: UDim2;

    public visible: boolean = true;

    public parent?: UIBase;

    constructor() {
        this.size = new UDim2(0, 0, 0, 0);
        this.position = new UDim2(0, 0, 0, 0);
    }

    getAbsoluteSize(): LuaMultiReturn<[number, number]> {
        return $multi(
            math.floor(this.size.X.Offset + ((this.parent ? this.parent.getAbsoluteSize()[0] : getWidth()) * this.size.X.Scale)),
            math.floor(this.size.Y.Offset + ((this.parent ? this.parent.getAbsoluteSize()[1] : getHeight()) * this.size.Y.Scale))
        );
    }

    getAbsolutePosition(): LuaMultiReturn<[number, number]> {
        return $multi(
            math.floor(this.position.X.Offset + (this.parent ? this.parent.getAbsolutePosition()[0] : getWidth() * this.position.X.Scale)),
            math.floor(this.position.Y.Offset + (this.parent ? this.parent.getAbsolutePosition()[1] : getHeight() * this.position.Y.Scale))
        );
    }

    onDraw(): void {
        if (!this.visible) return;
    }
}
