import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MenubarComponent} from "./components/menubar/MenubarComponent.tsx";
import {OptionComponent} from "./components/option/OptionComponent.tsx";

function App() {
  return (
      <>
        <BrowserRouter>
            <Routes>
                {/* path main "/"  render 2 compoennts */}
                <Route path={"/"} element={<MenubarComponent/>}>
                    <Route path={"option"} element={
                        <OptionComponent/>
                    }
                    />

                </Route>
            </Routes>
        </BrowserRouter>
      </>
  )
}

export default App
