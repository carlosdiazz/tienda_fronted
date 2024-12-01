export function validateProperty<T>(
  data: any,
  property: string,
  type: string
): T {
  if (typeof data[property] !== type) {
    throw new Error(`Invalid property ${property}`);
  }
  return data[property];
}
