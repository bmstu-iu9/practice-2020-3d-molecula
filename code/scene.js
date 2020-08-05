let scene, camera, renderer, width, height;


// изменение размеров окна сцены при изменении размеров окна браузера
const resizeScene = () => {
	width = window.innerWidth * 0.8;
	height = window.innerHeight * 0.7;
	renderer.setViewport(0, 0, width, height);
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
}


const initThreeJS = () => {
	// задаем функцию отслеживания изменений размера
	window.onresize = resizeScene;
	// создание сцены, ее настройка
	scene = new THREE.Scene();
	width = window.innerWidth * 0.8;
	height = window.innerHeight * 0.7;
	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({canvas: glcanvas});
	renderer.setSize(width, height);
	renderer.render(scene, camera);
}


const drawMoleculaStick = () => {
	
}
