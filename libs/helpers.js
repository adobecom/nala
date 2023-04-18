/**
 * Slow/fast scroll JS evaluation method.
 * To be used in page.evaluate, i.e. page.evaluate(scroll, { direction: 'value', speed: 'value' });
 * @param direction string direction you want to scroll
 * @param speed string speed you would like to scroll. Options: slow, fast
*/
async function scroll(args) {
  const { direction, speed } = args;
  // eslint-disable-next-line no-promise-executor-return
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const scrollHeight = () => document.body.scrollHeight;
  const start = direction === 'down' ? 0 : scrollHeight();
  const shouldStop = (position) => (direction === 'down' ? position > scrollHeight() : position < 0);
  const increment = direction === 'down' ? 100 : -100;
  const delayTime = speed === 'slow' ? 30 : 5;
  console.error(start, shouldStop(start), increment);
  for (let i = start; !shouldStop(i); i += increment) {
    window.scrollTo(0, i);
    // eslint-disable-next-line no-await-in-loop
    await delay(delayTime);
  }
}

module.exports = { scroll };
