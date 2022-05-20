export function validateServiceId(serviceId: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(serviceId) && serviceId != 'example';
}
