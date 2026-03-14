import { useState } from "react"
import API from "../api/axios"
import { useNavigate } from "react-router-dom"

function CreateProject() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    maxMembers: 4
  })

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const payload = {
        ...form,
        requiredSkills: form.requiredSkills.split(",")
      }

      await API.post("/projects/create", payload)

      navigate("/dashboard")

    } catch (err) {

      alert("Failed to create project")

    }

  }

  return (

    <div className="flex justify-center mt-10">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-96"
      >

        <h2 className="text-2xl font-bold mb-6">
          Create Project
        </h2>

        <input
          name="title"
          placeholder="Title"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="requiredSkills"
          placeholder="Skills (comma separated)"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <input
          name="maxMembers"
          type="number"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Create Project
        </button>

      </form>

    </div>

  )

}

export default CreateProject