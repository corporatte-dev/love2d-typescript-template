export interface OnLoad {
    onLoad(): void;
}

export interface OnUpdate {
    onUpdate(dt: number): void;
}

export interface OnDraw {
    onDraw(): void;
}
