import { Suspense, lazy } from "react"
import { BrowserRouter } from "react-router-dom"
import { Web3ReactProvider } from "@web3-react/core"
import { getLibrary } from "utils/Web3React"

import { Provider as AlertProvider } from "react-alert"

import { Provider } from "react-redux"
import store from "redux/ConfigureStore"

import Loading from "components/Loading"
import AlertTemplate, { alertOptions } from "utils/GetAlertTemplate"

const AppRouter = lazy(() => import("routers"))

const App = () => (
  <Suspense fallback={<Loading />}>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <AppRouter />
            </Suspense>
          </BrowserRouter>
        </AlertProvider>
      </Provider>
    </Web3ReactProvider>
  </Suspense>
)

export default App
