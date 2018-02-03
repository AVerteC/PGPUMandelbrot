//FRAGMENT shadER

#ifdef GL_ES
precision highp float;
#endif
#define PROCESSING_COLOR_SHADER
#define RE_START -2.
//or float x = 2.0;
//or float x - float(2);
#define RE_END    1.
#define IM_START -1.
#define IM_END    1.
#define MAX_ITER 359
uniform vec2 u_resolution;

//gl_FragCoord is current pixel
//main loops the entire program every pixel

vec2 simpleComplex(vec2 xy) {
    vec2 result;
    result.x = (RE_START + (xy.x/u_resolution.x) * float(RE_END - RE_START));
	result.y = (IM_START + (xy.y/u_resolution.y) * float(IM_END - IM_START));
	return result;        
}

//GLSL doesn't support while loops on old versions for some reason... ¯\_(ツ)_/¯
float fMbrot(vec2 c) {
    int n = 0;
    float i = 0.;
    vec2 z;
    
    for(i=0.;i<float(MAX_ITER);i++){
        z = vec2(z.x*z.x - z.y*z.y, 2.*z.x*z.y) + c;
    	if(length(z)>2.) break;
    }
    return i;    
}
    

// original code at https://www.shadertoy.com/view/MlSfDK

vec4 nmap(float n) {
	vec3 colmap;
    if (float(n) <= float(MAX_ITER)) {
        float quotient = float(n) / float(MAX_ITER);
        float color = clamp(quotient,0.,1.);
        	if (quotient > 0.5) {
        	// Close to the mandelbrot set the color changes from green to white 
 				colmap = vec3(0.); //(color,1.,color);
        	}
        	else {
                colmap = vec3(0.,color,0.);
            }
    }
    return vec4(colmap,1.);
}

void main( void ) {
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
	float aspect = u_resolution.y/u_resolution.x;
	vec2 p = uv*2.-1.; // transform uv range(0-1) to be centered and normalized(-1-1)
	p.y*=aspect;
    float n = fMbrot(p*2.); // *2. is the zoom value to create a variable for controlled by GUI
    float fn = float (n);
    vec4 preColor = nmap(fn);
    gl_FragColor = preColor;
}