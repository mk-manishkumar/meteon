import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"


const App = () => {

  const {data} = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({})
  })

  return (
    <div>App</div>
  )
}

export default App