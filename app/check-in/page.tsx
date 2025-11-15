// ISO-639-1 language list (all 136 major world languages)
const LANGUAGES = [
  "Abkhaz", "Afar", "Afrikaans", "Akan", "Albanian", "Amharic", "Arabic",
  "Aragonese", "Armenian", "Assamese", "Avaric", "Avestan", "Aymara",
  "Azerbaijani", "Bambara", "Bashkir", "Basque", "Belarusian", "Bengali",
  "Bihari", "Bislama", "Bosnian", "Breton", "Bulgarian", "Burmese",
  "Catalan", "Chamorro", "Chechen", "Chichewa", "Chinese", "Chuvash",
  "Cornish", "Corsican", "Cree", "Croatian", "Czech", "Danish", "Divehi",
  "Dutch", "Dzongkha", "English", "Esperanto", "Estonian", "Ewe", "Faroese",
  "Fijian", "Finnish", "French", "Fula", "Galician", "Georgian", "German",
  "Greek", "Guarani", "Gujarati", "Haitian Creole", "Hausa", "Hebrew",
  "Herero", "Hindi", "Hiri Motu", "Hungarian", "Interlingua", "Indonesian",
  "Interlingue", "Irish", "Igbo", "Inupiaq", "Ido", "Icelandic",
  "Italian", "Inuktitut", "Japanese", "Javanese", "Kalaallisut", "Kannada",
  "Kanuri", "Kashmiri", "Kazakh", "Khmer", "Kikuyu", "Kinyarwanda",
  "Kyrgyz", "Komi", "Kongo", "Korean", "Kurdish", "Kwanyama", "Latin",
  "Luxembourgish", "Ganda", "Limburgish", "Lingala", "Lao", "Lithuanian",
  "Luba-Katanga", "Latvian", "Manx", "Macedonian", "Malagasy", "Malay",
  "Malayalam", "Maltese", "Māori", "Marathi", "Marshallese", "Mongolian",
  "Nauru", "Navajo", "Northern Ndebele", "Nepali", "Ndonga", "Norwegian",
  "Norwegian Bokmål", "Norwegian Nynorsk", "Occitan", "Ojibwe", "Old Slavonic",
  "Oromo", "Oriya", "Ossetian", "Panjabi", "Pali", "Persian", "Polish",
  "Portuguese", "Pushto", "Quechua", "Romansh", "Romanian", "Russian",
  "Sanskrit", "Sardinian", "Sindhi", "Northern Sami", "Samoan", "Sango",
  "Serbian", "Gaelic", "Shona", "Sinhala", "Slovak", "Slovene", "Somali",
  "Southern Sotho", "Spanish", "Sundanese", "Swahili", "Swati", "Swedish",
  "Tamil", "Telugu", "Tajik", "Thai", "Tigrinya", "Tibetan", "Turkmen",
  "Tagalog", "Tswana", "Tonga", "Turkish", "Tsonga", "Tatar", "Twi",
  "Tahitian", "Uighur", "Ukrainian", "Urdu", "Uzbek", "Venda", "Vietnamese",
  "Volapük", "Walloon", "Welsh", "Wolof", "Western Frisian", "Xhosa",
  "Yiddish", "Yoruba", "Zhuang", "Zulu"
];

export default function CheckInPage() {
  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>
        EmergenQ – Patient Check-In
      </h1>

      <p style={{ marginBottom: "1.5rem" }}>
        Please enter your information to join the ER queue.
      </p>

      <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        {/* Name */}
        <div>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="John Doe"
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Symptoms */}
        <div>
          <label>Your Symptoms</label>
          <textarea
            placeholder="Describe what brings you in..."
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Medical History */}
        <div>
          <label>Medical History</label>
          <textarea
            placeholder="Past conditions, surgeries, allergies..."
            rows={4}
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Language */}
        <div>
          <label>Preferred Language</label>
          <select
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "0.75rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Join Queue
        </button>
      </form>
    </div>
  );
}
