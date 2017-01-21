
precision mediump float; 

varying vec2 vTextureCoord;
uniform vec2 resolution;
uniform sampler2D uSampler;

void main() {
	float brightness = 0.04;
    float blueHeight = 0.04;
    float imgMix = 0.8;
    //gl_FragColor = vec4(1., 1., 1., 1.);
    gl_FragColor = vec4(vTextureCoord.x * blueHeight, vTextureCoord.y * 1., 1., 1.);
    gl_FragColor *= (texture2D(uSampler, vTextureCoord) * 0.6 + 0.4) * imgMix;
}
