/**
 * Effetti celebrativi: coriandoli 3D e fuochi d'artificio scintillanti
 * per il superamento del livello e delle prove.
 */
import * as THREE from 'three';
import Phaser from 'phaser';

export interface Celebration3D {
  update: (dt: number) => void;
  dispose: () => void;
}

const COLORI_CORIANDOLI = [
  0x00a2e8, // Azzurro Sport
  0xf5b400, // Oro Vittoria
  0x22c55e, // Verde Smeraldo
  0xff4757, // Corallo
  0x9b59b6, // Viola Ametista
  0xffa502, // Arancio
  0xffffff  // Bianco Brillante
];

/**
 * Crea un sistema di coriandoli 3D cadenti e fuochi d'artificio scintillanti
 * per la scena Three.js.
 */
export function create3DCelebration(scene: THREE.Scene): Celebration3D {
  const group = new THREE.Group();
  group.name = 'celebration-3d';

  // ── 1. Coriandoli 3D (tessere rettangolari rotanti) ──
  const count = 160;
  const geoCoriandolo = new THREE.PlaneGeometry(0.22, 0.38);
  const meshList: Array<{
    mesh: THREE.Mesh;
    vy: number;
    vx: number;
    vz: number;
    rotX: number;
    rotY: number;
    rotZ: number;
  }> = [];

  for (let i = 0; i < count; i++) {
    const col = COLORI_CORIANDOLI[i % COLORI_CORIANDOLI.length];
    const mat = new THREE.MeshBasicMaterial({
      color: col,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geoCoriandolo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 16,
      3 + Math.random() * 9,
      -4 + (Math.random() - 0.5) * 12
    );
    mesh.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    group.add(mesh);

    meshList.push({
      mesh,
      vy: 1.6 + Math.random() * 2.2,
      vx: (Math.random() - 0.5) * 0.8,
      vz: (Math.random() - 0.5) * 0.6,
      rotX: 2 + Math.random() * 4,
      rotY: 2 + Math.random() * 5,
      rotZ: 1 + Math.random() * 3
    });
  }

  // ── 2. Fuochi d'artificio 3D (particelle di scintille che esplodono) ──
  const sparkCount = 120;
  const sparkGeo = new THREE.BufferGeometry();
  const sparkPositions = new Float32Array(sparkCount * 3);
  const sparkVelocities: Array<{ vx: number; vy: number; vz: number }> = [];

  const burstCenter = new THREE.Vector3(0, 5.2, -6);
  for (let i = 0; i < sparkCount; i++) {
    sparkPositions[i * 3] = burstCenter.x;
    sparkPositions[i * 3 + 1] = burstCenter.y;
    sparkPositions[i * 3 + 2] = burstCenter.z;

    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const speed = 2.5 + Math.random() * 4.5;

    sparkVelocities.push({
      vx: speed * Math.sin(phi) * Math.cos(theta),
      vy: speed * Math.sin(phi) * Math.sin(theta),
      vz: speed * Math.cos(phi)
    });
  }
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));

  const sparkMat = new THREE.PointsMaterial({
    color: 0xffe066,
    size: 0.28,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  const sparkPoints = new THREE.Points(sparkGeo, sparkMat);
  group.add(sparkPoints);

  scene.add(group);

  let tempo = 0;

  return {
    update(dt: number) {
      tempo += dt;

      // Aggiorna coriandoli
      for (const item of meshList) {
        const m = item.mesh;
        m.position.y -= item.vy * dt;
        m.position.x += item.vx * dt + Math.sin(tempo * 3 + m.position.y) * 0.02;
        m.position.z += item.vz * dt;

        m.rotation.x += item.rotX * dt;
        m.rotation.y += item.rotY * dt;
        m.rotation.z += item.rotZ * dt;

        // Se scende sotto il suolo, risale in alto per continuare la festa
        if (m.position.y < -0.5) {
          m.position.y = 8 + Math.random() * 4;
          m.position.x = (Math.random() - 0.5) * 16;
          m.position.z = -4 + (Math.random() - 0.5) * 12;
        }
      }

      // Aggiorna scintille fuochi d'artificio
      const posAttr = sparkGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < sparkCount; i++) {
        const v = sparkVelocities[i];
        posArr[i * 3] += v.vx * dt;
        posArr[i * 3 + 1] += v.vy * dt;
        posArr[i * 3 + 2] += v.vz * dt;
        // Gravità sulle scintille
        v.vy -= 2.2 * dt;
      }
      posAttr.needsUpdate = true;

      // Dissolvenza e ri-esplosione ciclica
      if (tempo > 2.8) {
        tempo = 0;
        burstCenter.set((Math.random() - 0.5) * 8, 4.5 + Math.random() * 2.5, -5 - Math.random() * 3);
        const colBurst = COLORI_CORIANDOLI[Math.floor(Math.random() * COLORI_CORIANDOLI.length)];
        sparkMat.color.setHex(colBurst);

        for (let i = 0; i < sparkCount; i++) {
          posArr[i * 3] = burstCenter.x;
          posArr[i * 3 + 1] = burstCenter.y;
          posArr[i * 3 + 2] = burstCenter.z;

          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const speed = 2.5 + Math.random() * 4.5;
          sparkVelocities[i] = {
            vx: speed * Math.sin(phi) * Math.cos(theta),
            vy: speed * Math.sin(phi) * Math.sin(theta),
            vz: speed * Math.cos(phi)
          };
        }
        posAttr.needsUpdate = true;
      }
    },
    dispose() {
      scene.remove(group);
      geoCoriandolo.dispose();
      sparkGeo.dispose();
      sparkMat.dispose();
      for (const item of meshList) {
        (item.mesh.material as THREE.Material).dispose();
      }
    }
  };
}

/**
 * Crea coriandoli celebrativi 2D (Phaser) con caduta e rotazione
 * per schermate di fine livello o vittorie.
 */
export function start2DCelebration(scene: Phaser.Scene): () => void {
  const w = scene.scale.gameSize.width;
  const h = scene.scale.gameSize.height;

  // Se non esiste la texture per i coriandoli, creiamola rapidamente
  if (!scene.textures.exists('confetto')) {
    const cv = scene.textures.createCanvas('confetto', 14, 22);
    if (cv) {
      const ctx = cv.getContext();
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 14, 22);
      cv.refresh();
    }
  }

  const particles: Array<{
    sprite: Phaser.GameObjects.Image;
    vy: number;
    vx: number;
    rotSpeed: number;
  }> = [];

  const coloriHex = [0x00a2e8, 0xf5b400, 0x22c55e, 0xff4757, 0x9b59b6, 0xffa502];

  for (let i = 0; i < 48; i++) {
    const x = Math.random() * w;
    const y = -20 - Math.random() * (h * 0.8);
    const sprite = scene.add.image(x, y, 'confetto');
    sprite.setTint(coloriHex[i % coloriHex.length]);
    sprite.setScale(0.7 + Math.random() * 0.6);
    sprite.setDepth(20);

    particles.push({
      sprite,
      vy: 80 + Math.random() * 140,
      vx: (Math.random() - 0.5) * 40,
      rotSpeed: (Math.random() - 0.5) * 5
    });
  }

  const loop = (_time: number, delta: number) => {
    const dt = delta / 1000;
    for (const p of particles) {
      p.sprite.y += p.vy * dt;
      p.sprite.x += p.vx * dt + Math.sin(p.sprite.y * 0.02) * 1.5;
      p.sprite.rotation += p.rotSpeed * dt;

      if (p.sprite.y > h + 20) {
        p.sprite.y = -20;
        p.sprite.x = Math.random() * w;
      }
    }
  };

  scene.events.on(Phaser.Scenes.Events.UPDATE, loop);

  return () => {
    scene.events.off(Phaser.Scenes.Events.UPDATE, loop);
    for (const p of particles) {
      p.sprite.destroy();
    }
  };
}
