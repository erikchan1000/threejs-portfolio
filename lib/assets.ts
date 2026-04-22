export const basePath =
  process.env.NODE_ENV === 'production' ? '/threejs-portfolio' : '';

export const ASSETS = {
  IsoRoom: `${basePath}/models/IsometricRoom16.glb`,
  Screen: `${basePath}/textures/Room_vid10001-0240.mp4`,
} as const;

export const DRACO_PATH = `${basePath}/draco/gltf/`;
