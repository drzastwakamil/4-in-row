export default eventHandler((event) => {
  console.log('the event', event)
  return JSON.stringify(event)
})
