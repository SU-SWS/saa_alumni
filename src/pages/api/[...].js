const handler = (props) => {
  const splat = props.params['*'];
  console.log(splat);

  return splat;
};

export default handler;
