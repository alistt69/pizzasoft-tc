import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router.tsx";

const App = () => {

  return (
      <RouterProvider router={router}/>
  )
}

export default App
