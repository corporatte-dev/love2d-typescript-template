import { OnLoad, OnUpdate } from '../types/system';

function createComponentID(): number {
	let ID: number = 0;
	while (ID === 0 || Component.Components[ID]) {
		ID = math.random(1, 256);
	}
	return ID;
}

function createEntityID(): number {
	let ID: string = '';
	while (
		ID === '' ||
		World.Entities[tonumber(ID !== '' ? ID : 1)!] !== undefined
	) {
		for (let i = 0; i < 6; i++) {
			// We can't lead with a zero in our index!!!
			if (i === 0) {
				const number = math.random(1, 9);
				ID = `${i}`;
			} else {
				const number = math.random(0, 9);
				ID = `${ID}${i}`;
			}
		}
	}
	return tonumber(ID)!;
}

/**
 * ECS:
 * `Components` are used to store data and as a unique identifier for `Entities` and `Systems`.
 */
export abstract class Component {
	public static readonly Components: number[];

	/**
	 * The Component's unique identifer **( READONLY )**
	 */
	public readonly ID: number;

	constructor() {
		this.ID = createComponentID();
	}
}

/**
 * ECS:
 * `Entities` are game objects that are composed of `Components` and are manipulated by `Systems`
 */
export class Entity {
	public static EntityLimit: number = 1000;

	/**
	 * The Entity's Unique Identifier **( READONLY )**
	 */
	public readonly ID: number;

	private components: number[];
	private tags: string[];

	constructor() {
		this.ID = createEntityID();
		this.components = [];
		this.tags = [];
		World.Entities.push(this.ID);
	}

	/**
	 * Removes the entity from the world.
	 */
	destroy() {
		delete World.Entities[this.ID];
	}

	/**
	 * Appends a tag onto the entity.
	 * @param tag string
	 */
	addTag(tag: string) {
		this.tags.push(tag);
	}

	/**
	 * Removes a given tag from the Entity if it exists, if not returns false.
	 * @param tag The Provided Tag
	 * @returns If the removal was successful or the tag didn't exist on the Entity.
	 */
	removeTag(tag: string): boolean {
		const index = this.tags.indexOf(tag);
		if (index !== -1) delete this.tags[index];
		return index !== -1;
	}

	/**
	 * Returns a table of tags from the entity.
	 * @returns string table
	 */
	getTags(): string[] {
		return this.tags;
	}

	/**
	 * Adds a component onto the entity.
	 * @param component
	 */
	addComponent(component: Component) {
		this.components.push(component.ID);
	}

	/**
	 * Returns true if the component is found on the entity.
	 * @param component
	 * @returns If the entity has the component.
	 */
	hasComponent(component: Component): boolean {
		return this.components.indexOf(component.ID) !== -1;
	}
}

export interface System {
	init(world: World): void;
	update(world: World, dt: number): void;
}

export class World implements OnUpdate, OnLoad {
	public static readonly Entities: number[];
	public static readonly Systems: System[];

	onLoad(): void {
		World.Systems.forEach(system => {
			system.init(this);
		});
	}

	onUpdate(dt: number): void {
		World.Systems.forEach(system => {
			system.update(this, dt);
		});
	}
}
