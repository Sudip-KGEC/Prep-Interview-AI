import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect, useCallback } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const handleAsync = async (callback) => {
        setLoading(true)
        try {
            return await callback()
        } catch (error) {
            console.error(error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const generateReport = useCallback(async (data) => {
        const response = await handleAsync(() =>
            generateInterviewReport(data)
        )

        if (response) setReport(response.interviewReport)

        return response?.interviewReport || null
    }, [])

    const getReportById = useCallback(async (id) => {
        const response = await handleAsync(() =>
            getInterviewReportById(id)
        )

        if (response) setReport(response.interviewReport)

        return response?.interviewReport || null
    }, [])

    const getReports = useCallback(async () => {
        const response = await handleAsync(() =>
            getAllInterviewReports()
        )

        if (response) setReports(response.interviewReports)

        return response?.interviewReports || []
    }, [])


 const getResumePdf = useCallback(async (id) => {
  try {
    const response = await handleAsync(() =>
      generateResumePdf({ interviewReportId: id })
    );

    if (!response) return;

    // Ensure correct blob
    const blob =
      response?.data instanceof Blob ? response.data : response;

    const blobData = new Blob([blob], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blobData);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `resume_${id}.pdf`);

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.error("Download failed:", err);
  }
}, []);
  

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getReports()
        }
    }, [interviewId, getReportById, getReports])

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    }
}