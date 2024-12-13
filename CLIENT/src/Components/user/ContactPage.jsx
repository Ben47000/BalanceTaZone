import { useState } from "react";

function ContactPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      content: content,
    };

    try {
      const response = await fetch("http://localhost:5173/api/v1/contact/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      const data = await response.json();
      console.log(data);
      alert("Message envoyé avec succès");

      setFirstname("");
      setLastname("");
      setEmail("");
      setContent("");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div className="form-container">
      <h1>Contactez-nous</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Nom :</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Message :</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Envoyer</button>
          {/* Vous pouvez ajouter un bouton supplémentaire si nécessaire */}
        </div>
      </form>
    </div>
  );
}

export default ContactPage;
