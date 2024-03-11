const jsdom = require("jsdom");

const axios = require("axios");
const marked = require("marked");

let jsonData = {
  id: "",
  points: 0,
  level: "",
  title: "",
  description: "",
  tasks: [],
  startCode: "",
  solutionCode: "",
  logic: {},
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
  if (!line.startsWith("## ")) return false;

  const section = line
    .split("## ")[1]
    .replaceAll(" ", "_")
    .toLowerCase()
    .trim();
  return totalSections[section] ? section : false;
};

const test = async () => {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/bhimgouda/test/main/challenge-3.md"
  );

  console.log(data);

  let currentSection = "";

  let testNumber = 0;
  let codeStarted = false;

  const lines = data.split("\n");
  lines.forEach((line, index) => {
    line = line.replace(/"/g, "'");

    if (index === 0 && line.startsWith("# ")) {
      return (jsonData.title = line.split("# ")[1].trim());
    }

    if (!currentSection && line.includes(":")) {
      let key = line.split(":")[0].slice(1).trim();
      let value = line.split(":")[1].trim();
      return (jsonData[key] = value);
    }

    const validSection = validateSection(line);
    if (validSection) return (currentSection = validSection);

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
    // else if (line.startsWith("## Description")) {
    //   currentSection = "description";
    //
    // } else if (line.startsWith("## Tasks")) {
    //   currentSection = "tasks";
    //   taskNumber = 0;
    // } else if (line.startsWith("## Start Code")) {
    //   currentSection = "startCode";
    // } else if (line.startsWith("## Solution Code")) {
    //   currentSection = "solutionCode";
    // } else if (line.startsWith("## Tests")) {
    //   currentSection = "tests";
    //   taskNumber = 0;
    // } else if (line.startsWith("## Extra Details")) {
    //   currentSection = "extras";
    // } else {
    //   if (currentSection === "tasks") {
    //     if (parseInt(line[0])) {
    //       const currentTask = parseInt(line[0]) - 1;
    //       taskNumber = currentTask;
    //       let description = "";
    //       const newLines = lines.slice(index);
    //       for (let newLine of newLines) {
    //         if (
    //           (parseInt(newLine[0]) &&
    //             parseInt(newLine[0] - 1) !== taskNumber) ||
    //           newLine.startsWith("#")
    //         )
    //           break;
    //         description += newLine + "\n";
    //       }
    //       description = marked.parse(description).replaceAll("\n", "");
    //       const task = { description };
    //       jsonData["tasks"].push(task);
    //     }
    //   } else if (currentSection === "tests") {
    //     if (line.startsWith("```")) {
    //       codeStarted = !codeStarted;
    //       if (!codeStarted) taskNumber++;
    //     } else if (taskNumber < jsonData.tasks.length) {
    //       if (jsonData["tasks"][taskNumber].test === undefined) {
    //         jsonData["tasks"][taskNumber].test = line;
    //       } else {
    //         jsonData["tasks"][taskNumber].test += line;
    //       }
    //     }
    //   } else if (
    //     currentSection === "startCode" ||
    //     currentSection === "solutionCode"
    //   ) {
    //     if (jsonData[currentSection] === "" && !line.startsWith("coco")) return;
    //     if (line.startsWith("```")) return;
    //     jsonData[currentSection] += line + "\n";
    //   } else if (currentSection === "extras") {
    //     const parts = line.split("=").map((part) => part.trim());
    //     jsonData[parts[0]] = parts[1];
    //   }
    // }
  });
  jsonData.description = marked
    .parse(jsonData.description)
    .replaceAll("\n", "")
    .replace(/"/g, "'")
    .replaceAll("line-break", "\n")
    .replace("<p>codeStart", "<pre>")
    .replace("codeEnd</p>", "<pre>");

  console.log(JSON.stringify(jsonData));
};

test();
