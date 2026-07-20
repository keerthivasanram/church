const thumbs = import.meta.glob('../assets/images/gallery/*.jpg', {
  eager: true,
  import: 'default',
})
const fulls = import.meta.glob('../assets/images/gallery/full/*.jpg', {
  eager: true,
  import: 'default',
})

function idFromPath(path) {
  const match = path.match(/(\d+)\.jpg$/)
  return match ? Number(match[1]) : 0
}

export const galleryImages = Object.entries(thumbs)
  .map(([path, url]) => {
    const id = idFromPath(path)
    const fullEntry = Object.entries(fulls).find(([p]) => idFromPath(p) === id)
    return {
      id,
      thumb: url,
      full: fullEntry ? fullEntry[1] : url,
    }
  })
  .sort((a, b) => a.id - b.id)
