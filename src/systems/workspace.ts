import { Signal } from '../libraries/signal';
import { Renderer, System } from '../types/system';
import GameSystem from './game';
import GameRenderer from './renderer';

class WorkspaceRenderer implements Renderer {
	onLoad(): void {
		
	}

	onDraw(): void {
		
	}
}
class WorkspaceSystem implements System {
	onLoad(): void {
		
	}

	onUpdate(dt: number): void {
		
	}
}

export default class Workspace {
	public onWorldLoaded: Signal<[]> = new Signal();

	private renderer: WorkspaceRenderer = new WorkspaceRenderer();
	private system: WorkspaceSystem = new WorkspaceSystem();

	private grid_world: number[][] = [];

	private static instance: Workspace = new Workspace();

	private constructor() {
		GameSystem.getInstance().appendSystemToUpdate(this.system);
		GameRenderer.getInstance().addSystemToRenderer(this.renderer);
	}

	public static get(): Workspace { return this.instance; }

	/**
	 * Returns the dimensions of the world grid
	 */
	getGridDimensions(): [number, number] {
		return [this.grid_world[0].length, this.grid_world.length];
	}

	/**
	 * Sets the dimensions of the world grid, any new data is set to 0 by default.
	 * @param width Width of the grid map
	 * @param height Height of the grid map
	 */
	setGridDimensions(width: number, height: number) {
		this.grid_world.length = height;
		for (let i = 0; i < height; i++) {
			this.grid_world[i].length = width;
			for (let j = 0; j < width; j++) {
				if (this.grid_world[i][j]) continue;
				this.grid_world[i][j] = 0;
			}
		}
	}
}
