const synth = window.speechSynthesis;

export const getVoices = () => {
  const voices = synth.getVoices();
  return voices;
};

export default (text, lang) => {
  const voices = getVoices();
  const speakIt = new SpeechSynthesisUtterance(text);
  const findVoiceIndex = voices.findIndex(voice => voice.lang === lang);

  if (findVoiceIndex === -1) console.error(`${lang} is not supported`);
  else speakIt.voice = voices[findVoiceIndex];

  synth.speak(speakIt);
};
