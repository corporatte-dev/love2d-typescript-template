import UIBase from "./base";
import { UIButton } from "./button";
import { UDim2 } from "./data";
import { UIText } from "./text";

export class UIInputFrame extends UIBase {
    public placeholderText: string = "Type Here";

    private button: UIButton;
    private placeholderUI: UIText;
    private input: UIText;

    constructor() {
        super();
        this.button = new UIButton();
        this.button.parent = this;
        this.button.size = UDim2.fromScale(1, 1);

        this.placeholderUI = new UIText();
        this.placeholderUI.text = this.placeholderText;
        this.input = new UIText();
    }

    getInput(): string {
        return this.input.text;
    }

    onDraw(): void {
        
    }
}