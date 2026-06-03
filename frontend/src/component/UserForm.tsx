import { JSX, useState } from "react"
import { createUser } from "../api/userApi"
import type { CreateUserPayload } from "../types"

export default function UserForm(): JSX.Element {
  const [formData, setFormData] = useState<CreateUserPayload>({
    name: "",
    email: "",
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const newUser = await createUser(formData)
      setSuccess(`User ${newUser.name} created successfully`)
      setFormData({ name: "", email: "" })   // clear form after success
    } catch (err) {
      setError("Failed to create user. Check your connection.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create User"}
      </button>
    </form>
  )
}