import { useState } from "react";
import { signupUser } from "../services/userService";

function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await signupUser(formData);
      if (result.success) {
        onSuccess && onSuccess(result.user); // Callback pour gérer le succès
      } else {
        setError(result.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Erreur réseau ou problème avec le serveur.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Prénom :</label>
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nom :</label>
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default SignupForm;
