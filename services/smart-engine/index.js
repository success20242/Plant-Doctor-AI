function smartDiagnosis(ai, context) {
  let result = {
    disease: ai.disease,
    confidence: ai.confidence,
    treatment: ""
  };

  if (context.soil === "dry") {
    result.treatment = "Apply irrigation + nitrogen fertilizer";
  }

  if (ai.disease.includes("Blight")) {
    result.treatment = "Apply copper fungicide immediately";
  }

  if (context.location === "UAE") {
    result.treatment += " | Monitor heat stress";
  }

  return result;
}

module.exports = { smartDiagnosis };
