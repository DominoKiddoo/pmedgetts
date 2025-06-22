class EdgeTTS {
  constructor(runtime) {
    this.runtime = runtime; // Scratch runtime for storage & targets
    this.currentAudioBlob = null; // latest TTS audio blob
    this.currentAudioUrl = null;  // URL for playback

    this.voices = [
      { name: "af-ZA-AdriNeural", label: "Microsoft Adri Online (Natural) - Afrikaans (South Africa)" },
      { name: "af-ZA-WillemNeural", label: "Microsoft Willem Online (Natural) - Afrikaans (South Africa)" },
      { name: "sq-AL-AnilaNeural", label: "Microsoft Anila Online (Natural) - Albanian (Albania)" },
      { name: "sq-AL-IlirNeural", label: "Microsoft Ilir Online (Natural) - Albanian (Albania)" },
      { name: "am-ET-AmehaNeural", label: "Microsoft Ameha Online (Natural) - Amharic (Ethiopia)" },
      { name: "am-ET-MekdesNeural", label: "Microsoft Mekdes Online (Natural) - Amharic (Ethiopia)" },
      { name: "ar-DZ-AminaNeural", label: "Microsoft Amina Online (Natural) - Arabic (Algeria)" },
      { name: "ar-DZ-IsmaelNeural", label: "Microsoft Ismael Online (Natural) - Arabic (Algeria)" },
      { name: "ar-BH-AliNeural", label: "Microsoft Ali Online (Natural) - Arabic (Bahrain)" },
      { name: "ar-BH-LailaNeural", label: "Microsoft Laila Online (Natural) - Arabic (Bahrain)" },
      { name: "ar-EG-SalmaNeural", label: "Microsoft Salma Online (Natural) - Arabic (Egypt)" },
      { name: "ar-EG-ShakirNeural", label: "Microsoft Shakir Online (Natural) - Arabic (Egypt)" },
      { name: "ar-IQ-BasselNeural", label: "Microsoft Bassel Online (Natural) - Arabic (Iraq)" },
      { name: "ar-IQ-RanaNeural", label: "Microsoft Rana Online (Natural) - Arabic (Iraq)" },
      { name: "ar-JO-SanaNeural", label: "Microsoft Sana Online (Natural) - Arabic (Jordan)" },
      { name: "ar-JO-TaimNeural", label: "Microsoft Taim Online (Natural) - Arabic (Jordan)" },
      { name: "ar-KW-FahedNeural", label: "Microsoft Fahed Online (Natural) - Arabic (Kuwait)" },
      { name: "ar-KW-NouraNeural", label: "Microsoft Noura Online (Natural) - Arabic (Kuwait)" },
      { name: "ar-LB-LaylaNeural", label: "Microsoft Layla Online (Natural) - Arabic (Lebanon)" },
      { name: "ar-LB-RamiNeural", label: "Microsoft Rami Online (Natural) - Arabic (Lebanon)" },
      { name: "ar-LY-ImanNeural", label: "Microsoft Iman Online (Natural) - Arabic (Libya)" },
      { name: "ar-LY-OmarNeural", label: "Microsoft Omar Online (Natural) - Arabic (Libya)" },
      { name: "ar-MA-JamalNeural", label: "Microsoft Jamal Online (Natural) - Arabic (Morocco)" },
      { name: "ar-MA-MounaNeural", label: "Microsoft Mouna Online (Natural) - Arabic (Morocco)" },
      { name: "ar-OM-AbdullahNeural", label: "Microsoft Abdullah Online (Natural) - Arabic (Oman)" },
      { name: "ar-OM-AyshaNeural", label: "Microsoft Aysha Online (Natural) - Arabic (Oman)" },
      { name: "ar-QA-AmalNeural", label: "Microsoft Amal Online (Natural) - Arabic (Qatar)" },
      { name: "ar-QA-MoazNeural", label: "Microsoft Moaz Online (Natural) - Arabic (Qatar)" },
      { name: "ar-SA-HamedNeural", label: "Microsoft Hamed Online (Natural) - Arabic (Saudi Arabia)" },
      { name: "ar-SA-ZariyahNeural", label: "Microsoft Zariyah Online (Natural) - Arabic (Saudi Arabia)" },
      { name: "ar-SY-AmanyNeural", label: "Microsoft Amany Online (Natural) - Arabic (Syria)" },
      { name: "ar-SY-LaithNeural", label: "Microsoft Laith Online (Natural) - Arabic (Syria)" },
      { name: "ar-TN-HediNeural", label: "Microsoft Hedi Online (Natural) - Arabic (Tunisia)" },
      { name: "ar-TN-ReemNeural", label: "Microsoft Reem Online (Natural) - Arabic (Tunisia)" },
      { name: "ar-AE-FatimaNeural", label: "Microsoft Fatima Online (Natural) - Arabic (United Arab Emirates)" },
      { name: "ar-AE-HamdanNeural", label: "Microsoft Hamdan Online (Natural) - Arabic (United Arab Emirates)" },
      { name: "ar-YE-MaryamNeural", label: "Microsoft Maryam Online (Natural) - Arabic (Yemen)" },
      { name: "ar-YE-SalehNeural", label: "Microsoft Saleh Online (Natural) - Arabic (Yemen)" },
      { name: "az-AZ-BabekNeural", label: "Microsoft Babek Online (Natural) - Azerbaijani (Azerbaijan)" },
      { name: "az-AZ-BanuNeural", label: "Microsoft Banu Online (Natural) - Azerbaijani (Azerbaijan)" },
      { name: "bn-BD-NabanitaNeural", label: "Microsoft Nabanita Online (Natural) - Bangla (Bangladesh)" },
      { name: "bn-BD-PradeepNeural", label: "Microsoft Pradeep Online (Natural) - Bangla (Bangladesh)" },
      { name: "bn-IN-BashkarNeural", label: "Microsoft Bashkar Online (Natural) - Bangla (India)" },
      { name: "bn-IN-TanishaaNeural", label: "Microsoft Tanishaa Online (Natural) - Bengali (India)" },
      { name: "bs-BA-VesnaNeural", label: "Microsoft Vesna Online (Natural) - Bosnian (Bosnia and Herzegovina)" },
      { name: "bs-BA-GoranNeural", label: "Microsoft Goran Online (Natural) - Bosnian (Bosnia)" },
      { name: "bg-BG-BorislavNeural", label: "Microsoft Borislav Online (Natural) - Bulgarian (Bulgaria)" },
      { name: "bg-BG-KalinaNeural", label: "Microsoft Kalina Online (Natural) - Bulgarian (Bulgaria)" },
      { name: "my-MM-NilarNeural", label: "Microsoft Nilar Online (Natural) - Burmese (Myanmar)" },
      { name: "my-MM-ThihaNeural", label: "Microsoft Thiha Online (Natural) - Burmese (Myanmar)" },
      { name: "ca-ES-EnricNeural", label: "Microsoft Enric Online (Natural) - Catalan" },
      { name: "ca-ES-JoanaNeural", label: "Microsoft Joana Online (Natural) - Catalan" },
      { name: "zh-HK-HiuGaaiNeural", label: "Microsoft HiuGaai Online (Natural) - Chinese (Cantonese Traditional)" },
      { name: "zh-HK-HiuMaanNeural", label: "Microsoft HiuMaan Online (Natural) - Chinese (Hong Kong SAR)" },
      { name: "zh-HK-WanLungNeural", label: "Microsoft WanLung Online (Natural) - Chinese (Hong Kong SAR)" },
      { name: "zh-CN-XiaoxiaoNeural", label: "Microsoft Xiaoxiao Online (Natural) - Chinese (Mainland)" },
      { name: "zh-CN-XiaoyiNeural", label: "Microsoft Xiaoyi Online (Natural) - Chinese (Mainland)" },
      { name: "zh-CN-YunjianNeural", label: "Microsoft Yunjian Online (Natural) - Chinese (Mainland)" },
      { name: "zh-CN-YunxiNeural", label: "Microsoft Yunxi Online (Natural) - Chinese (Mainland)" },
      { name: "zh-CN-YunxiaNeural", label: "Microsoft Yunxia Online (Natural) - Chinese (Mainland)" },
      { name: "zh-CN-YunyangNeural", label: "Microsoft Yunyang Online (Natural) - Chinese (Mainland)" },
      { name: "zh-CN-liaoning-XiaobeiNeural", label: "Microsoft Xiaobei Online (Natural) - Chinese (Northeastern Mandarin)" },
      { name: "zh-TW-HsiaoChenNeural", label: "Microsoft HsiaoChen Online (Natural) - Chinese (Taiwan)" },
      { name: "zh-TW-YunJheNeural", label: "Microsoft YunJhe Online (Natural) - Chinese (Taiwan)" },
      { name: "zh-TW-HsiaoYuNeural", label: "Microsoft HsiaoYu Online (Natural) - Chinese (Taiwanese Mandarin)" },
      { name: "zh-CN-shaanxi-XiaoniNeural", label: "Microsoft Xiaoni Online (Natural) - Chinese (Zhongyuan Mandarin Shaanxi)" },
      { name: "hr-HR-GabrijelaNeural", label: "Microsoft Gabrijela Online (Natural) - Croatian (Croatia)" },
      { name: "hr-HR-SreckoNeural", label: "Microsoft Srecko Online (Natural) - Croatian (Croatia)" },
      { name: "cs-CZ-AntoninNeural", label: "Microsoft Antonin Online (Natural) - Czech (Czech)" },
      { name: "cs-CZ-VlastaNeural", label: "Microsoft Vlasta Online (Natural) - Czech (Czech)" },
      { name: "da-DK-ChristelNeural", label: "Microsoft Christel Online (Natural) - Danish (Denmark)" },
      { name: "da-DK-JeppeNeural", label: "Microsoft Jeppe Online (Natural) - Danish (Denmark)" },
      { name: "nl-BE-ArnaudNeural", label: "Microsoft Arnaud Online (Natural) - Dutch (Belgium)" },
      { name: "nl-BE-DenaNeural", label: "Microsoft Dena Online (Natural) - Dutch (Belgium)" },
      { name: "nl-NL-ColetteNeural", label: "Microsoft Colette Online (Natural) - Dutch (Netherlands)" },
      { name: "nl-NL-FennaNeural", label: "Microsoft Fenna Online (Natural) - Dutch (Netherlands)" },
      { name: "nl-NL-MaartenNeural", label: "Microsoft Maarten Online (Natural) - Dutch (Netherlands)" },
      { name: "en-AU-NatashaNeural", label: "Microsoft Natasha Online (Natural) - English (Australia)" },
      { name: "en-AU-WilliamNeural", label: "Microsoft William Online (Natural) - English (Australia)" },
      { name: "en-CA-ClaraNeural", label: "Microsoft Clara Online (Natural) - English (Canada)" },
      { name: "en-CA-LiamNeural", label: "Microsoft Liam Online (Natural) - English (Canada)" },
      { name: "en-HK-YanNeural", label: "Microsoft Yan Online (Natural) - English (Hong Kong SAR)" },
      { name: "en-HK-SamNeural", label: "Microsoft Sam Online (Natural) - English (Hongkong)" },
      { name: "en-IN-NeerjaExpressiveNeural", label: "Microsoft Neerja Online (Natural) - English (India) (Preview)" },
      { name: "en-IN-NeerjaNeural", label: "Microsoft Neerja Online (Natural) - English (India)" },
      { name: "en-IN-PrabhatNeural", label: "Microsoft Prabhat Online (Natural) - English (India)" },
      { name: "en-IE-ConnorNeural", label: "Microsoft Connor Online (Natural) - English (Ireland)" },
      { name: "en-IE-EmilyNeural", label: "Microsoft Emily Online (Natural) - English (Ireland)" },
      { name: "en-KE-AsiliaNeural", label: "Microsoft Asilia Online (Natural) - English (Kenya)" },
      { name: "en-KE-ChilembaNeural", label: "Microsoft Chilemba Online (Natural) - English (Kenya)" },
      { name: "en-NZ-MitchellNeural", label: "Microsoft Mitchell Online (Natural) - English (New Zealand)" },
      { name: "en-NZ-MollyNeural", label: "Microsoft Molly Online (Natural) - English (New Zealand)" },
      { name: "en-NG-AbeoNeural", label: "Microsoft Abeo Online (Natural) - English (Nigeria)" },
      { name: "en-NG-EzinneNeural", label: "Microsoft Ezinne Online (Natural) - English (Nigeria)" },
      { name: "en-PH-JamesNeural", label: "Microsoft James Online (Natural) - English (Philippines)" },
      { name: "en-PH-RosaNeural", label: "Microsoft Rosa Online (Natural) - English (Philippines)" },
      { name: "en-US-AvaNeural", label: "Microsoft Ava Online (Natural) - English (United States)" },
      { name: "en-US-AndrewNeural", label: "Microsoft Andrew Online (Natural) - English (United States)" },
      { name: "en-US-EmmaNeural", label: "Microsoft Emma Online (Natural) - English (United States)" },
      { name: "en-US-BrianNeural", label: "Microsoft Brian Online (Natural) - English (United States)" },
      { name: "en-SG-LunaNeural", label: "Microsoft Luna Online (Natural) - English (Singapore)" },
      { name: "en-SG-WayneNeural", label: "Microsoft Wayne Online (Natural) - English (Singapore)" },
      { name: "en-ZA-LeahNeural", label: "Microsoft Leah Online (Natural) - English (South Africa)" },
      { name: "en-ZA-LukeNeural", label: "Microsoft Luke Online (Natural) - English (South Africa)" },
      { name: "en-TZ-ElimuNeural", label: "Microsoft Elimu Online (Natural) - English (Tanzania)" },
      { name: "en-TZ-ImaniNeural", label: "Microsoft Imani Online (Natural) - English (Tanzania)" },
      { name: "en-GB-LibbyNeural", label: "Microsoft Libby Online (Natural) - English (United Kingdom)" },
      { name: "en-GB-MaisieNeural", label: "Microsoft Maisie Online (Natural) - English (United Kingdom)" },
      { name: "en-GB-RyanNeural", label: "Microsoft Ryan Online (Natural) - English (United Kingdom)" },
      { name: "en-GB-SoniaNeural", label: "Microsoft Sonia Online (Natural) - English (United Kingdom)" },
      { name: "en-GB-ThomasNeural", label: "Microsoft Thomas Online (Natural) - English (United Kingdom)" },
      { name: "en-US-AnaNeural", label: "Microsoft Ana Online (Natural) - English (United States)" },
      { name: "en-US-AndrewMultilingualNeural", label: "Microsoft AndrewMultilingual Online (Natural) - English (United States)" },
      { name: "en-US-AriaNeural", label: "Microsoft Aria Online (Natural) - English (United States)" },
      { name: "en-US-AvaMultilingualNeural", label: "Microsoft AvaMultilingual Online (Natural) - English (United States)" },
      { name: "en-US-BrianMultilingualNeural", label: "Microsoft BrianMultilingual Online (Natural) - English (United States)" },
      { name: "en-US-ChristopherNeural", label: "Microsoft Christopher Online (Natural) - English (United States)" },
      { name: "en-US-EmmaMultilingualNeural", label: "Microsoft EmmaMultilingual Online (Natural) - English (United States)" },
      { name: "en-US-EricNeural", label: "Microsoft Eric Online (Natural) - English (United States)" },
      { name: "en-US-GuyNeural", label: "Microsoft Guy Online (Natural) - English (United States)" },
      { name: "en-US-JennyNeural", label: "Microsoft Jenny Online (Natural) - English (United States)" },
      { name: "en-US-MichelleNeural", label: "Microsoft Michelle Online (Natural) - English (United States)" },
      { name: "en-US-RogerNeural", label: "Microsoft Roger Online (Natural) - English (United States)" },
      { name: "en-US-SteffanNeural", label: "Microsoft Steffan Online (Natural) - English (United States)" },
      { name: "et-EE-AnuNeural", label: "Microsoft Anu Online (Natural) - Estonian (Estonia)" },
      { name: "et-EE-KertNeural", label: "Microsoft Kert Online (Natural) - Estonian (Estonia)" },
      { name: "fil-PH-AngeloNeural", label: "Microsoft Angelo Online (Natural) - Filipino (Philippines)" },
      { name: "fil-PH-BlessicaNeural", label: "Microsoft Blessica Online (Natural) - Filipino (Philippines)" },
      { name: "fi-FI-HarriNeural", label: "Microsoft Harri Online (Natural) - Finnish (Finland)" },
      { name: "fi-FI-NooraNeural", label: "Microsoft Noora Online (Natural) - Finnish (Finland)" },
      { name: "fr-BE-CharlineNeural", label: "Microsoft Charline Online (Natural) - French (Belgium)" },
      { name: "fr-BE-GerardNeural", label: "Microsoft Gerard Online (Natural) - French (Belgium)" },
      { name: "fr-CA-ThierryNeural", label: "Microsoft Thierry Online (Natural) - French (Canada)" },
      { name: "fr-CA-AntoineNeural", label: "Microsoft Antoine Online (Natural) - French (Canada)" },
      { name: "fr-CA-JeanNeural", label: "Microsoft Jean Online (Natural) - French (Canada)" },
      { name: "fr-CA-SylvieNeural", label: "Microsoft Sylvie Online (Natural) - French (Canada)" },
      { name: "fr-FR-VivienneMultilingualNeural", label: "Microsoft VivienneMultilingual Online (Natural) - French (France)" },
      { name: "fr-FR-RemyMultilingualNeural", label: "Microsoft RemyMultilingual Online (Natural) - French (France)" },
      { name: "fr-FR-DeniseNeural", label: "Microsoft Denise Online (Natural) - French (France)" },
      { name: "fr-FR-EloiseNeural", label: "Microsoft Eloise Online (Natural) - French (France)" },
      { name: "fr-FR-HenriNeural", label: "Microsoft Henri Online (Natural) - French (France)" },
      { name: "fr-CH-ArianeNeural", label: "Microsoft Ariane Online (Natural) - French (Switzerland)" },
      { name: "fr-CH-FabriceNeural", label: "Microsoft Fabrice Online (Natural) - French (Switzerland)" },
      { name: "gl-ES-RoiNeural", label: "Microsoft Roi Online (Natural) - Galician" },
      { name: "gl-ES-SabelaNeural", label: "Microsoft Sabela Online (Natural) - Galician" },
      { name: "ka-GE-EkaNeural", label: "Microsoft Eka Online (Natural) - Georgian (Georgia)" },
      { name: "ka-GE-GiorgiNeural", label: "Microsoft Giorgi Online (Natural) - Georgian (Georgia)" },
      { name: "de-AT-IngridNeural", label: "Microsoft Ingrid Online (Natural) - German (Austria)" },
      { name: "de-AT-JonasNeural", label: "Microsoft Jonas Online (Natural) - German (Austria)" },
      { name: "de-DE-SeraphinaMultilingualNeural", label: "Microsoft SeraphinaMultilingual Online (Natural) - German (Germany)" },
      { name: "de-DE-FlorianMultilingualNeural", label: "Microsoft FlorianMultilingual Online (Natural) - German (Germany)" },
      { name: "de-DE-AmalaNeural", label: "Microsoft Amala Online (Natural) - German (Germany)" },
      { name: "de-DE-ConradNeural", label: "Microsoft Conrad Online (Natural) - German (Germany)" },
      { name: "de-DE-KatjaNeural", label: "Microsoft Katja Online (Natural) - German (Germany)" },
      { name: "de-DE-KillianNeural", label: "Microsoft Killian Online (Natural) - German (Germany)" },
      { name: "de-CH-JanNeural", label: "Microsoft Jan Online (Natural) - German (Switzerland)" },
      { name: "de-CH-LeniNeural", label: "Microsoft Leni Online (Natural) - German (Switzerland)" },
      { name: "el-GR-AthinaNeural", label: "Microsoft Athina Online (Natural) - Greek (Greece)" },
      { name: "el-GR-NestorasNeural", label: "Microsoft Nestoras Online (Natural) - Greek (Greece)" },
      { name: "gu-IN-DhwaniNeural", label: "Microsoft Dhwani Online (Natural) - Gujarati (India)" },
      { name: "gu-IN-NiranjanNeural", label: "Microsoft Niranjan Online (Natural) - Gujarati (India)" },
      { name: "he-IL-AvriNeural", label: "Microsoft Avri Online (Natural) - Hebrew (Israel)" },
      { name: "he-IL-HilaNeural", label: "Microsoft Hila Online (Natural) - Hebrew (Israel)" },
      { name: "hi-IN-MadhurNeural", label: "Microsoft Madhur Online (Natural) - Hindi (India)" },
      { name: "hi-IN-SwaraNeural", label: "Microsoft Swara Online (Natural) - Hindi (India)" },
      { name: "hu-HU-NoemiNeural", label: "Microsoft Noemi Online (Natural) - Hungarian (Hungary)" },
      { name: "hu-HU-TamasNeural", label: "Microsoft Tamas Online (Natural) - Hungarian (Hungary)" },
      { name: "is-IS-GudrunNeural", label: "Microsoft Gudrun Online (Natural) - Icelandic (Iceland)" },
      { name: "is-IS-GunnarNeural", label: "Microsoft Gunnar Online (Natural) - Icelandic (Iceland)" },
      { name: "id-ID-ArdiNeural", label: "Microsoft Ardi Online (Natural) - Indonesian (Indonesia)" },
      { name: "id-ID-GadisNeural", label: "Microsoft Gadis Online (Natural) - Indonesian (Indonesia)" },
      { name: "iu-Latn-CA-SiqiniqNeural", label: "Microsoft Siqiniq Online (Natural) - Inuktitut (Latin, Canada)" },
      { name: "iu-Latn-CA-TaqqiqNeural", label: "Microsoft Taqqiq Online (Natural) - Inuktitut (Latin, Canada)" },
      { name: "iu-Cans-CA-SiqiniqNeural", label: "Microsoft Siqiniq Online (Natural) - Inuktitut (Syllabics, Canada)" },
      { name: "iu-Cans-CA-TaqqiqNeural", label: "Microsoft Taqqiq Online (Natural) - Inuktitut (Syllabics, Canada)" },
      { name: "ga-IE-ColmNeural", label: "Microsoft Colm Online (Natural) - Irish (Ireland)" },
      { name: "ga-IE-OrlaNeural", label: "Microsoft Orla Online (Natural) - Irish (Ireland)" },
      { name: "it-IT-GiuseppeMultilingualNeural", label: "Microsoft GiuseppeMultilingual Online (Natural) - Italian (Italy)" },
      { name: "it-IT-DiegoNeural", label: "Microsoft Diego Online (Natural) - Italian (Italy)" },
      { name: "it-IT-ElsaNeural", label: "Microsoft Elsa Online (Natural) - Italian (Italy)" },
      { name: "it-IT-IsabellaNeural", label: "Microsoft Isabella Online (Natural) - Italian (Italy)" },
      { name: "ja-JP-KeitaNeural", label: "Microsoft Keita Online (Natural) - Japanese (Japan)" },
      { name: "ja-JP-NanamiNeural", label: "Microsoft Nanami Online (Natural) - Japanese (Japan)" },
      { name: "jv-ID-DimasNeural", label: "Microsoft Dimas Online (Natural) - Javanese (Indonesia)" },
      { name: "jv-ID-SitiNeural", label: "Microsoft Siti Online (Natural) - Javanese (Indonesia)" },
      { name: "kn-IN-GaganNeural", label: "Microsoft Gagan Online (Natural) - Kannada (India)" },
      { name: "kn-IN-SapnaNeural", label: "Microsoft Sapna Online (Natural) - Kannada (India)" },
      { name: "kk-KZ-AigulNeural", label: "Microsoft Aigul Online (Natural) - Kazakh (Kazakhstan)" },
      { name: "kk-KZ-DauletNeural", label: "Microsoft Daulet Online (Natural) - Kazakh (Kazakhstan)" },
      { name: "km-KH-PisethNeural", label: "Microsoft Piseth Online (Natural) - Khmer (Cambodia)" },
      { name: "km-KH-SreymomNeural", label: "Microsoft Sreymom Online (Natural) - Khmer (Cambodia)" },
      { name: "ko-KR-HyunsuMultilingualNeural", label: "Microsoft HyunsuMultilingual Online (Natural) - Korean (Korea)" },
      { name: "ko-KR-InJoonNeural", label: "Microsoft InJoon Online (Natural) - Korean (Korea)" },
      { name: "ko-KR-SunHiNeural", label: "Microsoft SunHi Online (Natural) - Korean (Korea)" },
      { name: "lo-LA-ChanthavongNeural", label: "Microsoft Chanthavong Online (Natural) - Lao (Laos)" },
      { name: "lo-LA-KeomanyNeural", label: "Microsoft Keomany Online (Natural) - Lao (Laos)" },
      { name: "lv-LV-EveritaNeural", label: "Microsoft Everita Online (Natural) - Latvian (Latvia)" },
      { name: "lv-LV-NilsNeural", label: "Microsoft Nils Online (Natural) - Latvian (Latvia)" },
      { name: "lt-LT-LeonasNeural", label: "Microsoft Leonas Online (Natural) - Lithuanian (Lithuania)" },
      { name: "lt-LT-OnaNeural", label: "Microsoft Ona Online (Natural) - Lithuanian (Lithuania)" },
      { name: "mk-MK-AleksandarNeural", label: "Microsoft Aleksandar Online (Natural) - Macedonian (North Macedonia)" },
      { name: "mk-MK-MarijaNeural", label: "Microsoft Marija Online (Natural) - Macedonian (North Macedonia)" },
      { name: "ms-MY-OsmanNeural", label: "Microsoft Osman Online (Natural) - Malay (Malaysia)" },
      { name: "ms-MY-YasminNeural", label: "Microsoft Yasmin Online (Natural) - Malay (Malaysia)" },
      { name: "ml-IN-MidhunNeural", label: "Microsoft Midhun Online (Natural) - Malayalam (India)" },
      { name: "ml-IN-SobhanaNeural", label: "Microsoft Sobhana Online (Natural) - Malayalam (India)" },
      { name: "mt-MT-GraceNeural", label: "Microsoft Grace Online (Natural) - Maltese (Malta)" },
      { name: "mt-MT-JosephNeural", label: "Microsoft Joseph Online (Natural) - Maltese (Malta)" },
      { name: "mr-IN-AarohiNeural", label: "Microsoft Aarohi Online (Natural) - Marathi (India)" },
      { name: "mr-IN-ManoharNeural", label: "Microsoft Manohar Online (Natural) - Marathi (India)" },
      { name: "mn-MN-BataaNeural", label: "Microsoft Bataa Online (Natural) - Mongolian (Mongolia)" },
      { name: "mn-MN-YesuiNeural", label: "Microsoft Yesui Online (Natural) - Mongolian (Mongolia)" },
      { name: "ne-NP-HemkalaNeural", label: "Microsoft Hemkala Online (Natural) - Nepali (Nepal)" },
      { name: "ne-NP-SagarNeural", label: "Microsoft Sagar Online (Natural) - Nepali (Nepal)" },
      { name: "nb-NO-FinnNeural", label: "Microsoft Finn Online (Natural) - Norwegian (Bokmål Norway)" },
      { name: "nb-NO-PernilleNeural", label: "Microsoft Pernille Online (Natural) - Norwegian (Bokmål, Norway)" },
      { name: "ps-AF-GulNawazNeural", label: "Microsoft GulNawaz Online (Natural) - Pashto (Afghanistan)" },
      { name: "ps-AF-LatifaNeural", label: "Microsoft Latifa Online (Natural) - Pashto (Afghanistan)" },
      { name: "fa-IR-DilaraNeural", label: "Microsoft Dilara Online (Natural) - Persian (Iran)" },
      { name: "fa-IR-FaridNeural", label: "Microsoft Farid Online (Natural) - Persian (Iran)" },
      { name: "pl-PL-MarekNeural", label: "Microsoft Marek Online (Natural) - Polish (Poland)" },
      { name: "pl-PL-ZofiaNeural", label: "Microsoft Zofia Online (Natural) - Polish (Poland)" },
      { name: "pt-BR-ThalitaMultilingualNeural", label: "Microsoft ThalitaMultilingual Online (Natural) - Portuguese (Brazil)" },
      { name: "pt-BR-AntonioNeural", label: "Microsoft Antonio Online (Natural) - Portuguese (Brazil)" },
      { name: "pt-BR-FranciscaNeural", label: "Microsoft Francisca Online (Natural) - Portuguese (Brazil)" },
      { name: "pt-PT-DuarteNeural", label: "Microsoft Duarte Online (Natural) - Portuguese (Portugal)" },
      { name: "pt-PT-RaquelNeural", label: "Microsoft Raquel Online (Natural) - Portuguese (Portugal)" },
      { name: "ro-RO-AlinaNeural", label: "Microsoft Alina Online (Natural) - Romanian (Romania)" },
      { name: "ro-RO-EmilNeural", label: "Microsoft Emil Online (Natural) - Romanian (Romania)" },
      { name: "ru-RU-DmitryNeural", label: "Microsoft Dmitry Online (Natural) - Russian (Russia)" },
      { name: "ru-RU-SvetlanaNeural", label: "Microsoft Svetlana Online (Natural) - Russian (Russia)" },
      { name: "sr-RS-NicholasNeural", label: "Microsoft Nicholas Online (Natural) - Serbian (Serbia)" },
      { name: "sr-RS-SophieNeural", label: "Microsoft Sophie Online (Natural) - Serbian (Serbia)" },
      { name: "si-LK-SameeraNeural", label: "Microsoft Sameera Online (Natural) - Sinhala (Sri Lanka)" },
      { name: "si-LK-ThiliniNeural", label: "Microsoft Thilini Online (Natural) - Sinhala (Sri Lanka)" },
      { name: "sk-SK-LukasNeural", label: "Microsoft Lukas Online (Natural) - Slovak (Slovakia)" },
      { name: "sk-SK-ViktoriaNeural", label: "Microsoft Viktoria Online (Natural) - Slovak (Slovakia)" },
      { name: "sl-SI-PetraNeural", label: "Microsoft Petra Online (Natural) - Slovenian (Slovenia)" },
      { name: "sl-SI-RokNeural", label: "Microsoft Rok Online (Natural) - Slovenian (Slovenia)" },
      { name: "so-SO-MuuseNeural", label: "Microsoft Muuse Online (Natural) - Somali (Somalia)" },
      { name: "so-SO-UbaxNeural", label: "Microsoft Ubax Online (Natural) - Somali (Somalia)" },
      { name: "es-AR-ElenaNeural", label: "Microsoft Elena Online (Natural) - Spanish (Argentina)" },
      { name: "es-AR-TomasNeural", label: "Microsoft Tomas Online (Natural) - Spanish (Argentina)" },
      { name: "es-BO-MarceloNeural", label: "Microsoft Marcelo Online (Natural) - Spanish (Bolivia)" },
      { name: "es-BO-SofiaNeural", label: "Microsoft Sofia Online (Natural) - Spanish (Bolivia)" },
      { name: "es-CL-CatalinaNeural", label: "Microsoft Catalina Online (Natural) - Spanish (Chile)" },
      { name: "es-CL-LorenzoNeural", label: "Microsoft Lorenzo Online (Natural) - Spanish (Chile)" },
      { name: "es-CO-GonzaloNeural", label: "Microsoft Gonzalo Online (Natural) - Spanish (Colombia)" },
      { name: "es-CO-SalomeNeural", label: "Microsoft Salome Online (Natural) - Spanish (Colombia)" },
      { name: "es-ES-XimenaNeural", label: "Microsoft Ximena Online (Natural) - Spanish (Colombia)" },
      { name: "es-CR-JuanNeural", label: "Microsoft Juan Online (Natural) - Spanish (Costa Rica)" },
      { name: "es-CR-MariaNeural", label: "Microsoft Maria Online (Natural) - Spanish (Costa Rica)" },
      { name: "es-CU-BelkysNeural", label: "Microsoft Belkys Online (Natural) - Spanish (Cuba)" },
      { name: "es-CU-ManuelNeural", label: "Microsoft Manuel Online (Natural) - Spanish (Cuba)" },
      { name: "es-DO-EmilioNeural", label: "Microsoft Emilio Online (Natural) - Spanish (Dominican Republic)" },
      { name: "es-DO-RamonaNeural", label: "Microsoft Ramona Online (Natural) - Spanish (Dominican Republic)" },
      { name: "es-EC-AndreaNeural", label: "Microsoft Andrea Online (Natural) - Spanish (Ecuador)" },
      { name: "es-EC-LuisNeural", label: "Microsoft Luis Online (Natural) - Spanish (Ecuador)" },
      { name: "es-SV-LorenaNeural", label: "Microsoft Lorena Online (Natural) - Spanish (El Salvador)" },
      { name: "es-SV-RodrigoNeural", label: "Microsoft Rodrigo Online (Natural) - Spanish (El Salvador)" },
      { name: "es-GQ-JavierNeural", label: "Microsoft Javier Online (Natural) - Spanish (Equatorial Guinea)" },
      { name: "es-GQ-TeresaNeural", label: "Microsoft Teresa Online (Natural) - Spanish (Equatorial Guinea)" },
      { name: "es-GT-AndresNeural", label: "Microsoft Andres Online (Natural) - Spanish (Guatemala)" },
      { name: "es-GT-MartaNeural", label: "Microsoft Marta Online (Natural) - Spanish (Guatemala)" },
      { name: "es-HN-CarlosNeural", label: "Microsoft Carlos Online (Natural) - Spanish (Honduras)" },
      { name: "es-HN-KarlaNeural", label: "Microsoft Karla Online (Natural) - Spanish (Honduras)" },
      { name: "es-MX-DaliaNeural", label: "Microsoft Dalia Online (Natural) - Spanish (Mexico)" },
      { name: "es-MX-JorgeNeural", label: "Microsoft Jorge Online (Natural) - Spanish (Mexico)" },
      { name: "es-NI-FedericoNeural", label: "Microsoft Federico Online (Natural) - Spanish (Nicaragua)" },
      { name: "es-NI-YolandaNeural", label: "Microsoft Yolanda Online (Natural) - Spanish (Nicaragua)" },
      { name: "es-PA-MargaritaNeural", label: "Microsoft Margarita Online (Natural) - Spanish (Panama)" },
      { name: "es-PA-RobertoNeural", label: "Microsoft Roberto Online (Natural) - Spanish (Panama)" },
      { name: "es-PY-MarioNeural", label: "Microsoft Mario Online (Natural) - Spanish (Paraguay)" },
      { name: "es-PY-TaniaNeural", label: "Microsoft Tania Online (Natural) - Spanish (Paraguay)" },
      { name: "es-PE-AlexNeural", label: "Microsoft Alex Online (Natural) - Spanish (Peru)" },
      { name: "es-PE-CamilaNeural", label: "Microsoft Camila Online (Natural) - Spanish (Peru)" },
      { name: "es-PR-KarinaNeural", label: "Microsoft Karina Online (Natural) - Spanish (Puerto Rico)" },
      { name: "es-PR-VictorNeural", label: "Microsoft Victor Online (Natural) - Spanish (Puerto Rico)" },
      { name: "es-ES-AlvaroNeural", label: "Microsoft Alvaro Online (Natural) - Spanish (Spain)" },
      { name: "es-ES-ElviraNeural", label: "Microsoft Elvira Online (Natural) - Spanish (Spain)" },
      { name: "es-US-AlonsoNeural", label: "Microsoft Alonso Online (Natural) - Spanish (United States)" },
      { name: "es-US-PalomaNeural", label: "Microsoft Paloma Online (Natural) - Spanish (United States)" },
      { name: "es-UY-MateoNeural", label: "Microsoft Mateo Online (Natural) - Spanish (Uruguay)" },
      { name: "es-UY-ValentinaNeural", label: "Microsoft Valentina Online (Natural) - Spanish (Uruguay)" },
      { name: "es-VE-PaolaNeural", label: "Microsoft Paola Online (Natural) - Spanish (Venezuela)" },
      { name: "es-VE-SebastianNeural", label: "Microsoft Sebastian Online (Natural) - Spanish (Venezuela)" },
      { name: "su-ID-JajangNeural", label: "Microsoft Jajang Online (Natural) - Sundanese (Indonesia)" },
      { name: "su-ID-TutiNeural", label: "Microsoft Tuti Online (Natural) - Sundanese (Indonesia)" },
      { name: "sw-KE-RafikiNeural", label: "Microsoft Rafiki Online (Natural) - Swahili (Kenya)" },
      { name: "sw-KE-ZuriNeural", label: "Microsoft Zuri Online (Natural) - Swahili (Kenya)" },
      { name: "sw-TZ-DaudiNeural", label: "Microsoft Daudi Online (Natural) - Swahili (Tanzania)" },
      { name: "sw-TZ-RehemaNeural", label: "Microsoft Rehema Online (Natural) - Swahili (Tanzania)" },
      { name: "sv-SE-MattiasNeural", label: "Microsoft Mattias Online (Natural) - Swedish (Sweden)" },
      { name: "sv-SE-SofieNeural", label: "Microsoft Sofie Online (Natural) - Swedish (Sweden)" },
      { name: "ta-IN-PallaviNeural", label: "Microsoft Pallavi Online (Natural) - Tamil (India)" },
      { name: "ta-IN-ValluvarNeural", label: "Microsoft Valluvar Online (Natural) - Tamil (India)" },
      { name: "ta-MY-KaniNeural", label: "Microsoft Kani Online (Natural) - Tamil (Malaysia)" },
      { name: "ta-MY-SuryaNeural", label: "Microsoft Surya Online (Natural) - Tamil (Malaysia)" },
      { name: "ta-SG-AnbuNeural", label: "Microsoft Anbu Online (Natural) - Tamil (Singapore)" },
      { name: "ta-SG-VenbaNeural", label: "Microsoft Venba Online (Natural) - Tamil (Singapore)" },
      { name: "ta-LK-KumarNeural", label: "Microsoft Kumar Online (Natural) - Tamil (Sri Lanka)" },
      { name: "ta-LK-SaranyaNeural", label: "Microsoft Saranya Online (Natural) - Tamil (Sri Lanka)" },
      { name: "te-IN-MohanNeural", label: "Microsoft Mohan Online (Natural) - Telugu (India)" },
      { name: "te-IN-ShrutiNeural", label: "Microsoft Shruti Online (Natural) - Telugu (India)" },
      { name: "th-TH-NiwatNeural", label: "Microsoft Niwat Online (Natural) - Thai (Thailand)" },
      { name: "th-TH-PremwadeeNeural", label: "Microsoft Premwadee Online (Natural) - Thai (Thailand)" },
      { name: "tr-TR-EmelNeural", label: "Microsoft Emel Online (Natural) - Turkish (Turkey)" },
      { name: "tr-TR-AhmetNeural", label: "Microsoft Ahmet Online (Natural) - Turkish (Türkiye)" },
      { name: "uk-UA-OstapNeural", label: "Microsoft Ostap Online (Natural) - Ukrainian (Ukraine)" },
      { name: "uk-UA-PolinaNeural", label: "Microsoft Polina Online (Natural) - Ukrainian (Ukraine)" },
      { name: "ur-IN-GulNeural", label: "Microsoft Gul Online (Natural) - Urdu (India)" },
      { name: "ur-IN-SalmanNeural", label: "Microsoft Salman Online (Natural) - Urdu (India)" },
      { name: "ur-PK-AsadNeural", label: "Microsoft Asad Online (Natural) - Urdu (Pakistan)" },
      { name: "ur-PK-UzmaNeural", label: "Microsoft Uzma Online (Natural) - Urdu (Pakistan)" },
      { name: "uz-UZ-MadinaNeural", label: "Microsoft Madina Online (Natural) - Uzbek (Uzbekistan)" },
      { name: "uz-UZ-SardorNeural", label: "Microsoft Sardor Online (Natural) - Uzbek (Uzbekistan)" },
      { name: "vi-VN-HoaiMyNeural", label: "Microsoft HoaiMy Online (Natural) - Vietnamese (Vietnam)" },
      { name: "vi-VN-NamMinhNeural", label: "Microsoft NamMinh Online (Natural) - Vietnamese (Vietnam)" },
      { name: "cy-GB-AledNeural", label: "Microsoft Aled Online (Natural) - Welsh (United Kingdom)" },
      { name: "cy-GB-NiaNeural", label: "Microsoft Nia Online (Natural) - Welsh (United Kingdom)" },
      { name: "zu-ZA-ThandoNeural", label: "Microsoft Thando Online (Natural) - Zulu (South Africa)" },
      { name: "zu-ZA-ThembaNeural", label: "Microsoft Themba Online (Natural) - Zulu (South Africa)" }
    ];
    this.selectedVoice = this.voices[0].label;
  }

  getInfo() {
    return {
      id: 'edgetts',
      name: 'Edge TTS',
      blocks: [
        {
          opcode: 'setVoice',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set voice to [VOICE]',
          arguments: {
            VOICE: {
              type: Scratch.ArgumentType.STRING,
              menu: 'voices',
              defaultValue: this.selectedVoice
            }
          }
        },
        {
          opcode: 'generateSpeech',
          blockType: Scratch.BlockType.COMMAND,
          text: 'generate speech from [TEXT]',
          arguments: {
            TEXT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello world'
            }
          }
        },
        {
          opcode: 'playSpeech',
          blockType: Scratch.BlockType.COMMAND,
          text: 'play generated speech'
        },
        {
          opcode: 'saveSpeechToSprite',
          blockType: Scratch.BlockType.COMMAND,
          text: 'save speech to this sprite as [SOUNDNAME]',
          arguments: {
            SOUNDNAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'TTS Sound'
            }
          }
        },
        {
          opcode: 'downloadSpeech',
          blockType: Scratch.BlockType.COMMAND,
          text: 'download speech as [FILENAME]',
          arguments: {
            FILENAME: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'tts.mp3'
            }
          }
        }
      ],
      menus: {
        // This is the key change:
        // We map to an array of objects where 'text' is the FriendlyName (what the user sees)
        // and 'value' is the ShortName (what gets passed to setVoice).
        voices: this.voices.map(v => ({ text: v.label, value: v.name }))
      }
    };
  }


  setVoice(args) {
    // args.VOICE will now correctly contain the ShortName (e.g., "en-US-AvaNeural")
    this.selectedVoice = args.VOICE;
    console.warn(this.selectedVoice) // This will now log the ShortName
  }

  async generateSpeech(args) {
    const text = encodeURIComponent(args.TEXT);
    const voice = encodeURIComponent(this.selectedVoice);


    const url = `https://pmedgetts.onrender.com/tts?voice=${voice}&text=${text}`;


    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);


      const blob = await response.blob();
      this.currentAudioBlob = blob;


      if (this.currentAudioUrl) {
        URL.revokeObjectURL(this.currentAudioUrl);
      }
      this.currentAudioUrl = URL.createObjectURL(blob);


      console.log('Speech generated!');
    } catch (e) {
      console.error('Error generating speech:', e);
    }
  }


  playSpeech() {
    if (!this.currentAudioUrl) {
      console.warn('No generated speech to play.');
      return;
    }
    const audio = new Audio(this.currentAudioUrl);
    audio.play();
  }


  async saveSpeechToSprite(args) {
    if (!this.currentAudioBlob) {
      console.warn('No speech generated yet. Use "generate speech" first.');
      return;
    }
    if (!this.runtime) {
      console.error('Scratch runtime not available to save sound');
      return;
    }


    try {
      const target = this.runtime.getEditingTarget();
      if (!target) {
        console.error('No editing target available');
        return;
      }


      const arrayBuffer = await this.currentAudioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);


      const storage = this.runtime.storage;
      const asset = new storage.Asset(
        storage.AssetType.Sound,
        null,
        storage.DataFormat.MP3,
        uint8Array,
        true
      );


      // Use Scratch.vm to add sound, NOT this.runtime
      await Scratch.vm.addSound({
        md5: asset.assetId + '.' + asset.dataFormat,
        asset: asset,
        name: args.SOUNDNAME || 'TTS Sound'
      }, target.id);


      console.log(`Saved sound "${args.SOUNDNAME}" to sprite.`);
    } catch (e) {
      console.error('Error saving speech to sprite:', e);
    }
  }


  downloadSpeech(args) {
    if (!this.currentAudioBlob) {
      console.warn('No speech generated yet. Use "generate speech" first.');
      return;
    }


    const filename = args.FILENAME || 'tts.mp3';


    const url = URL.createObjectURL(this.currentAudioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();


    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
}


Scratch.extensions.register(new EdgeTTS(Scratch.vm.runtime));
