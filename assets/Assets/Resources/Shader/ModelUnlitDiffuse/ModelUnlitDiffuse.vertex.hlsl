#define BONE_NUM 99
#include <common.inc>

// varying define
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
}

void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
    FVertexProcessOutput VPOut;
    Effect3DVertexProcess(In, VPOut);

    Out.TexCoord = TRANSFER_TEXCOORD(VPOut.TexCoord, float4(1.0, 1.0, 0.0, 0.0));

    // position
    float4 worldPosition = VPOut.WorldPosition;
    Out.Position = WorldToClipPosition(worldPosition);

    float3 worldNormal = ObjectToWorldNormal(VPOut.Normal);
    float3 worldTangent = ObjectToWorldNormal(VPOut.Tangent.xyz);
    float3 worldBinormal = cross(worldTangent, worldNormal) * VPOut.Tangent.w;
    // transpose
    float3x3 worldToTangent = float3x3(worldTangent, worldBinormal, worldNormal);

    float3 worldSpaceViewDir = normalize(WorldSpaceViewPosition - worldPosition.xyz);
    float3 worldSpaceLightDir = WorldSpaceLightDir;

    // 法线贴图模式，在切线空间定义v_lightDir和v_viewDir，法线使用采样数据
    Out.LightDir = mul(worldToTangent, worldSpaceLightDir);
    Out.ViewDir = mul(worldToTangent, worldSpaceViewDir);

    TRANSFER_LIGHTMAP(In, Out);
    TRANSFER_SHADOW(Out, worldPosition.xyz);
    TRANSFER_FOG(Out, worldPosition.xyz);
}
