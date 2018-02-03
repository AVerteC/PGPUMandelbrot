PShader = shader

def setup(): 
    size(1920, 1080, P2D)
    noStroke()
    
    global mbrot
    mbrot = loadShader("mbrot.frag")
    mbrot.set("u_resolution", float(width), float(height))
    shader(mbrot)

def draw():
    rect(0,0,width,height)
    
    # Framerate Counter
    if frameCount % 10 == 0:
        print frameRate


