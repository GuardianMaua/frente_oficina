import React from 'react';

const ChallengeDescription: React.FC = () => (
  <div className="bg-gray-800 p-4 rounded-lg mb-6">
    <h2 className="text-2xl font-bold mb-2">Dicas</h2>
    <ul className="list-disc list-inside">
      <li>O sistema só aceita senhas que atendem a uma política de segurança rigorosa. Você consegue descobrir o formato correto para acessar?</li>
      <li>Somente aqueles que realmente entendem senhas seguras serão capazes de fazer login. Tente diferentes combinações e veja o que funciona.</li>
      <li>Uma aplicação bem segura deve impor políticas de senha fortes. Você consegue determinar quais critérios são exigidos?</li>
    </ul>
  </div>
);

export default ChallengeDescription;
