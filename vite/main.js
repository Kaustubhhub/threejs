import * as THREE from 'three';

const canvas = document.getElementById('canvas');

// Make sure the canvas is found
if (!canvas) {
  console.error('Canvas element not found');
} else {
  // 1. Create a scene
  console.error('hi');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#F0F0F0');

  // 2. Add the camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // 3. Create objects
  const geometry = new THREE.DodecahedronGeometry();
  const material1 = new THREE.MeshBasicMaterial({ color: '#468565' });
  const dodecahedron = new THREE.Mesh(geometry, material1);

  const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
  const material2 = new THREE.MeshBasicMaterial({ color: '#B4B4B3' });
  const box = new THREE.Mesh(boxGeometry, material2);

  box.position.y = -1.5;

  scene.add(dodecahedron);
  scene.add(box);

  // 4. Add lighting
  const light = new THREE.SpotLight(0x006769, 100);
  light.position.set(1, 1, 1);
  scene.add(light);

  // 5. Create the renderer and check for canvas initialization
  const renderer = new THREE.WebGLRenderer({ canvas });
  if (!renderer) {
    console.error('WebGL renderer failed to initialize');
  }

  renderer.setSize(window.innerWidth, window.innerHeight);

  // 6. Animate the scene
  function animate() {
    requestAnimationFrame(animate);

    // Rotate the dodecahedron for a simple animation
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  // 7. Handle window resizing
  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // Start animation
  animate();
}
