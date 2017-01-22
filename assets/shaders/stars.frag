
precision mediump float; 

varying vec2 vTextureCoord;
uniform vec2 resolution;
uniform sampler2D uSampler;

void main() {
    gl_FragColor = vec4(1., 1., 1., 1.);
    //gl_FragColor = vec4(vTextureCoord.x * 0.1, vTextureCoord.y * 0.7, 0.7, 1.);
    gl_FragColor *= texture2D(uSampler, vTextureCoord);
}
