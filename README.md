
# Edge TTS Api
An API wrapper for Microsoft Edge TTS, which has over 170 high quality text-to-speech voices.

It was originally designed to be used in [penguinmod](https://penguinmod.com/) but can also be used in any other languages.






## API Reference

#### Get All Voices

```http
   https://pmedgetts.onrender.com/voices
```

Returns JSON all voices, and information about them (eg: Language, and tags)

#### Generate TTS

```http
  https://pmedgetts.onrender.com/tts?voice=voiceid&text=yourtext
```
(That example won't work as the voice ID is invalid)

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Voice ID`      | `string` | **Required**. Voice to say TTS in. Make sure to use the voices ShortName (eg. en-US-BrianNeural) |
| `text`      | `string` | **Required**. Text for the voice to say |



## FAQ

#### What format does it return in?

The text-to-speech response is returned as an MP3 audio file (audio/mpeg).

#### How do I use this from the command line?

You can use ```curl``` to make a request and save the MP3:

```
curl "https://pmedgetts.onrender.com/tts?voice=en-US-BrianNeural&text=hello%20world" --output output.mp3
```

#### Is it multilingual?

The text-to-speech can be multilingual, just make sure you have a voice selected that matches the language of the text

#### Is there a character limit?

No there is not a character limit, but long strings may take a while to generate.

#### How can I get the penguinmod extension?

When adding the extension, click 'load custom extension', and paste 'https://raw.githubusercontent.com/DominoKiddoo/pmedgetts/refs/heads/main/penguinmod-extension/edgetts.js?token=GHSAT0AAAAAADGCKV2MLV2APYXAUMECTA5Y2CXXR6Q' **TICK 'RUN UNSANDBOXED'OR IT WILL NOT LOAD**

#### What voices are supported?

You can find all voices [here](https://pmedgetts.onrender.com/voices)




## Acknowledgements

 - The original Edge TTS library, which can be found [here](https://pypi.org/project/edge-tts/)
