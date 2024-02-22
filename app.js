// WebGL context
var gl;
var canvas;

// 2D context for drawing the score and timer
var context;
var canvas2D;

// Two lists holding the vertex and fragment shader
var vertexShaderSource = 
[
     'precision mediump float;',
     '',
     'attribute vec2 Positions;',
     'attribute vec3 Colors;',
     'varying vec3 VertexColor;',
     '',
     'uniform float PointSize;',
     '',
     'void main()',
     '{',
        'VertexColor = Colors;',
        'gl_Position = vec4(Positions, 0.0, 1.0);',
        'gl_PointSize = PointSize;',
     '}'
].join('\n');

var fragmentShaderSource = 
[
     'precision mediump float;',
     '',
     'varying vec3 VertexColor;',
     '',
     'void main()',
     '{',
        'gl_FragColor = vec4(VertexColor, 1.0);',
     '}'
].join('\n');

// Define the main triangle class
class mainTriangle {

    // CONSTRUCTOR
    constructor(triangleCenterX, triangleCenterY, triangleVertexOneX,
                triangleVertexOneY, triangleVertexTwoX, triangleVertexTwoY,
                triangleVertexThreeX, triangleVertexThreeY, isFacedNorth,
                isFacedWest, isFacedEast, isFacedSouth) {
        this._triangleCenterX = triangleCenterX;
        this._triangleCenterY = triangleCenterY;
        this._triangleVertexOneX = triangleVertexOneX;
        this._triangleVertexOneY = triangleVertexOneY;
        this._triangleVertexTwoX = triangleVertexTwoX;
        this._triangleVertexTwoY = triangleVertexTwoY;
        this._triangleVertexThreeX = triangleVertexThreeX;
        this._triangleVertexThreeY = triangleVertexThreeY;
        this._isFacedNorth = isFacedNorth;
        this._isFacedWest = isFacedWest;
        this._isFacedEast = isFacedEast;
        this._isFacedSouth = isFacedSouth;
    }
    // SETTERS AND GETTERS
    get triangleCenterX() {
        return this._triangleCenterX;
    }

    set triangleCenterX(value) {
        this._triangleCenterX = value;
    }

    get triangleCenterY() {
        return this._triangleCenterY;
    }

    set triangleCenterY(value) {
        this._triangleCenterY = value;
    }

    get triangleVertexOneX() {
        return this._triangleVertexOneX;
    }

    set triangleVertexOneX(value) {
        this._triangleVertexOneX = value;
    }

    get triangleVertexOneY() {
        return this._triangleVertexOneY;
    }

    set triangleVertexOneY(value) {
        this._triangleVertexOneY = value;
    }

    get triangleVertexTwoX() {
        return this._triangleVertexTwoX;
    }

    set triangleVertexTwoX(value) {
        this._triangleVertexTwoX = value;
    }

    get triangleVertexTwoY() {
        return this._triangleVertexTwoY;
    }

    set triangleVertexTwoY(value) {
        this._triangleVertexTwoY = value;
    }

    get triangleVertexThreeX() {
        return this._triangleVertexThreeX;
    }

    set triangleVertexThreeX(value) {
        this._triangleVertexThreeX = value;
    }

    get triangleVertexThreeY() {
        return this._triangleVertexThreeY;
    }

    set triangleVertexThreeY(value) {
        this._triangleVertexThreeY = value;
    }

    get isFacedNorth() {
        return this._isFacedNorth;
    }

    set isFacedNorth(value) {
        this._isFacedNorth = value;
    }

    get isFacedWest() {
        return this._isFacedWest;
    }

    set isFacedWest(value) {
        this._isFacedWest = value;
    }

    get isFacedEast() {
        return this._isFacedEast;
    }

    set isFacedEast(value) {
        this._isFacedEast = value;
    }

    get isFacedSouth() {
        return this._isFacedSouth;
    }

    set isFacedSouth(value) {
        this._isFacedSouth = value;
    }

    // METHODS

    // The method faceNorth will move the head of the
    // main triangle to the north direction (up).
    faceNorth() {
         if (this._isFacedWest) {
            // Change the vertex of the triangle accordingly.
            this._triangleVertexOneX += 10;
            this._triangleVertexOneY -= 10;
            this._triangleVertexTwoX -= 20;
            this._triangleVertexThreeY += 20;

            // Change the state of the position accordingly.
            this._isFacedNorth = true;
            this._isFacedWest = false;
        }

        else if (this._isFacedEast) {
            this._triangleVertexOneX -= 10;
            this._triangleVertexOneY -= 10;
            this._triangleVertexTwoY += 20;
            this._triangleVertexThreeX += 20;

            this._isFacedNorth = true;
            this._isFacedEast = false;
        }

        else if (this._isFacedSouth) {
            this._triangleVertexOneY -= 20;
            this._triangleVertexTwoX -= 20;
            this._triangleVertexTwoY += 20;
            this._triangleVertexThreeX += 20;
            this._triangleVertexThreeY += 20;

            this._isFacedNorth = true;
            this._isFacedSouth = false;
        }
    }

    // The method faceWest will move the head of the
    // main triangle to the west direction (left).
    faceWest() {
        if (this._isFacedNorth) {
            this._triangleVertexOneX -= 10;
            this._triangleVertexOneY += 10;
            this._triangleVertexTwoX += 20;
            this._triangleVertexThreeY -= 20;

            this._isFacedWest = true;
            this._isFacedNorth = false;

        }

        else if (this._isFacedEast) {
            this._triangleVertexOneX -= 20;
            this._triangleVertexTwoX += 20;
            this._triangleVertexTwoY += 20;
            this._triangleVertexThreeX += 20;
            this._triangleVertexThreeY -= 20;

            this._isFacedWest = true;
            this._isFacedEast = false;
        }

        else if (this._isFacedSouth) {
            this._triangleVertexOneX -= 10;
            this._triangleVertexOneY -= 10;
            this._triangleVertexTwoY += 20;
            this._triangleVertexThreeX += 20;

            this._isFacedWest = true;
            this._isFacedSouth = false;
        }
    }

    // The method faceEast will move the head of the
    // main triangle to the east direction (right).
    faceEast() {
        if (this._isFacedNorth) {
            this._triangleVertexOneX += 10;
            this._triangleVertexOneY += 10;
            this._triangleVertexTwoY -= 20;
            this._triangleVertexThreeX -= 20;

            this._isFacedEast = true;
            this._isFacedNorth = false;
        }

        else if (this._isFacedWest) {
            this._triangleVertexOneX += 20;
            this._triangleVertexTwoX -= 20;
            this._triangleVertexTwoY -= 20;
            this._triangleVertexThreeX -= 20;
            this._triangleVertexThreeY += 20;

            this._isFacedEast = true;
            this._isFacedWest = false;

        }

        else if (this._isFacedSouth) {
            this._triangleVertexOneX += 10;
            this._triangleVertexOneY -= 10;
            this._triangleVertexTwoX -= 20;
            this._triangleVertexThreeY += 20;

            this._isFacedEast = true;
            this._isFacedSouth = false;
        }
    }

    // The method faceSouth will move the head of the
    // main triangle to the south direction (down).
    faceSouth() {
        if (this._isFacedNorth) {
            this._triangleVertexOneY += 20;
            this._triangleVertexTwoX += 20;
            this._triangleVertexTwoY -= 20;
            this._triangleVertexThreeX -= 20;
            this._triangleVertexThreeY -= 20;

            this._isFacedSouth = true;
            this._isFacedNorth = false;
        }

        else if (this._isFacedWest) {
            this._triangleVertexOneX += 10;
            this._triangleVertexOneY += 10;
            this._triangleVertexTwoY -= 20;
            this._triangleVertexThreeX -= 20;

            this._isFacedSouth = true;
            this._isFacedWest = false;
        }

        else if (this._isFacedEast) {
            this._triangleVertexOneX -= 10;
            this._triangleVertexOneY += 10;
            this._triangleVertexTwoX += 20;
            this._triangleVertexThreeY -= 20;

            this._isFacedSouth = true;
            this._isFacedEast = false;
        }
    }

    // moveNorth will move the triangle one block to up.
    moveNorth() {
        // Move the center of the triangle
        this._triangleCenterY -= 40;

        // Move the vertices of the triangle
        this._triangleVertexOneY -= 40;
        this._triangleVertexTwoY -= 40;
        this._triangleVertexThreeY -= 40;

    }

    // moveWest will move the triangle one block to the left
    moveWest() {
        this._triangleCenterX -= 40;
        this._triangleVertexOneX -= 40;
        this._triangleVertexTwoX -= 40;
        this._triangleVertexThreeX -= 40;
    }

    // moveEast will move the triangle one block to the right
    moveEast() {
        this._triangleCenterX += 40;
        this._triangleVertexOneX += 40;
        this._triangleVertexTwoX += 40;
        this._triangleVertexThreeX += 40;
    }

    // moveSouth will move the triangle one block down.
    moveSouth() {
        this._triangleCenterY += 40;
        this._triangleVertexOneY += 40;
        this._triangleVertexTwoY += 40;
        this._triangleVertexThreeY += 40;
    }
}

class ghosts {
    constructor (ghostX, ghostY, prevMoveDirection) {

        this._ghostX = ghostX;
        this._ghostY = ghostY;
        this._prevMoveDirection = prevMoveDirection;
    }

    // SETTERS AND GETTERS
    get ghostX() {
        return this._ghostX;
    }

    set ghostX(value) {
        this._ghostX = value;
    }
    get ghostY() {
        return this._ghostY;
    }

    set ghostY(value) {
        this._ghostY = value;
    }

    get prevMoveDirection() {
        return this._prevMoveDirection;
    }

    set prevMoveDirection(value) {
        this._prevMoveDirection = value;
    }

    // METHODS
    moveGhost() {
        let randomNumber = Math.floor(Math.random() * 4) + 1;

        if (randomNumber === 1) {
            // Move north
            this._ghostY -= 40;

            // Specify the direction ghost moved.
            this._prevMoveDirection = 'north';
        }

        else if (randomNumber === 2) {
            // Move west
            this._ghostX -= 40;
            this._prevMoveDirection = 'west';
        }

        else if (randomNumber === 3) {
            // Move east
            this._ghostX += 40;
            this._prevMoveDirection = 'east';
        }

        else if (randomNumber === 4) {
            // Move south
            this._ghostY += 40;
            this._prevMoveDirection = 'south';
        }
    }
}

function init() {
    canvas = document.getElementById("gameCanvas");
    gl = canvas.getContext("webgl2");

    canvas2D = document.getElementById("gameCanvas2D");
    context = canvas2D.getContext("2d");

    // Check if the WebGL is supported
    if (!gl) {
        console.log('WebGL not supported, falling back on experimental-webgl');
        gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
        alert('Your browser does not support WebGL');
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.lineWidth(1);

    console.log("WebGL initialized.");
}


function setupScore(currentScore) {
    // Using 2d context generate the score on the top left of the screen.
    context.clearRect(0, 0, 150, 150);
    context.font = 'bold 20px Arial';
    context.fillStyle = 'white';
    context.fillText(currentScore.toString(), 60, 30);
}

function setupTimer (currentSecond) {
    // TO DO
    context.clearRect(350, 10, 100, 100);
    context.font = 'bold 20px Arial';
    context.fillStyle = 'white';
    context.fillText(currentSecond.toString(), 360, 30);
}


var mainTrianglePositions = [];
var mainTriangleColors;
var backgroundBoxPositions;
var backgroundBoxColors;
var barriersPositions;
var barriersColors = [];
var borders;
var pointsPositions = [];
var pointsColors = [];
var ghostsPositions = [];
var ghostColors;
var specialObjectPosition;
var specialObjectColor;

function convertWindowToClipX(windowX) {
    return -1 + 2 * windowX / canvas.width;
}

function convertWindowToClipY(windowY) {
    return -1 + 2 * (canvas.height - windowY) / canvas.height;
}

function removePoints(xCoordinate, yCoordinate) {
    for (let i = 0; i < pointsPositions.length; i++) {
        // Find the index with the provided coordinates
        const removeTheIndex = pointsPositions.findIndex(
            item => item[0] === convertWindowToClipX(xCoordinate)
                && item[1] === convertWindowToClipY(yCoordinate));

        // Remove the element if an element with satisfying conditions where found.
        if (removeTheIndex !== -1) {
            pointsPositions.splice(removeTheIndex, 1);
        }
    }
}

function generateMainTriangleVertices(vertexOneX, vertexOneY, vertexTwoX, vertexTwoY,
                                      vertexThreeX, vertexThreeY) {
    // Check if the mainTrianglePositions is empty
    if (mainTrianglePositions.length === 0) {
        mainTrianglePositions.push(vec2(convertWindowToClipX(vertexOneX),
            convertWindowToClipY(vertexOneY)));

        mainTrianglePositions.push(vec2(convertWindowToClipX(vertexTwoX),
            convertWindowToClipY(vertexTwoY)));

        mainTrianglePositions.push(vec2(convertWindowToClipX(vertexThreeX),
            convertWindowToClipY(vertexThreeY)));
    }

    // If the array is not empty remove all the items, and push the newly provided coordinates.
    else if (mainTrianglePositions.length !== 0) {
        mainTrianglePositions.splice(0, 3);

        mainTrianglePositions.push(vec2(convertWindowToClipX(vertexOneX),
            convertWindowToClipY(vertexOneY)));

        mainTrianglePositions.push(vec2(convertWindowToClipX(vertexTwoX),
            convertWindowToClipY(vertexTwoY)));

        mainTrianglePositions.push(vec2(convertWindowToClipX(vertexThreeX),
            convertWindowToClipY(vertexThreeY)));

        //console.log(mainTrianglePositions);
    }
}

function generateGhostsVertices(ghostOneX, ghostOneY, ghostTwoX, ghostTwoY) {
    // Check if the ghostsPositions array is empty.
    if (ghostsPositions.length === 0) {
        ghostsPositions.push(vec2(convertWindowToClipX(ghostOneX), convertWindowToClipY(ghostOneY)));
        ghostsPositions.push(vec2(convertWindowToClipX(ghostTwoX), convertWindowToClipY(ghostTwoY)));
    }

    // If the ghostsPositions array is not empty remove the existing elements,
    // and push the newly provided elements.
    else if (ghostsPositions.length !== 0) {
        ghostsPositions.splice(0, 2);

        ghostsPositions.push(vec2(convertWindowToClipX(ghostOneX), convertWindowToClipY(ghostOneY)));
        ghostsPositions.push(vec2(convertWindowToClipX(ghostTwoX), convertWindowToClipY(ghostTwoY)));
    }
}

function generateObjectsVertices() {

    backgroundBoxPositions = [
        vec2(convertWindowToClipX(40), convertWindowToClipY(440)),
        vec2(convertWindowToClipX(40), convertWindowToClipY(40)),
        vec2(convertWindowToClipX(400), convertWindowToClipY(40)),
        vec2(convertWindowToClipX(400), convertWindowToClipY(440))
    ];

    barriersPositions = [
        vec2(convertWindowToClipX(80), convertWindowToClipY(80)),
        vec2(convertWindowToClipX(80), convertWindowToClipY(160)),
        vec2(convertWindowToClipX(200), convertWindowToClipY(160)),
        vec2(convertWindowToClipX(200), convertWindowToClipY(80)),
        vec2(convertWindowToClipX(240), convertWindowToClipY(80)),
        vec2(convertWindowToClipX(240), convertWindowToClipY(160)),
        vec2(convertWindowToClipX(360), convertWindowToClipY(160)),
        vec2(convertWindowToClipX(360), convertWindowToClipY(80)),
        vec2(convertWindowToClipX(80), convertWindowToClipY(200)),
        vec2(convertWindowToClipX(80), convertWindowToClipY(280)),
        vec2(convertWindowToClipX(120), convertWindowToClipY(280)),
        vec2(convertWindowToClipX(120), convertWindowToClipY(200)),
        vec2(convertWindowToClipX(320), convertWindowToClipY(200)),
        vec2(convertWindowToClipX(320), convertWindowToClipY(280)),
        vec2(convertWindowToClipX(360), convertWindowToClipY(280)),
        vec2(convertWindowToClipX(360), convertWindowToClipY(200)),
        vec2(convertWindowToClipX(80), convertWindowToClipY(320)),
        vec2(convertWindowToClipX(80), convertWindowToClipY(400)),
        vec2(convertWindowToClipX(200), convertWindowToClipY(400)),
        vec2(convertWindowToClipX(200), convertWindowToClipY(320)),
        vec2(convertWindowToClipX(240), convertWindowToClipY(320)),
        vec2(convertWindowToClipX(240), convertWindowToClipY(400)),
        vec2(convertWindowToClipX(360), convertWindowToClipY(400)),
        vec2(convertWindowToClipX(360), convertWindowToClipY(320))
    ];

    // Fill the array with the location of the points on the screen.
    const height = 10;
    const width = 9;
    let xCoordinate = 20;
    let yCoordinate = 20;

    for (let i = 0; i < height; i++) {
        yCoordinate += 40;
        for (let j = 0; j < width; j++) {
            xCoordinate += 40;
            pointsPositions.push(vec2(convertWindowToClipX(xCoordinate),
                convertWindowToClipY(yCoordinate)));
        }
        xCoordinate = 20;
    }

    // Remove the points from the ghosts and the main triangle
    removePoints(220,420);
    removePoints(220,220);
    removePoints(220,260);

    specialObjectPosition = [
        vec2(convertWindowToClipX(220), convertWindowToClipY(60))
    ];
}

function generateObjectsColors() {
    mainTriangleColors = [
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0)
    ];

    backgroundBoxColors = [
        vec3(0.7, 0.7, 0.7),
        vec3(0.7, 0.7, 0.7),
        vec3(0.7, 0.7, 0.7),
        vec3(0.7, 0.7, 0.7)
    ];

    borders = [
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 1.0)
    ];

    // Fill the array for barriers with dark green.
    for (let i = 0; i < barriersPositions.length; i++) {
        barriersColors.push([0.0, 0.5, 0.0]);
    }

    // Fill the array for points with gold.
    for (let i = 0; i < pointsPositions.length; i++) {
        pointsColors.push([0.5, 0.5, 0.0]);
    }

    ghostColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(0.396, 0.736, 0.860)
    ];

    specialObjectColor = [
        vec3(0.855, 0.647, 0.125),
        vec3(0.855, 0.647, 0.125)
    ]
}

// Variables to hold the vertex and color buffer objects.
var mainTrianglePositionBufferObject;
var mainTriangleColorBufferObject;
var backgroundBoxPositionBufferObject;
var backgroundBoxColorBufferObject;
var barriersPositionBufferObject;
var barriersColorBufferObject;
var bordersColorBufferObject;
var pointsPositionsBufferObject;
var pointsColorBufferObject;
var ghostsPositionsBufferObject;
var ghostsColorsBufferObject;
var specialPositionsBufferObject;
var specialColorBufferObject;


function createBuffers() {

    // Create a buffer to store vertices
    mainTrianglePositionBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mainTrianglePositionBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mainTrianglePositions), gl.STATIC_DRAW);

    backgroundBoxPositionBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBoxPositionBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(backgroundBoxPositions), gl.STATIC_DRAW);

    barriersPositionBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, barriersPositionBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(barriersPositions), gl.STATIC_DRAW);

    pointsPositionsBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointsPositionsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsPositions), gl.STATIC_DRAW);

    ghostsPositionsBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ghostsPositionsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ghostsPositions), gl.STATIC_DRAW);

    specialPositionsBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, specialPositionsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(specialObjectPosition), gl.STATIC_DRAW);

    // Create a buffer to store colors
    mainTriangleColorBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, mainTriangleColorBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mainTriangleColors), gl.STATIC_DRAW);

    backgroundBoxColorBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, backgroundBoxColorBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(backgroundBoxColors), gl.STATIC_DRAW);

    barriersColorBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, barriersColorBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(barriersColors), gl.STATIC_DRAW);

    bordersColorBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bordersColorBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(borders), gl.STATIC_DRAW);

    pointsColorBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pointsColorBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsColors), gl.STATIC_DRAW);

    ghostsColorsBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ghostsColorsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ghostColors), gl.STATIC_DRAW);

    specialColorBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, specialColorBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(specialObjectColor), gl.STATIC_DRAW);
}

// Variables to hold vertex shader, fragment shader, and the program object
var vertexShader;
var fragmentShader;
var program;

function compileShaders() {

    // Compiling the vertex shader.
    vertexShader = gl.createShader(gl.VERTEX_SHADER);

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    // Check if the compilation for the vertex shader was successful
    // and delete the shader if it was unsuccessful.
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('There was an error in compiling the vertex shader!',
        gl.getShaderInfoLog(vertexShader));
        gl.deleteShader(vertexShader);
        return;
    }

    // Compile the fragment shader.
    fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Check if the compilation for the fragment shader was successful
    // and delete the shader if it was unsuccessful.
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('There was an error in compiling the fragment shader!',
        gl.getShaderInfoLog(fragmentShader));
        gl.deleteShader(fragmentShader);
    }

}

function createProgram() {
    program = gl.createProgram();

    // attach the existing compiled vertex shader and the fragment shader.
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    gl.linkProgram(program);

    // Check if the program was linked successfully.
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('There was an error in linking the program.', 
        gl.getProgramInfoLog(program));
    }
}

function handleAdditionalErrors() {
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('There was an error validating the program!',
        gl.getProgramInfoLog(program));
    }
}

function defineTheDataLayoutPositions(dataArray, buffer, size, stride, offset) {

    // Get the location of the colors data
    var positionsLocation = gl.getAttribLocation(program, dataArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // Specify the layout of the data
    gl.vertexAttribPointer(positionsLocation, size, gl.FLOAT, gl.FALSE, stride, offset);
    gl.enableVertexAttribArray(positionsLocation);
}

function defineTheDataLayoutColors(dataArray, buffer, size, stride, offset) {

    // Get the location of the colors data
    var colorsLocation = gl.getAttribLocation(program, dataArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // Specify the layout of the data
    gl.vertexAttribPointer(colorsLocation, size, gl.FLOAT, gl.FALSE, stride, offset);
    gl.enableVertexAttribArray(colorsLocation);
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(0.4, 0.4, 0.4, 1.0);
    gl.useProgram(program);

    // ============================================ BACKGROUND BOX WITH BORDERS

    // Define the layout of the data and bind the buffer for the BACKGROUND BOX
    defineTheDataLayoutPositions('Positions', backgroundBoxPositionBufferObject,
        2, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

    defineTheDataLayoutColors('Colors', backgroundBoxColorBufferObject,
        3, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

    // Draw the BACKGROUND BOX
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

    defineTheDataLayoutPositions('Positions', backgroundBoxPositionBufferObject,
        2, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

    defineTheDataLayoutColors('Colors', bordersColorBufferObject,
        3, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

    gl.drawArrays(gl.LINE_LOOP, 0, 4);

    // =============================================== SPECIAL OBJECT
    defineTheDataLayoutPositions('Positions', specialPositionsBufferObject,
        2, 0, 0);

    defineTheDataLayoutColors('Colors', specialColorBufferObject,
        3,0,0);

    // Set the point size uniform value
    pointSizeLocation = gl.getUniformLocation(program, 'PointSize');
    gl.uniform1f(pointSizeLocation, 30.0);

    // Draw the SPECIAL OBJECT
    gl.drawArrays(gl.POINTS, 0, 1);

    // =============================================== POINTS
    defineTheDataLayoutPositions('Positions', pointsPositionsBufferObject,
        2, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

    defineTheDataLayoutColors('Colors', pointsColorBufferObject,
        3, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

    // Set the point size uniform value
    var pointSizeLocation = gl.getUniformLocation(program, 'PointSize');
    gl.uniform1f(pointSizeLocation, 8.0);

    // Draw the POINTS
    gl.drawArrays(gl.POINTS, 0, pointsPositions.length);

    //============================================== MAIN TRIANGLE

    // Define the layout of the data and bind the buffer for the MAIN TRIANGLE
    defineTheDataLayoutPositions('Positions', mainTrianglePositionBufferObject,
        2, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

    defineTheDataLayoutColors('Colors', mainTriangleColorBufferObject,
        3, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

    // Draw the main Triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    //=============================================== BARRIERS WITH BORDERS

    // Draw the BARRIERS
    var offset = 0;
    for (var i = 0; i < 6; i++) {

        // Define the layout of the data and bind the buffer for the BARRIERS
        defineTheDataLayoutPositions('Positions', barriersPositionBufferObject,
            2, 2 * Float32Array.BYTES_PER_ELEMENT,
            offset * 2 * Float32Array.BYTES_PER_ELEMENT);

        defineTheDataLayoutColors('Colors', barriersColorBufferObject,
             3, 3 * Float32Array.BYTES_PER_ELEMENT,
            offset * 3 * Float32Array.BYTES_PER_ELEMENT);

        // Draw the BARRIERS
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        offset += 4;
    }

    // Draw the borders

    offset = 0;
    for (i = 0; i < 6; i++) {
        // Define the layout of the data and bind the buffer for the BARRIERS
        defineTheDataLayoutPositions('Positions', barriersPositionBufferObject,
            2, 2 * Float32Array.BYTES_PER_ELEMENT,
            offset * 2 * Float32Array.BYTES_PER_ELEMENT);

        defineTheDataLayoutColors('Colors', bordersColorBufferObject,
            3, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

        // Draw the BARRIERS
        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        offset += 4;
    }

    // =============================================== GHOSTS
    defineTheDataLayoutPositions('Positions', ghostsPositionsBufferObject,
        2, 0, 0);

    defineTheDataLayoutColors('Colors', ghostsColorsBufferObject,
        3, 0, 0);

    // Set the point size uniform value
    pointSizeLocation = gl.getUniformLocation(program, 'PointSize');
    gl.uniform1f(pointSizeLocation, 20.0);

    // Draw the POINTS
    gl.drawArrays(gl.POINTS, 0, 2);
}

let currentSecond = 60;
let currentScore = 0;

function setupTimerHelper() {
    setupTimer(currentSecond);
    currentSecond--;
}

function stopTimer(gameTimeInterval) {
    clearInterval(gameTimeInterval);
}

// This boolean is used to record whether a collision happened between the main triangle and the two ghosts.
// If the value is true we initialize the position of the ghost.
var collisionHappened = false;

// Create objects for the main triangle and the ghosts.
var mainTriangleObject = new mainTriangle(220,420,220,
    410, 210, 430, 230, 430,
    true, false, false, false);

var ghostOneObject = new ghosts(220,220, '');
var ghostTwoObject = new ghosts(220, 260, '');

// To stop the animation to render after the game ends.
var gameEnded = false;

// To record if the game was resumed.
var gameResumed = true;

// To record if the s key was pressed.
var sKeyWasPressed = false;

// To keep track if the special object was eaten.
var specialObjectWasEaten = false;

 window.onload = function setup () {

    // Initialize the context
    init();

    // Generate the positions of the main triangle and pass the initial position.
    generateMainTriangleVertices(220, 410, 210,
        430, 230, 430);

    // Generate the positions of the ghosts and pass the initial position.
    generateGhostsVertices(220, 220, 220, 260);

    // Generate the positions and the colors for the static objects on the game screen.
    generateObjectsVertices();
    generateObjectsColors();

    // Create vertex buffer data.
    createBuffers();

    // Compile the shaders
    compileShaders();

    // Create the program
    createProgram();

    // Handle Additional errors
    handleAdditionalErrors();

    // Render the objects
    render();

    // Set up the score
    setupScore(currentScore);

    // Set up the timer
    setupTimerHelper();

    // Start the timer
    startTheTimer();

    // Set event listener for the arrow keys
     setEventListener();
}

function mainLoop() {
    // Update the score.
    setupScore(currentScore);

    // Check if the game should stop.
    checkGameStoppingCondition();

    // Create vertex buffer data.
    createBuffers();

    // Render the game
    render();

    if (!gameEnded) {
        requestAnimationFrame(mainLoop);
    }
}

var gameTimeInterval;
function startTheTimer () {
    // Set up the timer
     gameTimeInterval=
        setInterval(setupTimerHelper, 1000);

    // Stop the timer after a minute
    setInterval(stopTimer, 60000, gameTimeInterval);
}

// This function returns true if the given coordinates are in the area
// where the main triangle and the ghosts are allowed to be and returns
// false otherwise.
function checkCoordinatesAreValid (xCoordinates, yCoordinates) {
    // check if the coordinates are outside the main box.
    if (xCoordinates <= 40 || xCoordinates >= 400 || yCoordinates <= 40
        || yCoordinates >= 440) {
        return false;
    }

    // Check if the coordinates are in the barriers>
    if ((xCoordinates <= 200 && xCoordinates >= 80) &&
        (yCoordinates <= 160 && yCoordinates >= 80)) {
        return false;
    }

    if ((xCoordinates <= 360 && xCoordinates >= 240) &&
        (yCoordinates <= 160 && yCoordinates >= 80)) {
        return false;
    }

    if ((xCoordinates <= 120 && xCoordinates >= 80) &&
        (yCoordinates <= 280 && yCoordinates >= 200)) {
        return false;
    }

    if ((xCoordinates <= 360 && xCoordinates >= 320) &&
        (yCoordinates <= 280 && yCoordinates >= 200)) {
        return false;
    }

    if ((xCoordinates <= 200 && xCoordinates >= 80) &&
        (yCoordinates <= 400 && yCoordinates >= 320)) {
        return false;
    }

    if ((xCoordinates <= 360 && xCoordinates >= 240) &&
        (yCoordinates <= 400 && yCoordinates >= 320)) {
        return false;
    }

    return !((xCoordinates <= 240 && xCoordinates >= 200) &&
        (yCoordinates <= 280 && yCoordinates >= 200));
}

// This function returns true if the point satisfying the given
// coordinates exists in the points pointsPosition, and returns
// false otherwise.
function doesPointExist (xCoordinate, yCoordinate) {
    for (let i = 0; i < pointsPositions.length; i++) {
        const matchingIndex = pointsPositions.findIndex(
            item => item[0] === convertWindowToClipX(xCoordinate)
                && item[1] === convertWindowToClipY(yCoordinate));

        if (matchingIndex !== -1) {
            return true;
        }
    }
    return false;
}

// This function returns true if a collision happens between a ghosts
// and the main triangle, and false otherwise.
function ghostAndMainTriangleCollision (ghostOneX, ghostOneY, ghostTwoX, ghostTwoY,
                               mainTriangleX, mainTriangleY) {
    return (ghostOneX === mainTriangleX && ghostOneY === mainTriangleY) ||
        (ghostTwoX === mainTriangleX && ghostTwoY === mainTriangleY);
}

function setEventListener() {
    document.addEventListener('keydown', handleKeyDown);
        function handleKeyDown(event) {
            switch (event.key) {
                case 'ArrowUp':
                    if (sKeyWasPressed && gameResumed) {
                        mainTriangleObject.faceNorth();

                        // If after moving one unit block north the main triangle is not out
                        // of the valid space, move the triangle one unit up.
                        if (checkCoordinatesAreValid(mainTriangleObject.triangleCenterX,
                            mainTriangleObject.triangleCenterY - 40)) {
                            mainTriangleObject.moveNorth();

                            // Update the new coordinates of the triangle in mainTrianglePosition Array.
                            //console.log(mainTrianglePositions);
                            generateMainTriangleVertices(mainTriangleObject.triangleVertexOneX,
                                mainTriangleObject.triangleVertexOneY, mainTriangleObject.triangleVertexTwoX,
                                mainTriangleObject.triangleVertexTwoY, mainTriangleObject.triangleVertexThreeX,
                                mainTriangleObject.triangleVertexThreeY);

                            //Randomly move the ghosts.
                            moveGhostToValidUnit();

                            // Update the new location of the ghosts in ghostsPositions.
                            generateGhostsVertices(ghostOneObject.ghostX, ghostOneObject.ghostY, ghostTwoObject.ghostX,
                                ghostTwoObject.ghostY);

                            // Update the score.
                            handleUpdatingScore();

                            // If a collision happened reinitialize the position of the ghosts.
                            if (collisionHappened) {
                                generateGhostsVertices(220, 220, 220, 260);
                                collisionHappened = false;
                            }

                            // Check if the special object was eaten.
                            if (mainTriangleObject.triangleCenterX === 220
                                && mainTriangleObject.triangleCenterY === 60) {
                                specialObjectWasEaten = true;
                            }
                        }
                    }
                    break;

                case 'ArrowRight':
                    if (sKeyWasPressed && gameResumed) {
                        mainTriangleObject.faceEast();

                        // If after moving one unit block north the main triangle is not out
                        // of the valid space, move the triangle one unit up.
                        if (checkCoordinatesAreValid(mainTriangleObject.triangleCenterX + 40,
                            mainTriangleObject.triangleCenterY)) {
                            mainTriangleObject.moveEast();

                            // Update the new coordinates of the triangle in mainTrianglePosition Array.
                            generateMainTriangleVertices(mainTriangleObject.triangleVertexOneX,
                                mainTriangleObject.triangleVertexOneY, mainTriangleObject.triangleVertexTwoX,
                                mainTriangleObject.triangleVertexTwoY, mainTriangleObject.triangleVertexThreeX,
                                mainTriangleObject.triangleVertexThreeY);

                            // Randomly move the ghosts.
                            moveGhostToValidUnit();

                            // update the new location of the ghosts in ghostsPositions.
                            generateGhostsVertices(ghostOneObject.ghostX, ghostOneObject.ghostY, ghostTwoObject.ghostX,
                                ghostTwoObject.ghostY);

                            // Update the score.
                            handleUpdatingScore();

                            // If a collision happened reinitialize the position of the ghosts.
                            if (collisionHappened) {
                                generateGhostsVertices(220, 220, 220, 260);
                                collisionHappened = false;
                            }

                            // Check if the special object was eaten.
                            if (mainTriangleObject.triangleCenterX === 220
                                && mainTriangleObject.triangleCenterY === 60) {
                                specialObjectWasEaten = true;
                            }
                        }
                    }
                    break;

                case 'ArrowLeft':
                    if (sKeyWasPressed && gameResumed) {
                        mainTriangleObject.faceWest();

                        // If after moving one unit block north the main triangle is not out
                        // of the valid space, move the triangle one unit up.
                        if (checkCoordinatesAreValid(mainTriangleObject.triangleCenterX - 40,
                            mainTriangleObject.triangleCenterY)) {
                            mainTriangleObject.moveWest();

                            // Update the new coordinates of the triangle in mainTrianglePosition Array.
                            generateMainTriangleVertices(mainTriangleObject.triangleVertexOneX,
                                mainTriangleObject.triangleVertexOneY, mainTriangleObject.triangleVertexTwoX,
                                mainTriangleObject.triangleVertexTwoY, mainTriangleObject.triangleVertexThreeX,
                                mainTriangleObject.triangleVertexThreeY);

                            // Randomly move the ghosts.
                            moveGhostToValidUnit();

                            // update the new location of the ghosts in ghostsPositions.
                            generateGhostsVertices(ghostOneObject.ghostX, ghostOneObject.ghostY, ghostTwoObject.ghostX,
                                ghostTwoObject.ghostY);

                            // Update the score.
                            handleUpdatingScore();

                            // If a collision happened reinitialize the position of the ghosts.
                            if (collisionHappened) {
                                generateGhostsVertices(220, 220, 220, 260);
                                collisionHappened = false;
                            }

                            // Check if the special object was eaten.
                            if (mainTriangleObject.triangleCenterX === 220
                                && mainTriangleObject.triangleCenterY === 60) {
                                specialObjectWasEaten = true;
                            }
                        }
                    }
                    break;

                case 'ArrowDown':
                    if (sKeyWasPressed && gameResumed) {
                        mainTriangleObject.faceSouth();

                        // If after moving one unit block north the main triangle is not out
                        // of the valid space, move the triangle one unit up.
                        if (checkCoordinatesAreValid(mainTriangleObject.triangleCenterX,
                            mainTriangleObject.triangleCenterY + 40)) {
                            mainTriangleObject.moveSouth();

                            // Update the new coordinates of the triangle in mainTrianglePosition Array.
                            generateMainTriangleVertices(mainTriangleObject.triangleVertexOneX,
                                mainTriangleObject.triangleVertexOneY, mainTriangleObject.triangleVertexTwoX,
                                mainTriangleObject.triangleVertexTwoY, mainTriangleObject.triangleVertexThreeX,
                                mainTriangleObject.triangleVertexThreeY);

                            // Randomly move the ghosts.
                            moveGhostToValidUnit();

                            // update the new location of the ghosts in ghostsPositions.
                            generateGhostsVertices(ghostOneObject.ghostX, ghostOneObject.ghostY, ghostTwoObject.ghostX,
                                ghostTwoObject.ghostY);

                            // Update the score.
                            handleUpdatingScore();

                            // If a collision happened reinitialize the position of the ghosts.
                            if (collisionHappened) {
                                generateGhostsVertices(220, 220, 220, 260);
                                collisionHappened = false;
                            }

                            // Check if the special object was eaten.
                            if (mainTriangleObject.triangleCenterX === 220
                                && mainTriangleObject.triangleCenterY === 60) {
                                specialObjectWasEaten = true;
                            }
                        }
                    }
                    break;

                case 's':
                    // start the game and call the main loop to begin the animation.
                    sKeyWasPressed = true;
                    requestAnimationFrame(mainLoop);
                    break;

                case 'p':
                    // pause the game.
                    stopTimer(gameTimeInterval);
                    gameEnded = true;
                    gameResumed = false;
                    break;

                case 'r':
                    // resume the game.
                    gameEnded = false;
                    gameResumed = true;
                    setupTimerHelper();
                    startTheTimer();
                    requestAnimationFrame(mainLoop);
                    break;

                default:
                    // restart the game if shift and s was press simultaneously.
                    if (event.shiftKey) {
                        // Remove all the points from the positions arrays.
                        pointsPositions = [];
                        mainTrianglePositions = [];
                        ghostsPositions = [];
                        backgroundBoxPositions = [];
                        barriersPositions = [];

                        // Reinitialize everything
                        currentSecond = 60;
                        currentScore = 0

                        mainTriangleObject.triangleCenterX = 220;
                        mainTriangleObject.triangleCenterY = 420;
                        mainTriangleObject.triangleVertexOneX = 220;
                        mainTriangleObject.triangleVertexOneY = 410;
                        mainTriangleObject.triangleVertexTwoX = 210;
                        mainTriangleObject.triangleVertexTwoY = 430;
                        mainTriangleObject.triangleVertexThreeX = 230;
                        mainTriangleObject.triangleVertexThreeY = 430;
                        mainTriangleObject.isFacedNorth = true;
                        mainTriangleObject.isFacedEast = false;
                        mainTriangleObject.isFacedWest = false;
                        mainTriangleObject.isFacedSouth = false;

                        ghostOneObject.ghostX = 220;
                        ghostOneObject.ghostY = 220;
                        ghostOneObject.prevMoveDirection = '';
                        ghostTwoObject.ghostX = 220;
                        ghostTwoObject.ghostY = 260;
                        ghostTwoObject.prevMoveDirection = '';

                        // Generate the positions of the main triangle and pass the initial position.
                        generateMainTriangleVertices(220, 410, 210,
                            430, 230, 430);

                        // Generate the positions of the ghosts and pass the initial position.
                        generateGhostsVertices(220, 220, 220, 260);

                        // Generate the positions and the colors for the static objects on the game screen.
                        generateObjectsVertices();
                        //generateObjectsColors();

                        // Create vertex buffer data.
                        createBuffers();

                        // Render the objects
                        render();

                        requestAnimationFrame(mainLoop);
                    }
                    break;
            }
    }
}

function checkGameStoppingCondition() {
    // Check if the pacman has eaten all the points.
    if (pointsPositions.length === 28 || currentSecond === 0) {
            currentScore += currentSecond * 100;
            stopTimer(gameTimeInterval);
            setupScore(currentScore);
            gameEnded = true;
    }

    // Check if the score is negative.
    if (currentScore < 0) {
        stopTimer(gameTimeInterval);
        gameEnded = true;
    }
}

function handleUpdatingScore() {
    // Remove the coordinates of the point eaten, and update the score.
    if (doesPointExist(mainTriangleObject.triangleCenterX, mainTriangleObject.triangleCenterY)) {

        removePoints(mainTriangleObject.triangleCenterX, mainTriangleObject.triangleCenterY);
        currentScore += 100;
    }

    // Check if there was a collision between the ghosts and the main triangle and update the score.
    if (ghostAndMainTriangleCollision(ghostOneObject.ghostX, ghostOneObject.ghostY, ghostTwoObject.ghostX,
        ghostTwoObject.ghostY, mainTriangleObject.triangleCenterX, mainTriangleObject.triangleCenterY)) {

        // Only deduct points if the special object was not eaten.
        if (!specialObjectWasEaten) {
            currentScore -= 1000;
        }
        specialObjectWasEaten = false;
        collisionHappened = true;
    }
}

function moveGhostToValidUnit() {
    // Randomly move the ghosts.
    ghostOneObject.moveGhost();
    while (!(checkCoordinatesAreValid(ghostOneObject.ghostX, ghostOneObject.ghostY))) {
        if (ghostOneObject.prevMoveDirection === 'north') {
            ghostOneObject.ghostY += 40;
            ghostOneObject.moveGhost();
        }
        else if (ghostOneObject.prevMoveDirection === 'west') {
            ghostOneObject.ghostX += 40;
            ghostOneObject.moveGhost();
        }
        else if (ghostOneObject.prevMoveDirection === 'east') {
            ghostOneObject.ghostX -= 40;
            ghostOneObject.moveGhost();
        }
        else if (ghostOneObject.prevMoveDirection === 'south') {
            ghostOneObject.ghostY -= 40;
            ghostOneObject.moveGhost();
        }
    }
    ghostTwoObject.moveGhost();
    while (!(checkCoordinatesAreValid(ghostTwoObject.ghostX, ghostTwoObject.ghostY))) {
        if (ghostTwoObject.prevMoveDirection === 'north') {
            ghostTwoObject.ghostY += 40;
            ghostTwoObject.moveGhost();
        }
        else if (ghostTwoObject.prevMoveDirection === 'west') {
            ghostTwoObject.ghostX += 40;
            ghostTwoObject.moveGhost();
        }
        else if (ghostTwoObject.prevMoveDirection === 'east') {
            ghostTwoObject.ghostX -= 40;
            ghostTwoObject.moveGhost();
        }
        else if (ghostTwoObject.prevMoveDirection === 'south') {
            ghostTwoObject.ghostY -= 40;
            ghostTwoObject.moveGhost();
        }
    }
}