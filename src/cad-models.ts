export interface CadModelSpec {
  id: 'pintle_cutaway' | 'pintle_full' | 'swirl' | 'motor';
  src: string;
  name: string;
  orbit: string;
  stlUrl?: string;
  objUrl?: string;
  badge: string;
}

export const CAD_MODELS: Record<CadModelSpec['id'], CadModelSpec> = {
  pintle_cutaway: {
    id: 'pintle_cutaway',
    src: '3D/pintle_injector_cutaway.glb',
    name: 'MIT Project Hephaestus Pintle Injector (270° Cutaway with 36 Metering Slots)',
    orbit: '45deg 68deg 115%',
    stlUrl: '3D/pintle_injector_cutaway.stl',
    objUrl: '3D/pintle_injector_cutaway.obj',
    badge: 'ISRO LPSC / MIT Hephaestus // 270° Section',
  },
  pintle_full: {
    id: 'pintle_full',
    src: '3D/pintle_injector_full.glb',
    name: '1000 N Satellite Pintle Injector (360° Flight Assembly)',
    orbit: '45deg 72deg 115%',
    stlUrl: '3D/pintle_injector_full.stl',
    objUrl: '3D/pintle_injector_full.obj',
    badge: 'ISRO LPSC // 360° Full Assembly',
  },
  swirl: {
    id: 'swirl',
    src: '3D/Coaxial_swirl_injector_full.glb',
    name: 'Dual Passage Coaxial Swirl Injector Assembly',
    orbit: '35deg 65deg 115%',
    badge: 'ThrustWorks Dynetics // 7 bar Swirl Coaxial',
  },
  motor: {
    id: 'motor',
    src: '3D/solid_rocket_chamber_nozzle_cutaway.glb',
    name: 'Solid Propellant Rocket Motor Chamber & De Laval Nozzle Cutaway',
    orbit: '45deg 75deg 115%',
    badge: 'KNDX / KNSU Solid Motor // C-D Nozzle Cutaway',
  },
};

export function getCadModelConfig(type: string | null | undefined): CadModelSpec | null {
  if (!type || typeof type !== 'string') {
    return null;
  }
  const normalized = type.trim() as CadModelSpec['id'];
  return CAD_MODELS[normalized] ?? null;
}

export function resolveModalCadModel(modalKey: string | null | undefined): CadModelSpec | null {
  if (!modalKey || typeof modalKey !== 'string') {
    return null;
  }
  switch (modalKey.trim()) {
    case 'kp_pintle':
      return CAD_MODELS.pintle_cutaway;
    case 'kp_swirl':
      return CAD_MODELS.swirl;
    case 'kp_srm':
      return CAD_MODELS.motor;
    default:
      return null;
  }
}
