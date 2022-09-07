import { FishLogProps } from 'pages/Logs/Details'
import { useEffect, useState } from 'react'
import { UserProps } from '~components/Header'
import GetAllFishLogs from '~services/api/fishLogServices/getAllLogs'

export default function useLogs() {
  const [logs, setLogs] = useState([] as FishLogProps[])

  useEffect(() => {
    const fetchData = async () => {
      const user: UserProps = JSON.parse(localStorage.getItem('UserData')) as UserProps
      const reps = await GetAllFishLogs(user.token, '')
      reps.forEach((element) => {
        if (element.reviewed) {
          element.reviewed = element.reviewed ? 'Revisado' : 'Pendente'
        } else {
          element.reviewed = 'Pendente'
        }
      })
      setLogs(reps)
      console.log('Data: ', reps)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
  }, [])

  return { logs, setLogs }
}
