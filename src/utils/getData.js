const API = 'https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json'

const getData = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error.message)
  }
  return ''
}
export default getData;
