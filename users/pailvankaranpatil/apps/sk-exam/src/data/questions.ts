export interface Question {
  id: number;
  subject: string;
  question: string;
  options: string[];
  correct: number; // 0-based index
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const subjects = [
  'सामान्य ज्ञान',
  'मराठी भाषा',
  'गणित',
  'विज्ञान',
  'इतिहास',
  'भूगोल',
  'इंग्रजी',
  'चालू घडामोडी',
];

export const allQuestions: Question[] = [
  // ===== सामान्य ज्ञान =====
  {
    id: 1,
    subject: 'सामान्य ज्ञान',
    question: 'भारताचे राष्ट्रीय पक्षी कोणता?',
    options: ['घुबड', 'मोर', 'सुगरण', 'बगळा'],
    correct: 1,
    explanation: 'मोर (Pavo cristatus) हा भारताचा राष्ट्रीय पक्षी आहे. १९६३ मध्ये भारत सरकारने मोराला राष्ट्रीय पक्षी म्हणून घोषित केले. त्याच्या सुंदर पिसारा आणि नृत्यासाठी तो प्रसिद्ध आहे.',
    difficulty: 'easy',
  },
  {
    id: 2,
    subject: 'सामान्य ज्ञान',
    question: 'भारताचे राष्ट्रीय फूल कोणते?',
    options: ['गुलाब', 'कमळ', 'जूई', 'चमेली'],
    correct: 1,
    explanation: 'कमळ (Nelumbo nucifera) हे भारताचे राष्ट्रीय फूल आहे. कमळ हे पवित्रतेचे प्रतीक मानले जाते. हे फूल पाण्यात वाढते पण त्याच्या पानांवर पाणी थांबत नाही, म्हणून ते स्वच्छतेचे प्रतीक आहे.',
    difficulty: 'easy',
  },
  {
    id: 3,
    subject: 'सामान्य ज्ञान',
    question: 'भारतातील सर्वात लांब नदी कोणती?',
    options: ['यमुना', 'गोदावरी', 'गंगा', 'नर्मदा'],
    correct: 2,
    explanation: 'गंगा ही भारतातील सर्वात लांब नदी आहे. तिची एकूण लांबी सुमारे २,५२५ किमी आहे. गंगा नदी गंगोत्री (उत्तराखंड) येथून उगम पावते आणि बांगलादेशात बंगालच्या उपसागराला मिळते.',
    difficulty: 'easy',
  },
  {
    id: 4,
    subject: 'सामान्य ज्ञान',
    question: 'भारताच्या संविधानाचे शिल्पकार कोणाला म्हणतात?',
    options: ['जवाहरलाल नेहरू', 'महात्मा गांधी', 'डॉ. बाबासाहेब आंबेडकर', 'सरदार पटेल'],
    correct: 2,
    explanation: 'डॉ. बाबासाहेब आंबेडकर यांना भारतीय संविधानाचे शिल्पकार म्हणतात. ते संविधान सभेचे अध्यक्ष आणि मसुदा समितीचे अध्यक्ष होते. त्यांनी भारतीय संविधान लिहिण्यात सर्वात महत्त्वाची भूमिका बजावली.',
    difficulty: 'easy',
  },
  {
    id: 5,
    subject: 'सामान्य ज्ञान',
    question: 'भारताचे पहिले पंतप्रधान कोण होते?',
    options: ['महात्मा गांधी', 'जवाहरलाल नेहरू', 'सरदार पटेल', 'डॉ. राजेंद्र प्रसाद'],
    correct: 1,
    explanation: 'जवाहरलाल नेहरू हे भारताचे पहिले पंतप्रधान होते. त्यांनी १५ ऑगस्ट १९४७ रोजी पदभार स्वीकारला आणि १९६४ पर्यंत पंतप्रधान म्हणून कार्य केले. त्यांना "पंडितजी" म्हणून ओळखले जाते.',
    difficulty: 'easy',
  },
  {
    id: 6,
    subject: 'सामान्य ज्ञान',
    question: 'महाराष्ट्राचे राज्यवृक्ष कोणता?',
    options: ['आंबा', 'वड', 'नारळ', 'कडुनिंब'],
    correct: 1,
    explanation: 'वड (Ficus benghalensis) हा महाराष्ट्राचे राज्यवृक्ष आहे. वडाचे झाड हे दीर्घायुष्य आणि स्थिरतेचे प्रतीक मानले जाते. त्याच्या वाढलेल्या फांद्या जमिनीत रुजून नवीन खोड तयार करतात.',
    difficulty: 'medium',
  },
  {
    id: 7,
    subject: 'सामान्य ज्ञान',
    question: 'भारतातील सर्वात मोठे राज्य (क्षेत्रफळ) कोणते?',
    options: ['महाराष्ट्र', 'मध्य प्रदेश', 'राजस्थान', 'उत्तर प्रदेश'],
    correct: 2,
    explanation: 'राजस्थान हे भारतातील सर्वात मोठे राज्य आहे (क्षेत्रफळ). त्याचे क्षेत्रफळ ३,४२,२३९ चौ.किमी आहे. राजस्थानमध्ये थार वाळवंट आहे आणि ते भारताच्या वायव्य भागात वसलेले आहे.',
    difficulty: 'easy',
  },
  {
    id: 8,
    subject: 'सामान्य ज्ञान',
    question: 'भारतीय चलनाचे नियंत्रण कोण करते?',
    options: ['SBI', 'RBI', 'SEBI', 'IRDAI'],
    correct: 1,
    explanation: 'RBI (Reserve Bank of India / भारतीय रिझर्व्ह बँक) भारतीय चलनाचे नियंत्रण करते. RBI ची स्थापना १ एप्रिल १९३५ रोजी झाली. तिचे मुख्यालय मुंबई येथे आहे.',
    difficulty: 'medium',
  },

  // ===== मराठी भाषा =====
  {
    id: 9,
    subject: 'मराठी भाषा',
    question: '"अक्षर" या शब्दाचे विग्रह काय?',
    options: ['न + क्षर', 'अ + क्षर', 'अक्ष + र', 'अ + क्ष + र'],
    correct: 1,
    explanation: '"अक्षर" = अ + क्षर. "अ" हा नकारार्थी उपसर्ग आणि "क्षर" म्हणजे नष्ट होणारे. म्हणजे "अक्षर" = जे नष्ट होत नाही, टिकून राहते. मराठीत संधी विच्छेद म्हणजे शब्दांचे मूळ घटक分开 करणे.',
    difficulty: 'medium',
  },
  {
    id: 10,
    subject: 'मराठी भाषा',
    question: '"संधी" म्हणजे काय?',
    options: ['दोन शब्दांचे मिलन', 'शब्दांचे विभाजन', 'वाक्याची रचना', 'अलंकार'],
    correct: 0,
    explanation: 'संधी म्हणजे दोन अक्षरांचा किंवा शब्दांचा परस्पर संयोग. जेव्हा दोन अक्षरे किंवा शब्द एकत्र येतात तेव्हा त्यांच्यामध्ये जो बदल होतो त्याला संधी म्हणतात. उदा. विद्या + आलय = विद्यालय.',
    difficulty: 'easy',
  },
  {
    id: 11,
    subject: 'मराठी भाषा',
    question: '"महाराष्ट्र" या शब्दाचा अर्थ काय?',
    options: ['मोठे राज्य', 'महा + राष्ट्र = महान राष्ट्र', 'महारांचे राष्ट्र', 'महालाचे देश'],
    correct: 1,
    explanation: '"महाराष्ट्र" = महा + राष्ट्र. "महा" म्हणजे महान/मोठे आणि "राष्ट्र" म्हणजे देश/राज्य. म्हणजे "महाराष्ट्र" = महान राष्ट्र. हा शब्द संस्कृत भाषेतून आला आहे.',
    difficulty: 'easy',
  },
  {
    id: 12,
    subject: 'मराठी भाषा',
    question: 'खालीलपैकी कोणता शब्द तत्सम आहे?',
    options: ['उदार', 'उद्धट', 'उंबरा', 'उसासे'],
    correct: 0,
    explanation: '"उदार" हा तत्सम शब्द आहे. तत्सम शब्द ते शब्द जे संस्कृतमधून तसेच्या तसे मराठीत आले आहेत. "उद्धट" हा तद्भव शब्द आहे (संस्कृत "उद्धत" पासून बदललेला).',
    difficulty: 'medium',
  },
  {
    id: 13,
    subject: 'मराठी भाषा',
    question: '"प्रत्यय" म्हणजे काय?',
    options: ['शब्दाच्या आधी जोडलेला भाग', 'शब्दाच्या शेवटी जोडलेला भाग', 'शब्दाचा मूळ भाग', 'शब्दाचा अर्थ'],
    correct: 1,
    explanation: 'प्रत्यय म्हणजे शब्दाच्या शेवटी (मूळ शब्दानंतर) जोडला जाणारा अर्थपूर्ण भाग. उदा. "शहाण" + "पण" = "शहाणपण". येथे "पण" हा प्रत्यय आहे. प्रत्यय नेहमी मूळ शब्दाच्या नंतर येतो.',
    difficulty: 'easy',
  },
  {
    id: 14,
    subject: 'मराठी भाषा',
    question: '"जसे त्याचे बाप तसे त्याचे बेटा" हा कोणता अलंकार आहे?',
    options: ['उपमा', 'रूपक', 'यमक', 'अनुप्रास'],
    correct: 0,
    explanation: 'हा उपमा अलंकार आहे. उपमा अलंकारात दोन गोष्टींची तुलना केली जाते. "जसे...तसे" हे उपमा वाचक शब्द आहेत. उपमेमध्ये "सारखे", "जसे", "प्रमाणे" असे शब्द वापरले जातात.',
    difficulty: 'medium',
  },

  // ===== गणित =====
  {
    id: 15,
    subject: 'गणित',
    question: '१ ते १०० पर्यंत एकूण किती मूळ संख्या (prime numbers) आहेत?',
    options: ['२०', '२५', '२६', '३०'],
    correct: 1,
    explanation: '१ ते १०० पर्यंत एकूण २५ मूळ संख्या आहेत. मूळ संख्या म्हणजे अशा संख्या ज्यांना १ आणि स्वतःने भाग जातो. २, ३, ५, ७, ११, १३, १७, १९, २३, २९, ३१, ३७, ४१, ४३, ४७, ५३, ५९, ६१, ६७, ७१, ७३, ७९, ८३, ८९, ९७.',
    difficulty: 'medium',
  },
  {
    id: 16,
    subject: 'गणित',
    question: 'एका त्रिकोणाचे तिन्ही कोन मिळून किती अंश होतात?',
    options: ['९०°', '१२०°', '१८०°', '३६०°'],
    correct: 2,
    explanation: 'त्रिकोणाच्या तिन्ही कोनांची बेरीज नेहमी १८०° (दोन काटकोन) असते. हे युक्लिडच्या भूमितीचे एक मूलभूत प्रमेय आहे. चौकोनाच्या कोनांची बेरीज ३६०° असते.',
    difficulty: 'easy',
  },
  {
    id: 17,
    subject: 'गणित',
    question: '√(१४४) = ?',
    options: ['१०', '११', '१२', '१४'],
    correct: 2,
    explanation: '√(१४४) = १२. कारण १२ × १२ = १४४. वर्गमूळ म्हणजे अशी संख्या ज्याचा स्वतःशी गुणाकार केल्यास दिलेली संख्या मिळते.',
    difficulty: 'easy',
  },
  {
    id: 18,
    subject: 'गणित',
    question: '१५% of २०० = ?',
    options: ['२०', '२५', '३०', '३५'],
    correct: 2,
    explanation: '१५% of २०० = (१५/१००) × २०० = १५ × २ = ३०. टक्डेवारी काढण्यासाठी: (टक्के/१००) × संख्या. सोप्या पद्धतीने: १०% = २०, ५% = १०, म्हणून १५% = २० + १० = ३०.',
    difficulty: 'easy',
  },
  {
    id: 19,
    subject: 'गणित',
    question: 'जर x + y = १० आणि x - y = ४, तर x = ?',
    options: ['५', '६', '७', '८'],
    correct: 2,
    explanation: 'x + y = १० ... (१) आणि x - y = ४ ... (२). समीकरण (१) + (२): २x = १४, म्हणून x = ७. आणि y = १० - ७ = ३. तपासणी: ७ + ३ = १० ✓, ७ - ३ = ४ ✓.',
    difficulty: 'medium',
  },
  {
    id: 20,
    subject: 'गणित',
    question: 'वर्तुळाचे क्षेत्रफळ काढण्याचे सूत्र कोणते?',
    options: ['2πr', 'πr²', 'πd', '2πr²'],
    correct: 1,
    explanation: 'वर्तुळाचे क्षेत्रफळ = πr² (पाय × त्रिज्या²). येथे π ≈ ३.१४१५९ आणि r = त्रिज्या. वर्तुळाचा परिघ = 2πr. लक्षात ठेवा: क्षेत्रफळ = πr², परिघ = 2πr.',
    difficulty: 'easy',
  },
  {
    id: 21,
    subject: 'गणित',
    question: 'LCM (१२, १८) = ?',
    options: ['२४', '३०', '३६', '४८'],
    correct: 2,
    explanation: 'LCM (१२, १८) = ३६. १२ = २² × ३, १८ = २ × ३². LCM = प्रत्येक मूळ अवयवाचा सर्वात मोठा घात = २² × ३² = ४ × ९ = ३६. LCM म्हणजे लघुत्तम साधारण विभाज्य.',
    difficulty: 'medium',
  },

  // ===== विज्ञान =====
  {
    id: 22,
    subject: 'विज्ञान',
    question: 'पाण्याचे रासायनिक सूत्र काय?',
    options: ['H₂O', 'CO₂', 'NaCl', 'O₂'],
    correct: 0,
    explanation: 'पाण्याचे रासायनिक सूत्र H₂O आहे. याचा अर्थ पाण्याच्या एका रेणूमध्ये २ हायड्रोजन अणू आणि १ ऑक्सिजन अणू असतो. पाणी हे जगातील सर्वात महत्त्वाचे द्रावक (solvent) आहे.',
    difficulty: 'easy',
  },
  {
    id: 23,
    subject: 'विज्ञान',
    question: 'प्रकाशाचा वेग किती असतो?',
    options: ['३ × १०⁶ m/s', '३ × १०⁸ m/s', '३ × १०¹⁰ m/s', '३ × १०⁵ m/s'],
    correct: 1,
    explanation: 'प्रकाशाचा वेग निर्वात पोकळीत सुमारे ३ × १०⁸ मीटर/सेकंद (सुमारे ३ लाख किमी/सेकंद) असतो. हा विश्वातील सर्वात जास्त वेग आहे. आईन्स्टाईनच्या सापेक्षतावादानुसार कोणतीही वस्तू प्रकाशापेक्षा वेगाने जाऊ शकत नाही.',
    difficulty: 'medium',
  },
  {
    id: 24,
    subject: 'विज्ञान',
    question: 'मानवी शरीरात एकूण किती हाडे असतात?',
    options: ['१८६', '२०६', '२२६', '२५६'],
    correct: 1,
    explanation: 'प्रौढ मानवी शरीरात एकूण २०६ हाडे असतात. बाळाला सुमारे २७० हाडे असतात, पण वाढीदरम्यान काही हाडे एकत्र जोडली जातात. शरीरातील सर्वात लहान हाड कानात (स्टेप्स) आणि सर्वात मोठे हाड मांडीत (फीमर) असते.',
    difficulty: 'medium',
  },
  {
    id: 25,
    subject: 'विज्ञान',
    question: 'सूर्य कोणाला ऊर्जा देतो?',
    options: ['रासायनिक ऊर्जा', 'अणुऊर्जा', 'अभिकेंद्री ऊर्जा', 'गुरुत्वाकर्षण ऊर्जा'],
    correct: 1,
    explanation: 'सूर्य अणुऊर्जा (Nuclear Energy) पासून प्रकाशित होतो. सूर्यामध्ये हायड्रोजन अणूंचे हेलियममध्ये संमीलन (Nuclear Fusion) होते. या प्रक्रियेत प्रचंड ऊर्जा निर्माण होते. सूर्य दर सेकंदाला सुमारे ३.८ × १०²⁶ ज्युल ऊर्जा उत्सर्जित करतो.',
    difficulty: 'hard',
  },
  {
    id: 26,
    subject: 'विज्ञान',
    question: 'विद्युत बल्ब कोणी शोधला?',
    options: ['निकोला टेस्ला', 'थॉमस एडिसन', 'अलेक्झांडर ग्राहम बेल', 'मायकेल फॅराडे'],
    correct: 1,
    explanation: 'थॉमस अल्वा एडिसन यांनी १८७९ मध्ये व्यावसायिकदृष्ट्या उपयुक्त विद्युत बल्ब शोधला. जरी इतर शास्त्रज्ञांनी याआधी प्रयोग केले होते, तरी एडिसन यांनी टंगस्टन फिलामेंट वापरून दीर्घकाळ टिकणारा बल्ब तयार केला.',
    difficulty: 'easy',
  },
  {
    id: 27,
    subject: 'विज्ञान',
    question: 'DNA चे पूर्ण रूप काय आहे?',
    options: ['Deoxyribonucleic Acid', 'Diribonucleic Acid', 'Deoxyribonitric Acid', 'Dinucleic Acid'],
    correct: 0,
    explanation: 'DNA = Deoxyribonucleic Acid (डीऑक्सिरायबोन्यूक्लिक ॲसिड). DNA हे सजीवांच्या पेशींमध्ये अनुवांशिक माहिती साठवणून ठेवते. DNA ची रचना वॉटसन आणि क्रिक यांनी १९५३ मध्ये शोधली.',
    difficulty: 'medium',
  },

  // ===== इतिहास =====
  {
    id: 28,
    subject: 'इतिहास',
    question: 'छत्रपती शिवाजी महाराजांचा जन्म केव्हा झाला?',
    options: ['१६ फेब्रुवारी १६३०', '१९ फेब्रुवारी १६२७', '१९ फेब्रुवारी १६३०', '१० एप्रिल १६५०'],
    correct: 0,
    explanation: 'छत्रपती शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी शिवनेरी किल्ल्यावर (जुन्नर, पुणे) झाला. त्यांचे वडील शहाजी राजे भोसले आणि आई जिजाऊ (जिजाबाई) या होत्या.',
    difficulty: 'easy',
  },
  {
    id: 29,
    subject: 'इतिहास',
    question: 'भारताला स्वातंत्र्य केव्हा मिळाले?',
    options: ['१५ ऑगस्ट १९४७', '२६ जानेवारी १९५०', '१५ ऑगस्ट १९५०', '२६ जानेवारी १९४७'],
    correct: 0,
    explanation: 'भारताला १५ ऑगस्ट १९४७ रोजी ब्रिटिश राजवटीपासून स्वातंत्र्य मिळाले. भारतीय स्वातंत्र्य कायदा १९४७ नुसार भारत आणि पाकिस्तान दोन स्वतंत्र राष्ट्रे बनली. जवाहरलाल नेहरू यांनी पहिले पंतप्रधान म्हणून पदभार स्वीकारला.',
    difficulty: 'easy',
  },
  {
    id: 30,
    subject: 'इतिहास',
    question: 'पानिपतचे तिसरे युद्ध केव्हा झाले?',
    options: ['१५२६', '१५५६', '१७६१', '१८५७'],
    correct: 2,
    explanation: 'पानिपतचे तिसरे युद्ध १४ जानेवारी १७६१ रोजी झाले. या युद्धात अहमद शाह अब्दालीने मराठ्यांचा पराभव केला. मराठा सैन्याचे नेतृत्व सदाशिवराव भाऊ करत होते. हे युद्ध भारतीय इतिहासातील सर्वात रक्तपाती युद्धांपैकी एक होते.',
    difficulty: 'medium',
  },
  {
    id: 31,
    subject: 'इतिहास',
    question: 'जलियांवाला बाग हत्याकांड केव्हा झाला?',
    options: ['१३ एप्रिल १९१९', '१३ एप्रिल १९२०', '१३ मार्च १९१९', '१३ एप्रिल १९३०'],
    correct: 0,
    explanation: 'जलियांवाला बाग हत्याकांड १३ एप्रिल १९१९ रोजी अमृतसर (पंजाब) येथे झाला. जनरल रेजरन डायर यांनी निशस्त्र लोकांवर गोळीबार केला. शेकडो लोक मृत्युमुखी पडले. या घटनेने भारतीय स्वातंत्र्य चळवळीला नवीन गती मिळाली.',
    difficulty: 'medium',
  },
  {
    id: 32,
    subject: 'इतिहास',
    question: 'महाराष्ट्राची राजधानी कोणती?',
    options: ['पुणे', 'मुंबई', 'नागपूर', 'औरंगाबाद'],
    correct: 1,
    explanation: 'मुंबई ही महाराष्ट्राची राजधानी आहे. मुंबईला "स्वप्ननगरी" (City of Dreams) म्हणतात. मुंबई हे भारताचे आर्थिक केंद्र आहे. १ मे १९६० रोजी महाराष्ट्र राज्य अस्तित्वात आले.',
    difficulty: 'easy',
  },

  // ===== भूगोल =====
  {
    id: 33,
    subject: 'भूगोल',
    question: 'सह्याद्री पर्वतरांगा कोणत्या नावाने ओळखल्या जातात?',
    options: ['पूर्वेकडील घाट', 'पश्चिमेकडील घाट', 'हिमालय', 'विंध्य'],
    correct: 1,
    explanation: 'सह्याद्री पर्वतरांगा "पश्चिम घाट" (Western Ghats) म्हणून ओळखल्या जातात. सह्याद्री ही भारताच्या पश्चिम किनाऱ्यावर धावणारी पर्वतरांग आहे. ती UNESCO जागतिक वारसा स्थळ आहे आणि जैवविविधतेसाठी प्रसिद्ध आहे.',
    difficulty: 'easy',
  },
  {
    id: 34,
    subject: 'भूगोल',
    question: 'भारतातील सर्वात उंच शिखर कोणते?',
    options: ['कंचनजंगा', 'नंदा देवी', 'माउंट एव्हरेस्ट', 'नंगा पर्वत'],
    correct: 0,
    explanation: 'कंचनजंगा (८,५८६ मीटर) हे भारतातील सर्वात उंच शिखर आहे. हे सिक्कीम आणि नेपाळच्या सीमेवर आहे. माउंट एव्हरेस्ट (८,८४९ मी) जगातील सर्वात उंच शिखर आहे, पण ते नेपाळमध्ये आहे.',
    difficulty: 'medium',
  },
  {
    id: 35,
    subject: 'भूगोल',
    question: 'महाराष्ट्रातील सर्वात लांब नदी कोणती?',
    options: ['कृष्णा', 'गोदावरी', 'ताप्ती', 'भीमा'],
    correct: 1,
    explanation: 'गोदावरी ही महाराष्ट्रातील सर्वात लांब नदी आहे. गोदावरीला "दक्षिण गंगा" म्हणतात. ती त्र्यंबकेश्वर (नाशिक) येथून उगम पावते आणि आंध्र प्रदेशमधून वाहून बंगालच्या उपसागराला मिळते.',
    difficulty: 'easy',
  },
  {
    id: 36,
    subject: 'भूगोल',
    question: 'विषुववृत्तावर सूर्य कोणकोणत्या दिवशी सरळ चमकतो?',
    options: ['२१ मार्च आणि २३ सप्टेंबर', '२१ जून आणि २२ डिसेंबर', '१ जानेवारी आणि १ जुलै', '२१ मार्च आणि २१ जून'],
    correct: 0,
    explanation: 'विषुववृत्तावर २१ मार्च (वसंत संपात) आणि २३ सप्टेंबर (शरद संपात) रोजी सूर्य सरळ डोक्यावर चमकतो. या दोन दिवशी सर्वत्र दिवस आणि रात्र समान (१२-१२ तास) असतात.',
    difficulty: 'medium',
  },

  // ===== इंग्रजी =====
  {
    id: 37,
    subject: 'इंग्रजी',
    question: 'Choose the correct synonym of "Abundant":',
    options: ['Scarce', 'Plentiful', 'Rare', 'Limited'],
    correct: 1,
    explanation: '"Abundant" means existing in large quantities — plentiful. Synonyms: ample, copious, profuse. Antonyms: scarce, rare, limited. Example: "The region has abundant natural resources."',
    difficulty: 'easy',
  },
  {
    id: 38,
    subject: 'इंग्रजी',
    question: 'Choose the correct antonym of "Transparent":',
    options: ['Clear', 'Visible', 'Opaque', 'Lucid'],
    correct: 2,
    explanation: '"Transparent" means allowing light to pass through (clear). Its antonym is "Opaque" — not allowing light through. Clear, Visible, and Lucid are synonyms of transparent, not antonyms.',
    difficulty: 'medium',
  },
  {
    id: 39,
    subject: 'इंग्रजी',
    question: '"He ___ to school every day." Choose the correct verb form:',
    options: ['go', 'goes', 'going', 'gone'],
    correct: 1,
    explanation: 'The correct answer is "goes". Subject-verb agreement: with third person singular (he/she/it), we add -s or -es to the verb. "He goes" is correct. "He go" is wrong. This is simple present tense.',
    difficulty: 'easy',
  },
  {
    id: 40,
    subject: 'इंग्रजी',
    question: 'Identify the part of speech of "quickly" in: "She ran quickly."',
    options: ['Adjective', 'Adverb', 'Verb', 'Noun'],
    correct: 1,
    explanation: '"Quickly" is an adverb. Adverbs modify verbs, adjectives, or other adverbs. Here, "quickly" modifies the verb "ran" — it tells us HOW she ran. Most adverbs end in -ly.',
    difficulty: 'easy',
  },
  {
    id: 41,
    subject: 'इंग्रजी',
    question: 'Choose the correctly spelled word:',
    options: ['Accomodation', 'Accommodation', 'Acomodation', 'Acommodation'],
    correct: 1,
    explanation: '"Accommodation" is the correct spelling — double \'c\' and double \'m\'. This is one of the most commonly misspelled words in English. Tip: "A CC O MM O DATION" — two C\'s, two M\'s.',
    difficulty: 'medium',
  },

  // ===== चालू घडामोडी =====
  {
    id: 42,
    subject: 'चालू घडामोडी',
    question: 'भारताचे सध्याचे (२०२४) प्रधानमंत्री कोण आहेत?',
    options: ['राहुल गांधी', 'नरेंद्र मोदी', 'अमित शाह', 'योगी आदित्यनाथ'],
    correct: 1,
    explanation: 'नरेंद्र मोदी हे भारताचे सध्याचे (२०२४) प्रधानमंत्री आहेत. त्यांनी २०१४ मध्ये पहिल्यांदा पदभार स्वीकारला आणि २०१९ व २०२४ मध्ये पुन्हा निवडून आले. ते भारतीय जनता पक्षाचे (BJP) नेते आहेत.',
    difficulty: 'easy',
  },
  {
    id: 43,
    subject: 'चालू घडामोडी',
    question: 'ISO २०२२ नुसार भारताचे कोणते राज्य "सर्वोत्कृष्ट प्रशासन" म्हणून ओळखले गेले?',
    options: ['केरळ', 'महाराष्ट्र', 'गुजरात', 'तमिळनाडू'],
    correct: 0,
    explanation: 'केरळ हे राज्य अनेक निर्देशांकांवर (शिक्षण, आरोग्य, जीवनमान) भारतात अग्रेसर आहे. केरळचा साक्षरता दर ९६% पेक्षा जास्त आहे आणि ते आरोग्य व शिक्षण क्षेत्रात भारतात आदर्श मानले जाते.',
    difficulty: 'medium',
  },
  {
    id: 44,
    subject: 'चालू घडामोडी',
    question: 'चंद्रावर पहिले सॉफ्ट लँडिंग कोणत्या देशाने केले?',
    options: ['अमेरिका', 'रशिया', 'चीन', 'भारत'],
    correct: 0,
    explanation: 'अमेरिकेने (NASA) १९६६ मध्ये Surveyor 1 द्वारे चंद्रावर पहिले यशस्वी सॉफ्ट लँडिंग केले. १९६९ मध्ये Apollo 11 ने पहिले मानवी अवतरण केले. भारताने २०२३ मध्ये Chandrayaan-3 ने चंद्राच्या दक्षिण ध्रुवावर पहिले सॉफ्ट लँडिंग केले.',
    difficulty: 'medium',
  },
  {
    id: 45,
    subject: 'चालू घडामोडी',
    question: 'Chandrayaan-3 चंद्रावर केव्हा उतरला?',
    options: ['२३ जुलै २०२३', '२३ ऑगस्ट २०२३', '१५ ऑगस्ट २०२३', '२३ सप्टेंबर २०२३'],
    correct: 1,
    explanation: 'Chandrayaan-3 ने २३ ऑगस्ट २०२३ रोजी चंद्राच्या दक्षिण ध्रुवाजवळ यशस्वी सॉफ्ट लँडिंग केले. भारत हा चंद्राच्या दक्षिण ध्रुवावर उतरणारा पहिला देश ठरला. या मोहिमेचे नेतृत्व ISRO ने केले.',
    difficulty: 'medium',
  },

  // ===== अधिक प्रश्न =====
  {
    id: 46,
    subject: 'सामान्य ज्ञान',
    question: 'भारताचे राष्ट्रीय गाणे कोणते?',
    options: ['जन गण मन', 'वंदे मातरम्', 'सारे जहाँ से अच्छा', 'ऐ मेरे वतन के लोगों'],
    correct: 0,
    explanation: '"जन गण मन" हे भारताचे राष्ट्रीय गाणे आहे. ते बंगाली भाषेत रवींद्रनाथ टागोर यांनी लिहिले. २७ डिसेंबर १९५० रोजी भारतीय संविधान सभेने त्याला राष्ट्रीय गाण्याचा दर्जा दिला.',
    difficulty: 'easy',
  },
  {
    id: 47,
    subject: 'विज्ञान',
    question: 'मानवी हृदय एका दिवसात सुमारे किती वेळा ठोकते?',
    options: ['सुमारे ५०,०००', 'सुमारे १,००,०००', 'सुमारे २,००,०००', 'सुमारे ७५,०००'],
    correct: 1,
    explanation: 'मानवी हृदय एका दिवसात सुमारे १,००,००० (एक लाख) वेळा ठोकते. दर मिनिटाला सुमारे ६०-१०० वेळा. हृदय दररोज सुमारे ७,५०० लिटर रक्त पंप करते. हृदय हे शरीरातील सर्वात महत्त्वाचे अवयव आहे.',
    difficulty: 'medium',
  },
  {
    id: 48,
    subject: 'गणित',
    question: 'एका वर्गात ४० विद्यार्थी आहेत. २५% विद्यार्थी अनुपस्थित होते. उपस्थित विद्यार्थी किती?',
    options: ['२५', '३०', '३५', '१०'],
    correct: 1,
    explanation: 'एकूण = ४०, अनुपस्थित = २५% of ४० = १०. उपस्थित = ४० - १० = ३०. किंवा सोप्या पद्धतीने: १००% - २५% = ७५% उपस्थित. ७५% of ४० = ३०.',
    difficulty: 'easy',
  },
  {
    id: 49,
    subject: 'इतिहास',
    question: 'भारतीय संविधान केव्हा लागू झाले?',
    options: ['२६ जानेवारी १९५०', '१५ ऑगस्ट १९४७', '२६ नोव्हेंबर १९४९', '२६ जानेवारी १९५०'],
    correct: 0,
    explanation: 'भारतीय संविधान २६ नोव्हेंबर १९४९ रोजी स्वीकारले गेले, पण ते २६ जानेवारी १९५० रोजी पूर्णपणे लागू झाले. म्हणून २६ जानेवारी हा "प्रजासत्ताक दिन" (Republic Day) म्हणून साजरा केला जातो.',
    difficulty: 'medium',
  },
  {
    id: 50,
    subject: 'भूगोल',
    question: 'भारतात एकूण किती राज्ये आहेत (२०२४)?',
    options: ['२८', '२९', '३०', '३१'],
    correct: 0,
    explanation: 'भारतात सध्या (२०२४) २८ राज्ये आणि ८ केंद्रशासित प्रदेश आहेत. २०१९ मध्ये जम्मू-काश्मीरचे दोन केंद्रशासित प्रदेश झाले. २०१४ मध्ये तेलंगणा हे २९ वे राज्य बनले, पण नंतर २८ झाले.',
    difficulty: 'medium',
  },
  {
    id: 51,
    subject: 'सामान्य ज्ञान',
    question: 'भारताचे राष्ट्रीय प्राणी कोणता?',
    options: ['सिंह', 'वाघ', 'हत्ती', 'गेंडा'],
    correct: 1,
    explanation: 'बंगाल टायगर (वाघ) हा भारताचा राष्ट्रीय प्राणी आहे. १९७३ मध्ये "प्रकल्प वाघ" (Project Tiger) सुरू करण्यात आला. भारतात सुमारे ३,००० वाघ आहेत, जे जगातील एकूण वाघांच्या ७०% पेक्षा जास्त आहेत.',
    difficulty: 'easy',
  },
  {
    id: 52,
    subject: 'विज्ञान',
    question: 'पृथ्वी सूर्याभोवती एक फेरी किती दिवसांत करते?',
    options: ['३६५ दिवस', '३६५.२५ दिवस', '३६० दिवस', '३६६ दिवस'],
    correct: 1,
    explanation: 'पृथ्वी सूर्याभोवती एक फेरी ३६५.२५ दिवसांत करते. म्हणून दर ४ वर्षांनी एक लीप वर्ष (३६६ दिवस) असते — ती ०.२५ × ४ = १ अतिरिक्त दिवस फेब्रुवारीत जोडली जाते.',
    difficulty: 'medium',
  },
  {
    id: 53,
    subject: 'मराठी भाषा',
    question: '"नदी" या शब्दाचे अनेकवचन काय?',
    options: ['नद्या', 'नदीहरू', 'नदीस', 'नदीया'],
    correct: 0,
    explanation: '"नदी" चे अनेकवचन "नद्या" आहे. मराठीत "ई" कारान्त स्त्रीलिंगी शब्दांचे अनेकवचन "या" प्रत्यय लावून होते. उदा. नदी → नद्या, लता → लता (अनेकवचन: लता).',
    difficulty: 'easy',
  },
  {
    id: 54,
    subject: 'गणित',
    question: 'एक संख्या ३ ने भागल्यास बाकी २ उरते. ती संख्या ५ ने भागल्यास बाकी ३ उरते. सर्वात लहान अशी संख्या कोणती?',
    options: ['८', '१३', '१८', '२३'],
    correct: 0,
    explanation: 'संख्या x मानू. x ÷ ३ → बाकी २, म्हणजे x = 3k + 2. x ÷ ५ → बाकी ३, म्हणजे x = 5m + 3. k=2, m=1 ठेवता: x = 3(2)+2 = 8. तपासणी: 8÷3=2(बाकी 2)✓, 8÷5=1(बाकी 3)✓. म्हणून ८ ही सर्वात लहान संख्या.',
    difficulty: 'hard',
  },
  {
    id: 55,
    subject: 'इंग्रजी',
    question: 'What is the past tense of "swim"?',
    options: ['Swimmed', 'Swam', 'Swum', 'Swimming'],
    correct: 1,
    explanation: 'The past tense of "swim" is "swam". "Swum" is the past participle (used with has/have/had). "Swimmed" is incorrect — "swim" is an irregular verb. Forms: swim (base) → swam (past) → swum (past participle).',
    difficulty: 'easy',
  },
  {
    id: 56,
    subject: 'सामान्य ज्ञान',
    question: 'भारतीय ध्वजातील अशोक चक्रात किती अरे आहेत?',
    options: ['२०', '२२', '२४', '२६'],
    correct: 2,
    explanation: 'भारतीय ध्वजातील अशोक चक्रात २४ अरे (spokes) आहेत. हे चक्र निळ्या रंगाचे आहे आणि ते प्रगती आणि गतिशीलतेचे प्रतीक आहे. पिंगली व्यंकय्या यांनी भारतीय ध्वज डिझाइन केला.',
    difficulty: 'medium',
  },
  {
    id: 57,
    subject: 'विज्ञान',
    question: 'ऑक्सिजन कोणत्या वायूशी प्रतिक्रिया देऊन पाणी तयार होते?',
    options: ['नायट्रोजन', 'हायड्रोजन', 'कार्बन डायऑक्साइड', 'हिलियम'],
    correct: 1,
    explanation: 'हायड्रोजन + ऑक्सिजन → पाणी (2H₂ + O₂ → 2H₂O). ही एक रासायनिक अभिक्रिया आहे ज्यात हायड्रोजन आणि ऑक्सिजन एकत्र येऊन पाणी तयार होते. या अभिक्रियेत प्रचंड ऊर्जा मुक्त होते.',
    difficulty: 'easy',
  },
  {
    id: 58,
    subject: 'इतिहास',
    question: 'भारत छोडो आंदोलन केव्हा झाले?',
    options: ['१९४०', '१९४२', '१९४५', '१९४७'],
    correct: 1,
    explanation: 'भारत छोडो आंदोलन (Quit India Movement) ८ ऑगस्ट १९४२ रोजी सुरू झाले. महात्मा गांधींनी "करेंगे या मरेंगे" किंवा "Do or Die" हे घोषवाक्य दिले. हे ब्रिटिशांविरुद्धचे शेवटचे मोठे आंदोलन होते.',
    difficulty: 'medium',
  },
  {
    id: 59,
    subject: 'भूगोल',
    question: 'गोवा कोणत्या नदीच्या काठावर वसलेले आहे?',
    options: ['मांडवी', 'झुआरी', 'ताळपोणा', 'सालेरी'],
    correct: 0,
    explanation: 'गोवा हे मांडवी नदीच्या काठावर वसलेले आहे. मांडवी ही गोव्यातील सर्वात महत्त्वाची नदी आहे. गोवा हे भारतातील सर्वात लहान राज्य (क्षेत्रफळाने) आहे आणि ते पर्यटनसाठी प्रसिद्ध आहे.',
    difficulty: 'medium',
  },
  {
    id: 60,
    subject: 'चालू घडामोडी',
    question: 'G20 परिषदेचे २०२३ चे अध्यक्षपद कोणत्या देशाकडे होते?',
    options: ['जपान', 'भारत', 'इटली', 'इंडोनेशिया'],
    correct: 1,
    explanation: '२०२३ मध्ये G20 परिषदेचे अध्यक्षपद भारताकडे होते. नवी दिल्ली येथे G20 शिखर परिषद सप्टेंबर २०२३ मध्ये आयोजित करण्यात आली. भारताच्या G20 अध्यक्षपदाची थीम "Vasudhaiva Kutumbakam" (One Earth, One Family, One Future) होती.',
    difficulty: 'medium',
  },
  {
    id: 61,
    subject: 'गणित',
    question: 'एक ट्रेन ७२ km/h वेगाने धावते. m/s मध्ये वेग किती?',
    options: ['१५ m/s', '२० m/s', '२५ m/s', '३० m/s'],
    correct: 1,
    explanation: 'km/h ला m/s मध्ये बदलण्यासाठी ५/१८ ने गुणावे. ७२ × (५/१८) = ७२ × ५ ÷ १८ = ३६० ÷ १८ = २० m/s. सूत्र: km/h × (5/18) = m/s. आणि m/s × (18/5) = km/h.',
    difficulty: 'medium',
  },
  {
    id: 62,
    subject: 'सामान्य ज्ञान',
    question: 'भारताचे राष्ट्रीय खेळ कोणते?',
    options: ['क्रिकेट', 'हॉकी', 'कबड्डी', 'कुस्ती'],
    correct: 1,
    explanation: 'हॉकी हे भारताचे राष्ट्रीय खेळ मानले जाते. भारतीय हॉकी संघाने ऑलिम्पिकमध्ये ८ सुवर्णपदके जिंकली आहेत. ध्यानचंद हे हॉकीचे जादूगर म्हणून ओळखले जातात. त्यांचा जन्मदिन २९ ऑगस्ट "राष्ट्रीय क्रीडा दिन" म्हणून साजरा केला जातो.',
    difficulty: 'easy',
  },
  {
    id: 63,
    subject: 'मराठी भाषा',
    question: '"विद्या" या शब्दाचा अर्थ काय?',
    options: ['शक्ती', 'ज्ञान', 'धन', 'बळ'],
    correct: 1,
    explanation: '"विद्या" म्हणजे "ज्ञान". हा संस्कृत मूळचा शब्द आहे. "वि" + "द्या" = विशेष ज्ञान. विद्या, बुद्धी, शक्ती या तीन गोष्टी माता सरस्वतीचे प्रतीक आहेत. "विद्यालय" = विद्या + आलय = ज्ञानाचे घर = शाळा.',
    difficulty: 'easy',
  },
  {
    id: 64,
    subject: 'विज्ञान',
    question: 'सूर्यमालेत सर्वात मोठा ग्रह कोणता?',
    options: ['शनि', 'गुरू', 'अरुण', ' Neptune'],
    correct: 1,
    explanation: 'गुरू (Jupiter) हा सूर्यमालेतील सर्वात मोठा ग्रह आहे. त्याचा व्यास सुमारे १,४२,९८४ किमी आहे. गुरूला "ग्रहांचा राजा" म्हणतात. त्याला ९५+ उपग्रह आहेत. गुरू हा वायू ग्रह (Gas Giant) आहे.',
    difficulty: 'easy',
  },
  {
    id: 65,
    subject: 'इंग्रजी',
    question: 'What does the idiom "Break the ice" mean?',
    options: ['तोडणे', 'गोठवणे', 'बोलण्यास सुरुवात करणे', 'थंड होणे'],
    correct: 2,
    explanation: '"Break the ice" means to initiate conversation or make people feel comfortable in a social situation. It does NOT mean literally breaking ice. Example: "She told a joke to break the ice at the meeting." This idiom comes from ships breaking ice to clear a path.',
    difficulty: 'medium',
  },
  {
    id: 66,
    subject: 'इतिहास',
    question: 'लोकमान्य टिळकांचा जन्म केव्हा झाला?',
    options: ['२३ जुलै १८५६', '२३ जुलै १८५८', '२ ऑक्टोबर १८६९', '१९ फेब्रुवारी १६३०'],
    correct: 0,
    explanation: 'लोकमान्य बाळ गंगाधर टिळक यांचा जन्म २३ जुलै १८५६ रोजी रत्नागिरी येथे झाला. त्यांना "लोकमान्य" आणि "स्वराज्याचे शिल्पकार" म्हणतात. त्यांचे प्रसिद्ध वाक्य: "स्वराज्य हा माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!"',
    difficulty: 'medium',
  },
  {
    id: 67,
    subject: 'भूगोल',
    question: 'अक्षांश आणि रेखांश यांच्या मदतीने काय ठरवले जाते?',
    options: ['वेळ', 'स्थान', 'हवामान', 'अंतर'],
    correct: 1,
    explanation: 'अक्षांश (Latitude) आणि रेखांश (Longitude) यांच्या मदतीने पृथ्वीवरील कोणत्याही ठिकाणाचे अचूक स्थान (Location) ठरवले जाते. अक्षांश विषुववृत्तापासून मोजले जातात आणि रेखांश ग्रीनwich रेखेपासून मोजले जातात.',
    difficulty: 'medium',
  },
  {
    id: 68,
    subject: 'चालू घडामोडी',
    question: 'UPI म्हणजे काय?',
    options: ['United Payment Interface', 'Unified Payments Interface', 'Universal Payment Index', 'United Process Integration'],
    correct: 1,
    explanation: 'UPI = Unified Payments Interface. ही NPCI (National Payments Corporation of India) ने विकसित केलेली भुगतान प्रणाली आहे. UPI मुळे मोबाईलवरून तात्काळ पैसे पाठवता आणि स्वीकारता येतात. भारतात UPI क्रांतीमुळे डिजिटल पेमेंटमध्ये मोठी वाढ झाली.',
    difficulty: 'easy',
  },
  {
    id: 69,
    subject: 'गणित',
    question: 'एका आयताची लांबी १२ सेमी आणि रुंदी ८ सेमी आहे. त्याचे क्षेत्रफळ किती?',
    options: ['८० चौ.सेमी', '९६ चौ.सेमी', '१०४ चौ.सेमी', '१२० चौ.सेमी'],
    correct: 1,
    explanation: 'आयताचे क्षेत्रफळ = लांबी × रुंदी = १२ × ८ = ९६ चौ.सेमी. आयताचा परिघ = २ × (लांबी + रुंदी) = २ × (१२ + ८) = २ × २० = ४० सेमी.',
    difficulty: 'easy',
  },
  {
    id: 70,
    subject: 'सामान्य ज्ञान',
    question: 'भारताचे राष्ट्रीय फळ कोणते?',
    options: ['सफरचंद', 'केळी', 'आंबा', 'द्राक्षे'],
    correct: 2,
    explanation: 'आंबा हे भारताचे राष्ट्रीय फळ आहे. आंब्याला "फळांचा राजा" म्हणतात. भारतात आंब्याच्या १०००+ जाती आहेत. अल्फांसो, दशेरी, लँगडा, बगनपल्ली या भारतातील प्रसिद्ध आंब्याच्या जाती आहेत.',
    difficulty: 'easy',
  },
  {
    id: 71,
    subject: 'विज्ञान',
    question: 'मानवी शरीरातील सर्वात मोठे अवयव कोणते?',
    options: ['यकृत', 'फुफ्फुस', 'त्वचा', 'मेंदू'],
    correct: 2,
    explanation: 'त्वचा (Skin) हे मानवी शरीरातील सर्वात मोठे अवयव आहे. त्वचेचे क्षेत्रफळ सुमारे २ चौ.मीटर आहे. त्वचा शरीराचे संरक्षण करते, तापमान नियंत्रित करते आणि स्पर्श जाणवते. त्वचेचे ३ थर असतात: एपिडर्मिस, डर्मिस, हायपोडर्मिस.',
    difficulty: 'medium',
  },
  {
    id: 72,
    subject: 'मराठी भाषा',
    question: '"अहो" हा कोणता शब्द प्रकार?',
    options: ['नाम', 'सर्वनाम', 'उद्गार', 'क्रियापद'],
    correct: 2,
    explanation: '"अहो" हा उद्गार शब्द (Interjection) आहे. उद्गार शब्द म्हणजे अचानक भावना व्यक्त करणारे शब्द. उदा. अहो, वाह, अरे, छान, बापरे, धन्य. हे शब्द वाक्यात इतर शब्दांशी संबंध जोडत नाहीत.',
    difficulty: 'medium',
  },
  {
    id: 73,
    subject: 'इतिहास',
    question: 'ताजमहाल कोणत्या शहरात आहे?',
    options: ['दिल्ली', 'आग्रा', 'जयपूर', 'लखनौ'],
    correct: 1,
    explanation: 'ताजमहाल आग्रा (उत्तर प्रदेश) येथे यमुना नदीच्या काठावर आहे. मुघल सम्राट शाहजहान याने त्याची प्रिय पत्नी मुमताज महलच्या स्मरणार्थ १६३२-१६५३ या काळात ताजमहाल बांधला. हे १९८३ मध्ये UNESCO जागतिक वारसा स्थळ बनले.',
    difficulty: 'easy',
  },
  {
    id: 74,
    subject: 'इंग्रजी',
    question: '"A stitch in time saves nine" — What does this proverb mean?',
    options: ['शिवणकाम महत्त्वाचे', 'वेळेवर केलेले काम नंतरचा त्रास वाचवते', 'नऊ शिवणे आवश्यक', 'वेळ कधीही थांबत नाही'],
    correct: 1,
    explanation: '"A stitch in time saves nine" means doing something at the right time saves effort later. If you fix a small problem now, it won\'t become a bigger problem later. Example: Fixing a small leak now prevents flooding later. This proverb teaches us the value of timeliness.',
    difficulty: 'medium',
  },
  {
    id: 75,
    subject: 'भूगोल',
    question: 'भारतातील सर्वात मोठे वाळवंट कोणते?',
    options: ['थार वाळवंट', 'कच्छ वाळवंट', 'लाडक वाळवंट', 'स्पिती वाळवंट'],
    correct: 0,
    explanation: 'थार वाळवंट (Great Indian Desert) हे भारतातील सर्वात मोठे वाळवंट आहे. ते राजस्थानमध्ये आहे. याचे क्षेत्रफळ सुमारे २,००,००० चौ.किमी आहे. जैसलमेर, जोधपूर, बीकानेर ही थार वाळवंतातील प्रमुख शहरे आहेत.',
    difficulty: 'easy',
  },
  {
    id: 76,
    subject: 'सामान्य ज्ञान',
    question: 'भारताची मुद्रा काय?',
    options: ['डॉलर', 'रुपया', 'युरो', 'रुपईया'],
    correct: 1,
    explanation: 'भारताची मुद्रा "रुपया" (₹) आहे. ₹ चिन्ह २०१० मध्ये स्वीकारले गेले. ₹ चिन्ह देवनागरी "र" आणि लॅटिन "R" यांचे मिश्रण आहे. १ रुपया = १०० पैसे. RBI चलनाचे नियंत्रण करते.',
    difficulty: 'easy',
  },
  {
    id: 77,
    subject: 'विज्ञान',
    question: 'व्हिटॅमिन C ची कमतरता कोणता रोग होतो?',
    options: ['रतांधळेपण', 'स्कर्व्ही', 'बेरीबेरी', 'रिकेट्स'],
    correct: 1,
    explanation: 'व्हिटॅमिन C ची कमतरता म्हणजे स्कर्व्ही (Scurvy) हा रोग होतो. यात हिरड्यांमधून रक्त येते आणि जखमा बऱ्या होत नाहीत. लिंबू, संत्री, आमळ, टोमॅटो यांमध्ये व्हिटॅमिन C मुबलक प्रमाणात असते.',
    difficulty: 'medium',
  },
  {
    id: 78,
    subject: 'गणित',
    question: '३, ६, ९, १२, ... या श्रेढीतील २० वे पद काय?',
    options: ['५७', '६०', '६३', '६६'],
    correct: 1,
    explanation: 'ही अंकगणिती श्रेढी (AP) आहे. पहिले पद a = ३, सामान्य फरक d = ३. n वे पद = a + (n-1)d. २० वे पद = ३ + (२०-१) × ३ = ३ + १९ × ३ = ३ + ५७ = ६०.',
    difficulty: 'medium',
  },
  {
    id: 79,
    subject: 'चालू घडामोडी',
    question: 'भारताचा ७५ वा प्रजासत्ताक दिन केव्हा साजरा केला?',
    options: ['२६ जानेवारी २०२३', '२६ जानेवारी २०२४', '१५ ऑगस्ट २०२४', '२६ जानेवारी २०२५'],
    correct: 1,
    explanation: 'भारताचा ७५ वा प्रजासत्ताक दिन २६ जानेवारी २०२४ रोजी साजरा केला गेला. १९५० मध्ये पहिला प्रजासत्ताक दिन साजरा झाला, म्हणून २०२४ - १९५० = ७५ वा प्रजासत्ताक दिन. २०२४ मध्ये फ्रान्सचे राष्ट्राध्यक्ष मुख्य पाहुणे होते.',
    difficulty: 'hard',
  },
  {
    id: 80,
    subject: 'मराठी भाषा',
    question: '"मनोभावे" या शब्दाचा अर्थ काय?',
    options: ['मनाने', 'संपूर्ण मनाने / निष्ठेने', 'मनासारखे', 'मनाला'],
    correct: 1,
    explanation: '"मनोभावे" = मन + भावे = संपूर्ण मनाने, निष्ठेने, श्रद्धेने. हा शब्द एखादे काम पूर्ण श्रद्धा आणि निष्ठेने करण्यासाठी वापरला जातो. उदा. "त्यांनी मनोभावे पूजा केली." हा मराठीतील एक सुंदर शब्द आहे.',
    difficulty: 'medium',
  },
];

// Helper: Get today's date-based seed for consistent daily questions
export function getDailySeed(): number {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

// Seeded random number generator
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Shuffle array with seed
function shuffleWithSeed<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  const rng = seededRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface DailyTest {
  date: string;
  questions: Question[];
  totalQuestions: number;
}

// Generate daily test — same for everyone on the same day
export function generateDailyTest(questionCount: number = 20): DailyTest {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];
  const seed = getDailySeed();
  const shuffled = shuffleWithSeed(allQuestions, seed);
  const selected = shuffled.slice(0, Math.min(questionCount, allQuestions.length));

  return {
    date: dateStr,
    questions: selected,
    totalQuestions: selected.length,
  };
}

// Generate practice test from specific subjects
export function generatePracticeTest(
  selectedSubjects: string[],
  questionCount: number,
  difficulty: string[]
): DailyTest {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];

  let filtered = allQuestions.filter(q => {
    const subjectMatch = selectedSubjects.length === 0 || selectedSubjects.includes(q.subject);
    const diffMatch = difficulty.length === 0 || difficulty.includes(q.difficulty);
    return subjectMatch && diffMatch;
  });

  const seed = Date.now();
  const shuffled = shuffleWithSeed(filtered, seed);
  const selected = shuffled.slice(0, Math.min(questionCount, filtered.length));

  return {
    date: dateStr,
    questions: selected,
    totalQuestions: selected.length,
  };
}
