const { v4: uuidv4 } = require('uuid');
const { convertVideo } = require('../utils/converterUtil');
const path = require('path');

const conversionJobs = {};

exports.convertVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const { targetFormat } = req.body;
    if (!targetFormat) {
      return res.status(400).json({ error: 'Target format not provided' });
    }

    const jobId = uuidv4();
    const inputFilePath = req.file.path;
    const outputFilePath = path.join(__dirname, '../converted', `${jobId}.${targetFormat}`);

    conversionJobs[jobId] = { status: 'pending' };

    convertVideo(inputFilePath, outputFilePath, targetFormat, (progress) => {
      conversionJobs[jobId] = { status: 'processing', progress };
    })
      .then(() => {
        conversionJobs[jobId] = { status: 'completed', outputFilePath: `/converted/${jobId}.${targetFormat}` };
        res.json({ jobId, status: 'completed', outputFilePath: `/converted/${jobId}.${targetFormat}` });
      })
      .catch(err => {
        console.error(err);
        conversionJobs[jobId] = { status: 'failed', error: err.message };
        res.status(500).json({ jobId, status: 'failed', error: err.message });
      });

    res.status(202).json({ jobId, status: 'pending' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getConversionStatus = (req, res) => {
  const { jobId } = req.params;
  const job = conversionJobs[jobId];

  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }

  res.json({ jobId, status: job.status, ...job });
};
