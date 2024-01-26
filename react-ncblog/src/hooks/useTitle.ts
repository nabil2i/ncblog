import { useEffect } from 'react'

const useTitle = (title: string) => {
  useEffect(() =>{
    const porevTitle = document.title
    document.title = title

    return () => { document.title = porevTitle}

  }, [title])
}

export default useTitle