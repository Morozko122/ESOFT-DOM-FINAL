import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./components/Pages/mainpage"
import TemplatePage from "./components/Pages/template"
import PageNotFound from "./components/Pages/notfoundpage"

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TemplatePage />}>
                    <Route path="main" element={<MainPage />} />
                </Route>
                <Route element={<PageNotFound />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}