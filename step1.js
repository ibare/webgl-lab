(function(fps) {
  var keys = ['webgl','experimental-webgl','webkit-3d','moz-webgl'];
  var cvs = document.getElementById('glc');
  var triangleData = [
    0.0,  0.5,  0.0,
   -0.5, -0.5,  0.0,
    0.5, -0.5,  0.0
  ];
  var key, gl, triangleBuffer, vertexShader, fragmentShader, fprogram;

  while(key = keys.pop()) {
    if(gl = cvs.getContext(key)) {
      console.log('Initialize WebGL : %s', key);
      break;
    }
  }

  // 버퍼 세팅
  triangleBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleData), gl.STATIC_DRAW);
  triangleBuffer.itemSize = 3; // 정점은 3개로 이루어져있고
  triangleBuffer.numItem = 3; // 정점 3개로 트라이앵글을 구성한다!

  // 쉐이더 생성
  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  // 쉐이더 코드 로딩 & 컴파일
  gl.shaderSource(vertexShader, document.getElementById('shader-vt').innerHTML);
  gl.shaderSource(fragmentShader, document.getElementById('shader-fg').innerHTML);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  fprogram = gl.createProgram();
  gl.attachShader(fprogram, vertexShader);
  gl.attachShader(fprogram, fragmentShader);
  gl.linkProgram(fprogram);
  gl.useProgram(fprogram);

  gl.enableVertexAttribArray(fprogram.aVertexPosition);
  gl.vertexAttribPointer(fprogram.aVertexPosition, triangleBuffer.itemSize, gl.FLOAT, false, 0, 0);
  fprogram.aVertexPosition = gl.getAttribLocation(fprogram, "aVertexPosition");

  function renderer() {
    gl.clearColor(Math.random(),Math.random(),Math.random(), 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, triangleBuffer.numItem);
  }

  if(cvs) cvs.width='450', cvs.height='300';

  gl.viewport(0, 0, parseInt(cvs.width), parseInt(cvs.height));

  setInterval(renderer, 1000 / fps);
}).call(this, 60);
