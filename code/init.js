let scene, camera, renderer, width, height, radiusOfBoundCylinder = 0.1, controls;


// система координат three.js отличается от СК, в которой заданы исходные данные
// входные данные -> итоговые данные
// x -> z
// y -> x
// z -> y
const initThreeJS = () => {
	// создание сцены, ее настройка
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);
	width = window.innerWidth * 0.8;
	height = window.innerHeight * 0.7;
	camera = new THREE.PerspectiveCamera(90, width / height, 0.001, 25);
	renderer = new THREE.WebGLRenderer({canvas: glcanvas});
	
	function resize() {
		if (window.innerWidth * 0.8 !== width || window.innerHeight * 0.7 !== height) {
			width = window.innerWidth * 0.8;
			height = window.innerHeight * 0.7;
			renderer.setSize(width, height, false);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}
	}
	
	function render() {
		resize();  
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	
	render();	
	
	// шаг для перемещения
	let delta = 0.2;
	// шан для поворота
	let theta = Math.PI / 36;
	
	// задание омей координат
	let xAxis = new THREE.Vector3(1, 0, 0);
	let yAxis = new THREE.Vector3(0, 1, 0);
	let zAxis = new THREE.Vector3(0, 0, 1);
	
	// управление камерой 
	// w - вперед, s - назад
	// a - влево, d - вправо
	// q - вниз, e - вверх
	// вращение камерой по осям (в одну/другую сторону)- z/x, c/v, b/n
	window.addEventListener('keydown', function(event) { 
		event.preventDefault();
		switch (event.keyCode) {
			// w
			case 87:
				camera.translateOnAxis(zAxis, -delta);
				break;
				// s
			case 83:
				camera.translateOnAxis(zAxis, delta);
				break;
				// a
			case 65:
				camera.translateOnAxis(xAxis, -delta);
				break;
				// d	
			case 68:
				camera.translateOnAxis(xAxis, delta);
				break;
				// q	
			case 81:
				camera.translateOnAxis(yAxis, -delta);
				break;
				// e	
			case 69:
				camera.translateOnAxis(yAxis, delta);
				break;
				
				// z
			case 90:
				camera.rotateOnAxis(xAxis, theta);
				break;
				// x	
			case 88:
				camera.rotateOnAxis(xAxis, -theta);
				break;	
				// c
			case 67:
				camera.rotateOnAxis(yAxis, theta);
				break;
				// v
			case 86:
				camera.rotateOnAxis(yAxis, -theta);
				break;	
				// b
			case 66:
				camera.rotateOnAxis(zAxis, theta);
				break;	
				// n	
			case 78:
				camera.rotateOnAxis(zAxis, -theta);
				break;	
		}
	});
	status.innerHTML = "STATUS: READY FOR MODE SELECTION";
}
