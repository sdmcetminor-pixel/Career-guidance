import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailer'

export async function POST(req: Request) {
  try {
    const { email, type, name, weakTopics, score, total } = await req.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    let subject = ""
    let message = ""

    if (type === "welcome") {
      subject = "Welcome to Career Platform 🎉"
      message = `Hi ${name || "there"}, your account is successfully created! We're excited to have you onboard.`
    } else if (type === "login") {
      subject = "New Login Alert 🔔"
      message = `Hi ${name || "there"}, we noticed a new login to your account.`
    } else if (type === "test_report") {
      subject = "Your Quiz Report is Ready 📊"
      const gapsMessage = weakTopics && weakTopics.length > 0
        ? `<p>We noticed you struggled with these subtopics: <strong>${weakTopics.join(', ')}</strong>. Consider revising them to strengthen your skills!</p>`
        : `<p>Great job! You showed strong understanding of the concepts.</p>`
      
      message = `
        <h2>Quiz Results</h2>
        <p>Hi ${name || "there"}, you recently completed a video test.</p>
        <p><strong>Score:</strong> ${score} / ${total}</p>
        ${gapsMessage}
        <p>Keep up the great work learning!</p>
      `
    } else {
      return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    // Determine if html string contains tags to avoid double wrapping
    const isHtml = message.includes('<h2>');

    const result = await sendEmail({
      to: email,
      subject,
      html: isHtml ? message : `<p>${message}</p>`,
    })

    if (!result || !result.success) {
      console.error("NodeMailer delivery error:", result?.error)
      return NextResponse.json({ error: result?.error }, { status: 400 })
    }

    console.log("Email explicitly sent, ID:", result.messageId)
    return NextResponse.json({ success: true, id: result.messageId })
  } catch (error) {
    console.error("Failed to send email API:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
