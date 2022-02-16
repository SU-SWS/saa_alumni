export default function handler(props) {
  const splat = props.params['*'];
  console.log(splat);

  return splat;
}
