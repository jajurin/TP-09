import 'dotenv/config'
import fs from 'fs';

class LogHelper {
  constructor() {
    this.filePath = process.env.LOG_FILE_PATH;
    this.fileName = process.env.LOG_FILE_NAME;
    this.logToFileEnabled = process.env.LOG_TO_FILE_ENABLED.toLowerCase() === 'true';
    this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';

    if (!fs.existsSync(this.filePath)) {
      fs.mkdirSync(this.filePath, { recursive: true });
    }
  }

  logError = (errorObject) => {
    const logText = `[${new Date().toISOString()}] ${errorObject.message}\n`;

    if (this.logToConsoleEnabled) {
      console.error(logText);
    }

    if (this.logToFileEnabled) {
      fs.appendFileSync(this.filePath + this.fileName, logText);
    }
  }
}

export default new LogHelper();