// import React, { useEffect, useRef } from "react";
// import * as THREE from "three";
// import s from "./Modal.animation.module.css";

// const ModalAnimation = ({ setIsModalOpen }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );

//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setPixelRatio(window.devicePixelRatio);
//     canvasRef.current.appendChild(renderer.domElement);

//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     camera.position.z = 5;

//     const animate = () => {
//       requestAnimationFrame(animate);

//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;

//       renderer.render(scene, camera);
//     };

//     animate();

//     const handleResize = () => {
//       const width = canvasRef.current.clientWidth;
//       const height = canvasRef.current.clientHeight;

//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };

//     window.addEventListener("resize", handleResize);

//     setTimeout(() => {
//       setIsModalOpen(false);
//     }, 3000);

//     return () => {
//       renderer.dispose();
//       scene.dispose();
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [setIsModalOpen]);

//   return (
//     <div className={s.modal}>
//       <div style={{ width: "100%", height: "100%" }} ref={canvasRef}></div>
//     </div>
//   );
// };

// export default ModalAnimation;
