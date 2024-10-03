document.addEventListener("DOMContentLoaded", () => {
  const selectedTextDiv = document.getElementById("selected-text");
  const transTextDiv = document.getElementById("trans-text");
  const langSelect = document.getElementById("lang");

  chrome.storage.session.get("selectedText", result => {
    if (result.selectedText) {
      selectedTextDiv.textContent = result.selectedText;
      handleLanguageChange(result.selectedText); 
    } else {
      selectedTextDiv.textContent = "No text selected yet.";
    }
  });

  langSelect.addEventListener("change", () => {
    const text = selectedTextDiv.textContent; 
    handleLanguageChange(text); 
  });
});

async function handleLanguageChange(text) {
  const selectedLanguage = document.getElementById("lang").value;
  const transTextDiv = document.getElementById("trans-text");

  const url = "https://aibit-translator.p.rapidapi.com/api/v1/translator/text";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "3729e87b97mshc1a0fd3de725180p17a9c6jsn915f3283e9a9", 
      "x-rapidapi-host": "aibit-translator.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "auto",
      to: selectedLanguage,
      text: text,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log(result.trans);
    transTextDiv.textContent = result.trans || "Translation failed."; 
  } catch (error) {
    console.error(error);
    transTextDiv.textContent = "Error during translation."; 
  }
  console.log("Selected Language:", selectedLanguage);
}
