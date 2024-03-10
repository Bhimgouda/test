const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");
const marked = require("marked");

const test = async () => {
  const { data } = await axios.get(
    "https://raw.githubusercontent.com/bhimgouda/test/main/002-Value%20Types/README.md"
  );

  markdownToJson(data);

  lines.forEach((line, index) => {
    line = line.replace(/"/g, "'");
    if (line.startsWith("# ")) {
      jsonData["title"] = line.slice(2);
    } else if (line.startsWith("## Description")) {
      currentSection = "description";
      let description = "";
      const newLines = lines.slice(index + 1);
      for (let newLine of newLines) {
        if (newLine.startsWith("#")) break;
        description += newLine + "\n";
      }
      description = marked.parse(description).replaceAll("\n", "");
      jsonData["description"] = description;
    } else if (line.startsWith("## Tasks")) {
      currentSection = "tasks";
      taskNumber = 0;
    } else if (line.startsWith("## Start Code")) {
      currentSection = "startCode";
    } else if (line.startsWith("## Solution Code")) {
      currentSection = "solutionCode";
    } else if (line.startsWith("## Tests")) {
      currentSection = "tests";
      taskNumber = 0;
    } else if (line.startsWith("## Extra Details")) {
      currentSection = "extras";
    } else {
      if (currentSection === "tasks") {
        if (parseInt(line[0])) {
          const currentTask = parseInt(line[0]) - 1;
          taskNumber = currentTask;
          let description = "";
          const newLines = lines.slice(index);
          for (let newLine of newLines) {
            if (
              (parseInt(newLine[0]) &&
                parseInt(newLine[0] - 1) !== taskNumber) ||
              newLine.startsWith("#")
            )
              break;
            description += newLine + "\n";
          }
          description = marked.parse(description).replaceAll("\n", "");
          const task = { description };
          jsonData["tasks"].push(task);
        }
      } else if (currentSection === "tests") {
        if (line.startsWith("```")) {
          codeStarted = !codeStarted;
          if (!codeStarted) taskNumber++;
        } else if (taskNumber < jsonData.tasks.length) {
          if (jsonData["tasks"][taskNumber].test === undefined) {
            jsonData["tasks"][taskNumber].test = line;
          } else {
            jsonData["tasks"][taskNumber].test += line;
          }
        }
      } else if (
        currentSection === "startCode" ||
        currentSection === "solutionCode"
      ) {
        if (jsonData[currentSection] === "" && !line.startsWith("coco")) return;
        if (line.startsWith("```")) return;
        jsonData[currentSection] += line + "\n";
      } else if (currentSection === "extras") {
        const parts = line.split("=").map((part) => part.trim());
        jsonData[parts[0]] = parts[1];
      }
    }
  });

  return jsonData;
};

test();
