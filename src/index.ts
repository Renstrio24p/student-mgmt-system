import { scriptElement } from "utils/purify/purify"
import Start from "./Start"
import './index.css'
import 'remixicon/fonts/remixicon.css'
import 'animate.css'

const DOM = document.querySelector('#app') as HTMLElement
DOM.append(scriptElement)
Start(DOM)