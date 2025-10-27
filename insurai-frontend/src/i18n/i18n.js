import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import hi from "./hi.json";
// import ta from "./ta.json";
// import ml from "./ml.json";
// import kn from "./kn.json";
// import bn from "./bn.json";
// import te from "./te.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
       hi: { translation: hi },
    //   ta: { translation: ta },
    //   ml: { translation: ml },
    //   kn: { translation: kn },
    //   bn: { translation: bn },
    //   te: { translation: te }
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
