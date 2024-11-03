import translations from "./translations.js";

function translateToStilvashia(text) {
  try {
    if (typeof text !== "string") {
      console.error("Input is not a string");
      return text;
    }

    // Split the input into words
    const words = text.split(/\s+/);
    const translatedWords = words.map((word) => {
      const lowerWord = word.toLowerCase();
      if (lowerWord.endsWith("s")) {
        const singular = lowerWord.slice(0, -1);
        if (translations[singular]) {
          console.log(`Translating plural word: ${word}`);
          return translations[singular] + "o"; // Add "o" for plural
        }
      }
      if (translations[lowerWord]) {
        console.log(`Translating word: ${word}`);
        return translations[lowerWord];
      }
      console.warn(`No translation found for word: ${word}`);
      return word; // Return the original word if no translation is found
    });

    // Join the translated words back into a string
    return translatedWords.join(" ");
  } catch (error) {
    console.error("Error in translateToStilvashia:", error);
    return text;
  }
}

function translateToEnglish(text) {
  try {
    if (typeof text !== "string") {
      console.error("Input is not a string");
      return text;
    }

    const reverseTranslations = Object.fromEntries(
      Object.entries(translations).map(([k, v]) => [v, k])
    );

    // Split the input into words
    const words = text.split(/\s+/);
    const translatedWords = words.map((word) => {
      if (reverseTranslations[word]) {
        console.log(`Translating word: ${word}`);
        return reverseTranslations[word];
      }
      console.warn(`No translation found for word: ${word}`);
      return word; // Return the original word if no translation is found
    });

    // Join the translated words back into a string
    return translatedWords.join(" ");
  } catch (error) {
    console.error("Error in translateToEnglish:", error);
    return text;
  }
}

document.getElementById("translateButton").addEventListener("click", () => {
  try {
    const input = document.getElementById("inputText").value;
    const direction = document.getElementById("languageSelect").value;
    let output = "";

    if (!input) {
      console.error("Input text is empty");
      document.getElementById("outputText").value =
        "Please enter text to translate.";
      return;
    }

    if (direction === "english_to_stilvashia") {
      console.log("Translating from English to Stilvashia");
      output = translateToStilvashia(input);
    } else if (direction === "stilvashia_to_english") {
      console.log("Translating from Stilvashia to English");
      output = translateToEnglish(input);
    } else {
      console.error("Invalid translation direction");
      document.getElementById("outputText").value =
        "Invalid translation direction.";
      return;
    }

    document.getElementById("outputText").value = output;
  } catch (error) {
    console.error("Error during translation:", error);
    document.getElementById("outputText").value =
      "An error occurred during translation.";
  }
});
