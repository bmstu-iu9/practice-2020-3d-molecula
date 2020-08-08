const drawSpacefill = () => {
	let count = molecula.bonds.length;
	// определяем наибольшую z координату молекул для определения оптимального положения камеры
	let maxZ = -100;
	
	// отрисовка атомов, входящих в состав молекулы (представляются сферами)
    for (let i = 0; i < molecula.atoms.length; i++){
		let currentAtom = molecula.atoms[i];
		
		if (currentAtom.coords[0] > maxZ) {
			maxZ = currentAtom.coords[0];
		}
		
	    let sphereGeom = new THREE.SphereGeometry(currentAtom.atom.radius / 100, 100, 100);
	    let sphereMat = new THREE.MeshBasicMaterial({color: currentAtom.atom.color});
	    let sphere = new THREE.Mesh(sphereGeom, sphereMat);
	    sphere.position.set(currentAtom.coords[1], currentAtom.coords[2], currentAtom.coords[0]);
	    scene.add(sphere);
    }
	// стартовая позиция камеры
	camera.position.z = maxZ + 2;
	// исправление бага с размытосью первоначальной отрисовки молекулы
	window.innerHeight += 1;
}
