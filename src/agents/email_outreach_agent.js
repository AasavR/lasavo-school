export class EmailOutreachAgent {
  async dispatchEmailBatch(leads) {
    return leads.map(l => ({
      id: 'dispatch_' + l.id,
      recipient: l.contacts[0]?.email || 'contact@commercial.com',
      company: l.parcelData.ownerLLC,
      subject: `Preventative flat roof restoration for ${l.parcelData.ownerLLC}`,
      status: 'Sent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  }
}
