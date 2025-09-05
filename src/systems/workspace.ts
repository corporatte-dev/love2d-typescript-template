import { newWorld, World } from 'love.physics';
import { OnLoad, OnUpdate } from '../types/system';

export class Workspace implements OnLoad, OnUpdate {
	private entities: number[] = [];
	private phys_world: World = newWorld();

	onLoad(): void {}

	onUpdate(dt: number): void {
		this.phys_world.update(dt);
	}
}
