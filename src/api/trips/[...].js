import StoryblokClient from 'storyblok-js-client';
import connect from 'next-connect';

const formatTrip = (trip, form) => {
  const ret = {};
  ret.uuid = trip.uuid;
  ret.title = trip.content.title;
  ret.subtitle = trip.content.subtitle;
  ret.slug = trip.slug;
  ret.fullSlug = trip.full_slug;
  ret.tripId = trip.content.tripId;
  ret.description = trip.content.description;
  ret.shortDescription = trip.content.shortDescription;
  ret.cost = 'TBD';
  ret.status = trip.content.status;
  ret.startDate = trip.content.startDate;
  ret.endDate = trip.content.endDate;
  ret.extendPrice = trip.content.extendPrice;
  ret.extendEndDate = trip.content.extendEndDate;
  ret.extendStartDate = trip.content.extendStartDate;

  // Form
  ret.formSlug = form.slug;
  ret.formFullSlug = form.full_slug;
  ret.depositAmount = form.content.giveGabForm[0].depositAmount;
  ret.roomTypes = ['Single', 'Double', 'Queen', 'King', 'Oligarch', 'Elon'];

  return ret;
};

const tripInfo = async (req, res) => {
  const storyblok = new StoryblokClient({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  });

  // Get the trip ID out of the URL and sanitize it to number.
  const params = req.params[`*`].split(`/`);
  const tripId = Number(params[0]);

  // Get the trip.
  const tripRes = await storyblok.get(`cdn/stories`, {
    filter_query: {
      component: {
        in: 'trip',
      },
      tripId: {
        in: tripId,
      },
    },
    per_page: 1,
  });

  const trip = tripRes?.data?.stories.pop();
  if (!trip) {
    res.status(404).json({ error: `Trip with id ${tripId} not found` });
  }

  // Get the trip registration form.
  const formRes = await storyblok.get(`cdn/stories`, {
    filter_query: {
      component: {
        in: 'registrationFormPage',
      },
      trip: {
        in: trip.uuid,
      },
    },
    per_page: 1,
  });

  const registrationForm = formRes.data.stories.pop();
  if (!registrationForm) {
    res
      .status(404)
      .json({ error: `Registration Form with id ${tripId} not found` });
  }

  // Merge the form data with the trip data.
  const tripData = formatTrip(trip, registrationForm);

  // Trip.
  res.status(200).json(tripData);
};

const handler = connect().get(tripInfo);

export default handler;
