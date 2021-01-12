import React, { useEffect } from 'react'

import * as Dom from '../../utils/dom'
import { THEME } from '../../constants'

const src = 'https://utteranc.es/client.js'
const branch = 'master'
const DARK_THEME = 'photon-dark'
const LIGHT_THEME = 'github-light'

export const Utterances = ({ repo }) => {
  const rootElm = React.createRef()

  useEffect(() => {
    const isLightTheme = Dom.hasClassOfBody(THEME.LIGHT)
    const utterances = document.createElement('script')
    const utterancesConfig = {
      src,
      repo,
      branch,
      theme: isLightTheme ? LIGHT_THEME : DARK_THEME,
      label: 'comment',
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })
    rootElm.current.appendChild(utterances)
  }, [])

  return <div className="utterances" ref={rootElm} />
}
