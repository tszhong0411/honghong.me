const trackEvent = (...args: Parameters<umami.umami['track']>) => {
  if (window.umami && typeof window.umami.track === 'function') {
    umami.track(...args)
  }
}

export default trackEvent
