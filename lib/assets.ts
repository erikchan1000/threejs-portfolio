export const basePath =
  process.env.NODE_ENV === 'production' ? '/threejs-portfolio' : '';

export const ASSETS = {
  IsoRoom: `${basePath}/models/IsometricRoom16.glb`,
  Screen: `${basePath}/textures/Room_vid10001-0240.mp4`,
  FrameBigFragment: `${basePath}/shaders/FrameBigFragment.glsl`,
  FrameBigVertex: `${basePath}/shaders/FrameBigVertex.glsl`,
  FrameTopLeftFragment: `${basePath}/shaders/FrameTopLeftFragment.glsl`,
  FrameBottomLeftFragment: `${basePath}/shaders/FrameBottomLeftFragment.glsl`,
} as const;

export const DRACO_PATH = `${basePath}/draco/gltf/`;
