const { exec } = require('child_process');
const fs = require('fs');

exports.convertVideo = (inputPath, outputPath, targetFormat, progressCallback) => {
  return new Promise((resolve, reject) => {
    const command = `ffmpeg -i "${inputPath}" "${outputPath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        fs.unlinkSync(inputPath); //remove uploaded file in case of error
        return reject(error);
      }
      if(fs.existsSync(inputPath)){
        fs.unlinkSync(inputPath); //remove the uploaded file once processed
      }
      resolve();
    });
  });
};
