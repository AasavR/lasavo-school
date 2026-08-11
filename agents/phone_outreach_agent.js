/**
 * Lasavo RoofRestore5x Venture - Phone Outreach & Objection Handling Voice Agent
 * SOP 2 Implementation
 */

export class PhoneOutreachAgent {
  constructor(config = {}) {
    this.name = "Phone Outreach & Cold Call Voice Agent";
    this.agentCallerName = config.agentCallerName || "Lasavo Outreach Specialist (RoofRestore5x)";
    this.dailyTargetCalls = 45;
  }

  /**
   * SOP 2 Script Generator
   */
  getOpeningScript(leadName, companyName, corridorName = "Route 3 / I-93") {
    return `Hi ${leadName}, this is ${this.agentCallerName} reaching out on behalf of Lasavo for RoofRestore5x. ` +
      `We’re currently auditing large flat-roof footprints along the ${corridorName} corridor ahead of seasonal weather shifts. ` +
      `Are you currently seeing any ponding water, seam separation, or membrane degradation on your main warehouse facilities at ${companyName}?`;
  }

  /**
   * SOP 2 Core Objection Handler (Tear-off vs Restoration)
   */
  handleObjection(objectionType) {
    const ob = objectionType.toLowerCase();

    if (ob.includes("tear") || ob.includes("replace") || ob.includes("roofing contractor")) {
      return {
        objection: "We usually just hire a roofer to do a full tear-off replacement when it leaks.",
        scriptResponse: "Unlike a full tear-off that costs $15–$25/sq ft and disrupts tenant operations, our liquid restoration systems extend roof lifecycle by 10 to 15 years at 50% to 60% lower cost, fully categorized as an operational expenditure (OpEx) rather than a capital expense."
      };
    }

    if (ob.includes("budget") || ob.includes("cost") || ob.includes("expensive")) {
      return {
        objection: "We don't have CapEx budget allocated for major roofing projects this fiscal year.",
        scriptResponse: "That's exactly why asset managers choose RoofRestore5x. Because liquid restoration is classified as preventative maintenance (OpEx), it bypasses CapEx budget freezes, qualifies for instant tax deductions under Section 179, and costs less than half of traditional replacement."
      };
    }

    if (ob.includes("busy") || ob.includes("no time") || ob.includes("send email")) {
      return {
        objection: "I'm busy right now, send me an email.",
        scriptResponse: "I completely understand. I can email over our technical specs right away. To make sure I attach the exact thermal moisture report for your roof type (EPDM/TPO), can I confirm if your facility is over 30,000 sq ft?"
      };
    }

    return {
      objection: "General Hesitation",
      scriptResponse: "Our complimentary 10-minute briefing and thermal imaging scan identifies sub-surface moisture before freezing winter temperatures cause membrane rupture. Would Thursday at 10 AM or 2 PM work better for our senior engineer to stop by?"
    };
  }

  /**
   * Simulate a Live Cold Call Session with AI Decision Making
   */
  async executeCallSession(leadProfile) {
    const contact = leadProfile.contacts?.[0] || { fullName: "Facility Manager", phone: "+1 603-555-0199" };
    const corridor = leadProfile.parcelData?.state === "NH" ? "Route 3 / I-93" : "I-95 Portland Metro";

    console.log(`[SOP 2 - Phone Cadence] Dialing ${contact.fullName} (${contact.phone}) for ${leadProfile.parcelData?.ownerLLC}...`);

    const callResult = {
      timestamp: new Date().toISOString(),
      leadId: leadProfile.id,
      contactName: contact.fullName,
      company: leadProfile.parcelData?.ownerLLC,
      durationSeconds: Math.floor(90 + Math.random() * 180),
      openingScript: this.getOpeningScript(contact.fullName, leadProfile.parcelData?.ownerLLC, corridor),
      objectionRaised: "Tear-off Replacement Preference",
      objectionResponse: this.handleObjection("tear off").scriptResponse,
      outcome: Math.random() > 0.4 ? "Audit Booked (Thermal Moisture Scan)" : "Follow-Up Requested (Email Sent)",
      bookedAuditDetails: {
        auditType: "Complimentary Commercial Roof Thermal Imaging Audit",
        scheduledDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        assignedInspector: "RoofRestore5x Senior Certified Inspector"
      }
    };

    return callResult;
  }
}
