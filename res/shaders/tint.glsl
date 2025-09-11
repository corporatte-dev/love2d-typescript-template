#pragma language glsl3

vec4 effect(vec4 color, Image texture, vec2 uv, vec2 px) {
    vec4 pixel = Texel(tex, uv);
    return pixel * color;
}