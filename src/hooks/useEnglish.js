import { useState, useEffect } from "react"


const useEnglish = () => {
    const [english, setEnglish] = useState(JSON.parse(localStorage.getItem("english")) || false);

    useEffect(() => {
        localStorage.setItem("english", JSON.stringify(english))
    }, [english])

    return [english, setEnglish]
}

export default useEnglish