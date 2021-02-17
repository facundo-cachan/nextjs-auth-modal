import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { AppProvider, ParametersProvider } from 'context'
import { prepareClientPortals } from '@jesstelford/react-portal-universal'
import { App } from 'components'
import './styles.scss'

if (typeof window !== 'undefined') {
  // On the client, we have to run this once before React attempts a render.
  // Here in _app is a great place to do it as this file is only required once,
  // and right now (outside the constructor) is before React is invoked.
  prepareClientPortals()
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    /* This is where we'll render one of our universal portals */
    <AppProvider>
      <div id="modal" />
      <Provider session={pageProps.session}>
        <ParametersProvider>
          <App.Nav/>
          <Component {...pageProps} />
        </ParametersProvider>
      </Provider>
    </AppProvider>
  )
}

export default MyApp
