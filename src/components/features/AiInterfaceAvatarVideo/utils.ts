const IMAGE_EXT_PATTERN = /\.(jpe?g|png)$/i

export const getSourceImageUrlFieldError = (raw: string): string | undefined => {
  const value = raw.trim()
  if (!value) {
    return 'Source image URL is required'
  }

  const lower = value.toLowerCase()
  if (lower.startsWith('s3://')) {
    if (!IMAGE_EXT_PATTERN.test(value)) {
      return 'Must be a valid image URL'
    }
    return undefined
  }

  let parsed: URL
  try {
    parsed = new URL(value)
  } catch {
    return 'Enter a valid URL'
  }

  const protocol = parsed.protocol.toLowerCase()
  if (protocol !== 'https:' && protocol !== 'http:') {
    return 'Use an https, http, or s3:// URL'
  }

  if (!IMAGE_EXT_PATTERN.test(parsed.pathname)) {
    return 'URL path must end with .jpg, .jpeg, or .png'
  }

  return undefined
}

export const UI_SUBMIT_DELAY_MS = 1400
