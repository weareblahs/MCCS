var path = require("path");
const pressAnyKey = require("press-any-key");
// "simple version management system" (patent pending)
var appName = "My Computer Can't Sleep!";
var version = "0.1";
var copyrightText =
  "Made by Tan (weareblahs). Source code licensed via MIT License.";
// code start
console.log('"' + appName + '", version ' + version);
console.log(copyrightText);
console.log("\n");
console.log("Checking requests...");
require("child_process").exec(
  "powercfg /requests",
  function (error, stdout, stderr) {
    if (stdout.length == 0) {
      console.log(stderr);
      process.exit();
    } else {
      console.log();
      // remove blank arrays
      array = [];
      initialArray = stdout.split("\r\n");
      for (i = 0; i < initialArray.length; i++) {
        if (initialArray[i] !== "") {
          array.push(initialArray[i]);
        }
      }
    }
    displayArrayIndex = array.indexOf("DISPLAY:");
    displayArrayCount = 0;
    systemArrayIndex = array.indexOf("SYSTEM:");
    systemArrayCount = 0;
    awaymodeArrayIndex = array.indexOf("AWAYMODE:");
    awaymodeArrayCount = 0;
    executionArrayIndex = array.indexOf("EXECUTION:");
    executionArrayCount = 0;
    perfBoostIndex = array.indexOf("PERFBOOST:");
    perfBoostCount = 0;
    activeLockScreenIndex = array.indexOf("ACTIVELOCKSCREEN:");
    displayArray = array.slice(displayArrayIndex + 1, systemArrayIndex);
    systemArray = array.slice(systemArrayIndex + 1, awaymodeArrayIndex);
    awaymodeArray = array.slice(awaymodeArrayIndex + 1, executionArrayIndex);
    executionArray = array.slice(executionArrayIndex + 1, perfBoostIndex);
    perfBoostArray = array.slice(perfBoostIndex + 1, activeLockScreenIndex);
    activeLockScreenIndex = array.slice(activeLockScreenIndex + 1);
    taskkillQueue = [];
    for (i = 0; i < executionArray.length; i++) {
      if (executionArray[0] === "None.") {
      } else {
        if (i % 2 == 0) {
          directory = executionArray[i].replace("[PROCESS] ", "");
          executionArrayCount += 1;
          taskkillQueue.push(path.basename(directory));
        }
      }
    }

    for (i = 0; i < displayArray.length; i++) {
      if (displayArray[0] === "None.") {
      } else {
        if (i % 2 == 0) {
          directory = displayArray[i].replace("[PROCESS] ", "");
          displayArrayCount += 1;
          taskkillQueue.push(path.basename(directory));
        }
      }
    }

    for (i = 0; i < systemArray.length; i++) {
      if (systemArray[0] === "None.") {
      } else {
        if (i % 2 == 0) {
          directory = systemArray[i].replace("[DRIVER] ", "");
          systemArrayCount += 1;
        }
      }
    }

    for (i = 0; i < awaymodeArray.length; i++) {
      if (awaymodeArray[0] === "None.") {
      } else {
        if (i % 2 == 0) {
          directory = awaymodeArray[i].replace("[DRIVER] ", "");
          awaymodeArrayCount += 1;
          taskkillQueue.push(path.basename(directory));
        }
      }
    }

    for (i = 0; i < perfBoostArray.length; i++) {
      if (perfBoostArray[0] === "None.") {
      } else {
        if (i % 2 == 0) {
          directory = perfBoostArray[i].replace("[DRIVER] ", "");
          perfBoostCount += 1;
        }
      }
    }

    // all those if/else conditions
    // display-related
    if (displayArrayCount == 0) {
      console.log("There are no display-related issues.");
    } else {
      console.log(
        "There are " +
          displayArrayCount +
          " display-related issues. Related executables has been added to the task killing queue."
      );
    }
    // system-related
    if (systemArrayCount == 0) {
      console.log("There are no system-related issues.");
    } else {
      console.log(
        "There are " +
          systemArrayCount +
          " system-related issues. If it is related to an application, it has been added to the task killing queue."
      );
    }
    // away mode-related (not sure how it works)
    if (awaymodeArrayCount == 0) {
      console.log("There are no away mode-related issues.");
    } else {
      console.log(
        "There are " +
          awaymodeArrayCount +
          " away mode-related issues. Related executables has been added to the task killing queue."
      );
    }

    // execution-related
    if (executionArrayCount == 0) {
      console.log("There are no execution-related issues.");
    } else {
      console.log(
        "There are " +
          executionArrayCount +
          " execution-related issues. Related executables has been added to the task killing queue."
      );
    }

    // performance boost-related (not sure how it works)
    if (perfBoostCount == 0) {
      console.log("There are no performance boost-related issues.");
    } else {
      console.log(
        "There are " + perfBoostCount + " performance boost-related issues."
      );
    }

    //taskkill list
    if (taskkillQueue.length > 0) {
      console.log("\n");
      console.log(
        "Since there are issues related to executables, it can be done by forcifully stopping the task."
      );
      const prompts = require("prompts");

      (async () => {
        const response = await prompts({
          type: "text",
          name: "taskkillViewTask",
          message:
            "Please confirm with Y or N to view tasks to be forcifully stopped. Using other keys or 'N' will exit this application",
        });

        if (response.taskkillViewTask == "Y" || "y") {
          console.log("These are the tasks that will be terminated:");
          for (i = 0; i < taskkillQueue.length; i++) {
            console.log(taskkillQueue[i]);
            console.log("\n");
            console.log(
              "Before you proceed, please ensure that you've saved all files on the mentioned applications above."
            );
            const taskkillResponse = await prompts({
              type: "text",
              name: "taskkillResponse",
              message:
                "Please confirm with Y or N to stop the tasks. Using other keys or 'N' will exit this application",
            });
            if ((taskkillResponse.taskkillResponse = "Y" || "y")) {
              console.log("Starting operation");
              var cmd = require("node-cmd");
              for (i = 0; i < taskkillQueue.length; i++) {
                command = "taskkill /f /im " + taskkillQueue[i];
                console.log(cmd.runSync(command).data);
              }
            }
            if ((taskkillResponse.taskkillResponse = "N" || "n")) {
              process.exit();
            }
          }

          console.log("\n");
        } else {
        }
      })();
    } else {
      pressAnyKey("\nPress any key to exit", {}).then(() => {
        process.exit();
      });
    }
  }
);
