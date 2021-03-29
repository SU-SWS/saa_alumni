// Find how many nested bloks are added in Storyblok when we use the CreateBloks utility.

const getNumBloks = (section) => {
  let numBloks = 0;

  if (section != null) {
    numBloks = Object.keys(section).length;
  }

  return numBloks;
};

export default getNumBloks;
