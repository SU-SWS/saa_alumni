import React, { useState, useContext } from 'react';
import { Container } from '../../layout/Container';
import TripRelationshipCard from './tripRelationshipCard';
import AuthContext from '../../../contexts/AuthContext';
import { Grid } from '../../layout/Grid';

const TripInterstitialContent = () => {
  const [selectedTravelers, setSelectedTravelers] = useState({});
  const { userProfile } = useContext(AuthContext);

  // TODO: Remove fake data once relationships endpoint is working
  const relationships = userProfile?.relationships || {
    relationships: [
      {
        id: '73c1d24d-e934-4ade-9101-397bec48fed0',
        type: 'Spouse/Partner',
        digitalName: 'Max Dataton',
        birthDate: '1975-04-02',
      },
      {
        id: '8d5860e9-cb91-4ab0-b1e8-2c2f1e966001',
        type: 'Child',
        digitalName: 'Gregory Bernhard',
        birthDate: '1985-08-16',
      },
      {
        id: '870a0e68-1069-4ee8-9387-8ddcc2984c58',
        type: 'Child',
        digitalName: 'Jermey Beer',
        birthDate: '1959-12-22',
      },
      {
        id: 'c5f26e1c-f7b1-4f80-9a5c-ce4deb3c7a56',
        type: 'Child',
        digitalName: 'Minnie Dataton',
        birthDate: '2005-07-16',
      },
    ],
  };

  const addRelationship = (digitalName) => {
    // setSelectedTravelers({ ...selectedTravelers, digitalName });
    console.log(digitalName);
  };

  const removeRelationship = (digitalName) => {
    console.log(digitalName);
    // console.log(Object.values(selectedTravelers));
    // setSelectedTravelers({
    //   ...selectedTravelers.filter((user) => user !== digitalName),
    // });
  };

  // TODO: Determine how to pass selectedTravelers to RegistrationForm GG Component
  window.prefill = selectedTravelers;

  return (
    <Container>
      <Grid gap md={12}>
        {relationships.relationships.map((relationship) => (
          <TripRelationshipCard
            key={relationship.id}
            name={relationship.digitalName}
            addRelationship={addRelationship(relationship.digitalName)}
            removeRelationship={removeRelationship(relationship.digitalName)}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default TripInterstitialContent;
