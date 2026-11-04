export async function fetchPng(path: string): Promise<Blob> {
  const response = await fetch(path)
  if (!response.ok) throw new Error('The original image could not be loaded.')
  const blob = await response.blob()
  if (blob.type !== 'image/png') throw new Error('The original is not a PNG image.')
  const signature = new Uint8Array(await blob.slice(0, 8).arrayBuffer())
  if (![137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => signature[index] === byte)) {
    throw new Error('The original PNG is empty or invalid.')
  }
  return blob
}

export function shareData(
  file: File | null,
  title: string,
  url: string,
  canShare?: (data: ShareData) => boolean,
): ShareData {
  if (file && canShare) {
    try {
      if (canShare({ files: [file] })) return { files: [file], title }
    } catch {
      // Some browsers expose canShare but reject file capability checks.
    }
  }
  return { title, url }
}
