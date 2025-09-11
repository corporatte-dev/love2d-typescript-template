export interface System {
    onLoad(): void;
    onUpdate(dt: number): void;
}

export interface Renderer {
    onLoad(): void;
    onDraw(): void;
}

export interface OnDraw {
    onDraw(): void;
}
