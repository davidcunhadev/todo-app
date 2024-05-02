import { App } from './app'

const PORT = process.env.APP_PORT

new App().start( Number( PORT ) )
