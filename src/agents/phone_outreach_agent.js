export class PhoneOutreachAgent {
  getOpeningScript(contactName, company, corridor) {
    return `Hi ${contactName}, this is Aasav with RoofRestore5x calling regarding your ${company} facility along the ${corridor}. We've been conducting thermal roof assessments in the area and noticed your flat roof structure qualifies for our liquid restoration system—cutting replacement costs by 50% without tenant downtime. Do you have 2 minutes to discuss?`;
  }

  handleObjection(objectionType) {
    if (objectionType.toLowerCase().includes('tear off') || objectionType.toLowerCase().includes('tear-off')) {
      return {
        objection: 'We usually do full tear-off replacements when membranes reach 15 years.',
        scriptResponse: 'Unlike a full tear-off that costs $15–$25/sq ft and creates major tenant disruption, our liquid restoration systems coat directly over your existing membrane, extending lifecycle by 10-15 years at 50% to 60% lower cost, fully deductible as OpEx!'
      };
    }

    return {
      objection: 'We do not have CapEx budget allocated for roofing this fiscal quarter.',
      scriptResponse: 'That is the beauty of our system! Because liquid restoration is classified as preventative maintenance rather than capital replacement, 100% of the cost is categorized under Operational Expenditures (OpEx) for immediate tax deduction under Section 179.'
    };
  }
}
