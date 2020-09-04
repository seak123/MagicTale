#include <common.inc>

struct FVertexOutput
{
	float4 Position : SV_Position;
	float2 TexCoord : TEXCOORD0;
};

#define FXAA_SPAN_MAX 8.0
#define FXAA_REDUCE_MUL   (1.0/FXAA_SPAN_MAX)
#define FXAA_REDUCE_MIN   (1.0/128.0)
float4 Main(in FVertexOutput In) : SV_Target0
{
	float2 uv = In.TexCoord;
	float2 step = 1.f / float2(u_width, u_height);

	float3 rgbNW = SAMPLE_TEXTURE(sourceTex, uv + float2(-1, -1) * step).xyz;
	float3 rgbNE = SAMPLE_TEXTURE(sourceTex, uv + float2(1, -1) * step).xyz;
	float3 rgbSW = SAMPLE_TEXTURE(sourceTex, uv + float2(-1, 1) * step).xyz;
	float3 rgbSE = SAMPLE_TEXTURE(sourceTex, uv + float2(1, 1) * step).xyz;
	float4 colorM = SAMPLE_TEXTURE(sourceTex, uv);
	float3 rgbM = colorM.xyz;

	float3 luma = float3(0.299, 0.587, 0.114);
	float lumaNW = dot(rgbNW, luma);
	float lumaNE = dot(rgbNE, luma);
	float lumaSW = dot(rgbSW, luma);
	float lumaSE = dot(rgbSE, luma);
	float lumaM = dot(rgbM,  luma);

	float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
	float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

	float2 dir;
	dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
	dir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));

	float dirReduce = max(
		(lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL),
		FXAA_REDUCE_MIN);
	float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);

	dir = min(float2(FXAA_SPAN_MAX,  FXAA_SPAN_MAX),
		  max(float2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
		  dir * rcpDirMin)) * step;

	float3 rgbA = .5 * (
		SAMPLE_TEXTURE(sourceTex, uv + dir * (1.0 / 3.0 - 0.5)).xyz +
		SAMPLE_TEXTURE(sourceTex, uv + dir * (2.0 / 3.0 - 0.5)).xyz
	);
	float3 rgbB = rgbA * .5 + .25 * (
		SAMPLE_TEXTURE(sourceTex, uv + dir * (0.0 / 3.0 - 0.5)).xyz +
		SAMPLE_TEXTURE(sourceTex, uv + dir * (3.0 / 3.0 - 0.5)).xyz
	);

	float lumaB = dot(rgbB, luma);

	if ((lumaB < lumaMin) || (lumaB > lumaMax)) return float4(rgbA, colorM.a);

	return float4(rgbB, colorM.a);
}
