import type { AppProps } from 'next/app'
import { useStore } from 'react-redux'
import { wrapper } from '../store';
import {Provider} from 'react-redux';
import '../styles/globals.css'

function MyApp({ Component, ...rest }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}
// export default wrapper.withRedux(MyApp);
export default MyApp
