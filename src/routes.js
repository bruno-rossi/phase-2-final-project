import App from "./App";
import Parks from "./pages/Parks";
import Passport from "./pages/Passport";
import ParkPage from "./pages/ParkPage";
import ErrorPage from "./pages/ErrorPage";

const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Parks />
            },
            {
                path: '/passport',
                element: <Passport />
            },
            {
                path: '/parks/:parkCode',
                element: <ParkPage />
            }
        ]
    }
]

export default routes;