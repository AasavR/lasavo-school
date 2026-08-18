import { callAIModel } from '../services/aiModelService';

export class LeadEnrichmentAgent {
  async enrichLeadsForCounty(countyName) {
    // Generate base parcel data via AI Agent service
    const aiPrompt = `Generate a realistic commercial roof lead for county: ${countyName} with parcel ID, owner LLC, sq ft (>30,000 sq ft), roof type, estimated deal value, and contact info.`;
    const systemPrompt = `You are an AI Lead Enrichment Agent for commercial flat roof restoration.`;
    
    try {
      const response = await callAIModel({ prompt: aiPrompt, systemPrompt });
      if (response.startsWith('{')) {
        const parsed = JSON.parse(response);
        return [{ id: 'lead_ai_' + Date.now(), priorityLevel: 1, ...parsed }];
      }
    } catch (e) {
      console.log('Using default structured leads');
    }

    if (countyName.includes('Hillsborough')) {
      return [
        {
          id: 'lead_nh_01',
          priorityLevel: 1,
          parcelData: {
            parcelId: 'NH-HILL-4021',
            ownerLLC: 'Gateway Industrial Logistics LLC',
            address: '140 Route 101A',
            city: 'Nashua',
            state: 'NH',
            roofSqFt: 65000,
            roofType: 'EPDM Membrane (14 Years Old)'
          },
          estimatedDealValue: 195000,
          savingsVsTearoff: 130000,
          contacts: [
            { fullName: 'Marcus Vance', title: 'VP of Asset Management', phone: '+1 (603) 555-0192', email: 'm.vance@gatewayindustrial.com' }
          ]
        },
        {
          id: 'lead_nh_02',
          priorityLevel: 1,
          parcelData: {
            parcelId: 'NH-HILL-9912',
            ownerLLC: 'Merrimack River Logistics Corp',
            address: '88 Industrial Park Dr',
            city: 'Manchester',
            state: 'NH',
            roofSqFt: 82000,
            roofType: 'TPO Single-Ply (12 Years Old)'
          },
          estimatedDealValue: 246000,
          savingsVsTearoff: 164000,
          contacts: [
            { fullName: 'Sarah Jenkins', title: 'Director of Facilities', phone: '+1 (603) 555-0841', email: 's.jenkins@merrimacklogistics.com' }
          ]
        }
      ];
    }

    return [
      {
        id: 'lead_me_01',
        priorityLevel: 2,
        parcelData: {
          parcelId: 'ME-CUMB-1044',
          ownerLLC: 'Casco Bay Cold Storage & Logistics LLC',
          address: '400 Commercial St',
          city: 'Portland',
          state: 'ME',
          roofSqFt: 70000,
          roofType: 'Modified Bitumen (16 Years Old)'
        },
        estimatedDealValue: 210000,
        savingsVsTearoff: 140000,
        contacts: [
          { fullName: 'David Sterling', title: 'Operations Vice President', phone: '+1 (207) 555-3912', email: 'd.sterling@cascobaycold.com' }
        ]
      }
    ];
  }
}
