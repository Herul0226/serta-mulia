// const predictClassification = require('../services/inferenceService');
// const crypto = require('crypto');
// const storeData = require('../services/storeData');

// async function postPredictHandler(request, h) {
//   const { image } = request.payload;
//   const { model } = request.server.app;

//   const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
//   const id = crypto.randomUUID();
//   const createdAt = new Date().toISOString();

//   const data = {
//     "id": id,
//     "result": label,
//     "explanation": explanation,
//     "suggestion": suggestion,
//     "confidenceScore": confidenceScore,
//     "createdAt": createdAt
//   }

//   await storeData(id,data);

//   const response = h.response({
//     status: 'success',
//     message: confidenceScore > 99 ? 'Model is predicted successfully.' : 'Model is predicted successfully but under threshold. Please use the correct picture',
//     data
//   })
//   response.code(201);
//   return response;
// }

// module.exports = postPredictHandler;

//belajar
// const predictClassification = require("../services/inferenceService");
// const crypto = require("crypto");

// const storeData = require('../services/storeData');

// async function postPredictHandler(id, data) {
//   const { image } = request.payload;
//   const { model } = request.server.app;

//   const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
//   const id = crypto.randomUUID();
//   const createdAt = new Date().toISOString();

//   const data = {
//     id: id,
//     result: label,
//     explanation: explanation,
//     suggestion: suggestion,
//     confidenceScore: confidenceScore,
//     createdAt: createdAt,
//   };

//   await storeData(id, data);

//   const response = h.response({
//     status: "success",
//     message:
//       confidenceScore > 99
//         ? "Model is predicted successfully."
//         : "Model is predicted successfully but under threshold. Please use the correct picture",
//     data,
//   });
//   response.code(201);
//   return response;
// }

// module.exports = postPredictHandler;

//==================

const predictClassification = require("../services/inferenceService");
const crypto = require("crypto");

const storeData = require('../services/storeData');

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  // Initialize id within the function
  const id = crypto.randomUUID(); // Assign value to id

  const { confidenceScore, label, explanation, suggestion } =
    await predictClassification(model, image);

  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: label,
    explanation: explanation,
    suggestion: suggestion,
    confidenceScore: confidenceScore,
    createdAt: createdAt,
  };

  await storeData(id, data);

  const response = h.response({
    status: "success",
    message:
      confidenceScore > 99
        ? "Model is predicted successfully."
        : "Model is predicted successfully but under threshold. Please use the correct picture",
    data,
  });
  response.code(201);
  return response;
}

module.exports = postPredictHandler;
