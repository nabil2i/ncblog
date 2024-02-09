import { useEffect } from 'react'
import { removeHtmlMarkup } from '../utils/markup'

const useTitle = (title: string) => {
  useEffect(() =>{
    const prevTitle = document.title
    document.title = removeHtmlMarkup(title)

    return () => { document.title = prevTitle}

  }, [title])
}

export default useTitle