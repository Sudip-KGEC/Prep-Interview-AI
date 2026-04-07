 import { PDFParse } from 'pdf-parse'
import interviewReportModel from '../models/interviewQuestions.model.js'
import {generateInterviewReport , generateResumePdf} from "../services/ai.service.js"




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
  try {
    const resumeContent = await new PDFParse(
      Uint8Array.from(req.file.buffer)
    ).getText();

    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription
    });

    const aiData = interViewReportByAi;

    const technicalQuestions = (aiData.technicalQuestions || []).map(q => ({
      question: q.questions,
      intention: q.intention,
      answer: q.answer
    }));

    const behavioralQuestions = (aiData.behavioralQuestions || []).map(q => ({
      question: q.questions,
      intention: q.intention,
      answer: q.answer
    }));

    const skillGaps = (aiData.skillGaps || []).map(s => ({
      skill: typeof s === "string" ? s : s.skill,
      severity: typeof s === "object" && s.severity ? s.severity : "medium"
    }));

    const preparationPlan = (aiData.preparationPlan || []).map((p, index) => ({
      day: p.day || index + 1,
      focus: typeof p === "string" ? p : p.focus,
      tasks: typeof p === "string" ? [p] : p.tasks || []
    }));

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,

      matchScore: aiData.matchScore,
      title: aiData.title,

      technicalQuestions,
      behavioralQuestions,
      skillGaps,
      preparationPlan
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
}


/**
 * @description Controller to get interview report by interviewId.
 */
 async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findById(interviewReportId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found."
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription
    });

   
    if (!pdfBuffer) {
      throw new Error("PDF generation failed");
    }

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.error("PDF Controller Error:", error);

    res.status(500).json({
      message: "Failed to generate PDF",
      error: error.message
    });
  }
}

export default {
 generateInterViewReportController,
 getInterviewReportByIdController,
 getAllInterviewReportsController,
 generateResumePdfController

}