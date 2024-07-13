# "My Computer Can't Sleep!" (MCCS)
A tool used to check what prevents your Windows computer from sleeping or turning off display

## Why did I made this
When I am sleeping (yes, the computer is still turned on, in the same bedroom), the screen stays on, and I have to wake up (suddenly) to check if there is a problem or application running in the background, preventing my computer to sleep. What I know from a Google search result of Microsoft's forums make me know about the `powercfg /requests` command that can be used to check what prevents my computer from sleeping.

# How to get it working
## From executable
Go to the [releases](https://github.com/weareblahs/MCCS/releases) page and download the executable file. Remember to run the file as administrator.

## From source
0. Ensure that you have Node installed on your PC - also ensure that your computer is running Windows since the base command (`powercfg`) only works on Windows.
1. Open Command Prompt or Windows PowerShell as administrator, clone this repository and point to the directory.
   ```batch
   git clone https://github.com/weareblahs/MCCS
   cd MCCS
   ```
3. Install all required dependecies.
   ```batch
   npm install
   ```
3. Run MCCS.
   ```batch
   node app
   ```

## Known issues
 - `Please confirm with Y or N to view tasks to be forcifully stopped. Using other keys or 'N' will exit this application` and `Please confirm with Y or N to stop the tasks. Using other keys or 'N' will exit this application` prompts at the task termination stage will be treated as a valid command (Y or y) no matter what input you give to the app
 - For `Away mode` and `Performance boost` issues - I'm not sure what these issues do because I cannot reproduce these issues when developing this tool. If you know what it does and how it looks like when you run `powercfg /requests`, please create an issue on the [issues page](https://github.com/weareblahs/MCCS/issues).
