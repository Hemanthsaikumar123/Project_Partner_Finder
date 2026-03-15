import { useEffect, useState } from "react"
import API from "../api/axios"

function MyProjects() {

  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {

    const res = await API.get("/projects/my-projects")

    setProjects(res.data)

  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const accept = async (projectId, userId) => {

    await API.patch(`/projects/${projectId}/accept/${userId}`)

    fetchProjects()

  }

  const reject = async (projectId, userId) => {

    await API.patch(`/projects/${projectId}/reject/${userId}`)

    fetchProjects()

  }

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">My Projects</h1>

      {projects.map(project => (

        <div key={project._id} className="border p-4 mb-6 rounded">

          <h2 className="text-xl font-bold">{project.title}</h2>

          <h3 className="mt-3 font-bold">Applicants</h3>

          {project.applicants?.map(app => (

            <div
              key={app.user._id}
              className="flex justify-between items-center mt-2"
            >

              <span>{app.user.name}</span>

              <div className="flex gap-2">

                <button
                  onClick={() => accept(project._id, app.user._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>

                <button
                  onClick={() => reject(project._id, app.user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      ))}

    </div>

  )

}

export default MyProjects