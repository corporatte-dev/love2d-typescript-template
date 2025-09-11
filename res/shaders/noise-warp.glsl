#pragma language glsl3

extern number elapsedTime;
extern Image simplex;

vec4 effect(vec4 color, Image tex, vec2 uv, vec2 px) {
	number speed = 0.05;
	number amp = 0.05;

	vec2 noise_time_index = 
	fract(uv + vec2(speed * elapsedTime, speed * elapsedTime));
	vec4 noisecolor = Texel(simplex, noise_time_index);

	number xy = noisecolor.b * 0.7071;
	noisecolor.r = (noisecolor.r + xy) / 2;
	noisecolor.g = (noisecolor.g + xy) / 2;

	vec2 displacement = uv + (((amp * 2) * vec2(noisecolor)) - amp);
	vec4 texturecolor = Texel(tex, displacement);

	return texturecolor;
}
