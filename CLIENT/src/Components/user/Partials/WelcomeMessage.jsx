// src/components/WelcomeMessage.js
import React from "react";
import { useSelector } from "react-redux";  // Utiliser useSelector pour récupérer l'état de l'utilisateur

function WelcomeMessage() {
  // Récupérer l'utilisateur depuis le store Redux
  const { firstname, lastname, isLogged } = useSelector((state) => state.user);

  return (
    <div className="welcome-container">
      {isLogged ? (
        <div>
          <h2>Bonjour, {firstname} {lastname} !</h2>
          <p>Bienvenue sur notre plateforme dédiée à la gestion des événements et des rapports. Ici, vous pouvez facilement participer à des événements locaux, signaler des problèmes, et consulter des rapports en temps réel.</p>
          <p>Nous vous offrons une interface simple et intuitive pour vous aider à suivre les événements qui vous intéressent et à apporter votre contribution à la communauté.</p>
          <p>Si vous êtes un administrateur, vous avez également accès à des outils de gestion avancés pour superviser les rapports et les événements.</p>
        </div>
      ) : (
        <div>
          <h2>Bienvenue sur notre site !</h2>
          <p>Nous vous invitons à vous connecter pour accéder à des fonctionnalités personnalisées, telles que la gestion des événements, la soumission de rapports, et bien plus encore.</p>
          <p>Créez un compte ou connectez-vous pour commencer à interagir avec la communauté et profiter pleinement des services que nous proposons.</p>
        </div>
      )}
    </div>
  );
}

export default WelcomeMessage;
