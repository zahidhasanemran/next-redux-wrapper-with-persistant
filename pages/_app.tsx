import type { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { wrapper } from '../store';
import {Provider} from 'react-redux';
import '../styles/globals.css'
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider {...{ store }}>
      <PersistGate persistor={(store as any).__persistor} loading={null}>
        {() => <Component {...props.pageProps} />}
      </PersistGate>
    </Provider>
  )
}
// export default wrapper.withRedux(MyApp);
export default MyApp
