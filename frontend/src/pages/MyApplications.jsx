import { useEffect, useState } from "react"
import API from "../api/axios"



function MyApplications() {
    

  const [projects, setProjects] = useState([])

  const fetchApplications = async () => {

    const res = await API.get("/projects/applied")

    setProjects(res.data)

  }

  useEffect(() => {
    fetchApplications()
  }, [])

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

        {projects.map(project => (

        <div
            key={project._id}
            className="border p-4 mb-4 rounded"
        >

            <h2 className="text-xl font-bold">
            {project.title}
            </h2>

            <p className="text-gray-600">
            Owner: {project.owner?.name}
            </p>

            <p className="mt-2 font-semibold">
            Status: {project.status}
            </p>

        </div>

        ))}
    </div>

  )

}

export default MyApplications