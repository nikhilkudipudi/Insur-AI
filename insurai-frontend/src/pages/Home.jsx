// export default function Home() {
  
//   return (
//     <div className="text-center mt-20">
//       <h2 className="text-4xl font-bold text-green-600">Welcome to InsurAI</h2>
//       <p className="mt-4 text-gray-700">Smart Insurance Policy Automation and Intelligence System</p>
//     </div>
//   );
// }


// // import { useTranslation } from "react-i18next";

// export default function Home() {
//   const { t, i18n } = useTranslation();

//   const changeLanguage = (lang) => {
//     i18n.changeLanguage(lang);
//   };

//   return (
//     <div className="text-center mt-20 px-4">
//       {/* 🌐 Language Selector */}
//       <div className="flex justify-end mr-10 mb-6">
//         <select
//           onChange={(e) => changeLanguage(e.target.value)}
//           className="border border-green-300 rounded-lg px-3 py-1 text-green-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-400 transition"
//           defaultValue="en"
//         >
//           <option value="en">English</option>
//           <option value="hi">Hindi</option>
//           {/* <option value="ta">Tamil</option>
//           <option value="ml">Malayalam</option>
//           <option value="kn">Kannada</option>
//           <option value="bn">Bengali</option>
//           <option value="te">Telugu</option> */}
//         </select>
//       </div>

//       {/* 🏠 Home Content */}
//       <h2 className="text-4xl font-bold text-green-600">{t("heroTitle")}</h2>
//       <p className="mt-4 text-gray-700">{t("heroSubtitle")}</p>
//     </div>
//   );
// }

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-green-50 to-white px-4">
      <h2 className="text-4xl font-bold text-green-600">
        {t("heroTitle")}
      </h2>
      <p className="mt-4 text-gray-700 max-w-2xl">
        {t("heroSubtitle")}
      </p>
    </div>
  );
}

