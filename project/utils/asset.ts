/**
 * Get a config with the color, text, and icon based on the asset type/platform.
 * @param platform The platform to get the icon and color for.
 * @returns The icon, text, and color for the platform.
 */
export function assetPlatformRenderConfig(platform: string): { icon: string, text: string, color: string } {
  if (platform === undefined || platform === null) {
    return {
      color: 'grey-darken-3',
      text: 'Unknown',
      icon: platform
    }
  }
  const lowerCasedPlatform = platform.toLowerCase()
  if (Object.keys(IP_NODE_CLASS_NAMES).includes(lowerCasedPlatform) || IP_ASSET_NAMES.includes(lowerCasedPlatform)) {
    return { color: 'grey-darken-2', text: 'Network', icon: 'mdi-ip' }
  } else if (lowerCasedPlatform === 'android_store') {
    return { color: 'success', text: 'PlayStore', icon: 'mdi-google-play' }
  } else if (lowerCasedPlatform === 'android') {
    return { color: 'success', text: 'Android', icon: 'mdi-android' }
  } else if (ANDROID_ASSET_NAMES.includes(lowerCasedPlatform)) {
    return { color: 'green', text: 'Android', icon: 'mdi-android' }
  } else if (lowerCasedPlatform === 'ios_store') {
    return { color: 'grey-darken-1', text: 'AppStore', icon: '/img/apps.png' }
  } else if (lowerCasedPlatform === 'ios') {
    return { color: 'grey-darken-1', text: 'iOS', icon: 'mdi-apple' }
  } else if (IOS_ASSET_NAMES.includes(lowerCasedPlatform)) {
    return { color: 'grey-darken-1', text: 'iOS', icon: 'mdi-apple' }
  } else if (DOMAIN_ASSET_NAMES.includes(lowerCasedPlatform)) {
    return { color: 'blue-lighten-1', text: 'Web', icon: 'mdi-web' }
  }

  switch (lowerCasedPlatform) {
    case 'domain':
      return {
        color: 'green-lighten-1',
        text: 'Domain',
        icon: 'mdi-web-box'
      }
    case 'tld':
      return {
        color: 'red-lighten-1',
        text: 'TLD',
        icon: 'mdi-spider-web'
      }
    case 'org':
      return {
        color: 'orange-lighten-1',
        text: 'Org',
        icon: 'mdi-office-building-outline'
      }
    case 'as':
      return {
        color: 'deep-purple-darken-4',
        text: 'AS',
        icon: 'mdi-earth-box'
      }
    case 'email':
      return {
        color: 'blue-grey-darken-4',
        text: 'Email',
        icon: 'mdi-at'
      }
    case 'address':
      return {
        color: 'deep-orange accent-4',
        text: 'Address',
        icon: 'mdi-office-building-marker-outline'
      }
    case 'coordinates':
      return {
        color: 'green-darken-4',
        text: 'Coordinates',
        icon: 'mdi-crosshairs-gps'
      }
    case 'certificate':
      return {
        color: 'red-darken-4',
        text: 'Certificate',
        icon: 'mdi-file-certificate-outline'
      }
  }
  return {
    color: 'grey-darken-3',
    text: 'Unknown',
    icon: 'mdi-help'
  }
}
