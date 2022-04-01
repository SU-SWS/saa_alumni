import React, { useState, useContext } from 'react';
import { Container } from '../../layout/Container';
import TripRelationshipCard from './tripRelationshipCard';
import AuthContext from '../../../contexts/AuthContext';

const TripInterstitialContent = () => {
  const [selectedTravelers, setSelectedTravelers] = useState([]);
  const { userProfile } = useContext(AuthContext);
  const relationships = userProfile?.relationships || {};
  // Placeholder for user.relationship.name
  const name = 'Plantina Pinto';

  console.log('TripInterstitialContent Name:', name);

  return (
    <Container>
      relationships.map(relationship => (
      <TripRelationshipCard
        name={name}
        selectedTravelers={selectedTravelers}
        setSelectedTravelers={setSelectedTravelers}
      />
      ))
    </Container>
  );
};

export default TripInterstitialContent;
