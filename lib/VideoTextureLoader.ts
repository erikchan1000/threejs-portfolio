import * as THREE from 'three';

export class VideoTextureLoader extends THREE.Loader {
  load(
    url: string,
    onLoad: (texture: THREE.VideoTexture) => void,
    _onProgress?: (event: ProgressEvent) => void,
    onError?: (err: unknown) => void
  ) {
    const video = document.createElement('video');
    video.src = url;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';
    video.oncanplaythrough = () => {
      video.play().catch(() => {});
      const texture = new THREE.VideoTexture(video);
      texture.flipY = true;
      texture.minFilter = THREE.NearestFilter;
      texture.magFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      onLoad(texture);
    };
    video.onerror = (e) => onError?.(e);
    video.load();
  }
}
