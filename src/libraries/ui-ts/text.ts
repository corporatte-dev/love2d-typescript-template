import { AlignMode } from "love.graphics";
import UIBase from "./base";
import { RGB } from "love.math";


export class UIText extends UIBase {
    public text: string;
    public textSize: number;
    public textAlignment: AlignMode;
    public textColor: RGB;

    constructor() {
        super();
        this.text = "Text Label";
        this.textSize = 14;
        this.textAlignment = "center";
        this.textColor = [255, 255, 255];
    }

    onDraw(): void {
        const [posX, posY] = this.getAbsolutePosition();
        const [sizeX, sizeY] = this.getAbsoluteSize();

        love.graphics.setColor(this.textColor);

        if (this.textAlignment == "center") {
            love.graphics.printf(
                this.text,
                posX + math.floor(sizeX / 2),
                posY + math.floor(sizeY / 2),
                math.floor(sizeX / 2),
                this.textAlignment
            );
        } else if (this.textAlignment == "right") {
            love.graphics.printf(
                this.text,
                posX + math.floor(sizeX / 2),
                posY + math.floor(sizeY / 2),
                sizeX,
                this.textAlignment
            );
        } else if (this.textAlignment == "left") {
            love.graphics.printf(
                this.text,
                posX,
                posY,
                sizeX,
                this.textAlignment
            );
        }
    }
}