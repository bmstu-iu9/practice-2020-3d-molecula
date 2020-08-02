let gl, canvas, current_molecula, jsonData;

const start = () => {
  canvas = document.getElementById("glcanvas");

  gl = initWebGL(canvas);      // инициализация контекста GL

  // продолжать только если WebGL доступен и работает

  if (gl) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);                      // установить в качестве цвета очистки буфера цвета черный, полная непрозрачность
    gl.enable(gl.DEPTH_TEST);                               // включает использование буфера глубины
    gl.depthFunc(gl.LEQUAL);                                // определяет работу буфера глубины: более ближние объекты перекрывают дальние
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);      // очистить буфер цвета и буфер глубины.
  }
}

const initWebGL = (canvas) => {
  gl = null;

  try {
    // Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  }
  catch(e) {}

  // Если мы не получили контекст GL, завершить работу
  if (!gl) {
    alert("Unable to initialize WebGL. Your browser may not support it.");
    gl = null;
  }

  return gl;
}

// функция вызывается в случае ввода текста в поле для идентификации молекулы
const getMolecula = () => {
	let text = document.getElementById("searchbox").value;
	if (text) {
		// alert(text)
		current_molecula = text;
    //Обращение к серверу
    const status = (response) => {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText))
        }
                    return Promise.resolve(response)
    }
    const json = (response) => {
        return response.json()
    }

    //создание ссылки
    let link = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/fastformula/" + current_molecula + "/JSON";

    //увеличение времени ожидания
    const timeout = (ms, promise) => {
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                reject(new Error("timeout"))
            }, ms)
              promise.then(resolve, reject)
        })
    }

    //Скачивание по ссылке
    timeout(50000, fetch(link, {timeout: 500000}).then(status).then(json).
    then(function (data) {
        jsonData = data;
    }).catch(function (error) {
        alert(error)
    }));
	}
}
