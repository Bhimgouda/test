const axios = require("axios");
const marked = require("marked");
const { json } = require("express");

let jsonData = {
  id: "",
  points: 0,
  level: "",
  title: "",
  description: "",
  tasks: [],
  start_code: "",
  solution_code: "",
  deploy_details: {},
};

const totalSections = {
  description: true,
  tasks: true,
  tests: true,
  start_code: true,
  solution_code: true,
  deploy_details: true,
};

const validateSection = (line) => {
  if (!line.startsWith("#")) return false;

  const section = line.split("# ")[1].replaceAll(" ", "_").toLowerCase().trim();
  return totalSections[section] ? section : false;
};

const test = async () => {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/bhimgouda/test/main/challenge-5.md"
  );

  console.log(data);

  let currentSection = "";

  let taskNumber = undefined;
  let testNumber = 0;
  let codeStarted = false;

  const lines = data.split("\n");
  lines.forEach((line, index) => {
    if (index === 0 && line.startsWith("# ")) {
      return (jsonData.title = line.split("# ")[1].trim());
    }

    line.replace(/"/g, "'");
    if (!currentSection && line.includes(":")) {
      let key = line.split(":")[0].slice(1).trim();
      console.log(key, "key");
      let value = line.split(":")[1].trim();
      return (jsonData[key] = value);
    }

    const validSection = validateSection(line);
    if (validSection) return (currentSection = validSection);

    if (currentSection === "deploy_details") {
      if (line.startsWith("```")) {
        return (codeStarted = !codeStarted ? true : false);
      }
      if (codeStarted) {
        if (line === "{" || line === "}") return;

        let key = JSON.parse(line.split(":")[0]);
        let value = JSON.parse(line.split(":")[1].replace(",", ""));
        return (jsonData.deploy_details[key] = value);
      }
    }

    line = line.replace(/"/g, "'");

    if (currentSection === "description") {
      if (line.startsWith("```") && !codeStarted) {
        codeStarted = true;
        line = "codeStart";
      } else if (line.startsWith("```") && codeStarted) {
        codeStarted = false;
        line = "codeEnd";
      }
      let lineBreak = codeStarted ? "line-break" : "\n";
      if (line === "codeStart" || line === "codeEnd") lineBreak = "";
      return (jsonData.description += line + lineBreak);
    }

    if (currentSection === "start_code" || currentSection === "solution_code") {
      if (line.startsWith("```")) {
        return (codeStarted = !codeStarted ? true : false);
      }
      if (codeStarted) {
        return (jsonData[currentSection] += line + "\n");
      }
    }

    if (currentSection === "tasks") {
      if (line.startsWith("#") && line.toLowerCase().includes("task")) {
        taskNumber = parseInt(line.toLowerCase().split("task")[1]) - 1;
        return (jsonData.tasks[taskNumber] = { test: "", description: "" });
      }

      if (taskNumber !== undefined) {
        if (line.startsWith("```") && !codeStarted) {
          codeStarted = true;
          line = "codeStart";
        } else if (line.startsWith("```") && codeStarted) {
          codeStarted = false;
          line = "codeEnd";
        }
        let lineBreak = codeStarted ? "line-break" : "\n";
        if (line === "codeStart" || line === "codeEnd") lineBreak = "";
        jsonData.tasks[taskNumber].description += line + lineBreak;
      }
    }
    if (currentSection === "tests") {
      if (line.startsWith("```")) {
        if (codeStarted) testNumber += 1;
        return (codeStarted = !codeStarted ? true : false);
      }
      if (codeStarted) {
        return (jsonData.tasks[testNumber].test += line);
      }
    }
  });

  jsonData.description = marked
    .parse(jsonData.description)
    .replaceAll("\n", "")
    .replaceAll("line-break", "\n")
    .replace("<p>codeStart", "<pre>")
    .replace("codeEnd</p>", "<pre>");

  jsonData.tasks.forEach((task, i) => {
    jsonData.tasks[i].description = marked
      .parse(jsonData.tasks[i].description)
      .replaceAll("\n", "")
      .replaceAll("line-break", "\n")
      .replace("<p>codeStart", "<pre>")
      .replace("codeEnd</p>", "<pre>");
  });

  jsonData.start_code = jsonData.start_code
    .replace(/^\n+/, "")
    .replace(/\n+$/, "");

  jsonData.solution_code = jsonData.solution_code
    .replace(/^\n+/, "")
    .replace(/\n+$/, "");

  console.log(JSON.stringify(jsonData));
};

test();
