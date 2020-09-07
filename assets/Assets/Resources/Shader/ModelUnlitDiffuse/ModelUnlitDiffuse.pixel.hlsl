
#include <common.inc>

struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
    float3 LightDir : TEXCOORD1;
    float3 ViewDir : TEXCOORD2;
    float3 WorldPosition : TEXCOORD3;
    LIGHTMAP_COORDS(4)
    FOG_COORDS(5)
    SHADOW_COORDS(6)
};

cbuffer material
{
    float4 u_tintColor;
	float u_intensity;
#if defined(USE_ALPHA_TEST)
    float _Cutoff;
#endif
}

DECLARE_TEXTURE(_MainTex);


float4 Main(in FVertexOutput In) : SV_Target0
{
	float4 color = SAMPLE_TEXTURE(_MainTex, In.TexCoord) * u_tintColor * u_intensity;
#if defined(USE_ALPHA_TEST)
    clip(color.a - _Cutoff);
#endif

#if defined(USE_FOG)
    APPLY_FOG(In, color);
#endif

    return color;
}
