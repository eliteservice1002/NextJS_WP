import '../styles/globals.css'
import AppContext from "../lib/AppContext";
import {useState} from "react";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }) {
  const [mode, setMode] = useState('light')
  const [category, setCategory] = useState('All')
  const [siteInfos, setSiteInfos] = useState({})
  const context = {
    state: {
      mode,
      category,
      siteInfos
    },
    setMode,
    setCategory,
    setSiteInfos
  }
  return (
    <AppContext.Provider value={context}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
