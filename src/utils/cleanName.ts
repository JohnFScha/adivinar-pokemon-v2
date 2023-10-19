export default function cleanName(name: string) {
  // Remove spaces and special characters from the name
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}