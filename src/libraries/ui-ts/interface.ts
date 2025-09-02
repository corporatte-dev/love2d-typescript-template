import { OnDraw } from "../../types/system";
import UIBase from "./base";
import { UDim2 } from "./data";
import UIFrame from "./frame"

export class InterfaceService implements OnDraw {
    private root: UIFrame | undefined;
    public static instances: UIBase[] = [];

    /**
     * Creates and returns the base of the UI Tree.
     */
    createRoot(): UIFrame {
        this.root = new UIFrame();
        this.root.backgroundTransparency = 1;
        this.root.size = UDim2.fromScale(1, 1);
        return this.root;
    }

    /**
     * Returns the root of UI Tree.
     */
    getRoot(): UIFrame | undefined {
        return this.root;
    }

    /**
     * Calls to update the UI starting from the root.
     */
    onDraw(): void {
        if (this.root) {
            this.root.onDraw();
        }
    }
}

export const UserInterface = new InterfaceService();