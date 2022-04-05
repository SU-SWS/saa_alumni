import React, { useContext } from 'react';
import TripRelationshipCard from './tripRelationshipCard';
import TripRelationshipList from './tripRelationshipList';
import { Grid } from '../../layout/Grid';
import { Heading } from '../../simple/Heading';
import AuthContext from '../../../contexts/AuthContext';

const TripInterstitialContent = () => {
  const { userProfile } = useContext(AuthContext);
  const relationships = userProfile?.relationships;

  return (
    <>
      {relationships.relationships.length > 0 ? (
        <Grid gap md={12}>
          {relationships.relationships.map((relationship) => (
            <TripRelationshipCard
              key={relationship.id}
              relationship={relationship}
            />
          ))}
        </Grid>
      ) : (
        <p>No relationships are available at this time</p>
      )}
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
    </>
  );
};

export default TripInterstitialContent;
