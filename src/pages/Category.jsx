import { useEffect, useState } from "react"
import { getCategories } from "../services/api"

export default function Categories({ setCategory, setPage }) {

  const [categories, setCategories] = useState([])

  useEffect(() => {

    async function load() {

      const data = await getCategories()

      setCategories(data)

    }

    load()

  }, [])


  return (

    <div className="container">

      <h2>Select Category</h2>

      {categories.map(cat => (

        <div key={cat.id}>

          <button
            onClick={() => {

              setCategory(cat.name)

              setPage("dashboard")

            }}
          >
            {cat.name}
          </button>

        </div>

      ))}

    </div>

  )

}