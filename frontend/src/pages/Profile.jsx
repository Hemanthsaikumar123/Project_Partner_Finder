import { useEffect, useMemo, useState } from "react"
import API from "../api/axios"

function Profile() {

  const [form, setForm] = useState({
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    experienceLevel: "",
    role: ""
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const initials = useMemo(() => {
    const words = name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)

    if (words.length === 0) {
      return "CC"
    }

    return words.map((word) => word[0]?.toUpperCase()).join("")
  }, [name])

  const skillList = useMemo(() => {
    return form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
  }, [form.skills])

  const fetchProfile = async () => {

    try {
      setLoading(true)

      const res = await API.get("/users/profile")
      setName(res.data.name || "")
      setEmail(res.data.email || "")

      setForm({
        bio: res.data.bio || "",
        skills: res.data.skills?.join(",") || "",
        github: res.data.github || "",
        linkedin: res.data.linkedin || "",
        experienceLevel: res.data.experienceLevel || "",
        role: res.data.role || ""
      })

    } catch (err) {
      setMessage("Unable to load profile right now")
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {
      setSaving(true)
      setMessage("")

      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      }

      const res = await API.put("/users/profile", payload)
      setMessage("Profile updated successfully")

      setTimeout(() => {
        setMessage("")
      }, 3000)

    } catch (err) {

      setMessage(err.response?.data?.message || "Failed to update profile")

    } finally {

      setSaving(false)

    }

  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-100 px-4 py-10 md:px-8">
        <div className="mx-auto max-w-6xl animate-pulse rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="h-8 w-64 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-96 rounded bg-slate-200" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="h-64 rounded-2xl bg-slate-100" />
            <div className="h-64 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    )
  }

  return (

    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-slate-100 via-slate-50 to-white px-4 py-10 md:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {name ? `${name}'s Profile` : "Professional Profile"}
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-xl font-semibold text-white">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  Name
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {name || "Not available"}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-700">
              <div>
                <p className="mb-1 font-medium text-slate-900">Email</p>
                <p className="rounded-lg bg-slate-100 px-3 py-2 break-all">
                  {email || "Not available"}
                </p>
              </div>

              <div>
                <p className="mb-1 font-medium text-slate-900">Experience</p>
                <p className="rounded-lg bg-slate-100 px-3 py-2 capitalize">
                  {form.experienceLevel || "Not specified"}
                </p>
              </div>

              <div>
                <p className="mb-2 font-medium text-slate-900">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {skillList.length > 0 ? (
                    skillList.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">No skills added yet</span>
                  )}
                </div>
              </div>

            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >

            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                Edit Profile Details
              </h2>
            </div>

            {message && (
              <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {message}
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  placeholder="Write a concise summary about your background and interests"
                  className="min-h-[120px] w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-900"
                  value={form.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Skills
                </label>
                <input
                  name="skills"
                  placeholder="React, Node.js, UI Design"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-900"
                  value={form.skills}
                  onChange={handleChange}
                />
                <p className="mt-1 text-xs text-slate-500">Use commas to separate skills.</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  GitHub URL
                </label>
                <input
                  name="github"
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-900"
                  value={form.github}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  LinkedIn URL
                </label>
                <input
                  name="linkedin"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-900"
                  value={form.linkedin}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Experience Level
                </label>
                <select
                  name="experienceLevel"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-900"
                  value={form.experienceLevel}
                  onChange={handleChange}
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Role
                </label>
                <select
                  name="role"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-900"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="">Select role</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="student">Student</option>
                  <option value="founder">Founder</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>

  )

}

export default Profile