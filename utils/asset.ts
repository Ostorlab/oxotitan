import validator from 'validator'

type IPAssetInputType = {
  host: string
  mask: string | null
  version: number | null
}

const IP_VERSIONS = {
  v6: 6 as '6' | 6,
  v4: 4 as '4' | 4
}

/**
 *
 * @param version The version of the IP whose mask to get.
 * @returns
 */
export const getIpMask = (version: number | null): string | null => {
  if (version === IP_VERSIONS.v4) {
    return '32'
  } else if (version === IP_VERSIONS.v6) {
    return '64'
  } else {
    return null
  }
}

/**
 * Get the version of an IP.
 * @param ip The IP whose version to get.
 * @returns The version of the IP.
 */
export const getIpVersion = (ip: string): number | null => {
  if (ip !== null && (validator.isIP(ip, IP_VERSIONS.v4) === true || validator.isIPRange(ip, IP_VERSIONS.v4)) === true) {
    return IP_VERSIONS.v4 as number
  } else if (ip !== null && (validator.isIP(ip, IP_VERSIONS.v6) === true || validator.isIPRange(ip, IP_VERSIONS.v6)) === true) {
    return IP_VERSIONS.v6 as number
  } else {
    return null
  }
}

/**
 * Parse an IP string to `host`, `mask`, and `version`.
 * @param ip The IP to parse.
 * @returns The parsed IP.
 */
export const parseIp = (ip: string): IPAssetInputType => {
  const version = getIpVersion(ip)
  if (ip !== null && validator.isIPRange(ip)) {
    const [host, mask] = ip.split('/')
    return {
      host,
      mask,
      version
    }
  }
  return {
    host: ip,
    mask: getIpMask(version),
    version
  }
}
