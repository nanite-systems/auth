export function validateServiceId(serviceId: string): boolean {
  if (!serviceId.startsWith('s:')) return false;

  return /^[a-z0-9]+$/i.test(serviceId.slice(2)) && serviceId != 's:example';
}
