import React from 'react';
import { Container } from '../../layout/Container';
import TripRelationshipCard from './tripRelationshipCard';
import TripRelationshipList from './tripRelationshipList';
// import AuthContext from '../../../contexts/AuthContext';
import { Grid } from '../../layout/Grid';
import { Heading } from '../../simple/Heading';

const TripInterstitialContent = () => {
  // const { userProfile } = useContext(AuthContext);

  // TODO: Remove fake data once relationships endpoint is working
  // const relationships = userProfile?.relationships
  const relationships = {
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

  return (
    <Container>
      <Grid gap md={12}>
        {relationships.relationships.map((relationship) => (
          <TripRelationshipCard
            key={relationship.id}
            relationship={relationship}
          />
        ))}
      </Grid>
      {/* Relationship List */}
      <Heading level={2} align="left" font="serif">
        Your trip registrants
      </Heading>
      <p>
        Please confirm that you would like to register the following people for
        this trip. Please note that you will be able to add the above people
        later if you choose, but you will have to enter their information
        manually.
      </p>
      <TripRelationshipList />
    </Container>
  );
};

export default TripInterstitialContent;
