import { getHeight, getWidth } from 'love.graphics';
import { OnDraw } from '../../types/system';
import { UDim2 } from './data';
import { InterfaceService, UserInterface } from './interface';

export default class UIBase implements OnDraw {
	public size: UDim2;
	public position: UDim2;
	public anchorPoint: [number, number];
	public visible: boolean = true;

	public parent?: UIBase;

	constructor() {
		this.size = new UDim2(0, 0, 0, 0);
		this.position = new UDim2(0, 0, 0, 0);
		this.anchorPoint = [0, 0];
		if (UserInterface.getRoot()) {
			this.parent = UserInterface.getRoot();
			InterfaceService.instances.push(this);
		}
	}

	/**
	 * Returns all immediate children of the UI element.
	 */
	getChildren(): UIBase[] {
		const instances = InterfaceService.instances;
		const bin: UIBase[] = [];
		// TODO: REPLACE LINEAR SEARCH WITH SOMETHING FASTER
		instances.forEach(instance => {
			if (!(instance.parent || instance.parent !== this)) {
				bin.push(instance);
			}
		});
		return bin;
	}

	/**
	 * A recursive search of descendants related to the UI element.
	 * @returns Descendants Array
	 */
	getDescendants(): UIBase[] {
		const instances = InterfaceService.instances;
		const bin: UIBase[] | undefined = this.getChildren();

		if (bin.length === 0) return bin;

		bin.forEach(instance => {
			bin.push(...instance.getDescendants());
		});

		return bin;
	}

	getAbsoluteSize(): LuaMultiReturn<[number, number]> {
		return $multi(
			math.floor(
				this.size.X.Offset +
					(this.parent
						? this.parent.getAbsoluteSize()[0]
						: getWidth()) *
						this.size.X.Scale
			),
			math.floor(
				this.size.Y.Offset +
					(this.parent
						? this.parent.getAbsoluteSize()[1]
						: getHeight()) *
						this.size.Y.Scale
			)
		);
	}

	getAbsolutePosition(): LuaMultiReturn<[number, number]> {
		return $multi(
			math.floor(
				this.position.X.Offset +
					(this.parent
						? this.parent.getAbsolutePosition()[0]
						: getWidth() * this.position.X.Scale)
			),
			math.floor(
				this.position.Y.Offset +
					(this.parent
						? this.parent.getAbsolutePosition()[1]
						: getHeight() * this.position.Y.Scale)
			)
		);
	}

	onDraw(): void {
		if (!this.visible) return;
		if (this.getChildren() !== undefined) {
			this.getChildren()!.forEach(element => {
				element.onDraw();
			});
		}
	}
}
