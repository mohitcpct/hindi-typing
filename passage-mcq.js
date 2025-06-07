    const data = {
      demo1: {
        label: "01 जून 2025",
        hindi: {
          passage: `वसंत ऋतु हम सभी को आनंद देने वाली होती है। भारत में वसंत ऋतु अप्रैल \n\nऔर मई के महीने में आती है। इसमें तापमान में नमी आ\n जाती है और चारों तरफ हरियाली छा जाती है।`,
          questions: [
            { q: "वसंत ऋतु कब आती है?", options: ["जनवरी-फरवरी", "मार्च-अप्रैल", "अप्रैल-मई", "जून-जुलाई"], answer: 2 },
            { q: "वसंत ऋतु कैसी होती है?", options: ["उदासी वाली", "ठंडी", "गर्मी वाली", "आनंददायक"], answer: 3 },
            { q: "वसंत ऋतु में क्या होता है?", options: ["हरियाली छा जाती है", "पत्ते झड़ते हैं", "बर्फबारी होती है", "बारिश होती है"], answer: 0 },
            { q: "भारत में वसंत ऋतु कौन से महीने में आती है?", options: ["जुलाई-अगस्त", "अप्रैल-मई", "अक्टूबर-नवम्बर", "दिसम्बर-जनवरी"], answer: 1 },
            { q: "वसंत ऋतु में कैसा तापमान होता है?", options: ["बहुत गर्म", "बहुत ठंडा", "नमी वाला", "शुष्क"], answer: 2 }
          ]
        },
        english: {
          passage: `The Unique Medicine\n\nMukul Madhukar was a playwright living in Patna. Since he had studied medicine as well, he was called Dr. Madhukar by those who knew him. His plays were not very popular and he did not earn much. As a doctor he hardly charged any fee from his patients who were mostly poor. He was a very kind-hearted man and was always willing to help the poor and the needy. So, he was usually left with very little money for himself.\n\nOne day a poor woman dressed in rags called upon Dr. Madhukar. She requested him to come home with her and examine her husband who was very sick. He had been bedridden for some time and was unable to move. When Madhukar called on the family, he was distressed to see the miserable condition of the family. The husband had been out of work for many months and there was hardly any food in the house. Madhukar examined the patient and asked the woman to see him in the evening.\n\nWhen the woman came to Madhukar’s house in the evening, he gave her a small but heavy metal box and said, “Here is the medicine for your husband. If you use it regularly, he will soon get well. He will be able to work again as before. But you must not open the medicine box until you get home.”\n\n“How is the medicine to be taken?” asked the poor woman. “ You will find a small piece of paper inside the box which contains all the directions for using the medicine, “ said Dr. Madhukar. The woman thanked the doctor and rushed home with the box of medicine. On reaching home, she sat down on the bed beside her husband. Then she opened the box carefully. She was surprised to find the box full of coins. On top of the money was a piece of paper bearing the words: “ Please use this medicine whenever you feel the need.” `,
          questions: [
            { q: "When does spring season come in India?", options: ["January-February", "March-April", "April-May", "June-July"], answer: 2 },
            { q: "How is the spring season described?", options: ["Sad", "Cold", "Hot", "Pleasant"], answer: 3 },
            { q: "What happens during spring?", options: ["Snowfall", "Leaves fall", "Rain", "Greenery spreads"], answer: 3 },
            { q: "Which months bring spring in India?", options: ["July-August", "April-May", "October-November", "December-January"], answer: 1 },
            { q: "What type of temperature is in spring?", options: ["Very Hot", "Very Cold", "Humid", "Dry"], answer: 2 }
          ]
        }
      }
    };

    window.onload = function () {
      const passageDate = document.getElementById("passageDate");
      Object.keys(data).forEach(key => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = data[key].label;
        passageDate.appendChild(opt);
      });
    };

    function startTest() {
      const name = document.getElementById("userName").value.trim();
      const lang = document.getElementById("language").value;
      const date = document.getElementById("passageDate").value;

      if (!name) {
        alert("कृपया नाम दर्ज करें");
        return;
      }

      const passageData = data[date][lang];
      const container = document.getElementById("testSection");
      container.innerHTML = `
  <h3>गद्यांश:</h3>
  <div style="white-space: pre-line; margin-bottom:20px; text-align: justify;">${passageData.passage}</div>
  <form id="quizForm"></form>
  <button onclick="submitTest()">Submit</button>
`;
      const form = container.querySelector("#quizForm");

      passageData.questions.forEach((q, index) => {
        const qDiv = document.createElement("div");
        qDiv.className = "question";
        qDiv.innerHTML = `<b>प्रश्न ${index + 1}:</b> ${q.q}<div class="options"></div>`;
        q.options.forEach((opt, i) => {
          qDiv.querySelector(".options").innerHTML += `
            <label><input type="radio" name="q${index}" value="${i}"> ${opt}</label>
          `;
        });
        form.appendChild(qDiv);
      });

      document.getElementById("formSection").style.display = "none";
      container.style.display = "block";
    }

    function submitTest() {
  const date = document.getElementById("passageDate").value;
  const lang = document.getElementById("language").value;
  const passageData = data[date][lang];
  let score = 0;

  const unanswered = [];

  passageData.questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const qDiv = document.querySelectorAll(".question")[index];
    if (!selected) {
      unanswered.push(qDiv);
    }
  });

  if (unanswered.length > 0) {
    alert("कृपया सभी प्रश्नों का उत्तर दें।");
    unanswered[0].scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  // यदि सब उत्तर दिए गए हैं, तब ही evaluation करें
  passageData.questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const qDiv = document.querySelectorAll(".question")[index];
    const val = parseInt(selected.value);
    if (val === q.answer) {
      selected.parentElement.classList.add("correct");
      score++;
    } else {
      selected.parentElement.classList.add("incorrect");
      qDiv.innerHTML += `<div class="correct">✔ सही उत्तर: ${q.options[q.answer]}</div>`;
    }
  });

  const container = document.getElementById("testSection");
  container.innerHTML += `<h3>आपने ${score}/5 सही उत्तर दिए</h3><button onclick="location.reload()">नया टेस्ट शुरू करें</button>`;
  const btn = container.querySelector("button[onclick='submitTest()']");
  if (btn) btn.style.display = "none";
} 